import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';

// Lazy-loaded public page components
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard')); // LandingPage is rendered via Dashboard when not logged in
const FAQ = lazy(() => import('../pages/FAQ'));
const About = lazy(() => import('../pages/About'));
const Help = lazy(() => import('../pages/Help'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold text-[var(--accent)]">
        Loading...
      </div>
    }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Dashboard />} /> {/* Landing page */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
        </Route>
        {/* Catch-all for any other public routes, redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;