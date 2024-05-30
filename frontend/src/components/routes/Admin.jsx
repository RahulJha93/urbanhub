import Dashboard from '@/admin/Dashboard';
import React from 'react'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import ProtectedRoute from "../../pages/Authentication/ProtectedRoute";

const Admin = () => {
  return (
    <>
   
    <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
           <Dashboard/>
          </ProtectedRoute>
        }
      />
    
    </>
  )
}

export default Admin;