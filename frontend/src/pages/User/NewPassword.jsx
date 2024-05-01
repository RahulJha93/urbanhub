import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewPassword = () => {
  return (
    <div>
    <Card className="mt-4">
      <form onSubmit={"submitHandler"}>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <Label htmlFor="name">Old Password</Label>
            <Input
              id="name"
              placeholder=" Enter Your Name"
            //   onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="email">New Password</Label>
            <Input
              id="email"
              placeholder=" Enter Your Email"
            //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Change</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  )
}

export default NewPassword