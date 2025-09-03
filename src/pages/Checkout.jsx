import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMapMarkerAlt, faShoppingCart, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, checkout, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('address'); // 'address', 'summary', 'payment'
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [cardFormData, setCardFormData] = useState({
    shippingAddress: user?.address || '', // Pre-fill if user has an address in profile
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cardErrors, setCardErrors] = useState({});

  const [upiFormData, setUpiFormData] = useState({
    shippingAddress: user?.address || '', // Pre-fill if user has an address in profile
    upiId: '',
  });
  const [upiErrors, setUpiErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handlers for form changes
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setUpiFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation functions for each step
  const validateAddress = () => {
    let newErrors = {};
    const address = paymentMethod === 'card' ? cardFormData.shippingAddress : upiFormData.shippingAddress;
    if (!address.trim()) {
      newErrors.shippingAddress = 'Shipping Address is required.';
    }
    if (paymentMethod === 'card') {
      setCardErrors(prev => ({ ...prev, shippingAddress: newErrors.shippingAddress }));
    } else {
      setUpiErrors(prev => ({ ...prev, shippingAddress: newErrors.shippingAddress }));
    }
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    let newErrors = {};
    if (paymentMethod === 'card') {
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
      setCardErrors(prev => ({ ...prev, ...newErrors }));
      return Object.keys(newErrors).length === 0;
    } else { // UPI
      if (!upiFormData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required.';
      } else if (!/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/.test(upiFormData.upiId)) {
        newErrors.upiId = 'Invalid UPI ID format.';
      }
      setUpiErrors(prev => ({ ...prev, ...newErrors }));
      return Object.keys(newErrors).length === 0;
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'address') {
      if (validateAddress()) {
        setCurrentStep('summary');
      } else {
        toast.error('Please enter a valid shipping address.');
      }
    } else if (currentStep === 'summary') {
      setCurrentStep('payment');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'summary') {
      setCurrentStep('address');
    } else if (currentStep === 'payment') {
      setCurrentStep('summary');
    }
  };

  const handlePlaceOrder = () => {
    if (validatePaymentForm()) {
      const orderDetails = {
          orderId: Math.floor(Math.random() * 100000),
          total,
          cart,
          shippingAddress: paymentMethod === 'card' ? cardFormData.shippingAddress : upiFormData.shippingAddress,
          paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'UPI',
      };
      
      checkout(); // Clears the cart
      toast.success('Order placed successfully!');
      navigate('/confirmation', { state: { orderDetails } });
    } else {
      toast.error('Please correct the errors in the payment form.');
    }
  };

  const inputClasses = "w-full p-2 rounded-lg bg-white/10 border border-black/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] text-base md:text-lg";

  if (cart.length === 0 && currentStep !== 'confirmation') {
    return (
      <section className="w-full max-w-[1200px] my-10">
        <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4 text-center">
          <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-[var(--accent)] mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
          <p className="text-lg mb-4">Add some items to proceed to checkout.</p>
          <Link to="/products" className="bg-[var(--accent)] text-white border-none py-2 px-6 rounded-lg font-medium hover:bg-[var(--accent-dark)] transition-all duration-300">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] my-10">
      <div className="bg-[var(--card-bg)] backdrop-blur-[5px] border border-white/30 rounded-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold mb-5 md:text-4xl text-center">Checkout</h2>
        
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-4 mb-8 text-sm md:text-base">
          <span className={`font-semibold ${currentStep === 'address' ? 'text-[var(--accent)]' : 'opacity-60'}`}>1. Address</span>
          <FontAwesomeIcon icon={faChevronRight} className="opacity-40" />
          <span className={`font-semibold ${currentStep === 'summary' ? 'text-[var(--accent)]' : 'opacity-60'}`}>2. Summary</span>
          <FontAwesomeIcon icon={faChevronRight} className="opacity-40" />
          <span className={`font-semibold ${currentStep === 'payment' ? 'text-[var(--accent)]' : 'opacity-60'}`}>3. Payment</span>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'address' && (
            <motion.div
              key="address-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 max-w-[500px] mx-auto"
              role="form"
              aria-labelledby="address-heading"
            >
              <h3 id="address-heading" className="text-2xl font-bold mb-2 text-center">Shipping Address</h3>
              <label htmlFor="shippingAddress" className="sr-only">Shipping Address</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={paymentMethod === 'card' ? cardFormData.shippingAddress : upiFormData.shippingAddress}
                onChange={paymentMethod === 'card' ? handleCardChange : handleUpiChange}
                placeholder="Enter your shipping address"
                rows="4"
                className={inputClasses}
                aria-invalid={!!(paymentMethod === 'card' ? cardErrors.shippingAddress : upiErrors.shippingAddress)}
                aria-describedby={(paymentMethod === 'card' ? cardErrors.shippingAddress : upiErrors.shippingAddress) ? "shippingAddress-error" : undefined}
              ></textarea>
              {(paymentMethod === 'card' ? cardErrors.shippingAddress : upiErrors.shippingAddress) && <p id="shippingAddress-error" className="text-red-400 text-xs -mt-3">{(paymentMethod === 'card' ? cardErrors.shippingAddress : upiErrors.shippingAddress)}</p>}
              
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 mt-4"
                aria-label="Proceed to Order Summary"
              >
                Proceed to Summary <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
              </button>
            </motion.div>
          )}

          {currentStep === 'summary' && (
            <motion.div
              key="summary-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-[600px] mx-auto"
              role="region"
              aria-labelledby="summary-heading"
            >
              <h3 id="summary-heading" className="text-2xl font-bold mb-4 text-center">Order Summary</h3>
              <div className="bg-black/10 p-6 rounded-xl mb-6">
                <h4 className="font-semibold text-lg mb-3 border-b border-white/20 pb-2">Items in Cart</h4>
                <ul className="space-y-3" role="list">
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center" role="listitem">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/20 pt-4 mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold">Total:</p>
                  <p className="text-xl font-bold text-[var(--accent)]">₹{total.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-black/10 p-6 rounded-xl mb-6">
                <h4 className="font-semibold text-lg mb-3 border-b border-white/20 pb-2">Shipping Address</h4>
                <p className="opacity-80">{paymentMethod === 'card' ? cardFormData.shippingAddress : upiFormData.shippingAddress}</p>
                <button
                  type="button"
                  onClick={() => setCurrentStep('address')}
                  className="text-[var(--accent)] text-sm mt-2 hover:underline"
                  aria-label="Edit shipping address"
                >
                  Edit Address
                </button>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-white/10 text-[var(--text)] border-none py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300 flex-1"
                  aria-label="Go back to Address step"
                >
                  <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 flex-1"
                  aria-label="Proceed to Payment"
                >
                  Proceed to Payment <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'payment' && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-[500px] mx-auto"
              role="form"
              aria-labelledby="payment-heading"
            >
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
                {paymentMethod === 'card' ? (
                  <motion.form
                    key="card-form"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                    }}
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
                  </motion.form>
                ) : (
                  <motion.form
                    key="upi-form"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                    }}
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
                      value={upiFormData.upiId}
                      onChange={handleUpiChange}
                      placeholder="Enter your UPI ID"
                      className={inputClasses}
                      aria-invalid={!!upiErrors.upiId}
                      aria-describedby={upiErrors.upiId ? "upiId-error" : undefined}
                    />
                    {upiErrors.upiId && <p id="upiId-error" className="text-red-400 text-xs -mt-3">{upiErrors.upiId}</p>}
                    <p className="text-xs text-center opacity-70">e.g., yourname@okhdfcbank</p>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-white/10 text-[var(--text)] border-none py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-white/20 transition-all duration-300 flex-1"
                  aria-label="Go back to Order Summary"
                >
                  <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="bg-[var(--accent)] text-white border-none py-3 px-6 rounded-lg flex items-center justify-center w-full gap-2 font-medium hover:bg-[var(--accent-dark)] transition-all duration-300 flex-1"
                  aria-label="Place Order"
                >
                  <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" /> Place Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;