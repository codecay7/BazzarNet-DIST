import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faStore, faCartPlus, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [deliveryTime, setDeliveryTime] = useState(30);
  const navigate = useNavigate();

  const updateDeliveryTime = (e) => {
    setDeliveryTime(parseInt(e.target.value));
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      {/* Hero Section */}
      <div className="text-center py-16 px-5 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white rounded-2xl mx-4 md:py-20 md:px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight md:leading-snug mb-4 text-gray-900 tracking-tight">
          Shop Locally, Delivered Fast with
          <span className="inline-block ml-2 px-2 py-1 bg-black text-[#4CAF50] rounded-md shadow-md text-[1.2em]">
            BazzarNet
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-5">Support your favorite local stores with quick doorstep delivery.</p>
        <div className="flex flex-wrap justify-center gap-5">
          <button
            className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
            onClick={() => navigate('/stores')}
          >
            <FontAwesomeIcon icon={faShoppingBag} /> Start Shopping
          </button>
          <button
            className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 m-1.5"
            onClick={() => navigate('/vendor')}
          >
            <FontAwesomeIcon icon={faStore} /> Become a Vendor
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-5 my-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Browse Stores</h3>
                <p className="text-[var(--text)] text-base">Discover local shops and their products.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faCartPlus} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Add to Cart</h3>
                <p className="text-[var(--text)] text-base">Select items and place your order easily.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your order delivered in under an hour.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why BazzarNet Section */}
      <div className="container mx-auto px-5 my-10">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Why BazzarNet?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faStore} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Digitize Your Store</h3>
                <p className="text-[var(--text)] text-base">Bring your local store online with ease.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faTruck} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Fast Local Delivery</h3>
                <p className="text-[var(--text)] text-base">Get your goods delivered quickly.</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_var(--shadow)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-[var(--accent)]" />
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-1">Trusted & Secure</h3>
                <p className="text-[var(--text)] text-base">Shop with confidence and security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Time Estimator */}
      <div className="bg-[var(--card-bg)] w-full max-w-[1170px] my-10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_var(--shadow)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 ease-in-out mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[var(--accent)]">
          Delivery Time Estimator
        </h2>
        <div className="space-y-8">
          <div>
            <label htmlFor="delivery-slider" className="block text-base md:text-lg font-medium mb-2 text-[var(--text)]">
              Distance to Store (km): <span className="font-semibold">{(deliveryTime / 10).toFixed(1)}</span>
            </label>
            <input
              id="delivery-slider"
              type="range"
              min="10"
              max="50"
              value={deliveryTime}
              onChange={updateDeliveryTime}
              className="w-full h-2 rounded-lg appearance-none bg-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <div
            className="w-[150px] h-[150px] rounded-full flex items-center justify-center shadow-[0_4px_30px_var(--accent)] relative transition-all duration-500"
            style={{
              background: `conic-gradient(var(--accent) ${deliveryTime}%, rgba(255,255,255,0.08) ${deliveryTime}% 100%)`,
            }}
            role="img"
            aria-label={`Estimated Delivery Time: ${deliveryTime} minutes`}
          >
            <div className="w-[115px] h-[115px] bg-[var(--bg)] rounded-full flex items-center justify-center shadow-inner">
              <span className="text-2xl font-bold text-[var(--accent)]">{deliveryTime} min</span>
            </div>
          </div>
          <p className="text-base md:text-lg font-medium text-[var(--text)]">
            Estimated delivery in <span className="font-semibold">{deliveryTime} minutes</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;