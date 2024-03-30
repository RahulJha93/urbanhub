import React from 'react'
import SideBar from '@/pages/User/SideBar';

const UserLayout = ({children}) => {
  return (
    <>
    <h1 className='mt-4 font-medium text-center'>Account Settings</h1>
    <div className='mt-4 flex justify-evenly'>
        <SideBar/>
    <div>{children}</div>
    </div>
    </>
  )
}

export default UserLayout;