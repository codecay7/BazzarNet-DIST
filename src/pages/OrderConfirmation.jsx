import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

const OrderConfirmation = () => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const { orderDetails } = location.state || { orderDetails: null };

  if (!orderDetails) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No order details found.</h2>
            <Link to="/dashboard" className="bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                Back to Dashboard
            </Link>
        </div>
    );
  }

  const { orderId, total, cart } = orderDetails;

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4 text-center">
        <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Thank You for Your Order, {user?.name}!</h2>
        <p className="text-lg mb-6">Your order has been placed successfully.</p>
        
        <div className="text-left max-w-md mx-auto bg-black/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Order Summary</h3>
            <p className="mb-2"><strong>Order ID:</strong> #{orderId}</p>
            <p className="mb-4"><strong>Total:</strong> ₹{total.toFixed(2)}</p>
            <div className="mb-4">
                <h4 className="font-semibold">Items:</h4>
                <ul>
                    {cart.map(item => (
                        <li key={item.id} className="flex justify-between py-1">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-sm opacity-80">You will receive an email confirmation shortly.</p>
        </div>

        <Link to="/dashboard" className="inline-block mt-8 bg-[var(--accent)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
            Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default OrderConfirmation;