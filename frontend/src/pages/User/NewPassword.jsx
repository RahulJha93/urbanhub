import React, { useEffect, useState } from "react";
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
import { useUpdatePasswordMutation} from "@/redux/api/userApi";
import Loader from "@/components/Loader/Loader";
import { toast } from "sonner";

const NewPassword = () => {
  const [oldPassword ,setOldPassword] = useState('');
  const [newPassword ,setNewPassword] = useState('');
  const [updatePassword, { error, data, isLoading, isSuccess }] =
  useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Updated Successfully");

    }
    if(error){
      toast.error("Password Mismatch");
    }
  }, [isSuccess,error]);


  const submitHandler = (e) => {
    e.preventDefault();

    const updateData = {
      oldPassword,
      newPassword,
    };
    updatePassword(updateData);
  };
  return (
    <div>
    <Card className="mt-4">
      <form onSubmit={submitHandler}>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <Label htmlFor="name">Old Password</Label>
            <Input
              id="name"
              placeholder=" Enter Your Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="email">New Password</Label>
            <Input
              id="email"
              placeholder=" Enter Your New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
        <Button className="w-full"> {isLoading ? <Loader /> : "Update"}</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  )
}

export default NewPassword