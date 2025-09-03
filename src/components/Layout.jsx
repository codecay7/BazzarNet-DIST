import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;