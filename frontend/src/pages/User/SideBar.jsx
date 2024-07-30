import React from "react";
import userLogo from "../../assets/image/user_logo.png";
import { useSelector } from "react-redux";
import { authApi } from "@/redux/api/authApi";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const date = new Date(user?.createdAt)
const year = date.getUTCFullYear();
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(date.getUTCDate()).padStart(2, '0');

// Format the date
const formattedDate = `${year}-${month}-${day}`;
  return (
    //     <div>
    //         {/* {user?.avatar ? user?.avatar?.url : "no image"}  */}
    //     <img src={userLogo} alt="" className='w-[100px]' />
    //     <div>
    //     <h1 className='font-semibold mb-1'>Full Name</h1>
    //     <p className="text-gray-500 font-normal mb-2">{user?.name}</p>

    //     <h1 className='font-semibold mb-1'>Email Address</h1>
    //     <p className="text-gray-500 font-normal mb-2">{user?.email}</p>

    //     <h1 className='font-semibold mb-1'>Joined On</h1>
    //     <p className="text-gray-500 font-normal">{(user?.createdAt)}</p>
    // </div>

    //     </div>
    <div className="items-center">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="w-[300px]">
          <div className="flex items-center gap-4">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={user?.avatar
                  ? user?.avatar?.url
                  : "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>
                {user?.avatar
                  ? user?.avatar?.url
                  : "https://github.com/shadcn.png"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold mb-1">Full Name</h1>
              <p className="text-gray-500 font-normal mb-2">{user?.name}</p>

              <h1 className="font-semibold mb-1">Email Address</h1>
              <p className="text-gray-500 font-normal mb-2">{user?.email}</p>

              <h1 className="font-semibold mb-1">Joined On</h1>
              <p className="text-gray-500 font-normal">{formattedDate}</p>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
          <Button className="w-full">
            {" "}
            {isLoading ? <Loader /> : "Update"}
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default SideBar;
