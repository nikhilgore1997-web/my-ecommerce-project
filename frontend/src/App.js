import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

// Pages
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

// Admin Pages
import AdminPageWrapper from './pages/AdminPageWrapper'; // handles admin login/add-product

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Pages */}
        <Route path="/admin/*" element={<AdminPageWrapper />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
