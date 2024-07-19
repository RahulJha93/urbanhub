import Loader from "@/components/Loader/Loader";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,loading,user } = useSelector((state) => state.auth);
  
  if(loading){
    return <Loader />;
  }
  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }
  if (!user ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
