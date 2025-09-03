import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { stores } from '../data/mockData';

const StorePage = () => {
  const { addToCart, addToWishlist } = useContext(AppContext);
  const { storeId } = useParams();
  const store = stores.find(s => s.id === parseInt(storeId));

  if (!store) {
    return (
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Store Not Found</h2>
          <Link to="/stores" className="text-[var(--accent)] hover:underline">Back to All Stores</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="mb-8 pb-6 border-b border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold">{store.name}</h2>
          <p className="text-base md:text-lg mt-2 opacity-80">{store.description}</p>
        </div>
        
        <h3 className="text-2xl font-bold mb-6">Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.map((product) => (
            <div key={product.id} className="bg-black/10 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col shadow-lg">
              <Link to={`/products/${product.id}`} className="flex-grow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-[var(--accent)]">${product.price.toFixed(2)}</p>
              </Link>
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                  onClick={() => addToCart(product)}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Cart
                </button>
                <button
                  className="bg-white/10 text-[var(--text)] border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300"
                  onClick={() => addToWishlist(product)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorePage;