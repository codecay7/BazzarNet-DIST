import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBoxOpen, faCheckCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { mockOrders as allMockOrders } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { isVendor } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Shipped':
        return { icon: faMapMarkerAlt, color: 'text-blue-400' };
      case 'Delivered':
        return { icon: faCheckCircle, color: 'text-green-400' };
      default:
        return { icon: faBoxOpen, color: 'text-gray-400' };
    }
  };

  const handleViewDetails = (orderId) => {
    const cleanId = orderId.replace('#', '');
    if (isVendor) {
      navigate(`/orders/${cleanId}`);
    } else {
      navigate(`/my-orders/${cleanId}`);
    }
  };

  const filteredOrders = allMockOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
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