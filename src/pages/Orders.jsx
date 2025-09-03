import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBoxOpen, faCheckCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { mockOrders as allMockOrders } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const { isVendor } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Out for Delivery':
        return { icon: faMapMarkerAlt, color: 'text-blue-400' };
      case 'Delivered':
        return { icon: faCheckCircle, color: 'text-green-400' };
      default:
        return { icon: faBoxOpen, color: 'text-gray-400' };
    }
  };

  const filteredOrders = allMockOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">{isVendor ? 'Store Orders' : 'Your Orders'}</h2>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by Order ID or items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
          />
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => {
              const statusInfo = getStatusInfo(order.status);
              const isExpanded = expandedOrder === order.id;
              return (
                <div key={order.id} className="bg-black/10 rounded-2xl p-6 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold md:text-2xl mb-2">Order {order.id}</h3>
                      <p className="text-base md:text-lg"><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3">
                      <div className={`flex items-center gap-2 font-semibold ${statusInfo.color}`}>
                        <FontAwesomeIcon icon={statusInfo.icon} />
                        <span>{order.status}</span>
                      </div>
                      <button
                        className="bg-[var(--accent)] w-full md:w-fit text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        View Details <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-4 border-t border-white/20">
                          <h4 className="font-semibold text-lg mb-3">Items in this order:</h4>
                          <div className="space-y-4">
                            {order.items.map(item => (
                              <div key={item.id} className="flex items-center gap-4 bg-black/10 p-3 rounded-lg">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div className="flex-grow">
                                  <p className="font-semibold">{item.name}</p>
                                  <p className="text-sm opacity-80">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80">No orders found matching your search.</p>
        )}
      </div>
    </section>
  );
};

export default Orders;