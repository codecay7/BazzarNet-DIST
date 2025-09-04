import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { addToCart, addToWishlist, allAppProducts } = useContext(AppContext);
  const { id } = useParams();
  const product = allAppProducts.find(p => p._id === id); // Find product using _id

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/stores" className="text-[var(--accent)] hover:underline">Back to Stores</Link>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4" aria-label={`Rating: ${product.rating} out of 5 stars, based on ${product.reviews} reviews`}>
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-[var(--text)] opacity-80">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-[var(--accent)] mb-4">₹{product.price.toFixed(2)} / {product.unit}</p> {/* Display unit */}
            <p className="text-base md:text-lg mb-6">{product.description}</p>
            <div className="flex gap-4">
              <button
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Add to Cart
              </button>
              <button
                className="bg-gray-200 text-gray-800 border-none py-3 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-300 transition-all duration-300"
                onClick={() => addToWishlist(product)}
                aria-label={`Add ${product.name} to wishlist`}
              >
                <FontAwesomeIcon icon={faHeart} aria-hidden="true" /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;