import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ProductItems from "./pages/products/ProductItems";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import DemoFile from "./DemoFile";
import React, { useEffect } from "react";
import axios from "axios";
import Profile from "./pages/User/Profile";
import UpdateProfile from "./pages/User/UpdateProfile";
import ProtectedRoute from "./pages/Authentication/ProtectedRoute";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ExResetPass from "./pages/Authentication/ExResetPass";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import PaymentMethod from "./pages/Cart/PaymentMethod";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/demofile" element={<DemoFile />} />
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
         </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
