import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stores from './pages/Stores';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import VendorDashboard from './pages/VendorDashboard';
import Orders from './pages/Orders';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Profile from './pages/Profile';

const App = () => {
  const { theme, isLoggedIn, isVendor } = useContext(AppContext);

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      <Routes>
        {isLoggedIn ? (
          // --- Logged In Routes ---
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {isVendor ? (
              <>
                <Route path="/vendor" element={<VendorDashboard />} />
                <Route path="/stores" element={<Navigate to="/dashboard" />} />
                <Route path="/products" element={<Navigate to="/dashboard" />} />
                <Route path="/products/:id" element={<Navigate to="/dashboard" />} />
                <Route path="/cart" element={<Navigate to="/dashboard" />} />
                <Route path="/checkout" element={<Navigate to="/dashboard" />} />
                <Route path="/confirmation" element={<Navigate to="/dashboard" />} />
                <Route path="/wishlist" element={<Navigate to="/dashboard" />} />
                <Route path="/faq" element={<Navigate to="/dashboard" />} />
                <Route path="/about" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/stores" element={<Stores />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/vendor" element={<Navigate to="/dashboard" />} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          // --- Logged Out Routes ---
          <>
            <Route path="/login" element={<Login />} />
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;