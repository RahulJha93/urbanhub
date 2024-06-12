import Home from "../../pages/Home/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import ProductItems from "../../pages/products/ProductItems";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";

import React, { useEffect } from "react";

import Profile from "../../pages/User/Profile";

import ProtectedRoute from "../../pages/Authentication/ProtectedRoute";
import ForgetPassword from "../../pages/Authentication/ForgetPassword";

import ExResetPass from "../../pages/Authentication/ExResetPass";
import Cart from "../../pages/Cart/Cart";
import Shipping from "../../pages/Cart/Shipping";
import ConfirmOrder from "../../pages/Cart/ConfirmOrder";
import PaymentMethod from "../../pages/Cart/PaymentMethod";
import Success from "@/pages/Order/Success";
import MyOrder from "../order/MyOrder";
import OrderDetail from "../order/OrderDetail";

const User = () => {
  return (
    <>
    
      <Route path="" element={<Home />} />
      <Route path="/product/:id" element={<ProductItems />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/demofile" element={<DemoFile />} /> */}
      <Route path="/password/forget" element={<ForgetPassword />} />
      {/* <Route path="/password/reset/:token" element={<ResetPassword />} /> */}
      <Route path="/password/reset/:token" element={<ExResetPass />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmOrder"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/paymentMethod"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />
    
    </>
  );
};

export default User;
