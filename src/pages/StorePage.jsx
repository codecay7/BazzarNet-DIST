import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const StorePage = () => {
  const { addToCart, addToWishlist, allAppProducts, appStores } = useContext(AppContext);
  const { storeId } = useParams();
  const store = appStores.find(s => s._id === storeId); // Find store using _id

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

  // Filter products belonging to this store from allAppProducts
  const storeProducts = allAppProducts.filter(product => product.store._id === store._id); // Filter by populated store._id

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" aria-hidden="true" />);
    }
    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" aria-hidden="true" />);
    }
    return stars;
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="mb-8 pb-6 border-b border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold">{store.name}</h2>
          <p className="text-base md:text-lg mt-2 opacity-80">{store.description}</p>
        </div>
        
        <h3 className="text-2xl font-bold mb-6">Products</h3>
        {storeProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {storeProducts.map((product) => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              return (
                <div key={product._id} className="bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col" role="listitem">
                  <Link to={`/products/${product._id}`} className="flex-grow" aria-label={`View details for ${product.name}`}>
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" aria-label={`${discount} percent off`}>{discount}% OFF</span>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex-col">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-lg font-bold text-[var(--accent)]">₹{product.price.toFixed(2)} / {product.unit}</p> {/* Display unit */}
                        {product.originalPrice && discount > 0 && (
                          <p className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="opacity-80">({product.reviews})</span>
                      </div>
                      <p className="text-sm opacity-80">Stock: {product.stock}</p>
                    </div>
                  </Link>
                  <div className="flex gap-2 mt-4 p-4 pt-0">
                    <button
                      className="flex-1 bg-[var(--accent)] text-white border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Cart
                    </button>
                    <button
                      className="bg-white/10 text-[var(--text)] border-none py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300"
                      onClick={() => addToWishlist(product)}
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No products available for this store.</p>
        )}
      </div>
    </section>
  );
};

export default StorePage;