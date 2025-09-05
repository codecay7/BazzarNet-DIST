import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faShoppingBag, faStore, faTruck, faUser, faSignOutAlt,
  faHeart, faShoppingCart, faUsers, faBoxes, faChartLine, faBullhorn, faCog, faQuestionCircle, faTimes // Import faTimes for the close button
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Package, Receipt, Store } from 'lucide-react'; // Import Lucide icons for admin, including Store

const MobileNav = () => {
  const { sidebarOpen, toggleSidebar, isVendor, isAdmin, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar();
    navigate('/');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: faHome },
    { name: 'Users', path: '/admin-users', icon: Users },
    { name: 'Products', path: '/admin-products', icon: Package },
    { name: 'Orders', path: '/admin-orders', icon: Receipt },
    { name: 'Stores', path: '/admin-stores', icon: Store },
  ];

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

  const links = isAdmin ? adminLinks : (isVendor ? vendorLinks : userLinks);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' }, // Slide from right (hidden)
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } }, // Slide to visible
    exit: { opacity: 0, x: '100%', transition: { duration: 0.2, ease: 'easeInOut' } } // Slide back to right (exit)
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
            className="fixed inset-0 bg-black z-[999] p-6 text-white" // Full screen, black background, increased padding
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex justify-end mb-8"> {/* Close button at top right */}
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-[var(--accent)] transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faTimes} size="2x" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col items-start"> {/* Left-aligned links */}
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleSidebar}
                  className="flex items-center w-full justify-start py-2 px-4 no-underline text-lg font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
                  aria-label={link.name}
                >
                  {typeof link.icon === 'function' ? (
                    React.createElement(link.icon, { size: 20, className: "mr-3 w-5 text-center", "aria-hidden": "true" })
                  ) : (
                    <FontAwesomeIcon icon={link.icon} className="mr-3 w-5 text-center" aria-hidden="true" />
                  )}
                  {link.name}
                </Link>
              ))}
              <Link
                to="/help"
                onClick={toggleSidebar}
                className="flex items-center w-full justify-start py-2 px-4 no-underline text-lg font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
                aria-label="Help and Support"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-3 w-5 text-center" aria-hidden="true" />
                Help
              </Link>
              <a
                href="#"
                className="flex items-center w-full justify-start py-2 px-4 no-underline text-lg font-medium hover:bg-white/10 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-500"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 w-5 text-center" aria-hidden="true" />
                Logout
              </a>
            </nav>
          </motion.div>
          {/* The overlay is no longer needed as the sidebar itself is full-screen */}
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;