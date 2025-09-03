import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const { loginAsUser, loginAsVendor } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [userErrors, setUserErrors] = useState({});

  const [vendorName, setVendorName] = useState('');
  const [vendorStore, setVendorStore] = useState('');
  const [vendorErrors, setVendorErrors] = useState({});

  const validateUserLogin = () => {
    let newErrors = {};
    if (!userName.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!userUsername.trim()) {
      newErrors.username = 'Username is required.';
    }
    setUserErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVendorLogin = () => {
    let newErrors = {};
    if (!vendorName.trim()) {
      newErrors.name = 'Vendor Name is required.';
    }
    if (!vendorStore.trim()) {
      newErrors.store = 'Store Name is required.';
    }
    setVendorErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (validateUserLogin()) {
      if (loginAsUser(userName, userUsername)) {
        navigate('/dashboard');
      }
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleVendorLogin = (e) => {
    e.preventDefault();
    if (validateVendorLogin()) {
      if (loginAsVendor(vendorName, vendorStore)) {
        navigate('/dashboard');
      }
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const inputClasses = "w-full p-3 my-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-body)] p-4">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl flex flex-col p-8 shadow-[0_8px_40px_var(--shadow)] w-full max-w-[400px] mx-4 text-center text-[var(--auth-text)]">
        <h2 className="text-3xl font-bold mb-6 text-[var(--accent)]">Welcome to BazzarNet</h2>
        
        <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-6" role="tablist">
          <button
            onClick={() => setActiveTab('user')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'user' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'user'}
            aria-controls="user-login-panel"
            id="user-login-tab"
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('vendor')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'vendor' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'vendor'}
            aria-controls="vendor-login-panel"
            id="vendor-login-tab"
          >
            Vendor
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'user' ? (
            <motion.form
              key="user"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleUserLogin}
              className="flex flex-col"
              role="tabpanel"
              id="user-login-panel"
              aria-labelledby="user-login-tab"
            >
              <label htmlFor="userName" className="sr-only">User Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name"
                className={inputClasses}
                aria-invalid={!!userErrors.name}
                aria-describedby={userErrors.name ? "userName-error" : undefined}
              />
              {userErrors.name && <p id="userName-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{userErrors.name}</p>}
              
              <label htmlFor="userUsername" className="sr-only">Username</label>
              <input
                type="text"
                id="userUsername"
                value={userUsername}
                onChange={(e) => setUserUsername(e.target.value)}
                placeholder="Username"
                className={inputClasses}
                aria-invalid={!!userErrors.username}
                aria-describedby={userErrors.username ? "userUsername-error" : undefined}
              />
              {userErrors.username && <p id="userUsername-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{userErrors.username}</p>}
              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" /> Sign in as User
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="vendor"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleVendorLogin}
              className="flex flex-col"
              role="tabpanel"
              id="vendor-login-panel"
              aria-labelledby="vendor-login-tab"
            >
              <label htmlFor="vendorName" className="sr-only">Vendor Name</label>
              <input
                type="text"
                id="vendorName"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Vendor Name"
                className={inputClasses}
                aria-invalid={!!vendorErrors.name}
                aria-describedby={vendorErrors.name ? "vendorName-error" : undefined}
              />
              {vendorErrors.name && <p id="vendorName-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{vendorErrors.name}</p>}
              
              <label htmlFor="vendorStore" className="sr-only">Store Name</label>
              <input
                type="text"
                id="vendorStore"
                value={vendorStore}
                onChange={(e) => setVendorStore(e.target.value)}
                placeholder="Store Name"
                className={inputClasses}
                aria-invalid={!!vendorErrors.store}
                aria-describedby={vendorErrors.store ? "vendorStore-error" : undefined}
              />
              {vendorErrors.store && <p id="vendorStore-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{vendorErrors.store}</p>}
              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" /> Sign in as Vendor
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <p className="text-center text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-[var(--accent)] font-semibold">Sign up here.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;