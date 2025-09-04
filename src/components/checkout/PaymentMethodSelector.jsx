import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod, children }) => {
  return (
    <div className="max-w-[500px] mx-auto" role="form" aria-labelledby="payment-heading">
      <h3 id="payment-heading" className="text-2xl font-bold mb-4 text-center">Payment Options</h3>
      
      <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-6" role="tablist">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${paymentMethod === 'card' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
          role="tab"
          aria-selected={paymentMethod === 'card'}
          aria-controls="card-payment-panel"
          id="card-payment-tab"
        >
          Card Payment
        </button>
        <button
          onClick={() => setPaymentMethod('upi')}
          className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${paymentMethod === 'upi' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'}`}
          role="tab"
          aria-selected={paymentMethod === 'upi'}
          aria-controls="upi-payment-panel"
          id="upi-payment-tab"
        >
          UPI
        </button>
      </div>

      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethodSelector;