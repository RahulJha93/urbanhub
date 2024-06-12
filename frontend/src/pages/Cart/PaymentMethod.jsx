import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateOrdercost } from "@/helper/helper";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "@/redux/api/orderApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { Stepper } from 'react-form-stepper';
import StepperReact from "./StepperReact";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { itemPrice, shippingTotal, taxPrice, shippingPrice } =
    calculateOrdercost(cartItems);
  const [createNewOrder, {  error, isSuccess }] =
    useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();
  const nav = useNavigate();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      console.log(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      nav("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (method === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: itemPrice,
        shippingAmount: parseInt(shippingTotal),
        taxAmount: taxPrice,
        totalAmount: shippingTotal,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentsMethod: "COD",
      };
      console.log(orderData);
      createNewOrder(orderData);
    }
    if (method === "card") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: itemPrice,
        shippingAmount: parseInt(shippingTotal),
        taxAmount: taxPrice,
        totalAmount: shippingPrice,
      };
      console.log(orderData);
      stripeCheckoutSession(orderData);
    }
  };

  return (
    <>
 <StepperReact value={2}/>
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] pt-5 ">
        <form onSubmit={submitHandler}>
          <Label className="text-xl pl-6 ">Select Payment Method</Label>
          <CardContent className="pt-5">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="COD"
                  id="r1"
                  onClick={(e) => setMethod("COD")}
                />
                <Label htmlFor="r1">COD - Cash On Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="CARD"
                  id="r2 "
                  onClick={(e) => setMethod("card")}
                />
                <Label htmlFor="r2">UPI | Credit Card | Debit Card</Label>
              </div>
            </RadioGroup>
            {isLoading ? (
              <Button className="mt-4 w-full">
                {" "}
                <Loader />{" "}
              </Button>
            ) : (
              <Button className="mt-4 w-full"> Continue </Button>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
    </>
  );
};

export default PaymentMethod;
