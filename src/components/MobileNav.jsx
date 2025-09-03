import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faShoppingBag, faStore, faTruck, faUser, faSignOutAlt,
  faHeart, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNav = () => {
  const { sidebarOpen, toggleSidebar, isVendor, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar();
    navigate('/');
  };

  const vendorLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: faHome },
    { name: 'Manage Store', path: '/manage-products', icon: faStore },
    { name: 'Orders', path: '/orders', icon: faTruck },
    { name: 'Profile', path: '/profile', icon: faUser },
  ];

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: faHome },
    { name: 'Products', path: '/products', icon: faShoppingBag },
    { name: 'Stores', path: '/stores', icon: faStore },
    { name: 'Cart', path: '/cart', icon: faShoppingCart },
    { name: 'Wishlist', path: '/wishlist', icon: faHeart },
    { name: 'Orders', path: '/orders', icon: faTruck },
    { name: 'Profile', path: '/profile', icon: faUser },
  ];

  const links = isVendor ? vendorLinks : userLinks;

  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: 'easeInOut' } }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-full left-0 w-full bg-[var(--card-bg)] backdrop-blur-[5px] shadow-lg z-[999] p-5 border-t border-white/10"
          >
            <nav className="flex flex-col items-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleSidebar}
                  className="flex items-center text-[var(--text)] w-full justify-center my-2 p-3 no-underline text-lg font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-3 w-5 text-center" />
                  {link.name}
                </Link>
              ))}
              <a
                href="#"
                className="flex items-center text-[var(--text)] w-full justify-center my-2 p-3 no-underline text-lg font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 w-5 text-center" />
                Logout
              </a>
            </nav>
          </motion.div>
          <div
            className="fixed inset-0 bg-black/50 z-[998] mt-[72px]"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;