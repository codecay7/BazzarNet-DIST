import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { loginAsUser, loginAsVendor } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorStore, setVendorStore] = useState('');

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-[1003] bg-[var(--accent)] bg-opacity-30 transition-opacity duration-300">
      <div className="bg-[black] backdrop-blur-[5px] border border-white/30 rounded-2xl flex flex-col p-8 shadow-[0_8px_40px_var(--shadow)] w-full max-w-[400px] mx-4 text-center text-[var(--auth-text)]">
        <h2 className="text-3xl font-bold mb-5 text-[var(--accent)]">Welcome to BazzarNet</h2>
        <h3 className="text-xl font-semibold mb-3">Login as User</h3>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="User Name"
        />
        <input
          type="text"
          value={userUsername}
          onChange={(e) => setUserUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="User Username"
        />
        <button
          className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center w-fit gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mx-auto mb-4"
          onClick={() => loginAsUser(userName, userUsername)}
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Sign in as User
        </button>
        <h3 className="text-xl font-semibold mb-3">Login as Vendor</h3>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          placeholder="Vendor Name"
          className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Vendor Name"
        />
        <input
          type="text"
          value={vendorStore}
          onChange={(e) => setVendorStore(e.target.value)}
          placeholder="Store Name"
          className="w-full p-2 my-2 text-white border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          aria-label="Store Name"
        />
        <button
          className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center w-fit gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mx-auto"
          onClick={() => loginAsVendor(vendorName, vendorStore)}
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Sign in as Vendor
        </button>
      </div>
    </div>
  );
};

export default Login;