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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would be a registration call.
      // For now, we'll just log the user in.
      toast.success('Registration successful! Logging you in.');
      if (loginAsUser(name, username)) {
        navigate('/dashboard');
      }
    } else {
      toast.error('Please correct the errors in the form.');
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
      aria-label="Customer Signup Form"
    >
      <label htmlFor="fullName" className="mb-1 text-sm font-medium">Full Name</label>
      <input 
        type="text" 
        id="fullName"
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="e.g., John Doe" 
        className="w-full p-3 mb-1 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "fullName-error" : undefined}
      />
      {errors.name && <p id="fullName-error" className="text-red-400 text-xs mb-3">{errors.name}</p>}
      
      <label htmlFor="username" className="mb-1 text-sm font-medium">Username</label>
      <input 
        type="text" 
        id="username"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="e.g., johndoe" 
        className="w-full p-3 mb-1 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
        aria-invalid={!!errors.username}
        aria-describedby={errors.username ? "username-error" : undefined}
      />
      {errors.username && <p id="username-error" className="text-red-400 text-xs mb-3">{errors.username}</p>}
      
      <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
      <input 
        type="password" 
        id="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="••••••••" 
        className="w-full p-3 mb-1 text-[var(--text)] border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
        aria-invalid={!!errors.password}
        aria-describedby={errors.password ? "password-error" : undefined}
      />
      {errors.password && <p id="password-error" className="text-red-400 text-xs mb-3">{errors.password}</p>}
      
      <button type="submit" className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4">
        <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" /> Sign Up
      </button>
      <p className="text-center text-sm mt-4">
        Already have an account? <Link to="/login" className="text-[var(--accent)] font-semibold">Login here.</Link>
      </p>
    </motion.form>
  );
};

export default UserSignupForm;