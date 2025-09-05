import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Import modular components
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';
import CardPaymentForm from '../components/checkout/CardPaymentForm';
import UpiPaymentForm from '../components/checkout/UpiPaymentForm';
import CouponSection from '../components/checkout/CouponSection'; // New: Import CouponSection

const Checkout = () => {
  const { cart, checkout, user, appliedCoupon, discountAmount } = useContext(AppContext); // New: Get appliedCoupon and discountAmount
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('address'); // 'address', 'coupon', 'summary', 'payment'
  const [paymentMethod, setPaymentMethod] = useState('card');

  // NEW LOG: Log cart content on component render
  console.log('Checkout component rendering. Current cart:', cart);

  const initialAddress = user?.address || {
    houseNo: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: ''
  };

  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [addressErrors, setAddressErrors] = useState({});

  const [cardFormData, setCardFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cardErrors, setCardErrors] = useState({});

  const [upiFormData, setUpiFormData] = useState({
    upiId: '',
  });
  const [upiErrors, setUpiErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = subtotal - discountAmount; // New: Apply discount

  // Handlers for form changes
  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

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
    if (!shippingAddress.houseNo.trim()) {
      newErrors.houseNo = 'House No. is required.';
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!shippingAddress.state.trim()) {
      newErrors.state = 'State is required.';
    }
    if (!shippingAddress.pinCode.trim()) {
      newErrors.pinCode = 'Pin Code is required.';
    } else if (!/^\d{6}$/.test(shippingAddress.pinCode)) {
      newErrors.pinCode = 'Pin Code must be 6 digits.';
    }
    setAddressErrors(newErrors);
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
      setCardErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else { // UPI
      if (!upiFormData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required.';
      } else if (!/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/.test(upiFormData.upiId)) {
        newErrors.upiId = 'Invalid UPI ID format.';
      }
      setUpiErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'address') {
      if (validateAddress()) {
        setCurrentStep('coupon'); // New step
      } else {
        toast.error('Please enter a valid shipping address.');
      }
    } else if (currentStep === 'coupon') { // New step logic
      setCurrentStep('summary');
    } else if (currentStep === 'summary') {
      setCurrentStep('payment');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'coupon') { // New step logic
      setCurrentStep('address');
    } else if (currentStep === 'summary') {
      setCurrentStep('coupon'); // Go back to coupon step
    } else if (currentStep === 'payment') {
      setCurrentStep('summary');
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Attempting to place order. Current cart (inside handlePlaceOrder):', cart); // ADDED LOG
    if (validatePaymentForm()) {
      const orderDetails = {
          totalPrice: finalTotal, // New: Use finalTotal
          items: cart.map(item => ({
            product: item.product._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            unit: item.unit, // Include the unit here
          })),
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'UPI',
          appliedCoupon: appliedCoupon, // New: Pass applied coupon details
      };
      
      const newOrder = await checkout(orderDetails);
      if (newOrder) {
        navigate('/confirmation', { state: { orderDetails: newOrder } });
      }
    } else {
      toast.error('Please correct the errors in the payment form.');
    }
  };

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
        
        <CheckoutSteps currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 'address' && (
            <motion.div
              key="address-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShippingAddressForm
                address={shippingAddress}
                errors={addressErrors}
                handleChange={handleShippingAddressChange}
                onNextStep={handleNextStep}
              />
            </motion.div>
          )}

          {currentStep === 'coupon' && ( // New: Coupon step
            <motion.div
              key="coupon-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CouponSection
                currentTotalPrice={subtotal} // Pass subtotal for coupon validation
                onNextStep={handleNextStep}
                onPreviousStep={handlePreviousStep}
              />
            </motion.div>
          )}

          {currentStep === 'summary' && (
            <motion.div
              key="summary-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderSummary
                cart={cart}
                subtotal={subtotal} // New: Pass subtotal
                total={finalTotal} // New: Pass finalTotal
                appliedCoupon={appliedCoupon} // New: Pass applied coupon
                discountAmount={discountAmount} // New: Pass discount amount
                shippingAddress={shippingAddress}
                onEditAddress={() => setCurrentStep('address')} // Can go back to address
                onNextStep={handleNextStep}
                onPreviousStep={handlePreviousStep}
              />
            </motion.div>
          )}

          {currentStep === 'payment' && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}>
                {paymentMethod === 'card' ? (
                  <CardPaymentForm
                    formData={cardFormData}
                    errors={cardErrors}
                    handleChange={handleCardChange}
                    onPreviousStep={handlePreviousStep}
                    onPlaceOrder={handlePlaceOrder}
                  />
                ) : (
                  <UpiPaymentForm
                    formData={upiFormData}
                    errors={upiErrors}
                    handleChange={handleUpiChange}
                    onPreviousStep={handlePreviousStep}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
              </PaymentMethodSelector>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Checkout;