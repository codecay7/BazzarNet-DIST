import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const VendorRegistrationForm = () => {
  const { loginAsVendor } = useContext(AppContext);
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    // In a real app, this would be a registration call.
    // For now, we'll just log the vendor in.
    toast.success('Registration successful! Logging you in.');
    if (loginAsVendor(fullName, businessName)) {
      navigate('/dashboard');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleRegistration}
      className="flex flex-col text-left gap-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="text-sm font-medium">Business Name</label>
          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input type="tel" required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="text-sm font-medium">PAN</label>
          <input type="text" required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div>
          <label className="text-sm font-medium">GST (optional)</label>
          <input type="text" className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Address</label>
        <input type="text" required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      </div>
      <div>
        <label className="text-sm font-medium">Business Description</label>
        <textarea rows="2" className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"></textarea>
      </div>
      <div>
        <label className="text-sm font-medium">Category</label>
        <select required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
          <option>Groceries</option>
          <option>Bakery</option>
          <option>Butcher</option>
          <option>Cafe</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input type="password" required className="w-full p-2 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      </div>
      <button type="submit" className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4">
        Register Business
      </button>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-[var(--accent)] font-semibold">Login here.</Link>
      </p>
    </motion.form>
  );
};

export default VendorRegistrationForm;