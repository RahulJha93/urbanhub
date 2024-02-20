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


const Header = () => {
  return (
    <section className="px-[40px] pt-[3px] ">
      <nav className="flex justify-between items-center">
        <a href="" className="font-bold">UrbanHub</a>
        {/* <div className="flex items-center">
        <i class="ri-search-line"></i> */}
        <Input type="search"  placeholder="Search . . ." className="w-96" />
        {/* </div> */}
        <div className="flex gap-4 items-center">
        <i class="ri-shopping-bag-line text-[2rem]"></i>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="src/assets/image/default_avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Rahul (User)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Order</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-[red]">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Login</Button>
        </div>
      </nav>
    </section>
  );
};

export default Header;
