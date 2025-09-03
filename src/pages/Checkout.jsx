import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, checkout } = useContext(AppContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderDetails = {
        orderId: Math.floor(Math.random() * 100000),
        total,
        cart,
    };
    
    checkout(); // Clears the cart
    navigate('/confirmation', { state: { orderDetails } });
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Checkout</h2>
        
        <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-6 max-w-sm mx-auto">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${paymentMethod === 'card' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
          >
            Card Payment
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${paymentMethod === 'upi' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
          >
            UPI
          </button>
        </div>

        <AnimatePresence mode="wait">
          {paymentMethod === 'card' ? (
            <motion.form
              key="card"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4 max-w-[500px] mx-auto"
            >
              <input type="text" placeholder="Shipping Address" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <input type="text" placeholder="Credit Card Number" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <input type="text" placeholder="Expiration Date (MM/YY)" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <input type="text" placeholder="CVV" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <button type="button" onClick={handleCheckout} className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                <FontAwesomeIcon icon={faCreditCard} /> Pay Now
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="upi"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4 max-w-[500px] mx-auto"
            >
              <input type="text" placeholder="Shipping Address" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <input type="text" placeholder="Enter your UPI ID" className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg" required />
              <p className="text-xs text-center opacity-70">e.g., yourname@okhdfcbank</p>
              <button type="button" onClick={handleCheckout} className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                Pay with UPI
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;