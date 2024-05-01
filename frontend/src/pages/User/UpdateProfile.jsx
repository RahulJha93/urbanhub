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

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [updateProfile, { error, data, isLoading, isSuccess }] =
    useUpdateProfileMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Updated Successfully");
      navigate("/me/profile");
    }
  }, [isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const updateData = {
      email,
      name,
    };
    updateProfile(updateData);
  };
  return (
    <div>
      <Card className="mt-4">
        <form onSubmit={submitHandler}>
          <CardHeader>
            <CardTitle>Update</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder=" Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder=" Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full"> {isLoading ? <Loader /> : "Update"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdateProfile;
