import React, { useState, useEffect } from "react";
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
import { useRegisterMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import Loader from "@/components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [register, { error, data, isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);


  useEffect(() => {
    if(isAuthenticated){
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  
  }, [error,isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };
    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] ">
        <form onSubmit={submitHandler}>
          <CardContent className="pt-3">
            <h1 className="text-2xl font-semibold">Register</h1>
            <div className="grid w-full items-center gap-4 mt-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder=" Enter Your Email"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter Your Password"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start flex-col mt-[-0.7rem]">
            <Button className="w-full">
              {isLoading ? <Loader /> : "Register"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
