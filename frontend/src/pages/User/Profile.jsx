import UserLayout from "@/components/layout/UserLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Usercard from "@/components/card/Usercard";
import UpdateProfile from "./UpdateProfile";
import UploadAvatar from "./UploadAvatar";
import NewPassword from "./NewPassword";
import SideBar from "./SideBar";
// import Loader from "@/components/Loader/Loader";

const Profile = () => {
 

  return (
    <>
     <h1 className='mt-4 font-medium text-center'>Account Settings</h1>
    <div className="flex justify-center mt-12">
        <Tabs defaultValue="Profile" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Profile">Profile</TabsTrigger>
            <TabsTrigger value="Update_Profile">Update Profile</TabsTrigger>
            <TabsTrigger value="Update_Avatar">Update Avatar</TabsTrigger>
            <TabsTrigger value="Update_Password">Update Password</TabsTrigger>
          </TabsList>
          <TabsContent value="Profile" className="flex justify-center">
           <SideBar/>
          </TabsContent>
          <TabsContent value="Update_Profile" className="">
           <UpdateProfile/>
          </TabsContent>
          <TabsContent value="Update_Avatar" className="">
           <UploadAvatar/>
          </TabsContent>
          <TabsContent value="Update_Password" className="">
           <NewPassword/>
          </TabsContent>
        </Tabs>
    </div>
    </>
  );
};

export default Profile;
