import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTruck, faHome } from '@fortawesome/free-solid-svg-icons';

// Helper function to format ISO timestamp
const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);
  return `${formattedDate} at ${formattedTime}`;
};

const CustomerOrderDetails = () => {
  const { orderId } = useParams();
  const { orders } = useContext(AppContext);
  const order = orders.find(o => o.id === `#${orderId}`);

  if (!order) {
    return (
      <section className="w-full max-w-[1200px] my-10 text-center">
        <h2 className="text-2xl font-bold">Order not found.</h2>
        <Link to="/orders" className="text-[var(--accent)] hover:underline">Back to Your Orders</Link>
      </section>
    );
  }

  const steps = [
    { name: 'Ordered', completed: true, icon: faBox },
    { name: 'Shipped', completed: ['Shipped', 'Delivered'].includes(order.status), icon: faTruck },
    { name: 'Delivered', completed: order.status === 'Delivered', icon: faHome },
  ];

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-2">Order Details</h2>
        <p className="text-lg text-[var(--text)] opacity-80 mb-2">Order ID: {order.id}</p>
        <p className="text-lg text-[var(--text)] opacity-80 mb-8">Order Placed: {formatTimestamp(order.timestamp)}</p> {/* Display formatted timestamp */}

        {/* Order Tracker */}
        <div className="bg-black/10 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold mb-6">Order Status: <span className="text-[var(--accent)]">{order.status}</span></h3>
          <div className="flex items-center" role="progressbar" aria-valuenow={steps.filter(s => s.completed).length} aria-valuemin="0" aria-valuemax={steps.length} aria-label={`Order ${order.id} progress`}>
            {steps.map((step, index) => (
              <React.Fragment key={step.name}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-transparent border-gray-500 text-gray-500'}`} aria-hidden="true">
                    <FontAwesomeIcon icon={step.icon} size="lg" />
                  </div>
                  <p className={`text-sm mt-2 text-center ${step.completed ? 'font-semibold' : 'opacity-70'}`}>{step.name}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${step.completed ? 'bg-[var(--accent)]' : 'bg-gray-500'}`} aria-hidden="true"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Payment & Transaction Details */}
        <div className="bg-black/10 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <p className="mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Transaction ID:</strong> {order.transactionId}</p>
        </div>

        {/* Items List */}
        <div className="bg-black/10 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Items in Your Order</h3>
          <div className="space-y-4" role="list">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-black/10 p-3 rounded-lg" role="listitem" aria-label={`Item: ${item.name}, Quantity: ${item.quantity}, Price: ₹{(item.price * item.quantity).toFixed(2)}`}>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm opacity-80">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-right mt-4 pt-4 border-t border-white/20">
            <p className="text-xl font-bold">Total: ₹{order.total.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
            <Link to="/orders" className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                Back to All Orders
            </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomerOrderDetails;