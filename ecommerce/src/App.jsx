import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const n = useNavigate();
  useEffect(() => {
    if (user === null) n("/login", { replace: true });
    else n("/", { replace: true });
  }, [user]);
  return (
    <div className="overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default App;
