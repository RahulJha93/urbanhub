import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadAvatarMutation } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import Cookies from 'universal-cookie';


const UploadAvatar = () => {
  const [avatar, setAvatar] = useState();
  const { user } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please select an avatar to upload.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", avatar);


  };

  const onChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <Card className="mt-4">
        <form onSubmit={submitHandler}>
          <CardHeader>
            <CardTitle>Upload Avatar</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-[30px]">
            <Avatar>
              <AvatarImage src={avatarPreview} alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Choose Avatar</Label>
              <Input
                id="picture"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={onChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">{isLoading ? <Loader /> : "Upload"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UploadAvatar;
