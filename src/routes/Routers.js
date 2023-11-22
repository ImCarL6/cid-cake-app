import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Payment from "../pages/Payment";
import Review from "../pages/Review";
import Order from "../pages/Order";
import User from "../pages/User";
import Confirm from "../pages/Confirm";
import Cancel from "../pages/Cancel";
import ResetPassword from "../pages/ResetPassword";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/review" element={<Review />} />
      <Route path="/order" element={<Order />} />
      <Route path="/user" element={<User />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default Routers;
