import React from "react";
import { Button } from "@/components/ui/button";
import MetaData from "@/components/layout/MetaData";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { calculateOrdercost } from "@/helper/helper";
import { Stepper } from 'react-form-stepper';
import StepperReact from "./StepperReact";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemPrice, shippingTotal, taxPrice, shippingPrice } =
    calculateOrdercost(cartItems);

  const nav = useNavigate();

  const paymentHandler = (e) => {
    nav("/paymentMethod");
  };
  return (
    <>

     {/* <Stepper
  steps={[{ label: 'Shipping' }, { label: 'Confirm Order' }, { label: 'Payment' }]}
  activeStep={1}  
/> */}
<StepperReact value={1}/>
      <div className="mt-8 px-4 sm:px-8 ">
        <h1 className="font-bold">Shipping Info:</h1>
        <div className="px-4">
          <p>Name : {user?.name} </p>
          <p>Phone : {shippingInfo?.phoneNo}</p>
          <p>
            Address: {shippingInfo?.address}, {shippingInfo?.city},
            {shippingInfo?.pincode},{shippingInfo?.country}
          </p>
        </div>
      </div>
      <section className="mt-8 px-4 sm:px-8 flex flex-col sm:flex-row justify-between gap-8">
        {/* <MetaData title={"Shopping Bag"} /> */}
        <div className="w-full sm:w-1/2 rounded-xl bg-white border-2 px-4 pt-4 pb-2">
          <h1 className="font-semibold text-2xl mb-4"> Your Cart Items</h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-t-2 py-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item?.image}
                  alt=""
                  className="w-16 h-16 object-cover"
                />
                <div className="">
                  <Link to={`/product/${item?.product}`}>
                    <h1 className="font-semibold text-sm">{item.name}</h1>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2"></div>
                <h1 className="font-semibold text-xs">
                  {item.qty} x ₹{item?.price} = <>₹{item.qty * item?.price}</>
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full sm:w-1/4 rounded-xl bg-white border-2 p-4">
          <h1 className="font-semibold">Order Summary</h1>
          <div className="text-gray-500 flex justify-between mt-3">
            <p>Subtotal :</p>
            <p>₹ {itemPrice}</p>
          </div>
          <div className="text-gray-500 flex justify-between mt-4 ">
            <p>Shipping :</p>
            <p>₹ {shippingPrice}</p>
          </div>
          <div className="text-gray-500 flex justify-between mt-4 border-b-2 pb-2">
            <p>Tax :</p>
            <p>₹ {taxPrice}</p>
          </div>
          <div className="text-gray-500 flex justify-between mt-4 border-b-2 pb-2">
            <p>Total :</p>
            <p>₹ {shippingTotal}</p>
          </div>
          <Button className="mt-4 w-full" onClick={paymentHandler}>
            Proceed to Payment
          </Button>
        </div>
      </section>
    </>
  );
};

export default ConfirmOrder;
