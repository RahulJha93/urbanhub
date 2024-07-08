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

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error?.data?.message);
  //     // console.log(error?.data?.message);

  //   }
  //   if (isSuccess) {
  //     toast.success("Avatar successfully uploaded");
  //     navigate("/me/profile");
  //   }
  // }, [error, isSuccess, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please select an avatar to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", avatar);

    console.log(avatar);
    // console.log({formData:formData}); // Check if the file is appended correctly
    const cookies = new Cookies();
    const checkToken = cookies.get("token");
    console.log(checkToken);
    try {
     const config = {
        headers: {
          Authorization: `Bearer ${checkToken} `,
          "Content-Type": "multipart/form-data",
        },
      };
      console.log({config})
      await axios.put(`http://localhost:8000/api/v1/me/uploadAvatar`,formData,config);
      toast.success("Avatar successfully uploaded");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload avatar");
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
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
