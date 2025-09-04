import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockOrders as allMockOrders, allProducts as initialAllProducts, stores as initialStores, mockUsers as initialMockUsers } from '../data/mockData'; // Import mockUsers

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
  const [allAppUsers, setAllAppUsers] = useState(initialMockUsers); // New state for all users (customers and vendors)

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
    const existingUser = allAppUsers.find(u => u.email === email && u.role === 'user');
    if (existingUser) {
      if (!existingUser.isActive) {
        toast.error('Your account is currently inactive. Please contact support.');
        return false;
      }
      if (password !== existingUser.password) { // Use stored password for mock
        toast.error('Invalid password.');
        return false;
      }
      setUser(existingUser);
      setIsLoggedIn(true);
      setIsVendor(false);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(existingUser));
      toast.success(`Welcome back, ${name}!`);
      return true;
    } else {
      // Simplified registration for demo if user doesn't exist
      const newUserId = Math.max(...allAppUsers.map(u => u.id)) + 1;
      const newUser = {
        id: newUserId,
        name,
        email,
        password: password, // Use provided password
        role: 'user',
        isActive: true,
        address: { 
          houseNo: '123 Customer Apt',
          landmark: 'Near Main Market',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560001'
        }
      };
      setAllAppUsers(prev => [...prev, newUser]);
      setUser(newUser);
      setIsLoggedIn(true);
      setIsVendor(false);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success(`Welcome to BazzarNet, ${name}!`);
      return true;
    }
  };

  const loginAsVendor = (name, storeName, email, password) => {
    const store = initialStores.find(s => s.name === storeName);
    if (!store) {
      toast.error('Store not found. Please register your store first.');
      return false;
    }

    const existingVendor = allAppUsers.find(u => u.email === email && u.role === 'vendor');
    if (existingVendor) {
      if (!existingVendor.isActive) {
        toast.error('Your vendor account is currently inactive. Please contact support.');
        return false;
      }
      if (password !== existingVendor.password) { // Use stored password for mock
        toast.error('Invalid password.');
        return false;
      }
      setUser(existingVendor);
      setIsLoggedIn(true);
      setIsVendor(true);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(existingVendor));
      toast.success(`Welcome, ${name}! Manage your store now.`);
      return true;
    } else {
      // Simplified registration for demo if vendor doesn't exist
      const newVendorId = Math.max(...allAppUsers.map(u => u.id)) + 1;
      const newVendor = {
        id: newVendorId,
        name,
        store: storeName,
        email,
        password: password, // Use provided password
        role: 'vendor',
        storeId: store.id,
        isActive: true,
        address: { 
          houseNo: '456 Vendor Plaza',
          landmark: 'Opposite Central Park',
          city: 'Mumbai',
          state: 'Maharashtra',
          pinCode: '400001'
        }
      };
      setAllAppUsers(prev => [...prev, newVendor]);
      setUser(newVendor);
      setIsLoggedIn(true);
      setIsVendor(true);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(newVendor));
      toast.success(`Welcome, ${name}! Manage your store now.`);
      return true;
    }
  };

  const loginAsAdmin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const adminData = {
        id: 0, // Admin has a special ID
        name: 'Super Admin',
        email: 'admin@bazzarnet.com',
        role: 'admin',
        isActive: true,
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
    setIsAdmin(false);
    setVendorProducts([]);
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
    const otp = generateOtp();
    const newOrder = {
      ...orderDetails,
      id: `#BN${Math.floor(10000 + Math.random() * 90000)}`,
      customer: { name: user.name, email: user.email },
      customerEmail: user.email,
      timestamp: new Date().toISOString(),
      transactionId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: 'Pending',
      otp: otp,
      shipping: { trackingNumber: 'N/A', carrier: 'BazzarNet Delivery' },
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCart([]);
    toast.success('Order placed successfully!');
    return newOrder;
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

  // Admin Product Management Functions (for admin to manage any product)
  const adminEditProduct = (productId, updatedProduct) => {
    setAllAppProducts(prevProducts =>
      prevProducts.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p))
    );
    toast.success('Product updated by Admin!');
  };

  const adminDeleteProduct = (productId) => {
    setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast.error('Product deleted by Admin.');
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

  // Admin User Management Functions
  const deleteUser = (userId) => {
    setAllAppUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    
    // If a vendor is deleted, also remove their products and store
    const deletedUser = allAppUsers.find(u => u.id === userId);
    if (deletedUser?.role === 'vendor' && deletedUser.storeId) {
      setAllAppProducts(prevProducts => prevProducts.filter(p => p.storeId !== deletedUser.storeId));
      setAppStores(prevStores => prevStores.filter(s => s.id !== deletedUser.storeId));
      toast.error(`Vendor ${deletedUser.name}, their products, and store have been deleted.`);
    } else {
      toast.error(`User ${deletedUser.name} deleted.`);
    }
  };

  const updateUserStatus = (userId, newStatus) => {
    setAllAppUsers(prevUsers =>
      prevUsers.map(u => (u.id === userId ? { ...u, isActive: newStatus } : u))
    );
    const userToUpdate = allAppUsers.find(u => u.id === userId);
    toast.success(`${userToUpdate?.name}'s account is now ${newStatus ? 'active' : 'inactive'}.`);
  };

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setIsVendor(storedUser.role === 'vendor');
      setIsAdmin(storedUser.role === 'admin');
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
    vendorProducts,
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    updateOrderStatus,
    confirmDeliveryWithOtp,
    simulateLoading,
    appStores,
    allAppUsers, // Expose all users for admin management
    deleteUser, // Expose admin user deletion
    updateUserStatus, // Expose admin user status update
    adminEditProduct, // Expose admin product edit
    adminDeleteProduct, // Expose admin product delete
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};