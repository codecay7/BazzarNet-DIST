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
    'Content-Type': 'application/json',
    ...options.headers,
  };

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
  uploadProfileImage: (formData) => apiRequest('/upload/profile-image', { method: 'POST', body: formData, headers: {} }), // This endpoint doesn't exist yet in backend
};

// --- Product Endpoints ---
export const products = {
  getAll: (params) => apiRequest(`/products?${new URLSearchParams(params)}`),
  getById: (productId) => apiRequest(`/products/${productId}`),
  getStoreProducts: (storeId, params) => apiRequest(`/stores/${storeId}/products?${new URLSearchParams(params)}`),
  getRecommended: (params) => apiRequest(`/products/recommended?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
};

// --- Store Endpoints ---
export const stores = {
  getAll: (params) => apiRequest(`/stores?${new URLSearchParams(params)}`),
  getById: (storeId) => apiRequest(`/stores/${storeId}`),
  updateStore: (storeId, storeData) => apiRequest(`/stores/${storeId}`, { method: 'PUT', body: JSON.stringify(storeData) }),
};

// --- Vendor Specific Endpoints ---
export const vendor = {
  getDashboardStats: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/stats?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getSalesTrend: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/sales-trend?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getFastSellingItems: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/fast-selling-items?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getProducts: (vendorId, params) => apiRequest(`/products?store=${vendorId}&${new URLSearchParams(params)}`), // Using general products endpoint with store filter
  addProduct: (productData) => apiRequest(`/products`, { method: 'POST', body: JSON.stringify(productData) }), // Vendor adds product to their store
  updateProduct: (productId, productData) => apiRequest(`/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }), // Vendor updates their product
  deleteProduct: (productId) => apiRequest(`/products/${productId}`, { method: 'DELETE' }), // Vendor deletes their product
  getOrders: (storeId, params) => apiRequest(`/orders/store/${storeId}?${new URLSearchParams(params)}`), // Vendor orders
  updateOrderStatus: (orderId, status) => apiRequest(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }), // Vendor updates order status
  confirmDelivery: (orderId, otp) => apiRequest(`/orders/${orderId}/confirm-delivery`, { method: 'POST', body: JSON.stringify({ otp }) }), // Vendor confirms delivery
  getPayments: (vendorId, params) => apiRequest(`/vendors/${vendorId}/payments?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  reportPaymentIssue: (vendorId, paymentId) => apiRequest(`/vendors/${vendorId}/payments/${paymentId}/report-issue`, { method: 'POST' }), // This endpoint doesn't exist yet in backend
};

// --- Customer Specific Endpoints ---
export const customer = {
  getCart: () => apiRequest(`/cart`), // Fetch current user's cart
  addToCart: (productId, quantity = 1) => apiRequest(`/cart`, { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (itemId, quantity) => apiRequest(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeFromCart: (itemId) => apiRequest(`/cart/${itemId}`, { method: 'DELETE' }),
  getWishlist: (userId) => apiRequest(`/customers/${userId}/wishlist`), // This endpoint doesn't exist yet in backend
  addToWishlist: (userId, productId) => apiRequest(`/customers/${userId}/wishlist`, { method: 'POST', body: JSON.stringify({ productId }) }), // This endpoint doesn't exist yet in backend
  removeFromWishlist: (userId, productId) => apiRequest(`/customers/${userId}/wishlist/${productId}`, { method: 'DELETE' }), // This endpoint doesn't exist yet in backend
  placeOrder: (orderData) => apiRequest(`/orders`, { method: 'POST', body: JSON.stringify(orderData) }), // Place order
  getOrders: (userId, params) => apiRequest(`/orders/user/${userId}?${new URLSearchParams(params)}`), // Customer orders
  getOrderById: (orderId) => apiRequest(`/orders/${orderId}`), // This endpoint doesn't exist yet in backend
};

// --- Admin Specific Endpoints ---
export const admin = {
  getDashboardStats: (params) => apiRequest(`/admin/dashboard/stats?${new URLSearchParams(params)}`), // This endpoint doesn't exist yet in backend
  getUsers: (params) => apiRequest(`/admin/users?${new URLSearchParams(params)}`),
  updateUserStatus: (userId, isActive) => apiRequest(`/admin/users/${userId}/status`, { method: 'PUT', body: JSON.stringify({ isActive }) }),
  deleteUser: (userId) => apiRequest(`/admin/users/${userId}`, { method: 'DELETE' }),
  getProducts: (params) => apiRequest(`/products?${new URLSearchParams(params)}`), // Admin gets all products
  updateProduct: (productId, productData) => apiRequest(`/admin/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }),
  deleteProduct: (productId) => apiRequest(`/admin/products/${productId}`, { method: 'DELETE' }),
  getOrders: (params) => apiRequest(`/orders?${new URLSearchParams(params)}`), // Admin gets all orders
  updateOrderStatus: (orderId, status) => apiRequest(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  initiateRefund: (orderId) => apiRequest(`/admin/orders/${orderId}/refund`, { method: 'POST' }), // This endpoint doesn't exist yet in backend
  updateStore: (storeId, storeData) => apiRequest(`/admin/stores/${storeId}`, { method: 'PUT', body: JSON.stringify(storeData) }),
  deleteStore: (storeId) => apiRequest(`/admin/stores/${storeId}`, { method: 'DELETE' }),
};

// --- General Endpoints ---
export const general = {
  getStores: (params) => apiRequest(`/stores?${new URLSearchParams(params)}`),
  getStoreById: (storeId) => apiRequest(`/stores/${storeId}`),
  getCategories: () => apiRequest('/categories'), // This endpoint doesn't exist yet in backend
  getFAQ: () => apiRequest('/faq'), // This endpoint doesn't exist yet in backend
  getAboutContent: () => apiRequest('/about'), // This endpoint doesn't exist yet in backend
};