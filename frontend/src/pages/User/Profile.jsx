import UserLayout from "@/components/layout/UserLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Usercard from "@/components/card/Usercard";
import UpdateProfile from "./UpdateProfile";
// import Loader from "@/components/Loader/Loader";

const Profile = () => {
 

  return (
    <div>
      <UserLayout>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Profile">Profile</TabsTrigger>
            <TabsTrigger value="Update_Profile">Update Profile</TabsTrigger>
            <TabsTrigger value="Update_Avatar">Update Avatar</TabsTrigger>
            <TabsTrigger value="Update_Password">Update Password</TabsTrigger>
          </TabsList>
          <TabsContent value="Update_Profile" className="">
           <UpdateProfile/>
          </TabsContent>
        </Tabs>
      </UserLayout>
    </div>
  );
};

export default Profile;
