import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStore, faCartPlus, faTruck, faUser, faQuestionCircle, faInfoCircle, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-body)] text-[var(--text)]">
      {/* Header */}
      <header className="py-4 bg-[var(--card-bg)] backdrop-blur-[5px] sticky top-0 z-[1000] rounded-b-2xl shadow-[0_4px_20px_var(--shadow)]">
        <div className="container mx-auto px-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-[var(--accent)] md:text-3xl">BazzarNet</span>
          <button
            onClick={() => navigate('/login')}
            className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 px-5 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Shop Locally, Delivered Fast</h1>
          <p className="text-lg md:text-xl mb-8">Support your favorite local stores with quick doorstep delivery.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <button onClick={() => navigate('/login')} className="bg-white text-[var(--accent)] py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-200 transition-all duration-300">
              <FontAwesomeIcon icon={faShoppingBag} /> Start Shopping
            </button>
            <button onClick={() => navigate('/login')} className="border border-white text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-white/20 transition-all duration-300">
              <FontAwesomeIcon icon={faStore} /> Become a Vendor
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-5 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6"><FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold mb-2">Browse Stores</h3>
            </div>
            <div className="p-6"><FontAwesomeIcon icon={faCartPlus} className="text-4xl text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold mb-2">Add to Cart</h3>
            </div>
            <div className="p-6"><FontAwesomeIcon icon={faTruck} className="text-4xl text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            </div>
          </div>
        </section>

        {/* Why BazzarNet */}
        <section className="bg-[var(--card-bg)] py-16">
          <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)] mb-3" />
              <h3 className="text-xl font-bold mb-2">Digitize Your Store</h3>
              <p>Bring your local store online with ease.</p>
            </div>
            <div><FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)] mb-3" />
              <h3 className="text-xl font-bold mb-2">Fast Local Delivery</h3>
              <p>Get your goods delivered quickly.</p>
            </div>
            <div><FontAwesomeIcon icon={faUser} className="text-3xl text-[var(--accent)] mb-3" />
              <h3 className="text-xl font-bold mb-2">Trusted & Secure</h3>
              <p>Shop with confidence and security.</p>
            </div>
          </div>
        </section>

        {/* FAQ & About */}
        <section className="container mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">What is BazzarNet?</h3>
              <p>BazzarNet is a platform connecting local stores with customers for fast and reliable delivery.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">How fast is delivery?</h3>
              <p>Most orders are delivered within 30-60 minutes, depending on your location.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Our Story</h3>
              <p>BazzarNet was founded to empower local businesses and make shopping convenient for customers.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Careers</h3>
              <p>Join our team to build the future of local commerce.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default LandingPage;