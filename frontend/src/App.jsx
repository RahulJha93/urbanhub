import React from "react";
import User from "./components/routes/User";
import Admin from "./components/routes/Admin";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Header from "./components/layout/Header";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const userRoutes = User();
  const adminRoutes = Admin();
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
        {userRoutes}
        {adminRoutes}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
