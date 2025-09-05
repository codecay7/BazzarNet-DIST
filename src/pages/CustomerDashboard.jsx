import React, { useContext, useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faHeart, faReceipt, faCartPlus, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import SkeletonText from '../components/SkeletonText';
import SkeletonCard from '../components/SkeletonCard';
import * as api from '../services/api'; // Import API service
import placeholderImage from '../assets/placeholder.png'; // Import placeholder image
import { getFullImageUrl } from '../utils/imageUtils'; // Import utility
import { motion } from 'framer-motion'; // Import motion for animations

const CustomerDashboard = () => {
  const { user, cart, wishlist, orders, addToCart, addToWishlist, allAppProducts, appStores } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for category filter in recommended section

  const categories = [ // Define categories for the filter and for separate sections
    'all', 'Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 
    'Furniture', 'Decor', 'Clothing', 'Other'
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setLoading(false);
    };
    loadDashboardData();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      setRecommendedLoading(true);
      try {
        const products = await api.products.getRecommended();
        setRecommendedProducts(products);
      } catch (error) {
        console.error('Failed to fetch recommended products:', error);
        setRecommendedProducts([]);
      } finally {
        setRecommendedLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  // Dynamically find the latest order for the logged-in user (still needed for stats)
  const latestOrder = useMemo(() => {
    if (!user || !user.email || orders.length === 0) return null;
    
    const userOrders = orders.filter(order => order.user === user._id); // Filter by user._id
    if (userOrders.length === 0) return null;

    // Sort by date to get the latest order
    return userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]; // Use createdAt
  }, [user, orders]);

  const stats = [
    { icon: faShoppingBag, label: 'Items in Cart', value: cart.length, path: '/cart' },
    { icon: faHeart, label: 'Wishlisted Items', value: wishlist.length, path: '/wishlist' },
    { icon: faReceipt, label: 'Total Orders', value: orders.filter(order => order.user === user?._id).length, path: '/orders' }, // Dynamic total orders
  ];

  // Helper function to calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return ((originalPrice - price) / originalPrice) * 100;
  };

  // Helper function to render star ratings
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

  // Filtered recommended products based on selected category
  const filteredRecommendedProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return recommendedProducts;
    }
    return recommendedProducts.filter(product => product.category === selectedCategory);
  }, [recommendedProducts, selectedCategory]);

  // Helper component to render a product card
  const ProductCard = ({ product }) => {
    const isOutOfStock = product.stock === 0;
    const discount = calculateDiscount(product.price, product.originalPrice);
    const storeName = appStores.find(store => store._id === product.store?._id)?.name || 'N/A';

    return (
      <div key={product._id} className={`bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] flex flex-col ${isOutOfStock ? 'grayscale' : ''}`} role="listitem" aria-label={`Product: ${product.name}`}>
        <Link to={`/products/${product._id}`} className="flex-grow flex flex-col" aria-label={`View details for ${product.name}`}>
          <div className="relative">
            <img
              src={getFullImageUrl(product.image)}
              alt={product.name}
              className="w-full h-32 sm:h-40 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback image
            />
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" aria-label={`${Math.round(discount)} percent off`}>{Math.round(discount)}% OFF</span>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-bold">OUT OF STOCK</span>
              </div>
            )}
          </div>
          <div className="p-3 flex-grow flex-col">
            <h3 className="text-base sm:text-lg font-semibold mb-1 truncate">{product.name}</h3>
            <p className="text-xs opacity-80 mb-1 truncate">Category: {product.category}</p> {/* Display Category */}
            <p className="text-xs opacity-80 mb-1 truncate">From: {storeName}</p>
            <div className="flex items-baseline gap-1 mb-1">
              <p className="text-sm sm:text-base font-bold text-[var(--accent)]">₹{product.price.toFixed(2)} / {product.unit}</p>
              {product.originalPrice && discount > 0 && (
                <p className="text-xs text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs mb-1">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="opacity-80">({product.reviews})</span>
            </div>
            {product.stock > 0 ? (
              <p className="text-xs opacity-80 text-green-400">In Stock: {product.stock}</p>
            ) : (
              <p className="text-xs opacity-80 text-red-400">Out of Stock</p>
            )}
          </div>
        </Link>
        <div className="flex gap-2 mt-auto p-3 pt-0">
          <button
            className="flex-1 bg-[var(--accent)] text-white border-none py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock === 0}
          >
            <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Cart
          </button>
          <button
            className="bg-white/10 text-[var(--text)] border-none py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-white/20 transition-all duration-300"
            onClick={() => addToWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
          >
            <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="w-full max-w-[1200px] mx-auto my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        {loading ? (
          <>
            <SkeletonText width="70%" height="2rem" className="mb-2" />
            <SkeletonText width="50%" height="1.2rem" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-black/10 p-6 rounded-xl flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                  <div>
                    <SkeletonText width="80px" height="0.8rem" className="mb-2" />
                    <SkeletonText width="50px" height="1.2rem" />
                  </div>
                </div>
              ))}
            </div>
            {/* Recommended Products Skeleton */}
            <div className="bg-black/10 p-6 rounded-xl animate-pulse">
              <SkeletonText width="60%" height="1.5rem" className="mb-4" />
              <div className="flex gap-4 overflow-x-auto pb-2"> {/* Horizontal scroll for skeleton */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-lg text-[var(--text)] opacity-80 mb-8">Ready to shop from your favorite local stores?</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map(stat => (
                <div key={stat.label} onClick={() => navigate(stat.path)} className="bg-black/10 p-6 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-colors duration-300" role="button" tabIndex="0" aria-label={`${stat.label}: ${stat.value}. Click to view.`}>
                  <FontAwesomeIcon icon={stat.icon} className="text-3xl text-[var(--accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm opacity-70">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Products Section */}
            <div className="bg-black/10 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
              
              {/* Category Filter Section for Recommended Products */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Filter Recommended by Category:</h3>
                <div className="flex gap-3 pb-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {categories.map(cat => (
                    <motion.button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-shrink-0 px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
                        selectedCategory === cat
                          ? 'bg-[var(--accent)] text-white shadow-md'
                          : 'bg-white/10 text-[var(--text)] hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-pressed={selectedCategory === cat}
                      aria-label={`Filter recommended by ${cat === 'all' ? 'All Categories' : cat}`}
                    >
                      {cat === 'all' ? 'All Categories' : cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {recommendedLoading ? (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
                      <SkeletonCard />
                    </div>
                  ))}
                </div>
              ) : filteredRecommendedProducts.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {filteredRecommendedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg opacity-80 py-10">No recommended products available for this category.</p>
              )}
            </div>

            {/* Browse All Products by Category Section */}
            <div className="bg-black/10 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Browse All Products by Category</h2>
              {categories.filter(cat => cat !== 'all').map(category => (
                <div key={category} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">{category}</h3>
                  {allAppProducts.filter(p => p.category === category).length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                      {allAppProducts.filter(p => p.category === category).map(product => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-base opacity-80 py-4">No products found in the {category} category.</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;