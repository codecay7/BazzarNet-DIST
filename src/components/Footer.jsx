import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';

const Footer = () => {
  const handleLinkClick = (e, message) => {
    e.preventDefault();
    toast.info(message);
  };

  return (
    <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full mt-10 text-[var(--text)]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl mb-3">BazzarNet</h4>
          <p className="text-sm md:text-base">Connecting local stores with customers for fast and reliable delivery.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl mb-3">Support</h4>
          <a href="#" onClick={(e) => handleLinkClick(e, 'Help Center coming soon!')} className="block text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200 mb-2">Help Center</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'Contact Us coming soon!')} className="block text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200">Contact Us</a>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl mb-3">Legal</h4>
          <a href="#" onClick={(e) => handleLinkClick(e, 'Privacy Policy coming soon!')} className="block text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200 mb-2">Privacy Policy</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'Terms of Service coming soon!')} className="block text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200">Terms of Service</a>
        </div>
      </div>
      <div className="text-center mt-8 pt-5 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm opacity-80 md:text-base mb-4 md:mb-0">© 2025 BazzarNet. All rights reserved.</p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;