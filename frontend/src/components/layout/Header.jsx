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
import {useLazyLogoutQuery} from "@/redux/api/authApi"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated, setUser } from "@/redux/features/userSlice";

const Header = () => {
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user} = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const logoutHandler= (e)=>{
    logout();
    // setUser(null);
    // setIsAuthenticated(false);
    navigate("/", { replace: true });
  }

  return (
    <section className="pt-[3px] sm:px-[40px] px-[20px] shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="font-bold">
          UrbanHub
        </Link>
        <Input
          type="search"
          placeholder="Search . . ."
          className="w-96  hidden md:block lg:block "
        />
        <div className="flex gap-4 items-center">
          <i className="ri-shopping-bag-line text-[2rem]"></i>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="src/assets/image/default_avatar.jpg" />
                  <AvatarFallback>{user?.avatar ? user?.avatar?.url : "no image"} </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="sm:pt-[0.375rem] pt-[0.1rem]">
                 { user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Order</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-[red]" onClick={logoutHandler}>
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
