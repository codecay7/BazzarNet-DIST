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

  const loginAsVendor = (name, storeName) => {
    if (!name || !storeName) {
      toast.error('Please enter both your name and store name.');
      return false;
    }
    // Find the store ID based on the store name (mocking a lookup)
    const store = initialStores.find(s => s.name === storeName);
    if (!store) {
      toast.error('Store not found. Please register your store first.');
      return false;
    }

    const userData = { name, store: storeName, role: 'vendor', storeId: store.id };
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

  const checkout = () => {
    toast.success('Proceeding to checkout! (Implementation pending)');
    setCart([]);
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
    allAppProducts, // Expose the central product list
    vendorProducts, // Expose filtered vendor products
    addVendorProduct,
    editVendorProduct,
    deleteVendorProduct,
    orders,
    updateOrderStatus,
    simulateLoading,
    appStores, // Expose the central stores list
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};