import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUpdateStore,
  adminDeleteStore,
} from '../controllers/adminController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { updateProductSchema } from '../validators/productValidator.js';
import { updateStoreSchema } from '../validators/storeValidator.js';
import Joi from 'joi';

const router = express.Router();

const updateUserStatusSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

// All admin routes are protected and restricted to admin role
router.use(protect, authorizeRoles('admin'));

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/status', validate(updateUserStatusSchema), updateUserStatus);
router.delete('/users/:id', deleteUser);

// Product management routes (Admin)
router.put('/products/:id', validate(updateProductSchema), adminUpdateProduct);
router.delete('/products/:id', adminDeleteProduct);

// Store management routes (Admin)
router.put('/stores/:id', validate(updateStoreSchema), adminUpdateStore);
router.delete('/stores/:id', adminDeleteStore);

export default router;