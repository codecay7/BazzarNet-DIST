import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faChartLine, faDollarSign, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const VendorDashboard = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Mock data for demonstration
  const stats = [
    { icon: faDollarSign, label: 'Total Revenue', value: '₹1,250', color: 'text-green-400' },
    { icon: faBoxOpen, label: 'Total Orders', value: '75', color: 'text-blue-400' },
    { icon: faChartLine, label: 'Sales this Month', value: '₹450', color: 'text-purple-400' },
  ];

  const salesData = [
    { day: 'Mon', sales: 250 },
    { day: 'Tue', sales: 180 },
    { day: 'Wed', sales: 320 },
    { day: 'Thu', sales: 280 },
    { day: 'Fri', sales: 450 },
    { day: 'Sat', sales: 600 },
    { day: 'Sun', sales: 550 },
  ];

  const recentOrders = [
    { id: '#1236', customer: 'John Doe', total: 25.50, status: 'Pending' },
    { id: '#1235', customer: 'Jane Smith', total: 15.00, status: 'Shipped' },
    { id: '#1234', customer: 'Sam Wilson', total: 45.00, status: 'Delivered' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Shipped': return 'bg-blue-500/20 text-blue-400';
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-lg text-[var(--text)] opacity-80">Your store: <span className="font-semibold text-[var(--accent)]">{user?.store}</span></p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button onClick={() => navigate('/manage-products')} className="bg-[var(--accent)] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-[var(--accent-dark)] transition-colors">
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button>
            <button onClick={() => navigate('/orders')} className="bg-white/10 text-[var(--text)] py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
              <FontAwesomeIcon icon={faEye} /> View Orders
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-black/10 p-6 rounded-xl flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <FontAwesomeIcon icon={stat.icon} className={`text-3xl ${stat.color}`} />
              <div>
                <p className="text-sm opacity-70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Chart & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-black/10 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="day" stroke="var(--text)" />
                <YAxis stroke="var(--text)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="sales" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-black/10 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-sm opacity-80">{order.id} - ₹{order.total.toFixed(2)}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;