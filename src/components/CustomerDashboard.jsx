import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBoxOpen, faHeart, faMapMarkerAlt, faCheckCircle, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user, cart, wishlist } = useContext(AppContext);
  const navigate = useNavigate();

  // Mock data for demonstration
  const recentOrder = {
    id: '#1234',
    items: 'Apples, Bread',
    status: 'Out for Delivery',
    steps: [
      { name: 'Ordered', completed: true },
      { name: 'Processing', completed: true },
      { name: 'Out for Delivery', completed: true },
      { name: 'Delivered', completed: false },
    ]
  };

  const featuredProducts = [
    { id: 1, name: 'Fresh Apples', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop' },
    { id: 2, name: 'Sourdough Bread', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=100&h=100&fit=crop' },
    { id: 3, name: 'Organic Milk', price: 3.99, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf18f86f6?w=100&h=100&fit=crop' },
  ];

  const stats = [
    { icon: faShoppingBag, label: 'Items in Cart', value: cart.length, path: '/cart' },
    { icon: faHeart, label: 'Wishlisted Items', value: wishlist.length, path: '/wishlist' },
    { icon: faReceipt, label: 'Total Orders', value: 2, path: '/orders' },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-lg text-[var(--text)] opacity-80 mb-8">Ready to shop from your favorite local stores?</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} onClick={() => navigate(stat.path)} className="bg-black/10 p-6 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-colors duration-300">
              <FontAwesomeIcon icon={stat.icon} className="text-3xl text-[var(--accent)]" />
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-lg">Order {recentOrder.id}</p>
                <p className="text-sm opacity-80">{recentOrder.items}</p>
              </div>
              <button className="bg-[var(--accent)] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Track
              </button>
            </div>
            {/* Progress Bar */}
            <div className="flex items-center">
              {recentOrder.steps.map((step, index) => (
                <React.Fragment key={step.name}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-transparent border-gray-500 text-gray-500'}`}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <p className={`text-xs mt-2 ${step.completed ? 'font-semibold' : 'opacity-70'}`}>{step.name}</p>
                  </div>
                  {index < recentOrder.steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${step.completed ? 'bg-[var(--accent)]' : 'bg-gray-500'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="bg-black/10 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Recommended</h2>
            <div className="space-y-4">
              {featuredProducts.map(product => (
                <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="flex items-center gap-4 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;