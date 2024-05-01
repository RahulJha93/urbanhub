const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const StripeCheckOutSession = asyncHandler(async (req, res, next) => {
  const body = req?.body;

  const line_items = body?.orderItems?.map((item)=>{
    return {
        price_data:{
            currency:"inr",
            product_data:{
                name:item?.name,
                // images:[item?.image],
                metadata:{productId:item?.product},
            },
            unit_amount:item?.price*100
        },
        tax_rates:["txr_1PBH2JSDzPgv0hBCpMQNp1P8"],
        quantity:item?.qty,

    }
})

  const shipping_rate =
    body?.itemPrice >= 200
      ? "shr_1PBGWuSDzPgv0hBCleduNBlO"
      : "shr_1PBGY3SDzPgv0hBCxwgtHFnw";

    const shippingInfo = body?.shippingInfo;  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata:{...shippingInfo,itemsPrice:body?.itemsPrice},
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
  });
  console.log(session);
  res.status(200).json({
    url:session.url,
  })
});

module.exports = StripeCheckOutSession;
