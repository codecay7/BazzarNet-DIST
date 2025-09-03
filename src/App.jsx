import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Stores from './pages/Stores';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
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
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {isVendor ? (
              <>
                <Route path="/vendor" element={<VendorDashboard />} />
                {/* Redirect non-vendor pages to home */}
                <Route path="/stores" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/cart" element={<Navigate to="/" />} />
                <Route path="/checkout" element={<Navigate to="/" />} />
                <Route path="/wishlist" element={<Navigate to="/" />} />
                <Route path="/faq" element={<Navigate to="/" />} />
                <Route path="/about" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/stores" element={<Stores />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                 {/* Redirect vendor pages to home */}
                <Route path="/vendor" element={<Navigate to="/" />} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
      <CustomStyles />
    </div>
  );
};

// Custom CSS styles component
const CustomStyles = () => (
  <style>{`
    :root {
      --bg: #E0E0E0;
      --bg-body: #E0E0E0;
      --card-bg: rgba(245, 245, 245, 0.7);
      --shadow: rgba(209, 209, 209, 0.5);
      --accent: #00D1B2;
      --accent-dark: #00A895;
      --text: #333;
      --blur: blur(5px);
      --tooltip-bg: #333;
      --tooltip-text: #fff;
      --auth-text: #1A1A1A;
      --table-border: rgba(0, 0, 0, 0.2);
    }

    [data-theme="dark"] {
      --bg: #0F111A;
      --bg-body: #0F111A;
      --card-bg: rgba(23, 28, 40, 0.6);
      --shadow: rgba(0, 0, 0, 0.6);
      --accent: #22D3EE;
      --accent-dark: #0EA5E9;
      --text: #F1F5F9;
      --tooltip-bg: #1E293B;
      --tooltip-text: #E2E8F0;
      --auth-text: #F8FAFC;
      --table-border: rgba(255, 255, 255, 0.1);
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 25px;
      height: 25px;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 2px 10px var(--shadow);
      transition: transform 0.2s ease, background 0.3s ease;
    }

    input[type="range"]::-webkit-slider-thumb:hover,
    input[type="range"]::-webkit-slider-thumb:active {
      transform: scale(1.2);
      background: var(--accent-dark);
    }

    @media (max-width: 768px) {
      h1 { font-size: 2.2rem; }
      h2 { font-size: 1.8rem; }
      h3 { font-size: 1.4rem; }
      p, label, span { font-size: 0.9rem; }
      .bg-[var(--card-bg)] { padding: 20px; }
      .w-10 { width: 35px; height: 35px; }
      .text-xl { font-size: 1.2rem; }
      .text-2xl { font-size: 1.6rem; }
      .py-2 { padding-top: 8px; padding-bottom: 8px; }
      .px-6 { padding-left: 20px; padding-right: 20px; }
      .text-lg { font-size: 0.9rem; }
      .w-64 { width: 200px; }
      .-left-64 { left: -200px; }
    }
  `}</style>
);

export default App;