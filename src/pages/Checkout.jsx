import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, checkout } = useContext(AppContext);
  const navigate = useNavigate();

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

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl">Checkout</h2>
        <form className="flex flex-col gap-4 max-w-[500px] mx-auto">
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Shipping Address"
            required
          />
          <input
            type="text"
            placeholder="Credit Card Number"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Credit Card Number"
            required
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="Expiration Date"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg"
            aria-label="CVV"
            required
          />
          <button
            type="button"
            className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
            onClick={handleCheckout}
          >
            <FontAwesomeIcon icon={faCreditCard} /> Pay Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;