import React from "react";
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
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <section className="pt-[3px] sm:px-[40px] px-[20px] shadow">
      <nav className="flex justify-between items-center">
        <Link to="/" className="font-bold">UrbanHub</Link>
        <Input type="search"  placeholder="Search . . ." className="w-96  hidden md:block lg:block " />
        <div className="flex gap-4 items-center">
        <i class="ri-shopping-bag-line text-[2rem]"></i>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="src/assets/image/default_avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel className="sm:pt-[0.375rem] pt-[0.1rem]">Rahul (User)</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Order</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-[red]">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/login"><Button>Login</Button></Link>
        </div>
      </nav>
    </section>
  );
};

export default Header;
