import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockOrders as allMockOrders } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [orders, setOrders] = useState(allMockOrders);

  // Set initial theme on mount
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

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

  // Login Functions
  const loginAsUser = (name, username) => {
    if (!name || !username) {
      toast.error('Please enter both your name and username.');
      return false;
    }
    const userData = { name, username, role: 'user' };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(false);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome to BazzarNet, ${name}!`);
    return true;
  };

  const loginAsVendor = (name, store) => {
    if (!name || !store) {
      toast.error('Please enter both your name and store name.');
      return false;
    }
    const userData = { name, store, role: 'vendor' };
    setUser(userData);
    setIsLoggedIn(true);
    setIsVendor(true);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome, ${name}! Manage your store now.`);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsVendor(false);
    toast.success('You have been logged out.');
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
    toast.error(`${productName} removed from cart.`);
  };
  
  const updateCartQuantity = (productName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const checkout = () => {
    toast.success('Proceeding to checkout! (Implementation pending)');
    setCart([]);
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
        if (prevWishlist.find(item => item.name === product.name)) {
            toast.error(`${product.name} is already in your wishlist.`);
            return prevWishlist;
        }
        toast.success(`${product.name} added to wishlist!`);
        return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productName) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.name !== productName));
    toast.error(`${productName} removed from wishlist.`);
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.name);
  };

  // Vendor Functions
  const addVendorProduct = (newProduct) => {
    setVendorProducts([...vendorProducts, newProduct]);
    toast.success(`${newProduct.name} added to your store!`);
  };

  const editVendorProduct = (index, updatedProduct) => {
    const newProducts = vendorProducts.map((product, i) => (i === index ? updatedProduct : product));
    setVendorProducts(newProducts);
    toast.success('Product updated!');
  };

  const deleteVendorProduct = (index) => {
    const newProducts = vendorProducts.filter((_, i) => i !== index);
    setVendorProducts(newProducts);
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

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setIsVendor(storedUser.role === 'vendor');
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
    loginAsUser,
    loginAsVendor,
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
    vendorProducts,
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    updateOrderStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};