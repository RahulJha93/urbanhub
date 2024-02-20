import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LatestProduct = () => {
  return (
    <>
      <h1 className="text-2xl mb-5">LatestProduct</h1>
      <Card className="w-[240px] h-auto mb-8">
        <CardHeader>
          <CardTitle>
            <img src="src/assets/image/tshirt1.jfif" alt="" className="w-[240px] h-[200px] p-2"/>
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-2">
          <p className="font-semibold">Product Name</p>
          <p className="text-[#f8f844] flex">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <p className="text-black">(0)</p>
          </p>
          <p className="font-semibold">$250</p>
        </CardContent>
        <CardFooter className="p-2">
          <Button>View Details</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LatestProduct;
