import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement'; // Import new AdminUserManagement
import AdminProductManagement from './pages/AdminProductManagement'; // Import new AdminProductManagement
import AdminOrderManagement from './pages/AdminOrderManagement'; // Import new AdminOrderManagement
import Products from './pages/Products';
import Stores from './pages/Stores';
import StorePage from './pages/StorePage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import ManageProducts from './pages/ManageProducts';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import Payments from './pages/Payments';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Profile from './pages/Profile';

const App = () => {
  const { theme, isLoggedIn, isVendor, isAdmin } = useContext(AppContext);

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      <Routes>
        {isLoggedIn ? (
          // --- Logged In Routes ---
          <Route element={<Layout />}>
            {isAdmin ? (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-users" element={<AdminUserManagement />} />
                <Route path="/admin-products" element={<AdminProductManagement />} />
                <Route path="/admin-orders" element={<AdminOrderManagement />} />
                {/* Redirect any other logged-in routes to admin dashboard for admin */}
                <Route path="*" element={<Navigate to="/admin-dashboard" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />

                {isVendor ? (
                  <>
                    <Route path="/manage-products" element={<ManageProducts />} />
                    <Route path="/orders/:orderId" element={<OrderDetails />} />
                    <Route path="/payments" element={<Payments />} />
                    {/* Redirect customer routes for vendors */}
                    <Route path="/products" element={<Navigate to="/dashboard" />} />
                    <Route path="/products/:id" element={<Navigate to="/dashboard" />} />
                    <Route path="/stores" element={<Navigate to="/dashboard" />} />
                    <Route path="/stores/:storeId" element={<Navigate to="/dashboard" />} />
                    <Route path="/cart" element={<Navigate to="/dashboard" />} />
                    <Route path="/checkout" element={<Navigate to="/dashboard" />} />
                    <Route path="/confirmation" element={<Navigate to="/dashboard" />} />
                    <Route path="/wishlist" element={<Navigate to="/dashboard" />} />
                    <Route path="/faq" element={<Navigate to="/dashboard" />} />
                    <Route path="/about" element={<Navigate to="/dashboard" />} />
                    <Route path="/my-orders/:orderId" element={<Navigate to="/dashboard" />} />
                    <Route path="/settings" element={<Navigate to="/dashboard" />} />
                  </>
                ) : (
                  <>
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="/stores/:storeId" element={<StorePage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/confirmation" element={<OrderConfirmation />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/my-orders/:orderId" element={<CustomerOrderDetails />} />
                    {/* Redirect vendor routes for customers */}
                    <Route path="/manage-products" element={<Navigate to="/dashboard" />} />
                    <Route path="/orders/:orderId" element={<Navigate to="/dashboard" />} />
                    <Route path="/payments" element={<Navigate to="/dashboard" />} />
                    <Route path="/settings" element={<Navigate to="/dashboard" />} />
                  </>
                )}
                
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Route>
        ) : (
          // --- Logged Out Routes ---
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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