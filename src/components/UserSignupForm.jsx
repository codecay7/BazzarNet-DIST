import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const UserSignupForm = () => {
  const { loginAsUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, this would be a registration call.
    // For now, we'll just log the user in.
    toast.success('Registration successful! Logging you in.');
    if (loginAsUser(name, username)) {
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
      onSubmit={handleSignup}
      className="flex flex-col text-left"
    >
      <label className="mb-1 text-sm font-medium">Full Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., John Doe" required className="w-full p-3 mb-4 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      
      <label className="mb-1 text-sm font-medium">Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g., johndoe" required className="w-full p-3 mb-4 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      
      <label className="mb-1 text-sm font-medium">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full p-3 mb-4 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      
      <button type="submit" className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4">
        <FontAwesomeIcon icon={faUserPlus} /> Sign Up
      </button>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-[var(--accent)] font-semibold">Login here.</Link>
      </p>
    </motion.form>
  );
};

export default UserSignupForm;