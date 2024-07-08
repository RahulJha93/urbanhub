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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
// import { Navigate } from "react-router-dom";
// import { HiOutlineShoppingBag } from "react-icons/hi2";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    logout();
    navigate(0);
  };

  // const itemHandler = (e) => {
  //   navigate('/');
  // }

  return (
    <section className="pt-[3px] sm:px-[40px] px-[20px] shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="font-bold">
          UrbanHub
        </Link>
        <Search/>
        <div className="flex gap-4 items-center">
          <Link to="/cart">
          {/* <AlertDialog> */}
            <div className="flex ">
            {/* <AlertDialogTrigger> */}
              <i className="ri-shopping-bag-line text-[2rem]"></i>
              {/* </AlertDialogTrigger> */}
              {cartItems.length > 0 ? (
                <span className="w-5 h-5 ml-[-17px] mb-2 text-[13px] text-center bg-[#FF1493] text-white font-semibold rounded-xl">
                  {cartItems.length}
                </span>
              ) : ( ""
      
                  // <AlertDialogContent>
                  //   <AlertDialogHeader>
                  //     <AlertDialogTitle>
                  //       No item in cart
                  //     </AlertDialogTitle>
                  //   </AlertDialogHeader>
                  //   <AlertDialogFooter>
                  //     <AlertDialogCancel>Cancel</AlertDialogCancel>
                  //     <Button onClick={itemHandler}>Continue</Button>
                  //   </AlertDialogFooter>
                  // </AlertDialogContent>
              )}
            </div>
            {/* </AlertDialog> */}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.avatar ? user?.avatar?.url : "no image"} />
                  <AvatarFallback>
                    {user?.avatar ? user?.avatar?.url : "no image"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="sm:pt-[0.375rem] pt-[0.1rem]">
                  {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/me/orders">Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/me/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[red]"
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
