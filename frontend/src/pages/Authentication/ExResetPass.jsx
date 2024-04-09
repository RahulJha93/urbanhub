// import React from "react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Loader from "@/components/Loader/Loader";
// import { useResetPasswordMutation } from "@/redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from 'axios';

const ExResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token} = useParams();
//   const [message, setMessage] = useState('');
console.log(token);

  const handleResetPassword = async (e) => {
    e.preventDefault();
      if (password !== confirmPassword) {
          toast.error('Passwords do not match');    
          return;
      }

      try {
          await axios.put(`http://localhost:8000/api/v1/password/reset/${token}`, { password,confirmPassword});
          toast.success('Password reset successful');
      } catch (error) {
        console.log(error);
          toast.error('Failed to reset password');
      }
  };
  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] ">
        <form onSubmit={handleResetPassword}>
          <CardContent className="pt-3">
            <h1 className="text-2xl font-semibold">New Password</h1>
            <div className="grid w-full items-center gap-4 mt-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  placeholder=" Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  id="name"
                  placeholder=" Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start flex-col mt-[-0.7rem]">
            <Button className="w-full">
              {/* {isLoading ? <Loader /> : "Set Password"} */}
              Set Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ExResetPass;
