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
  const [wishlist, setWishlist] = useState([]); // Wishlist still uses mock logic for now
  const [allAppProducts, setAllAppProducts] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [appStores, setAppStores] = useState([]);
  const [allAppUsers, setAllAppUsers] = useState([]);

  // Set initial theme on mount
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  // --- Data Fetching Effects ---
  const fetchAllProducts = useCallback(async () => {
    try {
      const products = await api.products.getAll();
      setAllAppProducts(products);
    } catch (error) {
      toast.error(`Failed to load products: ${error.message}`);
    }
  }, []);

  const fetchAppStores = useCallback(async () => {
    try {
      const stores = await api.stores.getAll();
      setAppStores(stores);
    } catch (error) {
      toast.error(`Failed to load stores: ${error.message}`);
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

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn || !user?._id) return;
    try {
      let fetchedOrders;
      if (isAdmin) {
        fetchedOrders = await api.admin.getOrders();
      } else if (isVendor) {
        fetchedOrders = await api.vendor.getOrders(user.storeId);
      } else { // Customer
        fetchedOrders = await api.customer.getOrders(user._id);
      }
      setOrders(fetchedOrders);
    } catch (error) {
      toast.error(`Failed to load orders: ${error.message}`);
      setOrders([]); // Clear orders on error
    }
  }, [isLoggedIn, user?._id, isAdmin, isVendor, user?.storeId]);

  const fetchAllUsers = useCallback(async () => {
    if (!isLoggedIn || !isAdmin) return;
    try {
      const users = await api.admin.getUsers();
      setAllAppUsers(users);
    } catch (error) {
      toast.error(`Failed to load users: ${error.message}`);
      setAllAppUsers([]); // Clear users on error
    }
  }, [isLoggedIn, isAdmin]);

  // Initial data load on login/role change
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllProducts();
      fetchAppStores();
      fetchCart();
      fetchOrders();
      if (isAdmin) {
        fetchAllUsers();
      }
    } else {
      // Clear all data if logged out
      setCart([]);
      setWishlist([]);
      setAllAppProducts([]);
      setVendorProducts([]);
      setOrders([]);
      setAppStores([]);
      setAllAppUsers([]);
    }
  }, [isLoggedIn, user, isAdmin, fetchAllProducts, fetchAppStores, fetchCart, fetchOrders, fetchAllUsers]);

  // Effect to update vendorProducts when allAppProducts or user changes
  useEffect(() => {
    if (isLoggedIn && isVendor && user?.storeId) {
      setVendorProducts(allAppProducts.filter(p => p.store._id === user.storeId)); // Assuming product.store is populated with store object
    } else {
      setVendorProducts([]);
    }
  }, [isLoggedIn, isVendor, user, allAppProducts]);

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

  // --- Wishlist Functions (Mock Logic - Backend Endpoints Not Yet Implemented) ---
  const addToWishlist = async (product) => {
    if (!isLoggedIn || !user?._id) {
      toast.error('Please log in to add items to your wishlist.');
      return;
    }
    // Mock Logic for demo
    setWishlist((prevWishlist) => {
        if (prevWishlist.find(item => item._id === product._id)) { // Use _id for backend consistency
            toast.error(`${product.name} is already in your wishlist.`);
            return prevWishlist;
        }
        toast.success(`${product.name} added to wishlist!`);
        return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = async (productId) => {
    if (!isLoggedIn || !user?._id) return;
    // Mock Logic for demo
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
    toast.error(`Item removed from wishlist.`);
  };

  const moveToCart = async (product) => {
    if (!isLoggedIn || !user?._id) return;
    // Mock Logic for demo
    addToCart(product); // This will use the real addToCart API
    removeFromWishlist(product._id);
  };

  const moveToWishlist = async (product) => {
    if (!isLoggedIn || !user?._id) return;
    // Mock Logic for demo
    addToWishlist(product);
    removeFromCart(product._id); // This will use the real removeFromCart API
  };

  // --- Vendor Product Management Functions (Backend Integrated) ---
  const addVendorProduct = async (newProduct) => {
    if (!isLoggedIn || !isVendor || !user?.storeId) {
      toast.error('You must be a logged-in vendor to add products.');
      return;
    }
    try {
      const createdProduct = await api.vendor.addProduct(newProduct);
      setAllAppProducts(prevProducts => [...prevProducts, createdProduct]);
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
      setAllAppProducts(prevProducts =>
        prevProducts.map(p => (p._id === productId ? { ...p, ...response } : p))
      );
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
      setAllAppProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
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
      setAllAppProducts(prevProducts =>
        prevProducts.map(p => (p._id === productId ? { ...p, ...response } : p))
      );
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
      setAllAppProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
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
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
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
      setOrders(prevOrders =>
        prevOrders.map(o => (o._id === orderId ? { ...o, orderStatus: 'Delivered' } : o))
      );
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
      setAllAppUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
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
      setAllAppUsers(prevUsers =>
        prevUsers.map(u => (u._id === userId ? { ...u, isActive: newStatus } : u))
      );
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
    wishlist, // Still mock
    addToWishlist, // Still mock
    removeFromWishlist, // Still mock
    moveToCart, // Still mock
    moveToWishlist, // Still mock
    allAppProducts,
    vendorProducts,
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    updateOrderStatus,
    confirmDeliveryWithOtp,
    simulateLoading,
    appStores,
    allAppUsers,
    deleteUser,
    updateUserStatus,
    adminEditProduct,
    adminDeleteProduct,
    registerUser,
    registerVendor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};