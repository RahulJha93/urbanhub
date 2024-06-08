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
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';

const Pcard = ({ product }) => {
    const productPrice = product.price;
  return (
    <>
      <Card className="w-[243px] h-auto mb-8 transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer">
        <CardHeader className="p-0 bg-[#f1f1f1]  rounded-tr-xl rounded-tl-xl">
          <CardTitle>
            <img
            //   src={product.images[0].url}
            src={product?.images[0]?.url}
              alt=""
              className="w-[241px] h-[170px] mix-blend-multiply p-5 "
            />
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-2">
          <p className="font-semibold text-[14px]">
            <Link to={`/product/${product._id}`}>({product.name})</Link>
          </p>
          <div className="flex gap-2 mb-2">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="#14958F"
            numberOfStars={5}
            name="rating"
            starDimension="14px"
           starSpacing="1px"
          />
          <p className="text-black font-medium text-[14px]">({product.numOfReviews})</p>
          </div>
          <p className="font-semibold text-[14px]"> {`Rs ${productPrice}`}</p>
        </CardContent>
        <CardFooter className="p-2">
          <Button className=" w-full">
            <Link to={`/product/${product._id}`}>View Details </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Pcard;
