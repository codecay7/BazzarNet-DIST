import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faReceipt, faTruck, faTimesCircle, faCheckCircle, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import SkeletonText from '../components/SkeletonText';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, optionsDate);
};

const AdminOrderManagement = () => {
  const { orders, updateOrderStatus, simulateLoading } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Pending', 'Shipped', 'Delivered', 'Cancelled'
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateLoading(800);
      setLoading(false);
    };
    loadData();
  }, [searchTerm, filterStatus, orders.length, simulateLoading]);

  const filteredOrders = useMemo(() => {
    let currentOrders = orders;

    if (searchTerm) {
      currentOrders = currentOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      currentOrders = currentOrders.filter(order => order.status === filterStatus);
    }

    return currentOrders;
  }, [orders, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Shipped': return 'bg-blue-500/20 text-blue-400';
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleRefund = (orderId) => {
    toast.success(`Refund initiated for Order ${orderId}.`);
    // In a real app, this would trigger a backend refund process.
  };

  return (
    <section className="w-full max-w-[1400px] my-10 mx-auto px-4 md:px-8">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 md:text-4xl">Order Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-50" />
            <input
              type="text"
              placeholder="Search by Order ID, customer, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] pl-10 text-[var(--text)]"
              aria-label="Search orders"
            />
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] pr-8 text-[var(--text)]"
              aria-label="Filter by order status"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text)]" aria-hidden="true"><ChevronDown size={20} /></div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div key={index} className="bg-black/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
                <div className="flex-1">
                  <SkeletonText width="120px" height="1.5rem" className="mb-1" />
                  <SkeletonText width="180px" height="1rem" />
                </div>
                <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-2">
                  <SkeletonText width="80px" height="1rem" />
                  <SkeletonText width="100px" height="1.5rem" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-400">
                  <th scope="col" className="px-4 py-3">Order ID</th>
                  <th scope="col" className="px-4 py-3">Customer</th>
                  <th scope="col" className="px-4 py-3">Date</th>
                  <th scope="col" className="px-4 py-3">Total</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-black/5 transition-colors duration-200">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <p>{order.customer.name}</p>
                      <p className="text-xs opacity-70">{order.customer.email}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">{formatTimestamp(order.timestamp)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">₹{order.total.toFixed(2)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="p-2 rounded-lg bg-white/10 border border-black/30 text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          aria-label={`Update status for order ${order.id}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleRefund(order.id)}
                          className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors duration-200"
                          title="Initiate Refund"
                          aria-label={`Initiate refund for order ${order.id}`}
                        >
                          <FontAwesomeIcon icon={faMoneyBillWave} size="sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 py-10">No orders found matching your criteria.</p>
        )}

        {!loading && filteredOrders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default AdminOrderManagement;