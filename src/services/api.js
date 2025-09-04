/**
 * @file api.js
 * @description Centralized API service for all backend interactions.
 * This file abstracts away the details of making HTTP requests,
 * making it easier to manage API endpoints, authentication, and error handling.
 *
 * In a real application, this would use `fetch`, `axios`, or a similar library
 * to make actual HTTP requests to your backend server.
 * Authentication tokens (e.g., JWT) would be added to headers here.
 */

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // Changed default port to 5000

/**
 * Helper function to get the authentication token from local storage.
 * In a production app, this might be more sophisticated (e.g., httpOnly cookies).
 */
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // Assuming the user object contains a token field
  return user?.token || null; 
};

/**
 * Generic API request handler.
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login', '/products').
 * @param {object} options - Fetch options (method, headers, body).
 * @returns {Promise<object>} - The JSON response from the API.
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers, // Allow overriding headers, especially for file uploads
  };

  // Only set Content-Type to application/json if not a FormData object
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Simulate network delay for demo purposes (optional, remove for production)
    // await new Promise(resolve => setTimeout(resolve, 300)); 

    // Actual fetch request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    
    // If the response is not OK, try to parse error message
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, use status text
        throw new Error(response.statusText || `API Error: ${response.status}`);
      }
      // IMPORTANT: If there are specific validation errors, throw them
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const validationErrors = errorData.errors.map(err => err.message).join(', ');
        throw new Error(validationErrors || errorData.message || `API Error: ${response.statusText}`);
      }
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }
    
    return response.json();

  } catch (error) {
    console.error(`API Request Failed for ${endpoint}:`, error);
    // Handle specific errors (e.g., 401 Unauthorized -> logout)
    if (error.message.includes('Unauthorized') || error.message.includes('token failed')) {
      // Implement logout logic here if needed, or let the AppContext handle it
      // localStorage.removeItem('user');
      // window.location.href = '/login';
    }
    throw error;
  }
};

// --- Authentication Endpoints ---
export const auth = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  registerUser: (userData) => apiRequest('/auth/register/customer', { method: 'POST', body: JSON.stringify(userData) }),
  registerVendor: (vendorData) => apiRequest('/auth/register/vendor', { method: 'POST', body: JSON.stringify(vendorData) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }), // Updated to backend logout endpoint
};

// --- User Profile Endpoints ---
export const userProfile = {
  getMe: () => apiRequest('/users/me'),
  updateProfile: (profileData) => apiRequest(`/users/me`, { method: 'PUT', body: JSON.stringify(profileData) }), // Updated to use /users/me and PUT
  uploadProfileImage: (formData) => apiRequest('/users/me/profile-image', { method: 'PUT', body: formData, headers: {} }), // Updated to new backend endpoint
};

// --- Product Endpoints ---
export const products = {
  getAll: (params) => {
    // Filter out undefined values from params before creating URLSearchParams
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    );
    return apiRequest(`/products?${new URLSearchParams(filteredParams)}`);
  },
  getById: (productId) => apiRequest(`/products/${productId}`),
  getStoreProducts: (storeId, params) => apiRequest(`/stores/${storeId}/products?${new URLSearchParams(params)}`),
  getRecommended: (params) => {
    console.log('Frontend: Fetching recommended products from /products/recommended'); // Added log
    return apiRequest(`/products/recommended?${new URLSearchParams(params)}`);
  },
};

// --- Store Endpoints ---
export const stores = {
  getAll: (params) => apiRequest(`/stores?${new URLSearchParams(params)}`),
  getById: (storeId) => apiRequest(`/stores/${storeId}`),
  updateStore: (storeId, storeData) => apiRequest(`/stores/${storeId}`, { method: 'PUT', body: JSON.stringify(storeData) }),
};

// --- Vendor Specific Endpoints ---
export const vendor = {
  getDashboardStats: (vendorId) => apiRequest(`/vendors/${vendorId}/dashboard/stats`), // Fetch vendor dashboard stats
  getSalesTrend: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/sales-trend?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getFastSellingItems: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/fast-selling-items?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getProducts: (params) => apiRequest(`/products?${new URLSearchParams(params)}`), // Vendor gets their products (filtered by store on backend)
  addProduct: (productData) => apiRequest(`/products`, { method: 'POST', body: JSON.stringify(productData) }), // Vendor adds product to their store
  updateProduct: (productId, productData) => apiRequest(`/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }), // Vendor updates their product
  deleteProduct: (productId) => apiRequest(`/products/${productId}`, { method: 'DELETE' }), // Vendor deletes their product
  getOrders: (storeId, params) => apiRequest(`/orders/store/${storeId}?${new URLSearchParams(params)}`), // Vendor orders
  updateOrderStatus: (orderId, status) => apiRequest(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }), // Vendor updates order status
  confirmDelivery: (orderId, otp) => apiRequest(`/orders/${orderId}/confirm-delivery`, { method: 'POST', body: JSON.stringify({ otp }) }), // Vendor confirms delivery
  getPayments: (vendorId, params) => apiRequest(`/payments/vendor/${vendorId}?${new URLSearchParams(params)}`), // Fetch payments for a vendor
  reportPaymentIssue: (paymentId) => apiRequest(`/payments/${paymentId}/report-issue`, { method: 'POST' }), // Report payment issue
};

// --- Customer Specific Endpoints ---
export const customer = {
  getCart: () => apiRequest(`/cart`), // Fetch current user's cart
  addToCart: (productId, quantity = 1, unit) => apiRequest(`/cart`, { method: 'POST', body: JSON.stringify({ productId, quantity, unit }) }), // Pass unit
  updateCartItem: (itemId, quantity) => apiRequest(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeFromCart: (itemId) => apiRequest(`/cart/${itemId}`, { method: 'DELETE' }),
  getWishlist: () => apiRequest(`/wishlist`), // Fetch current user's wishlist
  addToWishlist: (productId, unit) => apiRequest(`/wishlist`, { method: 'POST', body: JSON.stringify({ productId, unit }) }), // Pass unit
  removeFromWishlist: (productId) => apiRequest(`/wishlist/${productId}`, { method: 'DELETE' }),
  placeOrder: (orderData) => apiRequest(`/orders`, { method: 'POST', body: JSON.stringify(orderData) }), // Place order
  getOrders: (userId, params) => apiRequest(`/orders/user/${userId}?${new URLSearchParams(params)}`), // Customer orders
  getOrderById: (orderId) => apiRequest(`/orders/${orderId}`), // This endpoint doesn't exist yet in backend
};

// --- Admin Specific Endpoints ---
export const admin = {
  getDashboardStats: () => apiRequest(`/admin/dashboard/stats`), // Fetch admin dashboard stats
  getUsers: (params) => apiRequest(`/admin/users?${new URLSearchParams(params)}`),
  updateUserStatus: (userId, isActive) => apiRequest(`/admin/users/${userId}/status`, { method: 'PUT', body: JSON.stringify({ isActive }) }),
  deleteUser: (userId) => apiRequest(`/admin/users/${userId}`, { method: 'DELETE' }),
  getProducts: (params) => apiRequest(`/products?${new URLSearchParams(params)}`), // Admin gets all products
  updateProduct: (productId, productData) => apiRequest(`/admin/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }),
  deleteProduct: (productId) => apiRequest(`/admin/products/${productId}`, { method: 'DELETE' }),
  getOrders: (params) => apiRequest(`/admin/orders?${new URLSearchParams(params)}`), // Admin gets all orders
  updateOrderStatus: (orderId, status) => apiRequest(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }), // Admin can update status via general order route
  initiateRefund: (orderId) => apiRequest(`/admin/orders/${orderId}/refund`, { method: 'POST' }), // This endpoint doesn't exist yet in backend
  updateStore: (storeId, storeData) => apiRequest(`/admin/stores/${storeId}`, { method: 'PUT', body: JSON.stringify(storeData) }),
  deleteStore: (storeId) => apiRequest(`/admin/stores/${storeId}`, { method: 'DELETE' }),
};

// --- Upload Endpoints ---
export const upload = {
  uploadImage: (formData) => apiRequest('/upload', { method: 'POST', body: formData }),
};

// --- General Endpoints ---
export const general = {
  getStores: (params) => apiRequest(`/stores?${new URLSearchParams(params)}`),
  getStoreById: (storeId) => apiRequest(`/stores/${storeId}`),
  getCategories: () => apiRequest('/categories'), // This endpoint doesn't exist yet in backend
  getFAQ: () => apiRequest('/faq'), // This endpoint doesn't exist yet in backend
  getAboutContent: () => apiRequest('/about'), // This endpoint doesn't exist yet in backend
};

// --- Password Reset Endpoints ---
export const passwordReset = {
  forgotPassword: (email) => apiRequest('/password-reset/forgot', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, password) => apiRequest(`/password-reset/reset/${token}`, { method: 'POST', body: JSON.stringify({ password }) }),
};