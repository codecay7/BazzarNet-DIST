import { useState, useEffect, useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import * as api from '../services/api';
import { AppContext } from '../context/AppContext'; // To access user and isLoggedIn

const useCoupons = () => {
  const { user, isLoggedIn, orders } = useContext(AppContext); // Need user for new user check, orders for history
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // Stores the validated coupon object
  const [discountAmount, setDiscountAmount] = useState(0);

  const fetchAvailableCoupons = useCallback(async () => {
    if (!isLoggedIn) {
      setAvailableCoupons([]);
      return;
    }
    try {
      // Fetch all active coupons. The backend controller will filter for non-admin users.
      const coupons = await api.coupon.getAll();
      
      // Client-side filter for new user coupons if user has orders
      const filteredCoupons = coupons.filter(coupon => {
        if (coupon.isNewUserOnly && orders.length > 0) {
          return false; // Hide new user coupon if user has existing orders
        }
        return true;
      });

      setAvailableCoupons(filteredCoupons);
    } catch (error) {
      console.error('Failed to fetch available coupons:', error);
      // toast.error(`Failed to load coupons: ${error.message}`); // Don't spam toast for this
      setAvailableCoupons([]);
    }
  }, [isLoggedIn, user, orders]); // Depend on user and orders to re-fetch if status changes

  useEffect(() => {
    fetchAvailableCoupons();
  }, [fetchAvailableCoupons]);

  const applyCoupon = useCallback(async (code, totalPrice) => {
    if (!isLoggedIn) {
      toast.error('Please log in to apply coupons.');
      return false;
    }
    if (!code) {
      toast.error('Please enter a coupon code.');
      return false;
    }
    try {
      const response = await api.coupon.validate(code, totalPrice);
      setAppliedCoupon(response.coupon);
      setDiscountAmount(response.coupon.discountAmount);
      toast.success(response.message);
      return true;
    } catch (error) {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      toast.error(error.message || 'Failed to apply coupon.');
      return false;
    }
  }, [isLoggedIn]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    toast.info('Coupon removed.');
  }, []);

  return {
    availableCoupons,
    appliedCoupon,
    discountAmount,
    fetchAvailableCoupons,
    applyCoupon,
    removeCoupon,
    setAppliedCoupon, // Expose setter for initial load if needed
    setDiscountAmount, // Expose setter for initial load if needed
  };
};

export default useCoupons;