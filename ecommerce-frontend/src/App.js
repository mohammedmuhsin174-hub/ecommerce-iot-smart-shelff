// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/Navbar';
import ChatBot from './Components/chatbot'; // Import ChatBot component
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Phones from './pages/Phones';
import Laptops from './pages/Laptops';
import Accessories from './pages/Accessories';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/phones" element={<Phones />} />
          <Route path="/category/laptops" element={<Laptops />} />
          <Route path="/category/accessories" element={<Accessories />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <ChatBot /> {/* Add ChatBot component */}
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </Router>
  );
}

export default App;