import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockOrders as allMockOrders, allProducts as initialAllProducts, stores as initialStores } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin role
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allAppProducts, setAllAppProducts] = useState(initialAllProducts); // Central source of truth for all products
  const [vendorProducts, setVendorProducts] = useState([]); // Products specific to the logged-in vendor
  const [orders, setOrders] = useState(allMockOrders);
  const [appStores, setAppStores] = useState(initialStores); // Central source of truth for all stores

  // Set initial theme on mount
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  // Effect to update vendorProducts when allAppProducts or user changes
  useEffect(() => {
    if (isLoggedIn && isVendor && user?.storeId) {
      setVendorProducts(allAppProducts.filter(p => p.storeId === user.storeId));
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

  // Simulate Loading
  const simulateLoading = (delay = 1000) => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  // Generate a 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Login Functions
  const loginAsUser = (name, email, password) => {
    if (!name || !email || !password) {
      toast.error('Please enter your name, email, and password.');
      return false;
    }
    // Mock authentication: In a real app, you'd verify credentials with a backend.
    // For this demo, any non-empty password is "valid".
    const userData = { 
      name, 
      email, 
      role: 'user',
      address: { // Default Indian address structure for new users
        houseNo: '123 Customer Apt',
        landmark: 'Near Main Market',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560001'
      }
    };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(false);
    setIsAdmin(false); // Ensure admin is false
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome to BazzarNet, ${name}!`);
    return true;
  };

  const loginAsVendor = (name, storeName, email, password) => {
    if (!name || !storeName || !email || !password) {
      toast.error('Please enter your name, store name, email, and password.');
      return false;
    }
    // Find the store ID based on the store name (mocking a lookup)
    const store = initialStores.find(s => s.name === storeName);
    if (!store) {
      toast.error('Store not found. Please register your store first.');
      return false;
    }

    // Mock authentication: In a real app, you'd verify credentials with a backend.
    // For this demo, any non-empty password is "valid".
    const userData = { 
      name, 
      store: storeName, 
      email,
      role: 'vendor', 
      storeId: store.id,
      address: { // Default Indian address structure for new vendors
        houseNo: '456 Vendor Plaza',
        landmark: 'Opposite Central Park',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001'
      }
    };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(true);
    setIsAdmin(false); // Ensure admin is false
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome, ${name}! Manage your store now.`);
    return true;
  };

  const loginAsAdmin = (username, password) => {
    // Mock admin credentials
    if (username === 'admin' && password === 'admin123') {
      const adminData = {
        name: 'Super Admin',
        email: 'admin@bazzarnet.com',
        role: 'admin',
      };
      setUser(adminData);
      setIsLoggedIn(true);
      setIsVendor(false);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminData));
      toast.success('Welcome, Super Admin!');
      return true;
    } else {
      toast.error('Invalid admin credentials.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsVendor(false);
    setIsAdmin(false); // Reset admin state on logout
    setVendorProducts([]); // Clear vendor-specific products on logout
    toast.success('You have been logged out.');
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error(`Item removed from cart.`);
  };
  
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const checkout = (orderDetails) => {
    // Generate OTP and add to order details
    const otp = generateOtp();
    const newOrder = {
      ...orderDetails,
      id: `#BN${Math.floor(10000 + Math.random() * 90000)}`, // Generate a new order ID
      customer: { name: user.name, email: user.email },
      customerEmail: user.email,
      timestamp: new Date().toISOString(), // Store full ISO timestamp
      transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Mock transaction ID
      status: 'Pending', // Initial status
      otp: otp, // Store the OTP with the order
      shipping: { trackingNumber: 'N/A', carrier: 'BazzarNet Delivery' }, // Default shipping
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCart([]); // Clear the cart after checkout
    toast.success('Order placed successfully!');
    return newOrder; // Return the new order including OTP
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
        if (prevWishlist.find(item => item.id === product.id)) {
            toast.error(`${product.name} is already in your wishlist.`);
            return prevWishlist;
        }
        toast.success(`${product.name} added to wishlist!`);
        return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    toast.error(`Item removed from wishlist.`);
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const moveToWishlist = (product) => {
    addToWishlist(product);
    removeFromCart(product.id);
  };

  // Vendor Product Management Functions (now updating allAppProducts)
  const addVendorProduct = (newProduct) => {
    if (!user?.storeId) {
      toast.error('Vendor not associated with a store.');
      return;
    }
    const productWithStoreId = { ...newProduct, storeId: user.storeId };
    setAllAppProducts(prevProducts => [...prevProducts, productWithStoreId]);
    toast.success(`${newProduct.name} added to your store!`);
  };

  const editVendorProduct = (productId, updatedProduct) => {
    setAllAppProducts(prevProducts =>
      prevProducts.map(p => (p.id === productId ? { ...updatedProduct, storeId: p.storeId } : p))
    );
    toast.success('Product updated!');
  };

  const deleteVendorProduct = (productId) => {
    setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast.error('Product deleted.');
  };

  // Order Functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}.`);
  };

  const confirmDeliveryWithOtp = (orderId, enteredOtp) => {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      toast.error('Order not found.');
      return false;
    }

    const order = orders[orderIndex];
    if (order.otp === enteredOtp) {
      setOrders(prevOrders =>
        prevOrders.map((o, idx) =>
          idx === orderIndex ? { ...o, status: 'Delivered' } : o
        )
      );
      toast.success(`Delivery for Order ${orderId} confirmed!`);
      return true;
    } else {
      toast.error('Invalid OTP. Please try again.');
      return false;
    }
  };

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setIsVendor(storedUser.role === 'vendor');
      setIsAdmin(storedUser.role === 'admin'); // Set admin state on auto-login
    }
  }, []);

  const value = {
    theme,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    isLoggedIn,
    user,
    isVendor,
    isAdmin, // Expose new admin state
    loginAsUser,
    loginAsVendor,
    loginAsAdmin, // Expose new admin login function
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
    moveToWishlist, // Expose the new function
    allAppProducts, // Expose the central product list
    vendorProducts, // Expose filtered vendor products
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    updateOrderStatus,
    confirmDeliveryWithOtp, // Expose new function
    simulateLoading,
    appStores, // Expose the central stores list
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};