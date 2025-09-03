import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const handleExternalClick = (e) => {
    e.preventDefault();
    toast('This is a demo link.');
  };

  return (
    <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full text-[var(--text)] mt-auto">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-2">
          <h4 className="text-lg font-bold text-[var(--accent)] mb-3">BazzarNet</h4>
          <p className="text-sm opacity-80">Your one-stop solution for shopping from local stores with fast doorstep delivery.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Company</h4>
          <Link to="/about" className="block hover:text-[var(--accent)] text-sm mb-2">About Us</Link>
          <Link to="/faq" className="block hover:text-[var(--accent)] text-sm mb-2">FAQ</Link>
          <a href="#" onClick={handleExternalClick} className="block hover:text-[var(--accent)] text-sm">Careers</a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Support</h4>
          <a href="#" onClick={handleExternalClick} className="block hover:text-[var(--accent)] text-sm mb-2">Help Center</a>
          <a href="#" onClick={handleExternalClick} className="block hover:text-[var(--accent)] text-sm">Contact Us</a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Legal</h4>
          <a href="#" onClick={handleExternalClick} className="block hover:text-[var(--accent)] text-sm mb-2">Privacy Policy</a>
          <a href="#" onClick={handleExternalClick} className="block hover:text-[var(--accent)] text-sm">Terms of Service</a>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-5 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm opacity-70 mb-4 sm:mb-0">© 2025 BazzarNet. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" onClick={handleExternalClick} className="text-xl hover:text-[var(--accent)] transition-transform hover:scale-110"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" onClick={handleExternalClick} className="text-xl hover:text-[var(--accent)] transition-transform hover:scale-110"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" onClick={handleExternalClick} className="text-xl hover:text-[var(--accent)] transition-transform hover:scale-110"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;