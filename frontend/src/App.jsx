import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import ShgGroups from "./pages/ShgGroups";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AdminPanel from "./pages/AdminPanel";
import ShgLogin from "./pages/ShgLogin";
import GroupProfile from "./pages/GroupProfile";
import UserProfile from "./pages/UserProfile";
import CartPage from "./pages/CartPage";
import ForgotPassword from "./pages/ForgotPassword";
import SetNewPassword from "./pages/SetNewPassword";
import PaymentPage from "./pages/PaymentPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrationform" element={<RegistrationForm />} />
        <Route path="/shggroups" element={<ShgGroups />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/shglogin" element={<ShgLogin />} />
        <Route path="/shgprofile" element={<GroupProfile />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword" element={<SetNewPassword/>} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}
export default App;