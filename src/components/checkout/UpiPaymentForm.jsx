import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg";

const formVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const UpiPaymentForm = ({ formData, errors, handleChange, onPreviousStep, onPlaceOrder }) => {
  return (
    <motion.form
      key="upi-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4"
      role="tabpanel"
      id="upi-payment-panel"
      aria-labelledby="upi-payment-tab"
    >
      <label htmlFor="upiId" className="sr-only">UPI ID</label>
      <input
        type="text"
        id="upiId"
        name="upiId"
        value={formData.upiId}
        onChange={handleChange}
        placeholder="Enter your UPI ID"
        className={inputClasses}
        aria-invalid={!!errors.upiId}
        aria-describedby={errors.upiId ? "upiId-error" : undefined}
      />
      {errors.upiId && <p id="upiId-error" className="text-red-400 text-xs -mt-3">{errors.upiId}</p>}
      <p className="text-xs text-center opacity-70">e.g., yourname@okhdfcbank</p>

      <div className="flex justify-between gap-4 mt-6">
        <button
          type="button"
          onClick={onPreviousStep}
          className="bg-white/10 text-[var(--text)] border-none py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300 flex-1"
          aria-label="Go back to Order Summary"
        >
          <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" /> Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 flex-1"
          aria-label="Place Order"
        >
          <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" /> Place Order
        </button>
      </div>
    </motion.form>
  );
};

export default UpiPaymentForm;