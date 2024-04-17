import MetaData from "@/components/layout/MetaData";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartItem, removeItem } from "@/redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;
    setItemToCart(item, newQty);
  };

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      qty: newQty,
    };
    dispatch(setCartItem(cartItem));
    // toast.success("Product added to cart");
  };

  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };

  const checkoutHandler = (e) => {
    if(cartItems.length > 0){
    navigate("/shipping");
    }
    else{
      toast.error("Please add items in cart")
    }
  };
  useEffect(() => {
    if (cartItems.length == 0) {
      <AlertDialog>
        <AlertDialogTrigger >
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>;
    }
  }, [cartItems]);

  return (
    <section className="mt-8 px-4 sm:px-8 flex flex-col sm:flex-row justify-between gap-8">
      <MetaData title={"Shopping Bag"} />
      <div className="w-full sm:w-1/2 rounded-xl bg-white border-2 px-4 pt-4 pb-2">
        <h1 className="font-semibold text-2xl mb-4">Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-t-2 py-4"
          >
            <div className="flex gap-4 items-center">
              <img src={item.image} alt="" className="w-16 h-16 object-cover" />
              <div className="">
                <h1 className="font-semibold text-sm">{item.name}</h1>
                <Button
                  onClick={() => {
                    removeCartItem(item?.product);
                  }}
                >
                  <AiOutlineDelete className="text-xl mr-2" />
                  Remove item
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Button
                  className="text-gray-500"
                  onClick={() => decreaseQty(item, item.qty)}
                >
                  -
                </Button>
                <input
                  type="number"
                  className="count w-10 text-center"
                  value={item?.qty}
                  readOnly
                />
                <Button
                  className="text-gray-500"
                  onClick={() => increaseQty(item, item.qty)}
                >
                  +
                </Button>
              </div>
              <h1 className="font-semibold">${item.price}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full sm:w-1/4 rounded-xl bg-white border-2 p-4">
        <h1 className="font-semibold">Order Summary</h1>
        <div className="text-gray-500 flex justify-between mt-3">
          <p>Subtotal :</p>
          <p>{cartItems?.reduce((acc, item) => acc + item?.qty, 0)} (Units)</p>
        </div>
        <div className="text-gray-500 flex justify-between mt-4 border-b-2 pb-2">
          <p>Est Total :</p>
          <p>
            $
            {cartItems
              ?.reduce((acc, item) => acc + item?.qty * item?.price, 0)
              .toFixed(2)}{" "}
          </p>
        </div>
        <Button className="mt-4 w-full" onClick={checkoutHandler}>
          Check Out
        </Button>
      </div>
    </section>
  );
};

export default Cart;
