import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const { loginAsUser, loginAsVendor } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');

  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorStore, setVendorStore] = useState('');

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (loginAsUser(userName, userUsername)) {
      navigate('/dashboard');
    }
  };

  const handleVendorLogin = (e) => {
    e.preventDefault();
    if (loginAsVendor(vendorName, vendorStore)) {
      navigate('/dashboard');
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-body)] p-4">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl flex flex-col p-8 shadow-[0_8px_40px_var(--shadow)] w-full max-w-[400px] mx-4 text-center text-[var(--auth-text)]">
        <h2 className="text-3xl font-bold mb-6 text-[var(--accent)]">Welcome to BazzarNet</h2>
        
        <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('user')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'user' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('vendor')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'vendor' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
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
            >
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 my-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="User Name"
              />
              <input
                type="text"
                value={userUsername}
                onChange={(e) => setUserUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 my-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="User Username"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Sign in as User
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
            >
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Vendor Name"
                className="w-full p-3 my-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Vendor Name"
              />
              <input
                type="text"
                value={vendorStore}
                onChange={(e) => setVendorStore(e.target.value)}
                placeholder="Store Name"
                className="w-full p-3 my-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Store Name"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Sign in as Vendor
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