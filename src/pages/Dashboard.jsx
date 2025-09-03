import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CustomerDashboard from '../components/CustomerDashboard';
import VendorDashboard from '../components/VendorDashboard';
import LandingPage from '../components/LandingPage'; // We will create this next

const Dashboard = () => {
  const { isLoggedIn, isVendor } = useContext(AppContext);

  if (isLoggedIn) {
    return isVendor ? <VendorDashboard /> : <CustomerDashboard />;
  }
  
  return <LandingPage />;
};

export default Dashboard;