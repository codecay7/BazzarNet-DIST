import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  placeOrder,
  getCustomerOrders,
  getVendorOrders,
  updateOrderStatus,
  confirmDelivery,
} from '../controllers/orderController.js';

const router = express.Router();

// Customer routes
router.post('/', protect, authorizeRoles('customer'), placeOrder);
router.get('/user/:userId', protect, authorizeRoles('customer'), getCustomerOrders);

// Vendor routes
router.get('/store/:storeId', protect, authorizeRoles('vendor'), getVendorOrders);
router.put('/:id/status', protect, authorizeRoles('vendor', 'admin'), updateOrderStatus); // Vendor/Admin can update status
router.post('/:id/confirm-delivery', protect, authorizeRoles('vendor'), confirmDelivery);

export default router;