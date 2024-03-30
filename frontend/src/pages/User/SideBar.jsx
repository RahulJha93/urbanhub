import React from 'react'
import userLogo from "../../assets/image/user_logo.png";
import { useSelector } from "react-redux";
import { authApi } from '@/redux/api/authApi';


const SideBar = () => {
    const {user} = useSelector((state)=>state.auth);
  return (
    <div>
        {/* {user?.avatar ? user?.avatar?.url : "no image"}  */}
    <img src={userLogo} alt="" className='w-[100px]' /> 
    <div>
    <h1 className='font-semibold mb-1'>Full Name</h1>
    <p className="text-gray-500 font-normal mb-2">{user?.name}</p>

    <h1 className='font-semibold mb-1'>Email Address</h1>
    <p className="text-gray-500 font-normal mb-2">{user?.email}</p>

    <h1 className='font-semibold mb-1'>Joined On</h1>
    <p className="text-gray-500 font-normal">{(user?.createdAt)}</p>
</div>

    </div>
  )
}

export default SideBar