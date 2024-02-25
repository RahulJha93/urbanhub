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
    const productPrice = product.price*83;
  return (
    <>
      <Card className="w-[280px] h-auto mb-8">
        <CardHeader>
          <CardTitle>
            <img
            //   src={product.images[0].url}
            src="src\assets\image\tshirt1.jfif"
              alt=""
              className="w-[280px] h-[200px] p-2"
            />
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="p-2">
          <p className="font-semibold">
            <Link to={`/product/${product._id}`}>({product.name})</Link>
          </p>
          <div className="flex gap-2 mb-2">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="#14958F"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
           starSpacing="1px"
          />
          <p className="text-black font-medium">({product.numOfReviews})</p>
          </div>
          <p className="font-semibold"> {`Rs ${productPrice}`}</p>
        </CardContent>
        <CardFooter className="p-2">
          <Button>
            <Link to={`/product/${product._id}`}>View Details </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Pcard;
