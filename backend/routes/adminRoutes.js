import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUserStatus, deleteUser } from '../controllers/adminController.js';
import { validate } from '../middleware/validationMiddleware.js';
import Joi from 'joi'; // Import Joi for simple validation here

const router = express.Router();

// Joi schema for updating user status
const updateUserStatusSchema = Joi.object({
  isActive: Joi.boolean().required().messages({
    'any.required': 'isActive status is required.',
    'boolean.base': 'isActive must be a boolean value.',
  }),
});

// All admin routes should be protected and restricted to admin role
router.use(protect, authorizeRoles('admin'));

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', getAllUsers);

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status (activate/deactivate)
router.put('/users/:id/status', validate(updateUserStatusSchema), updateUserStatus);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
router.delete('/users/:id', deleteUser);

export default router;