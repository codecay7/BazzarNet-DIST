import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import MobileNav from './MobileNav';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const { sidebarOpen, toggleSidebar, cart, theme, toggleTheme, isVendor, logout } = useContext(AppContext);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const vendorLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Manage Store', path: '/vendor' },
    { name: 'Orders', path: '/orders' },
    { name: 'Profile', path: '/profile' },
  ];

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Stores', path: '/stores' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Orders', path: '/orders' },
    { name: 'Profile', path: '/profile' },
  ];

  const links = isVendor ? vendorLinks : userLinks;

  const navLinkClasses = "relative text-[var(--text)] font-medium px-3 py-2 rounded-md text-sm transition-colors duration-300 hover:text-[var(--accent)]";
  const activeLinkClasses = "text-[var(--accent)]";

  return (
    <header className="relative flex items-center py-4 bg-[var(--card-bg)] backdrop-blur-[5px] sticky top-0 z-[1000] rounded-b-2xl shadow-[0_4px_20px_var(--shadow)]">
      <div className="container mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-[var(--accent)] md:text-3xl">BazzarNet</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[var(--accent)]"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side icons and buttons */}
        <div className="flex items-center gap-4">
          {!isVendor && <span className="hidden md:inline text-sm font-medium">Cart: {cartItemCount}</span>}
          
          <button
            className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 hover:border-2 hover:border-[var(--accent)] transition-all duration-200"
            onClick={toggleTheme}
            aria-label="Toggle between light and dark mode"
          >
            <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="hidden md:flex bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Popup */}
      <MobileNav />
    </header>
  );
};

export default Header;