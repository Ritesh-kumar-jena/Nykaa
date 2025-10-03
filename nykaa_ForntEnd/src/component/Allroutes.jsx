import React from "react";
import {Route , Routes} from  'react-router-dom'
import Home from "../pages/Home";
import AddProducts from "../pages/AddProducts";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFoundPage from "../pages/NotFoundPage";
import Wishlist from "../pages/Wishlist";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Billing from "../pages/Billing";
import ContactUs from "../pages/ContactUs.jsx";
import TermsAndConditions from "../pages/TermsAndConditions.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";




function Allroutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/addProduct" element={<AddProducts/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
         <Route path="/product/:id" element={<Product/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/orders" element={<Orders/>}/>
         <Route path="/billing" element={<Billing/>}/>
         <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
         <Route path="/t&c" element={<TermsAndConditions/>}/>
         <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}


export default Allroutes;