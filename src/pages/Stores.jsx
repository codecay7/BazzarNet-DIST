import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { stores as allStores } from '../data/mockData';

const Stores = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = allStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Local Stores</h2>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a store by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          />
        </div>

        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStores.map((store) => (
              <div key={store.name} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6 flex-1 hover:-translate-y-1 transition-transform duration-300">
                <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 md:text-3xl">{store.name}</h3>
                <p className="text-base md:text-lg">{store.description}</p>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 mt-4"
                  onClick={() => navigate(`/stores/${encodeURIComponent(store.name)}`)}
                >
                  Visit Store
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80">No stores found matching your search.</p>
        )}
      </div>
    </section>
  );
};

export default Stores;