import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import PublicRoutes from './routes/PublicRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import VendorRoutes from './routes/VendorRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  const { theme, isLoggedIn, isVendor, isAdmin } = useContext(AppContext);

  return (
    <div className={`font-poppins min-h-screen flex flex-col transition-all duration-300 ${theme === 'dark' ? 'bg-[#07080a] text-[#E0E0E0]' : 'bg-[#E0E0E0] text-[#333]'}`}>
      {isLoggedIn ? (
        isAdmin ? (
          <AdminRoutes />
        ) : isVendor ? (
          <VendorRoutes />
        ) : (
          <CustomerRoutes />
        )
      ) : (
        <PublicRoutes />
      )}
    </div>
  );
};

export default App;