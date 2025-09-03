import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  return (
    <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full mt-10 text-[var(--text)]">
      <div className="flex flex-col md:flex-row justify-between gap-8 max-w-[1200px] mx-auto px-5">
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">About BazzarNet</h4>
          <p className="text-sm md:text-base">Connecting local stores with customers for fast and reliable delivery.</p>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Quick Links</h4>
          {['/', '/stores', '/products', '/faq', '/about'].map((path) => {
            const name = path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2);
            return (
              <Link
                key={name}
                to={path}
                className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] hover:translate-x-1 transition-all duration-200 md:hover:translate-x-0 md:text-base"
              >
                {name}
              </Link>
            );
          })}
        </div>
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Support</h4>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Help Center coming soon!')}} className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200">Help Center</a>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Contact Us coming soon!')}} className="text-sm text-[var(--text)] no-underline hover:text-[var(--accent)] transition-all duration-200">Contact Us</a>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <h4 className="text-lg font-semibold text-[var(--accent)] md:text-xl">Connect With Us</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="text-xl text-[var(--text)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-200"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pt-5 border-t border-white/20">
        <div className="text-2xl font-bold text-[var(--accent)] mb-2 md:text-3xl">BazzarNet</div>
        <p className="text-sm opacity-80 md:text-base">© 2025 BazzarNet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;