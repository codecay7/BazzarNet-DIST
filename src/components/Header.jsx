import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { toggleSidebar, cart, theme, toggleTheme, isVendor } = useContext(AppContext);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex items-center py-4 bg-[var(--card-bg)] backdrop-blur-[5px] sticky top-0 z-[1000] rounded-b-2xl shadow-[0_4px_20px_var(--shadow)] overflow-x-hidden">
      <div className="container mx-auto px-5 flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-5 flex-shrink-0">
          <button
            className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--accent)] md:text-3xl">BazzarNet</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isVendor && <span className="text-sm font-medium">Cart: {cartItemCount}</span>}
          <button
            className="bg-[var(--card-bg)] rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 hover:border-2 hover:border-[var(--accent)] transition-all duration-200"
            onClick={toggleTheme}
            aria-label="Toggle between light and dark mode"
          >
            <span className="text-xl">{theme === 'light' ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;