import React, { useContext, useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBoxOpen, faHeart, faMapMarkerAlt, faCheckCircle, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import SkeletonText from '../components/SkeletonText';
import SkeletonCard from '../components/SkeletonCard';

const CustomerDashboard = () => {
  const { user, cart, wishlist, simulateLoading, allAppProducts, orders } = useContext(AppContext); // Added orders
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateLoading(1000);
      setLoading(false);
    };
    loadData();
  }, [simulateLoading]);

  // Dynamically find the latest order for the logged-in user
  const latestOrder = useMemo(() => {
    if (!user || !user.email || orders.length === 0) return null;
    
    const userOrders = orders.filter(order => order.customerEmail === user.email); // Filter by customerEmail
    if (userOrders.length === 0) return null;

    // Sort by date to get the latest order
    return userOrders.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [user, orders]);

  // Define steps for the progress bar based on actual order status
  const getOrderSteps = (status) => {
    return [
      { name: 'Ordered', completed: true },
      { name: 'Processing', completed: ['Processing', 'Shipped', 'Delivered'].includes(status) },
      { name: 'Out for Delivery', completed: ['Shipped', 'Delivered'].includes(status) },
      { name: 'Delivered', completed: status === 'Delivered' },
    ];
  };

  const featuredProducts = allAppProducts.slice(0, 3);

  const stats = [
    { icon: faShoppingBag, label: 'Items in Cart', value: cart.length, path: '/cart' },
    { icon: faHeart, label: 'Wishlisted Items', value: wishlist.length, path: '/wishlist' },
    { icon: faReceipt, label: 'Total Orders', value: orders.filter(order => order.customerEmail === user?.email).length, path: '/orders' }, // Dynamic total orders
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-black/10 p-6 rounded-xl animate-pulse">
                <SkeletonText width="60%" height="1.5rem" className="mb-4" />
                <SkeletonText width="90%" height="1rem" className="mb-2" />
                <SkeletonText width="70%" height="1rem" className="mb-6" />
                <div className="flex justify-between">
                  <SkeletonText width="20%" height="2rem" />
                  <SkeletonText width="20%" height="2rem" />
                  <SkeletonText width="20%" height="2rem" />
                  <SkeletonText width="20%" height="2rem" />
                </div>
              </div>
              <div className="bg-black/10 p-6 rounded-xl animate-pulse">
                <SkeletonText width="60%" height="1.5rem" className="mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                      <div>
                        <SkeletonText width="100px" height="1rem" className="mb-1" />
                        <SkeletonText width="80px" height="0.8rem" />
                      </div>
                    </div>
                  ))}
                </div>
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

            {/* Order Tracker & Featured Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-black/10 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Latest Order Tracking</h2>
                {latestOrder ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="font-semibold text-lg">Order {latestOrder.id}</p>
                        <p className="text-sm opacity-80">{latestOrder.items.map(item => item.name).join(', ')}</p>
                      </div>
                      <button className="bg-[var(--accent)] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors" onClick={() => navigate(`/my-orders/${latestOrder.id.replace('#', '')}`)} aria-label={`Track Order ${latestOrder.id}`}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" /> Track
                      </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="flex items-center" role="progressbar" aria-valuenow={getOrderSteps(latestOrder.status).filter(s => s.completed).length} aria-valuemin="0" aria-valuemax={getOrderSteps(latestOrder.status).length} aria-label={`Order ${latestOrder.id} progress`}>
                      {getOrderSteps(latestOrder.status).map((step, index) => (
                        <React.Fragment key={step.name}>
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-transparent border-white/30 text-white/50'}`} aria-hidden="true">
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <p className={`text-xs mt-2 ${step.completed ? 'font-semibold' : 'opacity-70'}`}>{step.name}</p>
                          </div>
                          {index < getOrderSteps(latestOrder.status).length - 1 && (
                            <div className={`flex-1 h-1 mx-2 ${step.completed ? 'bg-[var(--accent)]' : 'bg-white/10'}`} aria-hidden="true"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-lg opacity-80 py-10">No recent orders found.</p>
                )}
              </div>

              <div className="bg-black/10 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Recommended</h2>
                <div className="space-y-4">
                  {featuredProducts.map(product => (
                    <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="flex items-center gap-4 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors" role="link" tabIndex="0" aria-label={`View details for ${product.name}`}>
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;