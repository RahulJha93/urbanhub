import { Button } from "@/components/ui/button";
import {
  useCanUserReviewQuery,
  useGetProductsDetailsQuery,
  useSubmitReviewsMutation,
} from "@/redux/api/productsApi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Loader from "@/components/Loader/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "@/redux/features/cartSlice";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ListReviews from "../Reviews/ListReviews";


const ProductItems = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [activeImg, setActiveImg] = useState("");
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitReview, { loading, error, isSuccess }] =
    useSubmitReviewsMutation();
  const { data, isLoading, isError } = useGetProductsDetailsQuery(params?.id);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: khata } = useCanUserReviewQuery(data?.product?._id);
  const canReview = khata?.canReview;
  // console.log(khata);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review Posted");
    }
    if (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [isSuccess]);

  const increaseQty = (e) => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= data?.product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQty(qty);
  };

  const decreaseQty = (e) => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQty(qty);
  };

  const setItemToCart = (e) => {
    const cartItem = {
      product: data?.product?._id,
      name: data?.product?.name,
      price: data?.product?.price,
      image: data?.product?.images[0]?.url,
      stock: data?.product?.stock,
      qty,
    };
    dispatch(setCartItem(cartItem));
    // addedProduct++;
    toast.success("Product added to cart");
  };

  const sumbitHandler = (e) => {
    const productId = data?.product?._id;
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
    setOpen(false);
  };

  useEffect(() => {
    setActiveImg(
      data?.product?.images[0]
        ? data?.product?.images[0]?.url
        : "/image/default_product.png"
    );
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (data) {
      console.log(data);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <section className="pt-[30px] sm:px-[40px] px-[20px] ">
        {/* <h1 className="font-semibold">ProductItems</h1> */}
        <div className="flex justify-around flex-wrap">
          <div className="">
            <img src={activeImg} alt="" className="w-[400px] h-[400px]" />

            <div className=" mt-1 flex gap-2 justify-center cursor-pointer">
              {data?.product?.images?.map((img) => (
                <div
                  className={`border ${
                    img?.url === activeImg ? "border-black" : " "
                  }`}
                >
                  <img
                    src={img?.url}
                    alt=""
                    className="w-[80px] h-[80px]"
                    onClick={(e) => setActiveImg(img?.url)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full text-center sm:w-[50%] sm:text-left ">
            <h1 className="font-semibold">{data?.product?.name}</h1>
            <p className="text-gray-500 pt-2 mb-2">{data?.product?._id}</p>
            <StarRatings
              rating={data?.product?.ratings}
              starRatedColor="#14958F"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            />
            <span>
              {""}({data?.product?.numOfReviews}Reviews) {""}
            </span>
            <div>
              <h1 className="font-semibold mt-[10px] mb-[4px]">
                Rs {data?.product?.price}
              </h1>
              <div className="flex mb-3 gap-2 items-center justify-center sm:justify-start">
                <Button onClick={decreaseQty}>-</Button>
                <input
                  type="number"
                  className="count w-10 text-end"
                  value={qty}
                  readOnly
                />
                <Button onClick={increaseQty}>+</Button>
              </div>
              <Button onClick={setItemToCart}>Add to Bag</Button>
            </div>
            <h1 className="font-semibold mt-3">
              Status :
              {data?.product?.stock > 0 ? (
                <span className="text-[green] font-medium">In Stock</span>
              ) : (
                <span className="text-[red] font-medium">Out of Stock</span>
              )}
            </h1>
            <div className="pt-[12px]">
              <h1 className="font-semibold">Description</h1>
              <p className="text-gray-500 pt-[5px] text-justify">
                {data?.product?.description}
              </p>
            </div>
            <h1 className="font-semibold pt-2">
              Sold by :{" "}
              <span className="text-gray text-sm">{data?.product?.seller}</span>
            </h1>
            <div className="pt-5 pb-10">
              {isAuthenticated ? (
                canReview ? (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button>Submit Your Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="">
                          Submit your reviews
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid">
                          <StarRatings
                            rating={rating}
                            starRatedColor="#14958F"
                            numberOfStars={5}
                            name="rating"
                            starDimension="40px"
                            starSpacing="1px"
                            changeRating={(e) => setRating(e)}
                          />
                        </div>
                        <div className="grid">
                          <Textarea
                            placeholder="Type your message here."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="w-full" onClick={sumbitHandler}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : null
              ) : (
                <Link to="/login">
                <Button type="submit" className="">
                  Login to Post Review
                </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {data?.product?.reviews?.length > 0 && (
          <ListReviews reviews={data?.product?.reviews} />
        )}
      </section>
    </>
  );
};

export default ProductItems;
