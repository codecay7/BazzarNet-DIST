import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import SkeletonStoreCard from '../components/SkeletonStoreCard';
import Pagination from '../components/Pagination';

const VALID_PINCODE = '825301'; // Define the valid pincode

const Stores = () => {
  const navigate = useNavigate();
  const { appStores, appStoresMeta, fetchAppStores, user } = useContext(AppContext); // Removed simulateLoading
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of stores per page

  const userPincode = user?.address?.pinCode;
  const isPincodeValid = userPincode === VALID_PINCODE;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        pincode: userPincode, // Pass user's pincode to the API
      };
      await fetchAppStores(params);
      setLoading(false);
    };
    loadData();
  }, [searchTerm, currentPage, fetchAppStores, userPincode]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Local Stores</h2>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a store..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          />
        </div>

        {!userPincode ? (
          <p className="text-center text-lg opacity-80 py-10">
            Please update your profile with a shipping address to see available stores.
          </p>
        ) : !isPincodeValid ? (
          <p className="text-center text-lg opacity-80 py-10 text-red-400">
            Currently, shops are only available for pincode {VALID_PINCODE}. Please update your address.
          </p>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(itemsPerPage)].map((_, index) => (
              <SkeletonStoreCard key={index} />
            ))}
          </div>
        ) : appStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appStores.map((store) => (
              <div key={store._id} className="bg-black/10 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col shadow-lg">
                <div className="flex-grow">
                  <FontAwesomeIcon icon={faStore} className="text-4xl text-[var(--accent)] mb-4" />
                  <h3 className="text-2xl font-semibold mb-3">{store.name}</h3>
                  <p className="text-base opacity-80">{store.description}</p>
                </div>
                <button
                  className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4 self-start"
                  onClick={() => navigate(`/stores/${store._id}`)}
                >
                  Visit Store
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No stores found matching your search for pincode {userPincode}.</p>
        )}

        {!loading && appStores.length > 0 && (
          <Pagination
            currentPage={appStoresMeta.page}
            totalPages={appStoresMeta.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default Stores;