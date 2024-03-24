import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ProductItems from "./pages/products/ProductItems";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import DemoFile from "./DemoFile"
import React, { useEffect } from "react";
import axios from 'axios';


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
        <Route path="/demofile" element={<DemoFile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
