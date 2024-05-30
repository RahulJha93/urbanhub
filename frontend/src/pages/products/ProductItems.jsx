import { Button } from "@/components/ui/button";
import { useGetProductsDetailsQuery } from "@/redux/api/productsApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Loader from "@/components/Loader/Loader";
import { toast, Toaster } from "sonner";
import {useDispatch} from "react-redux";
import { setCartItem } from "@/redux/features/cartSlice";


const ProductItems = () => {
 
  const params = useParams();
  const dispatch = useDispatch()

  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);

  const { data, isLoading, error, isError } = useGetProductsDetailsQuery(
    params?.id
  );

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

  const setItemToCart = (e) =>{

    const cartItem = {
    product:data?.product?._id,
    name:data?.product?.name,
    price:data?.product?.price,
    image:data?.product?.images[0]?.url,
    stock:data?.product?.stock,
    qty
    };
    dispatch(setCartItem(cartItem));
    // addedProduct++;
    toast.success("Product added to cart");
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
            <div>
              <h1 className="font-semibold mt-[10px] mb-[4px]">
                {data?.product?.price}
              </h1>
              <div className="flex mb-3 gap-2 items-center justify-center sm:justify-start">
                <Button onClick={decreaseQty}>-</Button>
                <input
                  type="number"
                  className="count w-10 text-center"
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductItems;
