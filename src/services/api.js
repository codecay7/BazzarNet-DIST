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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
    // Simulate network delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 300)); 

    // In a real app, replace this with actual fetch:
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || `API Error: ${response.statusText}`);
    // }
    // return response.json();

    // For now, we'll just log the request and return a mock success
    console.log(`[API Mock] Request to ${endpoint}`, { method: options.method, body: options.body, headers });
    return { success: true, message: `Mock API call to ${endpoint} successful.` };

  } catch (error) {
    console.error(`API Request Failed for ${endpoint}:`, error);
    // Handle specific errors (e.g., 401 Unauthorized -> logout)
    if (error.message.includes('Unauthorized')) {
      // Implement logout logic here
      // localStorage.removeItem('user');
      // window.location.href = '/login';
    }
    throw error;
  }
};

// --- Authentication Endpoints ---
export const auth = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  registerUser: (userData) => apiRequest('/auth/register/user', { method: 'POST', body: JSON.stringify(userData) }),
  registerVendor: (vendorData) => apiRequest('/auth/register/vendor', { method: 'POST', body: JSON.stringify(vendorData) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
};

// --- User Profile Endpoints ---
export const userProfile = {
  getProfile: (userId) => apiRequest(`/users/${userId}/profile`),
  updateProfile: (userId, profileData) => apiRequest(`/users/${userId}/profile`, { method: 'PUT', body: JSON.stringify(profileData) }),
  uploadProfileImage: (formData) => apiRequest('/upload/profile-image', { method: 'POST', body: formData, headers: {} }), // No Content-Type for FormData
};

// --- Product Endpoints ---
export const products = {
  getAll: (params) => apiRequest(`/products?${new URLSearchParams(params)}`),
  getById: (productId) => apiRequest(`/products/${productId}`),
  getStoreProducts: (storeId, params) => apiRequest(`/stores/${storeId}/products?${new URLSearchParams(params)}`),
  getRecommended: (params) => apiRequest(`/products/recommended?${new URLSearchParams(params)}`),
};

// --- Vendor Specific Endpoints ---
export const vendor = {
  getDashboardStats: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/stats?${new URLSearchParams(params)}`),
  getSalesTrend: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/sales-trend?${new URLSearchParams(params)}`),
  getFastSellingItems: (vendorId, params) => apiRequest(`/vendors/${vendorId}/dashboard/fast-selling-items?${new URLSearchParams(params)}`),
  getProducts: (vendorId, params) => apiRequest(`/vendors/${vendorId}/products?${new URLSearchParams(params)}`),
  addProduct: (vendorId, productData) => apiRequest(`/vendors/${vendorId}/products`, { method: 'POST', body: JSON.stringify(productData) }),
  updateProduct: (vendorId, productId, productData) => apiRequest(`/vendors/${vendorId}/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }),
  deleteProduct: (vendorId, productId) => apiRequest(`/vendors/${vendorId}/products/${productId}`, { method: 'DELETE' }),
  getOrders: (vendorId, params) => apiRequest(`/vendors/${vendorId}/orders?${new URLSearchParams(params)}`),
  updateOrderStatus: (vendorId, orderId, status) => apiRequest(`/vendors/${vendorId}/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  confirmDelivery: (vendorId, orderId, otp) => apiRequest(`/vendors/${vendorId}/orders/${orderId}/confirm-delivery`, { method: 'POST', body: JSON.stringify({ otp }) }),
  getPayments: (vendorId, params) => apiRequest(`/vendors/${vendorId}/payments?${new URLSearchParams(params)}`),
  reportPaymentIssue: (vendorId, paymentId) => apiRequest(`/vendors/${vendorId}/payments/${paymentId}/report-issue`, { method: 'POST' }),
};

// --- Customer Specific Endpoints ---
export const customer = {
  getCart: (userId) => apiRequest(`/customers/${userId}/cart`),
  addToCart: (userId, productId, quantity = 1) => apiRequest(`/customers/${userId}/cart`, { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (userId, productId, quantity) => apiRequest(`/customers/${userId}/cart/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeFromCart: (userId, productId) => apiRequest(`/customers/${userId}/cart/${productId}`, { method: 'DELETE' }),
  getWishlist: (userId) => apiRequest(`/customers/${userId}/wishlist`),
  addToWishlist: (userId, productId) => apiRequest(`/customers/${userId}/wishlist`, { method: 'POST', body: JSON.stringify({ productId }) }),
  removeFromWishlist: (userId, productId) => apiRequest(`/customers/${userId}/wishlist/${productId}`, { method: 'DELETE' }),
  placeOrder: (userId, orderDetails) => apiRequest(`/customers/${userId}/orders`, { method: 'POST', body: JSON.stringify(orderDetails) }),
  getOrders: (userId, params) => apiRequest(`/customers/${userId}/orders?${new URLSearchParams(params)}`),
  getOrderById: (userId, orderId) => apiRequest(`/customers/${userId}/orders/${orderId}`),
};

// --- Admin Specific Endpoints ---
export const admin = {
  getDashboardStats: (params) => apiRequest(`/admin/dashboard/stats?${new URLSearchParams(params)}`),
  getUsers: (params) => apiRequest(`/admin/users?${new URLSearchParams(params)}`),
  updateUserStatus: (userId, isActive) => apiRequest(`/admin/users/${userId}/status`, { method: 'PUT', body: JSON.stringify({ isActive }) }),
  deleteUser: (userId) => apiRequest(`/admin/users/${userId}`, { method: 'DELETE' }),
  getProducts: (params) => apiRequest(`/admin/products?${new URLSearchParams(params)}`),
  updateProduct: (productId, productData) => apiRequest(`/admin/products/${productId}`, { method: 'PUT', body: JSON.stringify(productData) }),
  deleteProduct: (productId) => apiRequest(`/admin/products/${productId}`, { method: 'DELETE' }),
  getOrders: (params) => apiRequest(`/admin/orders?${new URLSearchParams(params)}`),
  updateOrderStatus: (orderId, status) => apiRequest(`/admin/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  initiateRefund: (orderId) => apiRequest(`/admin/orders/${orderId}/refund`, { method: 'POST' }),
};

// --- General Endpoints ---
export const general = {
  getStores: (params) => apiRequest(`/stores?${new URLSearchParams(params)}`),
  getStoreById: (storeId) => apiRequest(`/stores/${storeId}`),
  getCategories: () => apiRequest('/categories'), // Assuming categories are dynamic
  getFAQ: () => apiRequest('/faq'),
  getAboutContent: () => apiRequest('/about'),
};