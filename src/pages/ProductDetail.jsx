import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

// Mock data - in a real app, this would come from an API
const products = [
    { id: 1, name: 'Fresh Apples', price: 2.99, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', description: 'Crisp and juicy apples, perfect for a healthy snack or baking. Sourced from local organic farms.', rating: 4.5, reviews: 120 },
    { id: 2, name: 'Sourdough Bread', price: 4.50, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=400&h=400&fit=crop', description: 'Artisanal sourdough bread with a chewy crust and soft interior. Baked fresh daily by our local bakery partner.', rating: 5, reviews: 250 },
    { id: 3, name: 'Organic Milk', price: 3.99, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf18f86f6?w=400&h=400&fit=crop', description: 'Fresh, creamy organic milk from grass-fed cows. A wholesome choice for your family.', rating: 4, reviews: 95 },
];

const ProductDetail = () => {
  const { addToCart, addToWishlist } = useContext(AppContext);
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-[var(--accent)] hover:underline">Back to Products</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" />);
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
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-[var(--text)] opacity-80">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-[var(--accent)] mb-4">${product.price.toFixed(2)}</p>
            <p className="text-base md:text-lg mb-6">{product.description}</p>
            <div className="flex gap-4">
              <button
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                onClick={() => addToCart(product)}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>
              <button
                className="bg-gray-200 text-gray-800 border-none py-3 px-6 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-300 transition-all duration-300"
                onClick={() => addToWishlist(product)}
              >
                <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;