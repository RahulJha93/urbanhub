import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader/Loader";
import { useForgetPasswordMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading, error, isSuccess }] =useForgetPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.error("Email Sent Successfully...");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    forgetPassword({ email });
  };
  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] ">
        <form onSubmit={submitHandler}>
          <CardContent className="pt-3">
            <h1 className="text-2xl font-semibold">Forgot Password</h1>
            <div className="grid w-full items-center gap-4 mt-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder=" Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start flex-col mt-[-0.7rem]">
            <Button className="w-full">
              { isLoading?<Loader/>:"Send Email"}
              {/* Send Email */}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
