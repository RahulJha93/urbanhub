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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UploadAvatar = () => {
  return (
    <div>
      <Card className="mt-4">
        <form onSubmit={"submitHandler"}>
          <CardHeader>
            <CardTitle>Upload Avatar</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex items-center gap-[30px]">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Choose Avatar</Label>
                <Input id="picture" type="file" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button> {isLoading ? <Loader /> : "Upload"}</Button> */}
            <Button className="w-full"> Upload</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UploadAvatar;
