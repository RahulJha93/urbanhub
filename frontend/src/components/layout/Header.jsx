import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import emptyCart from "../../assets/image/emptyCart.png";
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
import { clearUser } from "@/redux/features/userSlice"
import { toast } from "sonner"; //added toast
import Cookies from 'js-cookie'

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, []);

  const logoutHandler = async (e) => {
    await logout();
    dispatch(clearUser()); // Clear the user state
   console.log(document.cookie)
    Cookies.remove("token")
    console.log(document.cookie)
    toast.success("Logout Successfully")
    navigate("/"); // Navigate to the home page
  };

  const itemHandler = (e) => {
    navigate("/search");
  };

  return (
    <section className="pt-[3px] sm:px-[40px] px-[20px] shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="font-bold">
          UrbanHub
        </Link>
        <Search />
        <div className="flex gap-4 items-center">
          <AlertDialog>
            <div className="flex ">
              <AlertDialogTrigger asChild>
                <Link to="/cart">
                  <i className="ri-shopping-bag-line text-[2rem]"></i>
                </Link>
              </AlertDialogTrigger>
              {cartItems.length > 0 ? (
                <span className="w-5 h-5 ml-[-17px] mb-2 text-[13px] text-center bg-[#FF1493] text-white font-semibold rounded-xl">
                  {cartItems.length}
                </span>
              ) : (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogDescription>
                      <img src={emptyCart} alt="" />
                    </AlertDialogDescription>
                    <AlertDialogTitle className="text-center">No item in cart !</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center justify-center">
                    <AlertDialogAction onClick={itemHandler}>
                      <i className="ri-shopping-bag-line p-2"></i> Add Item
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </div>
          </AlertDialog>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>
                    {user?.avatar
                      ? user?.avatar?.url
                      : "https://github.com/shadcn.png"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="sm:pt-[0.375rem] pt-[0.1rem]">
                  {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link to="/me/orders">Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/me/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[red] cursor-pointer hover:text-[red] "
                  onClick={logoutHandler}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !isLoading && (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )
          )}
        </div>
      </nav>
    </section>
  );
};

export default Header;
