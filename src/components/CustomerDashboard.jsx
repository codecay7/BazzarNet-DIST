import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBoxOpen, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Mock data for demonstration
  const recentOrder = {
    id: '#1234',
    items: 'Apples, Bread',
    status: 'Out for Delivery',
  };

  const featuredProducts = [
    { id: 1, name: 'Fresh Apples', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop' },
    { id: 2, name: 'Sourdough Bread', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-lg text-[var(--text)] opacity-80 mb-8">Ready to shop from your favorite local stores?</p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => navigate('/stores')} className="bg-[var(--accent)] text-white py-3 px-5 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
            <FontAwesomeIcon icon={faShoppingBag} /> Browse Stores
          </button>
          <button onClick={() => navigate('/wishlist')} className="bg-white/10 text-[var(--text)] py-3 px-5 rounded-lg font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
            <FontAwesomeIcon icon={faHeart} /> View Wishlist
          </button>
        </div>

        {/* Recent Order Status */}
        <div className="bg-black/10 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Order Status</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Order {recentOrder.id} ({recentOrder.items})</p>
              <p className="text-sm opacity-80">Status: {recentOrder.status}</p>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Track Order</span>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="bg-black/10 p-4 rounded-lg text-center cursor-pointer hover:bg-white/20 transition-colors">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-2" />
                <p className="font-semibold">{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;