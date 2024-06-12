const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Order = require("../models/orders");
dotenv.config({ path: "backend/config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const StripeCheckOutSession = asyncHandler(async (req, res, next) => {
  const body = req?.body;

  const line_items = body?.orderItems?.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item?.name,
          // images:[item?.image],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: ["txr_1PBH2JSDzPgv0hBCpMQNp1P8"],
      quantity: item?.qty,
    };
  });

  const shipping_rate =
    body?.itemPrice >= 200
      ? "shr_1PBGY3SDzPgv0hBCxwgtHFnw"
      : "shr_1PBGWuSDzPgv0hBCleduNBlO";

  const shippingInfo = body?.shippingInfo;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/order/success`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
    // customer,
  });
  // console.log("Checkout=>",session);
  res.status(200).json({
    url: session.url,
  });
});

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      // console.log(item);
      // console.log(product);

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        qty: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

//create new order after payment => api/v1/payment/webhooks
const stripeWebhook = asyncHandler(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const payloadString = JSON.stringify(req.body);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret:process.env.STRIPE_WEBHOOK_SECRET
    })

    const event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // console.log("Session =>",session);

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;
      const totalAmount= session.amount_total/100 ;
      const taxAmount= session.total_details.amount_tax/100;
      const shippingAmount= session.total_details.amount_shipping/100;
      const itemsPrice= session.metadata.itemsPrice;

      const shippingInfo = {
        address: session.metadata.address,
        city : session.metadata.city,
        phoneNo : session.metadata.phoneNo,
        pincode : session.metadata.pincode,
        country : session.metadata.country
      }

      const paymentInfo = {
        id:session.payment_intent,
        status:session.payment_status
      }

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentsMethod:"card",
        user,
      };
      await Order.create(orderData);

      // console.log("====================");
      // console.log(orderData);
      // console.log("====================");

      // console.log("Order =>",orderItems);

      res.status(200).json({ success: true });
    } 
  } catch (err) {
    console.log(err);
  }
});

module.exports = { StripeCheckOutSession, stripeWebhook };
