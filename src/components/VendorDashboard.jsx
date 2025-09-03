import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faChartLine, faDollarSign, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Mock data for demonstration
  const stats = [
    { icon: faDollarSign, label: 'Total Revenue', value: '$1,250', color: 'text-green-400' },
    { icon: faBoxOpen, label: 'Total Orders', value: '75', color: 'text-blue-400' },
    { icon: faChartLine, label: 'Sales this Month', value: '$450', color: 'text-purple-400' },
  ];

  const recentOrders = [
    { id: '#1236', customer: 'John Doe', total: 25.50, status: 'Pending' },
    { id: '#1235', customer: 'Jane Smith', total: 15.00, status: 'Shipped' },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-lg text-[var(--text)] opacity-80 mb-8">Here's a snapshot of your store: <span className="font-semibold text-[var(--accent)]">{user?.store}</span></p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-black/10 p-6 rounded-xl flex items-center gap-4">
              <FontAwesomeIcon icon={stat.icon} className={`text-3xl ${stat.color}`} />
              <div>
                <p className="text-sm opacity-70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => navigate('/manage-products')} className="bg-[var(--accent)] text-white py-3 px-5 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
            <FontAwesomeIcon icon={faPlus} /> Add New Product
          </button>
          <button onClick={() => navigate('/orders')} className="bg-white/10 text-[var(--text)] py-3 px-5 rounded-lg font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
            <FontAwesomeIcon icon={faEye} /> View All Orders
          </button>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="bg-black/10 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{order.id} - {order.customer}</p>
                  <p className="text-sm opacity-80">${order.total.toFixed(2)}</p>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;