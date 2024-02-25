import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function App() {

  return (
    <BrowserRouter>
     <Toaster/>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  
  );
}

export default App;
