import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Wallet, Package, Users, Tag, Search, Calendar as CalendarIcon } from 'lucide-react';
import { salesData, topProductsData } from '../data/mockData';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const { user, orders, vendorProducts } = useContext(AppContext);
  const navigate = useNavigate();

  // Calculate real-time stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.customer.name)).size;
  const totalProducts = vendorProducts.length;

  return (
    <div className="w-full max-w-[1400px] mx-auto my-10 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-lg text-[var(--text)] opacity-80">Here's your store overview.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-50" size={20} />
          <input type="text" placeholder="Search orders, products..." className="w-full md:w-64 bg-black/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="relative">
              <select className="w-full appearance-none bg-black/10 border border-white/10 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text)] opacity-50"><Tag size={16} /></div>
            </div>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-50" size={20} />
              <input type="text" placeholder="dd/mm/yyyy" className="w-36 bg-black/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Wallet />} title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} change="+12% this month" />
          <div onClick={() => navigate('/orders')} className="cursor-pointer">
            <StatCard icon={<Package />} title="Total Orders" value={totalOrders} change="+5% this month" />
          </div>
          <StatCard icon={<Users />} title="Customers" value={uniqueCustomers} change="+8% this month" />
          <div onClick={() => navigate('/manage-products')} className="cursor-pointer">
            <StatCard icon={<Tag />} title="Products" value={totalProducts} change="+2 this month" />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Sales Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="var(--text)" />
                <YAxis stroke="var(--text)" tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)' }} formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Top Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} stroke="var(--text)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="sales" fill="var(--accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;