import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./pages/Navbar";
import Layout from "./Layout";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Shop from "./pages/Shop";
import ManageProducts from "./admin/ManageProducts";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetail from "./pages/ProductDetail";
import ManageCategory from "./admin/ManageCategory";
import AddToCart from "./pages/AddToCart";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/add-to-cart" element={<AddToCart />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/manage-products" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageProducts />
            </ProtectedRoute>
          } />

          <Route path="/manage-category" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageCategory />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;