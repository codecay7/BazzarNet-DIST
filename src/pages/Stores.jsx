import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Local Stores</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
            <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
            <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Fresh Groceries</h3>
            <p className="text-base md:text-lg">Organic fruits, vegetables, and daily essentials.</p>
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
              onClick={() => navigate('/products')}
            >
              View Products
            </button>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300 m-2">
            <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
            <h3 className="text-2xl font-semibold mb-3 md:text-3xl">Local Bakery</h3>
            <p className="text-base md:text-lg">Freshly baked bread, cakes, and pastries.</p>
            <button
              className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
              onClick={() => navigate('/products')}
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stores;