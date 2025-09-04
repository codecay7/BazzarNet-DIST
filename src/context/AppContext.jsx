import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../services/api'; // Import the API service
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

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
    registerUser,
    registerVendor,
  } = useAuth(); // Use the custom authentication hook

  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); 
  const [allAppProducts, setAllAppProducts] = useState([]);
  const [allAppProductsMeta, setAllAppProductsMeta] = useState({ page: 1, pages: 1, count: 0 });
  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendorProductsMeta, setVendorProductsMeta] = useState({ page: 1, pages: 1, count: 0 });
  const [orders, setOrders] = useState([]);
  const [ordersMeta, setOrdersMeta] = useState({ page: 1, pages: 1, count: 0 });
  const [appStores, setAppStores] = useState([]);
  const [appStoresMeta, setAppStoresMeta] = useState({ page: 1, pages: 1, count: 0 });
  const [allAppUsers, setAllAppUsers] = useState([]);
  const [allAppUsersMeta, setAllAppUsersMeta] = useState({ page: 1, pages: 1, count: 0 });

  // Set initial theme on mount
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  // --- Data Fetching Effects ---
  const fetchAllProducts = useCallback(async (params = {}) => {
    try {
      const { products, page, pages, count } = await api.products.getAll(params);
      setAllAppProducts(products);
      setAllAppProductsMeta({ page, pages, count });
    } catch (error) {
      toast.error(`Failed to load products: ${error.message}`);
      setAllAppProducts([]);
      setAllAppProductsMeta({ page: 1, pages: 1, count: 0 });
    }
  }, []);

  const fetchAppStores = useCallback(async (params = {}) => {
    try {
      const { stores, page, pages, count } = await api.stores.getAll(params);
      setAppStores(stores);
      setAppStoresMeta({ page, pages, count });
    } catch (error) {
      toast.error(`Failed to load stores: ${error.message}`);
      setAppStores([]);
      setAppStoresMeta({ page: 1, pages: 1, count: 0 });
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn || !user?._id) return;
    try {
      const userCart = await api.customer.getCart();
      setCart(userCart.items); // Assuming API returns { items: [...] }
    } catch (error) {
      toast.error(`Failed to load cart: ${error.message}`);
      setCart([]); // Clear cart on error
    }
  }, [isLoggedIn, user?._id]);

  const fetchOrders = useCallback(async (params = {}) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      let fetchedOrdersData;
      if (isAdmin) {
        fetchedOrdersData = await api.admin.getOrders(params);
      } else if (isVendor) {
        fetchedOrdersData = await api.vendor.getOrders(user.storeId, params);
      } else { // Customer
        fetchedOrdersData = await api.customer.getOrders(user._id, params);
      }
      setOrders(fetchedOrdersData.orders);
      setOrdersMeta({ page: fetchedOrdersData.page, pages: fetchedOrdersData.pages, count: fetchedOrdersData.count });
    } catch (error) {
      toast.error(`Failed to load orders: ${error.message}`);
      setOrders([]); // Clear orders on error
      setOrdersMeta({ page: 1, pages: 1, count: 0 });
    }
  }, [isLoggedIn, user?._id, isAdmin, isVendor, user?.storeId]);

  const fetchAllUsers = useCallback(async (params = {}) => {
    if (!isLoggedIn || !isAdmin) return;
    try {
      const { users, page, pages, count } = await api.admin.getUsers(params);
      setAllAppUsers(users);
      setAllAppUsersMeta({ page, pages, count });
    } catch (error) {
      toast.error(`Failed to load users: ${error.message}`);
      setAllAppUsers([]); // Clear users on error
      setAllAppUsersMeta({ page: 1, pages: 1, count: 0 });
    }
  }, [isLoggedIn, isAdmin]);

  const fetchVendorProducts = useCallback(async (params = {}) => {
    if (!isLoggedIn || !isVendor || !user?.storeId) return;
    try {
      const { products, page, pages, count } = await api.vendor.getProducts({ ...params, store: user.storeId });
      setVendorProducts(products);
      setVendorProductsMeta({ page, pages, count });
    } catch (error) {
      toast.error(`Failed to load vendor products: ${error.message}`);
      setVendorProducts([]);
      setVendorProductsMeta({ page: 1, pages: 1, count: 0 });
    }
  }, [isLoggedIn, isVendor, user?.storeId]);


  // Initial data load on login/role change
  useEffect(() => {
    if (isLoggedIn) {
      // Initial fetch without specific params, components will trigger more specific fetches
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
      setAllAppUsers([]);
      setAllAppUsersMeta({ page: 1, pages: 1, count: 0 });
    }
  }, [isLoggedIn, user, isAdmin, isVendor, fetchAllProducts, fetchAppStores, fetchCart, fetchWishlist, fetchOrders, fetchAllUsers, fetchVendorProducts]);

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Sidebar Toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Simulate Loading (kept for components that might still use it for UI/UX)
  const simulateLoading = (delay = 1000) => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  // Generate a 6-digit OTP (kept as it's a utility)
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // --- Cart Functions (Backend Integrated) ---
  const addToCart = async (product) => {
    if (!isLoggedIn || !user?._id) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    try {
      const response = await api.customer.addToCart(product._id, 1); // Assuming quantity is 1 for initial add
      setCart(response.items); // Assuming backend returns updated cart items
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(`Error adding to cart: ${error.message}`);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      const response = await api.customer.removeFromCart(productId);
      setCart(response.items);
      toast.error(`Item removed from cart.`);
    } catch (error) {
      toast.error(`Error removing from cart: ${error.message}`);
    }
  };
  
  const updateCartQuantity = async (productId, quantity) => {
    if (!isLoggedIn || !user?._id) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    try {
      const response = await api.customer.updateCartItem(productId, quantity);
      setCart(response.items);
    } catch (error) {
      toast.error(`Error updating cart quantity: ${error.message}`);
    }
  };

  const checkout = async (orderDetails) => {
    if (!isLoggedIn || !user?._id) {
      toast.error('Please log in to place an order.');
      return null;
    }
    try {
      const newOrder = await api.customer.placeOrder(orderDetails);
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setCart([]); // Clear cart after successful order
      toast.success('Order placed successfully!');
      return newOrder;
    } catch (error) {
      toast.error(`Error placing order: ${error.message}`);
      return null;
    }
  };

  // --- Wishlist Functions (Backend Integrated) ---
  const addToWishlist = async (product) => {
    if (!isLoggedIn || !user?._id) {
      toast.error('Please log in to add items to your wishlist.');
      return;
    }
    try {
      const response = await api.customer.addToWishlist(product._id);
      setWishlist(response);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      toast.error(`Error adding to wishlist: ${error.message}`);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      const response = await api.customer.removeFromWishlist(productId);
      setWishlist(response);
      toast.error(`Item removed from wishlist.`);
    } catch (error) {
      toast.error(`Error removing from wishlist: ${error.message}`);
    }
  };

  const moveToCart = async (product) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      await addToCart(product); // Use the real addToCart API
      await removeFromWishlist(product._id); // Use the real removeFromWishlist API
      fetchWishlist(); // Re-fetch wishlist to ensure UI is updated
    } catch (error) {
      toast.error(`Error moving to cart: ${error.message}`);
    }
  };

  const moveToWishlist = async (product) => {
    if (!isLoggedIn || !user?._id) return;
    try {
      await addToWishlist(product); // Use the real addToWishlist API
      await removeFromCart(product._id); // Use the real removeFromCart API
      fetchCart(); // Re-fetch cart to ensure UI is updated
    } catch (error) {
      toast.error(`Error moving to wishlist: ${error.message}`);
    }
  };

  // --- Vendor Product Management Functions (Backend Integrated) ---
  const addVendorProduct = async (newProduct) => {
    if (!isLoggedIn || !isVendor || !user?.storeId) {
      toast.error('You must be a logged-in vendor to add products.');
      return;
    }
    try {
      const createdProduct = await api.vendor.addProduct(newProduct);
      // Re-fetch vendor products to update the list with pagination/filters
      fetchVendorProducts({ page: vendorProductsMeta.page, limit: 6 });
      toast.success(`${newProduct.name} added to your store!`);
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const editVendorProduct = async (productId, updatedProduct) => {
    if (!isLoggedIn || !isVendor || !user?.storeId) {
      toast.error('You must be a logged-in vendor to edit products.');
      return;
    }
    try {
      const response = await api.vendor.updateProduct(productId, updatedProduct);
      // Re-fetch vendor products to update the list with pagination/filters
      fetchVendorProducts({ page: vendorProductsMeta.page, limit: 6 });
      toast.success('Product updated!');
    } catch (error) {
      toast.error(`Error updating product: ${error.message}`);
    }
  };

  const deleteVendorProduct = async (productId) => {
    if (!isLoggedIn || !isVendor || !user?.storeId) {
      toast.error('You must be a logged-in vendor to delete products.');
      return;
    }
    try {
      await api.vendor.deleteProduct(productId);
      // Re-fetch vendor products to update the list with pagination/filters
      fetchVendorProducts({ page: vendorProductsMeta.page, limit: 6 });
      toast.error('Product deleted.');
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };

  // --- Admin Product Management Functions (Backend Integrated) ---
  const adminEditProduct = async (productId, updatedProduct) => {
    if (!isLoggedIn || !isAdmin) {
      toast.error('You must be an admin to edit products.');
      return;
    }
    try {
      const response = await api.admin.updateProduct(productId, updatedProduct);
      // Re-fetch all products to update the list with pagination/filters
      fetchAllProducts({ page: allAppProductsMeta.page, limit: 6 });
      toast.success('Product updated by Admin!');
    } catch (error) {
      toast.error(`Error updating product by Admin: ${error.message}`);
    }
  };

  const adminDeleteProduct = async (productId) => {
    if (!isLoggedIn || !isAdmin) {
      toast.error('You must be an admin to delete products.');
      return;
    }
    try {
      await api.admin.deleteProduct(productId);
      // Re-fetch all products to update the list with pagination/filters
      fetchAllProducts({ page: allAppProductsMeta.page, limit: 6 });
      toast.error('Product deleted by Admin.');
    } catch (error) {
      toast.error(`Error deleting product by Admin: ${error.message}`);
    }
  };

  // --- Order Functions (Backend Integrated) ---
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!isLoggedIn || (!isVendor && !isAdmin)) {
      toast.error('You are not authorized to update order status.');
      return;
    }
    try {
      const response = await api.admin.updateOrderStatus(orderId, newStatus); // Admin API for now, can be split for vendor
      // Re-fetch orders to update the list with pagination/filters
      fetchOrders({ page: ordersMeta.page, limit: 5 });
      toast.success(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (error) {
      toast.error(`Error updating order status: ${error.message}`);
    }
  };

  const confirmDeliveryWithOtp = async (orderId, enteredOtp) => {
    if (!isLoggedIn || !isVendor) {
      toast.error('You must be a vendor to confirm delivery.');
      return false;
    }
    try {
      const response = await api.vendor.confirmDelivery(orderId, enteredOtp);
      // Re-fetch orders to update the list with pagination/filters
      fetchOrders({ page: ordersMeta.page, limit: 5 });
      toast.success(response.message); // Assuming backend sends a success message
      return true;
    } catch (error) {
      toast.error(`Error confirming delivery: ${error.message}`);
      return false;
    }
  };

  // --- Admin User Management Functions (Backend Integrated) ---
  const deleteUser = async (userId) => {
    if (!isLoggedIn || !isAdmin) {
      toast.error('You must be an admin to delete users.');
      return;
    }
    try {
      const response = await api.admin.deleteUser(userId);
      // Re-fetch all users to update the list with pagination/filters
      fetchAllUsers({ page: allAppUsersMeta.page, limit: 8 });
      // Re-fetch products and stores to reflect cascading deletions if a vendor was deleted
      fetchAllProducts();
      fetchAppStores();
      toast.success(response.message);
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    if (!isLoggedIn || !isAdmin) {
      toast.error('You must be an admin to update user status.');
      return;
    }
    try {
      const response = await api.admin.updateUserStatus(userId, newStatus);
      // Re-fetch all users to update the list with pagination/filters
      fetchAllUsers({ page: allAppUsersMeta.page, limit: 8 });
      toast.success(response.message);
    } catch (error) {
      toast.error(`Error updating user status: ${error.message}`);
    }
  };

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
    fetchAllProducts, // Expose fetch function
    vendorProducts,
    vendorProductsMeta,
    fetchVendorProducts, // Expose fetch function
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    ordersMeta,
    fetchOrders, // Expose fetch function
    updateOrderStatus,
    confirmDeliveryWithOtp,
    simulateLoading,
    appStores,
    appStoresMeta,
    fetchAppStores, // Expose fetch function
    allAppUsers,
    allAppUsersMeta,
    fetchAllUsers, // Expose fetch function
    deleteUser,
    updateUserStatus,
    adminEditProduct,
    adminDeleteProduct,
    registerUser,
    registerVendor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};