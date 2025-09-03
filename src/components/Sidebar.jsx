import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faShoppingBag, faStore, faTruck, faUser, faSignOutAlt,
  faCartPlus, faQuestionCircle, faInfoCircle, faHeart, faTimes, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, isVendor, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar();
    navigate('/');
  };

  const vendorLinks = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'Dashboard', path: '/vendor', icon: faStore },
    { name: 'Orders', path: '/orders', icon: faTruck },
    { name: 'Profile', path: '/profile', icon: faUser },
  ];

  const userLinks = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'Stores', path: '/stores', icon: faStore },
    { name: 'Products', path: '/products', icon: faShoppingBag },
    { name: 'Cart', path: '/cart', icon: faShoppingCart },
    { name: 'Wishlist', path: '/wishlist', icon: faHeart },
    { name: 'Orders', path: '/orders', icon: faTruck },
    { name: 'FAQ', path: '/faq', icon: faQuestionCircle },
    { name: 'About', path: '/about', icon: faInfoCircle },
    { name: 'Profile', path: '/profile', icon: faUser },
  ];

  const links = isVendor ? vendorLinks : userLinks;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-br from-[var(--card-bg)] to-white/20 backdrop-blur-[5px] p-5 transition-transform duration-300 z-[1001] shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col justify-between md:w-48 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
            <div className="flex justify-between items-center mb-5">
            <span className="text-xl font-bold text-[var(--accent)]">Menu</span>
            <button
                className="bg-transparent text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
            >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            </div>
            <nav className="flex flex-col">
            {links.map((link) => (
                <Link
                key={link.name}
                to={link.path}
                onClick={toggleSidebar}
                className="relative flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[black] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                >
                <FontAwesomeIcon icon={link.icon} className="mr-2 text-lg hover:scale-110 transition-transform duration-200" />
                {link.name}
                <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></span>
                </Link>
            ))}
            <a
                href="#"
                className="flex items-center text-[var(--text)] my-5 p-2 no-underline text-lg font-medium hover:text-[var(--accent)] hover:translate-x-1 hover:shadow-[0_0_10px_rgba(74,144,226,0.3)] rounded-lg transition-all duration-300"
                onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}
                aria-label="Logout"
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg hover:scale-110 transition-transform duration-200" />
                Logout
            </a>
            </nav>
        </div>
        <div className="flex items-center gap-2 p-2 border-t border-white/20 mt-5">
          <img
            src={user ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' : 'https://via.placeholder.com/40'}
            alt={user ? `${user.username || user.store}'s profile image` : 'User image'}
            className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
          />
          <span className="text-sm font-medium">{user ? `Welcome, ${user.username || user.store}` : 'Guest'}</span>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black/50 z-[1000] ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;