import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useContext(AppContext);

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="text-center py-10">
            <FontAwesomeIcon icon={faHeart} className="text-6xl text-[var(--accent)] mb-4" aria-hidden="true" />
            <p className="text-base md:text-lg mb-4">Your wishlist is empty.</p>
            <Link to="/products" className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300" aria-label="Find Products to add to wishlist">
                Find Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4" role="list">
            {wishlist.map((item, index) => (
              <div key={index} className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-5 flex flex-col gap-2" role="listitem" aria-label={`Wishlist item: ${item.name}, Price: ₹${item.price.toFixed(2)}`}>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-base">₹{item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                    onClick={() => moveToCart(item)}
                    aria-label={`Move ${item.name} to cart`}
                  >
                    <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Move to Cart
                  </button>
                  <button
                    className="bg-red-500 text-white border-none py-2 px-4 rounded-lg flex items-center gap-2 font-medium hover:bg-red-600 transition-all duration-300"
                    onClick={() => removeFromWishlist(item.name)}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;