import React, { useContext, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';

// Lazy-loaded page components
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminUserManagement = lazy(() => import('./pages/AdminUserManagement'));
const AdminProductManagement = lazy(() => import('./pages/AdminProductManagement'));
const AdminOrderManagement = lazy(() => import('./pages/AdminOrderManagement'));
const Products = lazy(() => import('./pages/Products'));
const Stores = lazy(() => import('./pages/Stores'));
const StorePage = lazy(() => import('./pages/StorePage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const ManageProducts = lazy(() => import('./pages/ManageProducts'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const CustomerOrderDetails = lazy(() => import('./pages/CustomerOrderDetails'));
const Payments = lazy(() => import('./pages/Payments'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Help = lazy(() => import('./pages/Help'));

const App = () => {
  const { theme, isLoggedIn, isVendor, isAdmin } = useContext(AppContext);

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen text-2xl font-semibold text-[var(--accent)]">
          Loading...
        </div>
      }>
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
                  <Route path="/help" element={<Help />} /> {/* Admin can access help */}
                  {/* Redirect any other logged-in routes to admin dashboard for admin */}
                  <Route path="*" element={<Navigate to="/admin-dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<Help />} /> {/* Customer/Vendor can access help */}

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
                <Route path="/help" element={<Help />} /> {/* Public can also access help */}
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;