import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';

const Footer = () => {
  return (
    <footer className="bg-[var(--card-bg)] backdrop-blur-[5px] p-10 rounded-t-2xl w-full text-[var(--text)]">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Support</h4>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Help Center coming soon!')}} className="block hover:text-[var(--accent)]">Help Center</a>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Contact Us coming soon!')}} className="block hover:text-[var(--accent)]">Contact Us</a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Legal</h4>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Privacy Policy coming soon!')}} className="block hover:text-[var(--accent)]">Privacy Policy</a>
          <a href="#" onClick={(e) => {e.preventDefault(); toast.info('Terms of Service coming soon!')}} className="block hover:text-[var(--accent)]">Terms of Service</a>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold mb-3 text-[var(--accent)]">Connect</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="text-xl hover:text-[var(--accent)]"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-xl hover:text-[var(--accent)]"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="text-xl hover:text-[var(--accent)]"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;