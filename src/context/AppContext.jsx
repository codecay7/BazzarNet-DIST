import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockOrders as allMockOrders, allProducts as initialAllProducts, stores as initialStores, mockUsers as initialMockUsers } from '../data/mockData'; // Import mockUsers
import * as api from '../services/api'; // Import the API service

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
  const loginAsUser = async (name, email, password) => {
    // --- Backend Integration Point: User Login ---
    // In a real app, this would call `api.auth.login({ email, password, role: 'user' })`
    // and handle the response (token, user data).
    try {
      // const response = await api.auth.login({ email, password, role: 'user' });
      // if (response.success) {
      //   const fetchedUser = response.user; // Assume backend returns user data
      //   setUser(fetchedUser);
      //   setIsLoggedIn(true);
      //   setIsVendor(false);
      //   setIsAdmin(false);
      //   localStorage.setItem('user', JSON.stringify(fetchedUser));
      //   toast.success(`Welcome back, ${fetchedUser.name}!`);
      //   return true;
      // } else {
      //   toast.error(response.message || 'Login failed.');
      //   return false;
      // }

      // --- Mock Logic (for demo) ---
      const existingUser = allAppUsers.find(u => u.email === email && u.role === 'user');
      if (existingUser) {
        if (!existingUser.isActive) {
          toast.error('Your account is currently inactive. Please contact support.');
          return false;
        }
        if (password !== existingUser.password) {
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
          password: password,
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
    } catch (error) {
      toast.error(`Login error: ${error.message}`);
      return false;
    }
  };

  const loginAsVendor = async (name, storeName, email, password) => {
    // --- Backend Integration Point: Vendor Login ---
    // In a real app, this would call `api.auth.login({ email, password, role: 'vendor' })`
    // and handle the response (token, user data including storeId).
    try {
      // const response = await api.auth.login({ email, password, role: 'vendor' });
      // if (response.success) {
      //   const fetchedVendor = response.user; // Assume backend returns vendor data
      //   setUser(fetchedVendor);
      //   setIsLoggedIn(true);
      //   setIsVendor(true);
      //   setIsAdmin(false);
      //   localStorage.setItem('user', JSON.stringify(fetchedVendor));
      //   toast.success(`Welcome, ${fetchedVendor.name}! Manage your store now.`);
      //   return true;
      // } else {
      //   toast.error(response.message || 'Login failed.');
      //   return false;
      // }

      // --- Mock Logic (for demo) ---
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
        if (password !== existingVendor.password) {
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
          password: password,
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
    } catch (error) {
      toast.error(`Login error: ${error.message}`);
      return false;
    }
  };

  const loginAsAdmin = async (username, password) => {
    // --- Backend Integration Point: Admin Login ---
    // In a real app, this would call `api.auth.login({ username, password, role: 'admin' })`
    // and handle the response (token, user data).
    try {
      // const response = await api.auth.login({ username, password, role: 'admin' });
      // if (response.success) {
      //   const fetchedAdmin = response.user; // Assume backend returns admin data
      //   setUser(fetchedAdmin);
      //   setIsLoggedIn(true);
      //   setIsVendor(false);
      //   setIsAdmin(true);
      //   localStorage.setItem('user', JSON.stringify(fetchedAdmin));
      //   toast.success('Welcome, Super Admin!');
      //   return true;
      // } else {
      //   toast.error(response.message || 'Login failed.');
      //   return false;
      // }

      // --- Mock Logic (for demo) ---
      if (username === 'admin' && password === 'admin123') {
        const adminData = {
          id: 0,
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
    } catch (error) {
      toast.error(`Login error: ${error.message}`);
      return false;
    }
  };

  const logout = async () => {
    // --- Backend Integration Point: Logout ---
    // In a real app, this would call `api.auth.logout()` to invalidate the session/token on the server.
    try {
      // await api.auth.logout();
      localStorage.removeItem('user');
      setUser(null);
      setIsLoggedIn(false);
      setIsVendor(false);
      setIsAdmin(false);
      setVendorProducts([]);
      toast.success('You have been logged out.');
    } catch (error) {
      toast.error(`Logout error: ${error.message}`);
    }
  };

  // Cart Functions
  const addToCart = async (product) => {
    // --- Backend Integration Point: Add to Cart ---
    // In a real app, this would call `api.customer.addToCart(user.id, product.id, 1)`
    // and update local cart state based on backend response.
    try {
      // const response = await api.customer.addToCart(user.id, product.id, 1);
      // if (response.success) {
      //   setCart(response.cart); // Assume backend returns updated cart
      //   toast.success(`${product.name} added to cart!`);
      // } else {
      //   toast.error(response.message || 'Failed to add to cart.');
      // }

      // --- Mock Logic (for demo) ---
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
    } catch (error) {
      toast.error(`Error adding to cart: ${error.message}`);
    }
  };

  const removeFromCart = async (productId) => {
    // --- Backend Integration Point: Remove from Cart ---
    // In a real app, this would call `api.customer.removeFromCart(user.id, productId)`
    // and update local cart state based on backend response.
    try {
      // const response = await api.customer.removeFromCart(user.id, productId);
      // if (response.success) {
      //   setCart(response.cart);
      //   toast.error(`Item removed from cart.`);
      // } else {
      //   toast.error(response.message || 'Failed to remove from cart.');
      // }

      // --- Mock Logic (for demo) ---
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      toast.error(`Item removed from cart.`);
    } catch (error) {
      toast.error(`Error removing from cart: ${error.message}`);
    }
  };
  
  const updateCartQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    // --- Backend Integration Point: Update Cart Quantity ---
    // In a real app, this would call `api.customer.updateCartItem(user.id, productId, quantity)`
    // and update local cart state based on backend response.
    try {
      // const response = await api.customer.updateCartItem(user.id, productId, quantity);
      // if (response.success) {
      //   setCart(response.cart);
      // } else {
      //   toast.error(response.message || 'Failed to update cart quantity.');
      // }

      // --- Mock Logic (for demo) ---
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      toast.error(`Error updating cart quantity: ${error.message}`);
    }
  };

  const checkout = async (orderDetails) => {
    // --- Backend Integration Point: Checkout / Place Order ---
    // This is a critical backend interaction.
    // It would call `api.customer.placeOrder(user.id, orderDetails)`
    // The backend would: validate the order, process payment, update inventory,
    // create the order record, generate an OTP, and send confirmation emails.
    // The response would include the final order details, including the generated
    // orderId, otp, and transactionId.
    try {
      // const response = await api.customer.placeOrder(user.id, orderDetails);
      // if (response.success) {
      //   setOrders(prevOrders => [...prevOrders, response.order]); // Add new order from backend
      //   setCart([]); // Clear cart after successful order
      //   toast.success('Order placed successfully!');
      //   return response.order; // Return the full order object from backend
      // } else {
      //   toast.error(response.message || 'Order placement failed.');
      //   return null;
      // }

      // --- Mock Logic (for demo) ---
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
    } catch (error) {
      toast.error(`Error placing order: ${error.message}`);
      return null;
    }
  };

  // Wishlist Functions
  const addToWishlist = async (product) => {
    // --- Backend Integration Point: Add to Wishlist ---
    // In a real app, this would call `api.customer.addToWishlist(user.id, product.id)`
    // and update local wishlist state based on backend response.
    try {
      // const response = await api.customer.addToWishlist(user.id, product.id);
      // if (response.success) {
      //   setWishlist(response.wishlist);
      //   toast.success(`${product.name} added to wishlist!`);
      // } else {
      //   toast.error(response.message || 'Failed to add to wishlist.');
      // }

      // --- Mock Logic (for demo) ---
      setWishlist((prevWishlist) => {
          if (prevWishlist.find(item => item.id === product.id)) {
              toast.error(`${product.name} is already in your wishlist.`);
              return prevWishlist;
          }
          toast.success(`${product.name} added to wishlist!`);
          return [...prevWishlist, product];
      });
    } catch (error) {
      toast.error(`Error adding to wishlist: ${error.message}`);
    }
  };

  const removeFromWishlist = async (productId) => {
    // --- Backend Integration Point: Remove from Wishlist ---
    // In a real app, this would call `api.customer.removeFromWishlist(user.id, productId)`
    // and update local wishlist state based on backend response.
    try {
      // const response = await api.customer.removeFromWishlist(user.id, productId);
      // if (response.success) {
      //   setWishlist(response.wishlist);
      //   toast.error(`Item removed from wishlist.`);
      // } else {
      //   toast.error(response.message || 'Failed to remove from wishlist.');
      // }

      // --- Mock Logic (for demo) ---
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
      toast.error(`Item removed from wishlist.`);
    } catch (error) {
      toast.error(`Error removing from wishlist: ${error.message}`);
    }
  };

  const moveToCart = async (product) => {
    // --- Backend Integration Point: Move to Cart ---
    // This would involve two API calls: `api.customer.removeFromWishlist` and `api.customer.addToCart`.
    try {
      // await api.customer.removeFromWishlist(user.id, product.id);
      // await api.customer.addToCart(user.id, product.id, 1);
      // // Re-fetch both cart and wishlist or update based on responses
      // toast.success(`${product.name} moved to cart!`);

      // --- Mock Logic (for demo) ---
      addToCart(product);
      removeFromWishlist(product.id);
    } catch (error) {
      toast.error(`Error moving to cart: ${error.message}`);
    }
  };

  const moveToWishlist = async (product) => {
    // --- Backend Integration Point: Move to Wishlist ---
    // This would involve two API calls: `api.customer.removeFromCart` and `api.customer.addToWishlist`.
    try {
      // await api.customer.removeFromCart(user.id, product.id);
      // await api.customer.addToWishlist(user.id, product.id);
      // // Re-fetch both cart and wishlist or update based on responses
      // toast.success(`${product.name} moved to wishlist!`);

      // --- Mock Logic (for demo) ---
      addToWishlist(product);
      removeFromCart(product.id);
    } catch (error) {
      toast.error(`Error moving to wishlist: ${error.message}`);
    }
  };

  // Vendor Product Management Functions (now updating allAppProducts)
  const addVendorProduct = async (newProduct) => {
    if (!user?.storeId) {
      toast.error('Vendor not associated with a store.');
      return;
    }
    // --- Backend Integration Point: Add Vendor Product ---
    // In a real app, this would call `api.vendor.addProduct(user.storeId, newProduct)`
    // and update `allAppProducts` based on the backend response.
    try {
      // const response = await api.vendor.addProduct(user.storeId, newProduct);
      // if (response.success) {
      //   setAllAppProducts(prevProducts => [...prevProducts, response.product]);
      //   toast.success(`${newProduct.name} added to your store!`);
      // } else {
      //   toast.error(response.message || 'Failed to add product.');
      // }

      // --- Mock Logic (for demo) ---
      const productWithStoreId = { ...newProduct, storeId: user.storeId };
      setAllAppProducts(prevProducts => [...prevProducts, productWithStoreId]);
      toast.success(`${newProduct.name} added to your store!`);
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const editVendorProduct = async (productId, updatedProduct) => {
    // --- Backend Integration Point: Edit Vendor Product ---
    // In a real app, this would call `api.vendor.updateProduct(user.storeId, productId, updatedProduct)`
    // and update `allAppProducts` based on the backend response.
    try {
      // const response = await api.vendor.updateProduct(user.storeId, productId, updatedProduct);
      // if (response.success) {
      //   setAllAppProducts(prevProducts =>
      //     prevProducts.map(p => (p.id === productId ? { ...response.product, storeId: p.storeId } : p))
      //   );
      //   toast.success('Product updated!');
      // } else {
      //   toast.error(response.message || 'Failed to update product.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppProducts(prevProducts =>
        prevProducts.map(p => (p.id === productId ? { ...updatedProduct, storeId: p.storeId } : p))
      );
      toast.success('Product updated!');
    } catch (error) {
      toast.error(`Error updating product: ${error.message}`);
    }
  };

  const deleteVendorProduct = async (productId) => {
    // --- Backend Integration Point: Delete Vendor Product ---
    // In a real app, this would call `api.vendor.deleteProduct(user.storeId, productId)`
    // and update `allAppProducts` based on the backend response.
    try {
      // const response = await api.vendor.deleteProduct(user.storeId, productId);
      // if (response.success) {
      //   setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      //   toast.error('Product deleted.');
      // } else {
      //   toast.error(response.message || 'Failed to delete product.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast.error('Product deleted.');
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
    }
  };

  // Admin Product Management Functions (for admin to manage any product)
  const adminEditProduct = async (productId, updatedProduct) => {
    // --- Backend Integration Point: Admin Edit Product ---
    // In a real app, this would call `api.admin.updateProduct(productId, updatedProduct)`
    // and update `allAppProducts` based on the backend response.
    try {
      // const response = await api.admin.updateProduct(productId, updatedProduct);
      // if (response.success) {
      //   setAllAppProducts(prevProducts =>
      //     prevProducts.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p))
      //   );
      //   toast.success('Product updated by Admin!');
      // } else {
      //   toast.error(response.message || 'Failed to update product by Admin.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppProducts(prevProducts =>
        prevProducts.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p))
      );
      toast.success('Product updated by Admin!');
    } catch (error) {
      toast.error(`Error updating product by Admin: ${error.message}`);
    }
  };

  const adminDeleteProduct = async (productId) => {
    // --- Backend Integration Point: Admin Delete Product ---
    // In a real app, this would call `api.admin.deleteProduct(productId)`
    // and update `allAppProducts` based on the backend response.
    try {
      // const response = await api.admin.deleteProduct(productId);
      // if (response.success) {
      //   setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      //   toast.error('Product deleted by Admin.');
      // } else {
      //   toast.error(response.message || 'Failed to delete product by Admin.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast.error('Product deleted by Admin.');
    } catch (error) {
      toast.error(`Error deleting product by Admin: ${error.message}`);
    }
  };

  // Order Functions
  const updateOrderStatus = async (orderId, newStatus) => {
    // --- Backend Integration Point: Update Order Status ---
    // In a real app, this would call `api.admin.updateOrderStatus(orderId, newStatus)`
    // or `api.vendor.updateOrderStatus(user.storeId, orderId, newStatus)`
    // and update `orders` based on the backend response.
    try {
      // const response = await api.admin.updateOrderStatus(orderId, newStatus); // Or vendor API
      // if (response.success) {
      //   setOrders(prevOrders =>
      //     prevOrders.map(order =>
      //       order.id === orderId ? { ...order, status: newStatus } : order
      //     )
      //   );
      //   toast.success(`Order ${orderId} status updated to ${newStatus}.`);
      // } else {
      //   toast.error(response.message || 'Failed to update order status.');
      // }

      // --- Mock Logic (for demo) ---
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (error) {
      toast.error(`Error updating order status: ${error.message}`);
    }
  };

  const confirmDeliveryWithOtp = async (orderId, enteredOtp) => {
    // --- Backend Integration Point: Confirm Delivery with OTP ---
    // In a real app, this would call `api.vendor.confirmDelivery(user.storeId, orderId, enteredOtp)`
    // The backend would verify the OTP and update the order status.
    try {
      // const response = await api.vendor.confirmDelivery(user.storeId, orderId, enteredOtp);
      // if (response.success) {
      //   setOrders(prevOrders =>
      //     prevOrders.map(o => (o.id === orderId ? { ...o, status: 'Delivered' } : o))
      //   );
      //   toast.success(`Delivery for Order ${orderId} confirmed!`);
      //   return true;
      // } else {
      //   toast.error(response.message || 'Invalid OTP. Please try again.');
      //   return false;
      // }

      // --- Mock Logic (for demo) ---
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
    } catch (error) {
      toast.error(`Error confirming delivery: ${error.message}`);
      return false;
    }
  };

  // Admin User Management Functions
  const deleteUser = async (userId) => {
    // --- Backend Integration Point: Admin Delete User ---
    // In a real app, this would call `api.admin.deleteUser(userId)`
    // The backend would handle cascading deletions (e.g., deleting a vendor's products and store).
    try {
      // const response = await api.admin.deleteUser(userId);
      // if (response.success) {
      //   setAllAppUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      //   // Also update products and stores if a vendor was deleted
      //   const deletedUser = allAppUsers.find(u => u.id === userId);
      //   if (deletedUser?.role === 'vendor' && deletedUser.storeId) {
      //     setAllAppProducts(prevProducts => prevProducts.filter(p => p.storeId !== deletedUser.storeId));
      //     setAppStores(prevStores => prevStores.filter(s => s.id !== deletedUser.storeId));
      //     toast.error(`Vendor ${deletedUser.name}, their products, and store have been deleted.`);
      //   } else {
      //     toast.error(`User ${deletedUser.name} deleted.`);
      //   }
      // } else {
      //   toast.error(response.message || 'Failed to delete user.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      
      const deletedUser = allAppUsers.find(u => u.id === userId);
      if (deletedUser?.role === 'vendor' && deletedUser.storeId) {
        setAllAppProducts(prevProducts => prevProducts.filter(p => p.storeId !== deletedUser.storeId));
        setAppStores(prevStores => prevStores.filter(s => s.id !== deletedUser.storeId));
        toast.error(`Vendor ${deletedUser.name}, their products, and store have been deleted.`);
      } else {
        toast.error(`User ${deletedUser.name} deleted.`);
      }
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    // --- Backend Integration Point: Admin Update User Status ---
    // In a real app, this would call `api.admin.updateUserStatus(userId, newStatus)`
    // and update `allAppUsers` based on the backend response.
    try {
      // const response = await api.admin.updateUserStatus(userId, newStatus);
      // if (response.success) {
      //   setAllAppUsers(prevUsers =>
      //     prevUsers.map(u => (u.id === userId ? { ...u, isActive: newStatus } : u))
      //   );
      //   const userToUpdate = allAppUsers.find(u => u.id === userId);
      //   toast.success(`${userToUpdate?.name}'s account is now ${newStatus ? 'active' : 'inactive'}.`);
      // } else {
      //   toast.error(response.message || 'Failed to update user status.');
      // }

      // --- Mock Logic (for demo) ---
      setAllAppUsers(prevUsers =>
        prevUsers.map(u => (u.id === userId ? { ...u, isActive: newStatus } : u))
      );
      const userToUpdate = allAppUsers.find(u => u.id === userId);
      toast.success(`${userToUpdate?.name}'s account is now ${newStatus ? 'active' : 'inactive'}.`);
    } catch (error) {
      toast.error(`Error updating user status: ${error.message}`);
    }
  };

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setIsVendor(storedUser.role === 'vendor');
      setIsAdmin(storedUser.role === 'admin');
      // In a real app, you might want to validate the token with the backend here
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
    allAppUsers,
    deleteUser,
    updateUserStatus,
    adminEditProduct,
    adminDeleteProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};