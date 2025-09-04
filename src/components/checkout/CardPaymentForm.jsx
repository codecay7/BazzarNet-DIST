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

const CardPaymentForm = ({ formData, errors, handleChange, onPreviousStep, onPlaceOrder }) => {
  return (
    <motion.form
      key="card-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4"
      role="tabpanel"
      id="card-payment-panel"
      aria-labelledby="card-payment-tab"
    >
      <label htmlFor="cardNumber" className="sr-only">Credit Card Number</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="Credit Card Number"
        className={inputClasses}
        aria-invalid={!!errors.cardNumber}
        aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
      />
      {errors.cardNumber && <p id="cardNumber-error" className="text-red-400 text-xs -mt-3">{errors.cardNumber}</p>}
      
      <label htmlFor="expiryDate" className="sr-only">Expiration Date (MM/YY)</label>
      <input
        type="text"
        id="expiryDate"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
        placeholder="Expiration Date (MM/YY)"
        className={inputClasses}
        aria-invalid={!!errors.expiryDate}
        aria-describedby={errors.expiryDate ? "expiryDate-error" : undefined}
      />
      {errors.expiryDate && <p id="expiryDate-error" className="text-red-400 text-xs -mt-3">{errors.expiryDate}</p>}
      
      <label htmlFor="cvv" className="sr-only">CVV</label>
      <input
        type="text"
        id="cvv"
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        placeholder="CVV"
        className={inputClasses}
        aria-invalid={!!errors.cvv}
        aria-describedby={errors.cvv ? "cvv-error" : undefined}
      />
      {errors.cvv && <p id="cvv-error" className="text-red-400 text-xs -mt-3">{errors.cvv}</p>}

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

export default CardPaymentForm;