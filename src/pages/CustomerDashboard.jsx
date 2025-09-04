import React, { useContext, useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBoxOpen, faHeart, faMapMarkerAlt, faCheckCircle, faReceipt, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import SkeletonText from '../components/SkeletonText';
import SkeletonCard from '../components/SkeletonCard';

const CustomerDashboard = () => {
  const { user, cart, wishlist, simulateLoading, allAppProducts, orders, addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateLoading(1000);
      setLoading(false);
    };
    loadData();
  }, [simulateLoading, user, cart.length, wishlist.length, orders.length, allAppProducts.length]); // Added dependencies for data changes

  // Dynamically find the latest order for the logged-in user (still needed for stats)
  const latestOrder = useMemo(() => {
    if (!user || !user.email || orders.length === 0) return null;
    
    const userOrders = orders.filter(order => order.user === user._id); // Filter by user._id
    if (userOrders.length === 0) return null;

    // Sort by date to get the latest order
    return userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]; // Use createdAt
  }, [user, orders]);

  const recommendedProducts = allAppProducts.slice(0, 6); // Increased to 6 recommended products

  const stats = [
    { icon: faShoppingBag, label: 'Items in Cart', value: cart.length, path: '/cart' },
    { icon: faHeart, label: 'Wishlisted Items', value: wishlist.length, path: '/wishlist' },
    { icon: faReceipt, label: 'Total Orders', value: orders.filter(order => order.user === user?._id).length, path: '/orders' }, // Dynamic total orders
  ];

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
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
            <div className="bg-black/10 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <div key={product._id} className="flex flex-col bg-black/10 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm opacity-70 mb-2">₹{product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addToCart(product)} 
                      className="bg-[var(--accent)] text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-colors mt-auto"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;