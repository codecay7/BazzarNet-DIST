"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; // Using Lucide icon for consistency

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      aria-label="User Login Button"
      className="w-32 h-12 rounded-xl cursor-pointer transition-all duration-300 
                 bg-[var(--accent)] hover:bg-[var(--accent-dark)] 
                 flex items-center justify-center shadow-lg"
      onClick={handleClick}
    >
      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-lg 
                  bg-black/30 flex items-center justify-center gap-3 
                  text-white font-semibold">
        <User size={24} className="text-white" aria-hidden="true" />
        <p>Log In</p>
      </div>
    </button>
  );
}

export default LoginButton;