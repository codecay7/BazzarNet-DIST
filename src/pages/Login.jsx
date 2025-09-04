import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const { loginAsUser, loginAsVendor, loginAsAdmin } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  // User Login State
  const [userName, setUserName] = useState(''); // Not used in backend login, but kept for form consistency
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userErrors, setUserErrors] = useState({});

  // Vendor Login State
  const [vendorName, setVendorName] = useState(''); // Not used in backend login, but kept for form consistency
  const [vendorStore, setVendorStore] = useState(''); // Not used in backend login, but kept for form consistency
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorErrors, setVendorErrors] = useState({});

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState(''); // Not used in backend login, but kept for form consistency
  const [adminEmail, setAdminEmail] = useState(''); // Using email for admin login
  const [adminPassword, setAdminPassword] = useState('');
  const [adminErrors, setAdminErrors] = useState({});

  const validateUserLogin = () => {
    let newErrors = {};
    if (!userName.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!userEmail.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!userPassword) {
      newErrors.password = 'Password is required.';
    } else if (userPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
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
    if (!vendorEmail.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(vendorEmail)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!vendorPassword) {
      newErrors.password = 'Password is required.';
    } else if (vendorPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    setVendorErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminLogin = () => {
    let newErrors = {};
    if (!adminEmail.trim()) { // Using adminEmail for validation
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(adminEmail)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!adminPassword) {
      newErrors.password = 'Password is required.';
    }
    setAdminErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (validateUserLogin()) {
      if (await loginAsUser(userEmail, userPassword)) { // Pass email and password
        navigate('/dashboard');
      }
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleVendorLogin = async (e) => {
    e.preventDefault();
    if (validateVendorLogin()) {
      if (await loginAsVendor(vendorEmail, vendorPassword)) { // Pass email and password
        navigate('/dashboard');
      }
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (validateAdminLogin()) {
      if (await loginAsAdmin(adminEmail, adminPassword)) { // Pass email and password
        navigate('/admin-dashboard');
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
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'user' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'user'}
            aria-controls="user-login-panel"
            id="user-login-tab"
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('vendor')}
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'vendor' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'vendor'}
            aria-controls="vendor-login-panel"
            id="vendor-login-tab"
          >
            Vendor
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`w-1/3 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'admin' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
            role="tab"
            aria-selected={activeTab === 'admin'}
            aria-controls="admin-login-panel"
            id="admin-login-tab"
          >
            Admin
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'user' && (
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
              
              <label htmlFor="userEmail" className="sr-only">Email</label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
                className={inputClasses}
                aria-invalid={!!userErrors.email}
                aria-describedby={userErrors.email ? "userEmail-error" : undefined}
              />
              {userErrors.email && <p id="userEmail-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{userErrors.email}</p>}

              <label htmlFor="userPassword" className="sr-only">Password</label>
              <input
                type="password"
                id="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className={inputClasses}
                aria-invalid={!!userErrors.password}
                aria-describedby={userErrors.password ? "userPassword-error" : undefined}
              />
              {userErrors.password && <p id="userPassword-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{userErrors.password}</p>}

              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" /> Sign in as User
              </button>
            </motion.form>
          )}
          {activeTab === 'vendor' && (
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

              <label htmlFor="vendorEmail" className="sr-only">Email</label>
              <input
                type="email"
                id="vendorEmail"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                placeholder="Email"
                className={inputClasses}
                aria-invalid={!!vendorErrors.email}
                aria-describedby={vendorErrors.email ? "vendorEmail-error" : undefined}
              />
              {vendorErrors.email && <p id="vendorEmail-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{vendorErrors.email}</p>}

              <label htmlFor="vendorPassword" className="sr-only">Password</label>
              <input
                type="password"
                id="vendorPassword"
                value={vendorPassword}
                onChange={(e) => setVendorPassword(e.target.value)}
                placeholder="Password"
                className={inputClasses}
                aria-invalid={!!vendorErrors.password}
                aria-describedby={vendorErrors.password ? "vendorPassword-error" : undefined}
              />
              {vendorErrors.password && <p id="vendorPassword-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{vendorErrors.password}</p>}

              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" /> Sign in as Vendor
              </button>
            </motion.form>
          )}
          {activeTab === 'admin' && (
            <motion.form
              key="admin"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleAdminLogin}
              className="flex flex-col"
              role="tabpanel"
              id="admin-login-panel"
              aria-labelledby="admin-login-tab"
            >
              <label htmlFor="adminEmail" className="sr-only">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Email"
                className={inputClasses}
                aria-invalid={!!adminErrors.email}
                aria-describedby={adminErrors.email ? "adminEmail-error" : undefined}
              />
              {adminErrors.email && <p id="adminEmail-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{adminErrors.email}</p>}

              <label htmlFor="adminPassword" className="sr-only">Admin Password</label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Password"
                className={inputClasses}
                aria-invalid={!!adminErrors.password}
                aria-describedby={adminErrors.password ? "adminPassword-error" : undefined}
              />
              {adminErrors.password && <p id="adminPassword-error" className="text-red-400 text-xs text-left -mt-1 mb-2">{adminErrors.password}</p>}

              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" /> Sign in as Admin
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <p className="text-center text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-[var(--accent)] font-semibold">Sign up here.</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link to="/forgot-password" className="text-[var(--accent)] font-semibold">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;