import React, { useState,useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import Loader from "@/components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, data, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("Email:",email);
    // console.log("Password:",password);

    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] ">
        <form onSubmit={submitHandler}>
          <CardContent className="pt-3">
            <h1 className="text-2xl font-semibold">Login</h1>
            <div className="grid w-full items-center gap-4 mt-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder=" Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to="/forget">
                <p className="text-[0.8rem] font-medium ">Forget Password?</p>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start flex-col mt-[-0.7rem]">
            <Button className="w-full">
             { isLoading?<Loader/>:"Login"}
            </Button>
            <Link to="/register">
              <p className="text-[0.8rem] font-medium mt-2">New user ?</p>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
