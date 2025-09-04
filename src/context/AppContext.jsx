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
import * as api from '../services/api'; // Still needed for direct API calls in some places

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
  const { simulateLoading, generateOtp } = useUtils();

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
    setAppStores // Expose for admin store updates
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
    if (isLoggedIn) {
      // Trigger initial fetches for all relevant data
      fetchAllProducts();
      fetchAppStores();
      fetchCart();
      fetchWishlist();
      fetchOrders();
      if (isAdmin) {
        fetchAllUsers();
      }
      if (isVendor) {
        fetchVendorProducts();
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
      setAllAppUsers([]); // This line should now work correctly
      setAllAppUsersMeta({ page: 1, pages: 1, count: 0 });
    }
  }, [isLoggedIn, user, isAdmin, isVendor, fetchAllProducts, fetchAppStores, fetchCart, fetchWishlist, fetchOrders, fetchAllUsers, fetchVendorProducts, setCart, setWishlist, setAllAppProducts, setAllAppProductsMeta, setAppStores, setOrders, setAllAppUsers, setVendorProducts, setVendorProductsMeta, setOrdersMeta]);


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
    simulateLoading,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};