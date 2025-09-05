import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-qr-code';

const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg";

const formVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const UPI_ID = 'kumardiwakar497@ptyes';
const UPI_PAYMENT_LINK = `upi://pay?pa=${UPI_ID}&pn=BazzarNet&mc=0000&mode=02&purpose=00&orgid=159761`; // Generic UPI deep link

const QrPaymentForm = ({ formData, errors, handleChange, onPreviousStep, onPlaceOrder }) => {
  return (
    <motion.form
      key="qr-upi-form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4 max-w-[500px] mx-auto"
      role="tabpanel"
      id="qr-upi-payment-panel"
      aria-labelledby="payment-heading"
    >
      <h3 id="payment-heading" className="text-2xl font-bold mb-4 text-center">Complete Payment</h3>
      
      <div className="bg-black/10 p-6 rounded-xl text-center">
        <p className="text-lg font-semibold mb-3">Scan to Pay or Use UPI ID:</p>
        <div className="flex justify-center mb-4 p-2 bg-white rounded-lg">
          <QRCode value={UPI_PAYMENT_LINK} size={180} level="H" className="rounded-lg" aria-label={`QR code for UPI ID ${UPI_ID}`} />
        </div>
        <p className="text-xl font-bold text-[var(--accent)] mb-2">{UPI_ID}</p>
        <p className="text-sm opacity-80">Open your UPI app (Paytm, GPay, PhonePe, etc.) and pay to this ID.</p>
        <a 
          href={UPI_PAYMENT_LINK} 
          className="inline-block mt-4 bg-[var(--accent)] text-white py-2 px-4 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-colors md:hidden"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open UPI app to pay"
        >
          Open UPI App
        </a>
      </div>

      <div>
        <label htmlFor="transactionId" className="block text-sm font-medium mb-1">Enter Transaction ID</label>
        <input
          type="text"
          id="transactionId"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          placeholder="e.g., 123456789012"
          className={inputClasses}
          aria-invalid={!!errors.transactionId}
          aria-describedby={errors.transactionId ? "transactionId-error" : undefined}
        />
        {errors.transactionId && <p id="transactionId-error" className="text-red-400 text-xs mt-1">{errors.transactionId}</p>}
        <p className="text-xs text-center opacity-70 mt-1">After successful payment, you will receive a Transaction ID. Please paste it here.</p>
      </div>

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
          aria-label="Complete Order"
        >
          <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" /> Complete Order
        </button>
      </div>
    </motion.form>
  );
};

export default QrPaymentForm;