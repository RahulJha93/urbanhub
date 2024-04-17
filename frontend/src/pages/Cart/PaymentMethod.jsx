import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateOrdercost } from "@/helper/helper";
import { useCreateNewOrderMutation } from "@/redux/api/orderApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { itemPrice, shippingTotal, taxPrice, shippingPrice } =
    calculateOrdercost(cartItems);
  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();
  const nav = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      nav("/");
    }
  }, [error,isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (method == "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice:itemPrice,
        shippingAmount:shippingTotal,
        taxAmount:taxPrice,
        totalAmount:shippingPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentsMethod: "COD",
      };
      createNewOrder(orderData);
    }
    if (method == "CARD") {
    }
  };

  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] pt-5 ">
        <form onSubmit={submitHandler}>
          <Label className="text-xl pl-6 ">Select Payment Method</Label>
          <CardContent className="pt-5">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  id="r1"
                  onClick={(e) => setMethod("COD")}
                />
                <Label htmlFor="r1">COD - Cash On Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="comfortable"
                  id="r2 "
                  onClick={(e) => setMethod("CARD")}
                />
                <Label htmlFor="r2">UPI | Credit Card | Debit Card</Label>
              </div>
            </RadioGroup>
            <Button className="mt-4 w-full"> Continue </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default PaymentMethod;
