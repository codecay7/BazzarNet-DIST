import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, checkout } = useContext(AppContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [cardFormData, setCardFormData] = useState({
    shippingAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cardErrors, setCardErrors] = useState({});

  const [upiFormData, setUpiFormData] = useState({
    shippingAddress: '',
    upiId: '',
  });
  const [upiErrors, setUpiErrors] = useState({});

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setUpiFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateCardForm = () => {
    let newErrors = {};
    if (!cardFormData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping Address is required.';
    }
    if (!cardFormData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card Number is required.';
    } else if (!/^\d{16}$/.test(cardFormData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card Number must be 16 digits.';
    }
    if (!cardFormData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry Date is required.';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardFormData.expiryDate)) {
      newErrors.expiryDate = 'Invalid Expiry Date (MM/YY).';
    }
    if (!cardFormData.cvv.trim()) {
      newErrors.cvv = 'CVV is required.';
    } else if (!/^\d{3,4}$/.test(cardFormData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits.';
    }
    setCardErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpiForm = () => {
    let newErrors = {};
    if (!upiFormData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping Address is required.';
    }
    if (!upiFormData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required.';
    } else if (!/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/.test(upiFormData.upiId)) {
      newErrors.upiId = 'Invalid UPI ID format.';
    }
    setUpiErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    let isValid = false;
    if (paymentMethod === 'card') {
      isValid = validateCardForm();
    } else {
      isValid = validateUpiForm();
    }

    if (isValid) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderDetails = {
          orderId: Math.floor(Math.random() * 100000),
          total,
          cart,
      };
      
      checkout(); // Clears the cart
      toast.success('Order placed successfully!');
      navigate('/confirmation', { state: { orderDetails } });
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg";

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Checkout</h2>
        
        <div className="flex justify-center bg-black/10 rounded-lg p-1 mb-6 max-w-sm mx-auto" role="tablist">
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
          {paymentMethod === 'card' ? (
            <motion.form
              key="card"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4 max-w-[500px] mx-auto"
              role="tabpanel"
              id="card-payment-panel"
              aria-labelledby="card-payment-tab"
            >
              <label htmlFor="cardShippingAddress" className="sr-only">Shipping Address</label>
              <input 
                type="text" 
                id="cardShippingAddress"
                name="shippingAddress" 
                value={cardFormData.shippingAddress} 
                onChange={handleCardChange} 
                placeholder="Shipping Address" 
                className={inputClasses} 
                aria-invalid={!!cardErrors.shippingAddress}
                aria-describedby={cardErrors.shippingAddress ? "cardShippingAddress-error" : undefined}
              />
              {cardErrors.shippingAddress && <p id="cardShippingAddress-error" className="text-red-400 text-xs -mt-3">{cardErrors.shippingAddress}</p>}
              
              <label htmlFor="cardNumber" className="sr-only">Credit Card Number</label>
              <input 
                type="text" 
                id="cardNumber"
                name="cardNumber" 
                value={cardFormData.cardNumber} 
                onChange={handleCardChange} 
                placeholder="Credit Card Number" 
                className={inputClasses} 
                aria-invalid={!!cardErrors.cardNumber}
                aria-describedby={cardErrors.cardNumber ? "cardNumber-error" : undefined}
              />
              {cardErrors.cardNumber && <p id="cardNumber-error" className="text-red-400 text-xs -mt-3">{cardErrors.cardNumber}</p>}
              
              <label htmlFor="expiryDate" className="sr-only">Expiration Date (MM/YY)</label>
              <input 
                type="text" 
                id="expiryDate"
                name="expiryDate" 
                value={cardFormData.expiryDate} 
                onChange={handleCardChange} 
                placeholder="Expiration Date (MM/YY)" 
                className={inputClasses} 
                aria-invalid={!!cardErrors.expiryDate}
                aria-describedby={cardErrors.expiryDate ? "expiryDate-error" : undefined}
              />
              {cardErrors.expiryDate && <p id="expiryDate-error" className="text-red-400 text-xs -mt-3">{cardErrors.expiryDate}</p>}
              
              <label htmlFor="cvv" className="sr-only">CVV</label>
              <input 
                type="text" 
                id="cvv"
                name="cvv" 
                value={cardFormData.cvv} 
                onChange={handleCardChange} 
                placeholder="CVV" 
                className={inputClasses} 
                aria-invalid={!!cardErrors.cvv}
                aria-describedby={cardErrors.cvv ? "cvv-error" : undefined}
              />
              {cardErrors.cvv && <p id="cvv-error" className="text-red-400 text-xs -mt-3">{cardErrors.cvv}</p>}
              <button type="button" onClick={handleCheckout} className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
                <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" /> Pay Now
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
              role="tabpanel"
              id="upi-payment-panel"
              aria-labelledby="upi-payment-tab"
            >
              <label htmlFor="upiShippingAddress" className="sr-only">Shipping Address</label>
              <input 
                type="text" 
                id="upiShippingAddress"
                name="shippingAddress" 
                value={upiFormData.shippingAddress} 
                onChange={handleUpiChange} 
                placeholder="Shipping Address" 
                className={inputClasses} 
                aria-invalid={!!upiErrors.shippingAddress}
                aria-describedby={upiErrors.shippingAddress ? "upiShippingAddress-error" : undefined}
              />
              {upiErrors.shippingAddress && <p id="upiShippingAddress-error" className="text-red-400 text-xs -mt-3">{upiErrors.shippingAddress}</p>}
              
              <label htmlFor="upiId" className="sr-only">UPI ID</label>
              <input 
                type="text" 
                id="upiId"
                name="upiId" 
                value={upiFormData.upiId} 
                onChange={handleUpiChange} 
                placeholder="Enter your UPI ID" 
                className={inputClasses} 
                aria-invalid={!!upiErrors.upiId}
                aria-describedby={upiErrors.upiId ? "upiId-error" : undefined}
              />
              {upiErrors.upiId && <p id="upiId-error" className="text-red-400 text-xs -mt-3">{upiErrors.upiId}</p>}
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