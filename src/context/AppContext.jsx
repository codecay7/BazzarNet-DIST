import React, { createContext, useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import useUtils from '../hooks/useUtils';
import useProducts from '../hooks/useProducts';
import useStores from '../hooks/useStores';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import useOrders from '../hooks/useOrders';
import useUsers from '../hooks/useUsers';
import useVendorProducts from '../hooks/useVendorProducts';
import useAdminProducts from '../hooks/useAdminProducts';
import useAdminStores from '../hooks/useAdminStores';
import useCoupons from '../hooks/useCoupons'; // New: Import useCoupons hook
import * as api from '../services/api'; // Still needed for direct API calls in some places
import toast from 'react-hot-toast'; // NEW: Import toast for notifications

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const {
    isLoggedIn,
    user,
    isVendor,
    isAdmin,
    loginAsUser,
    loginAsVendor,
    loginAsAdmin,
    logout,
    setUser: setAuthUser,
    loginUserInState,
  } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const { /* simulateLoading, */ generateOtp } = useUtils(); // Removed simulateLoading

  // Sidebar state is still local to AppContext as it's a global UI state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  // --- Data Hooks ---
  const {
    allAppProducts,
    allAppProductsMeta,
    fetchAllProducts,
    recommendedProducts,
    recommendedLoading,
    fetchRecommendedProducts,
    setAllAppProducts, // Expose for admin/vendor product updates
    setAllAppProductsMeta // Destructure setAllAppProductsMeta here
  } = useProducts();

  const {
    appStores,
    appStoresMeta,
    fetchAppStores,
    setAppStores, // Expose for admin store updates
    setAppStoresMeta, // Destructure setAppStoresMeta here
  } = useStores();

  const {
    cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    checkout,
    setCart
  } = useCart(isLoggedIn, user, isVendor, isAdmin);

  const {
    wishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    moveToWishlist,
    setWishlist
  } = useWishlist(isLoggedIn, user, isVendor, isAdmin, addToCart, fetchCart);

  const {
    orders,
    ordersMeta,
    fetchOrders,
    updateOrderStatus,
    confirmDeliveryWithOtp,
    setOrders,
    setOrdersMeta, // Destructure setOrdersMeta here
  } = useOrders(isLoggedIn, user, isVendor, isAdmin);

  const {
    allAppUsers,
    allAppUsersMeta,
    fetchAllUsers,
    deleteUser,
    updateUserStatus,
    setAllAppUsers, // Destructure setAllAppUsers here
    setAllAppUsersMeta, // Destructure setAllAppUsersMeta here
  } = useUsers(isLoggedIn, isAdmin, fetchAllProducts, fetchAppStores);

  const {
    vendorProducts,
    vendorProductsMeta,
    fetchVendorProducts,
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    setVendorProducts,
    setVendorProductsMeta, // Destructure setVendorProductsMeta here
  } = useVendorProducts(isLoggedIn, isVendor, user);

  const {
    adminEditProduct,
    adminDeleteProduct,
  } = useAdminProducts(isLoggedIn, isAdmin, fetchAllProducts, allAppProductsMeta);

  const {
    adminUpdateStore,
    adminDeleteStore,
  } = useAdminStores(isLoggedIn, isAdmin, fetchAppStores, appStoresMeta, fetchAllProducts);

  // New: Coupon Hook - now receives user, isLoggedIn, and orders as arguments
  const {
    availableCoupons,
    appliedCoupon,
    discountAmount,
    refetch, // Corrected: Destructure as refetch directly
    applyCoupon,
    removeCoupon,
    setAppliedCoupon,
    setDiscountAmount,
  } = useCoupons({ user, isLoggedIn, orders }); // Pass the necessary values here

  // --- User Profile Update in Context ---
  const updateUserInContext = useCallback((updatedUserData) => {
    setAuthUser(prevUser => ({ ...prevUser, ...updatedUserData }));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...updatedUserData }));
    }
  }, [setAuthUser]);

  // --- Signup Functions (Backend Integrated) ---
  const registerUser = useCallback(async (userData) => {
    try {
      const response = await api.auth.registerUser(userData);
      if (response) {
        loginUserInState(response);
        toast.success(`Welcome to BazzarNet, ${response.name}!`);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
      return false;
    }
  }, [loginUserInState]);

  const registerVendor = useCallback(async (vendorData) => {
    try {
      const response = await api.auth.registerVendor({
        name: vendorData.fullName, // Use fullName from form
        email: vendorData.email,
        password: vendorData.password,
        storeName: vendorData.businessName, // Use businessName from form
        businessDescription: vendorData.description,
        category: vendorData.category,
        phone: vendorData.phone,
        pan: vendorData.pan,
        gst: vendorData.gst,
        address: vendorData.address,
      });
      if (response) {
        loginUserInState(response);
        toast.success(`Welcome, ${response.name}! Your store is now live.`);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message || 'Vendor registration failed.');
      return false;
    }
  }, [loginUserInState]);

  // --- Initial Data Load on Login/Role Change ---
  useEffect(() => {
    const loadInitialData = async () => {
      if (isLoggedIn) {
        const promises = [
          fetchAllProducts(),
          fetchAppStores(),
          fetchCart(),
          fetchWishlist(),
          fetchOrders(),
          refetch(), // Fetch coupons
        ];

        if (isAdmin) {
          promises.push(fetchAllUsers());
        }
        if (isVendor) {
          promises.push(fetchVendorProducts());
        }

        try {
          await Promise.all(promises);
        } catch (error) {
          console.error("Error loading initial data:", error);
          // Optionally, show a generic error toast here if multiple fetches fail
        }
      } else {
        // Clear all data if logged out
        setCart([]);
        setWishlist([]);
        setAllAppProducts([]);
        setAllAppProductsMeta({ page: 1, pages: 1, count: 0 });
        setVendorProducts([]);
        setVendorProductsMeta({ page: 1, pages: 1, count: 0 });
        setOrders([]);
        setOrdersMeta({ page: 1, pages: 1, count: 0 });
        setAppStores([]);
        setAppStoresMeta({ page: 1, pages: 1, count: 0 });
        setAllAppUsers([]); 
        setAllAppUsersMeta({ page: 1, pages: 1, count: 0 });
        setAppliedCoupon(null); 
        setDiscountAmount(0); 
      }
    };

    loadInitialData();
  }, [isLoggedIn, user, isAdmin, isVendor, fetchAllProducts, fetchAppStores, fetchCart, fetchWishlist, fetchOrders, fetchAllUsers, fetchVendorProducts, refetch, setCart, setWishlist, setAllAppProducts, setAllAppProductsMeta, setAppStores, setAppStoresMeta, setOrders, setOrdersMeta, setAllAppUsers, setAllAppUsersMeta, setVendorProducts, setVendorProductsMeta, setAppliedCoupon, setDiscountAmount]);


  const value = {
    theme,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    isLoggedIn,
    user,
    isVendor,
    isAdmin,
    loginAsUser,
    loginAsVendor,
    loginAsAdmin,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    checkout,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    moveToWishlist,
    allAppProducts,
    allAppProductsMeta,
    fetchAllProducts,
    vendorProducts,
    vendorProductsMeta,
    fetchVendorProducts,
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    ordersMeta,
    fetchOrders,
    updateOrderStatus,
    confirmDeliveryWithOtp,
    // simulateLoading, // Removed
    generateOtp,
    appStores,
    appStoresMeta,
    fetchAppStores,
    allAppUsers,
    allAppUsersMeta,
    fetchAllUsers,
    deleteUser,
    updateUserStatus,
    adminEditProduct,
    adminDeleteProduct,
    adminUpdateStore,
    adminDeleteStore,
    registerUser,
    registerVendor,
    updateUserInContext,
    // New: Coupon related values
    availableCoupons,
    appliedCoupon,
    discountAmount,
    fetchAvailableCoupons: refetch, // Expose refetch as fetchAvailableCoupons for consistency
    applyCoupon,
    removeCoupon,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};