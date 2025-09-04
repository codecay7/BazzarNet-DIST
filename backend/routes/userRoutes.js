import express from 'express';
import { getMe, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { updateCustomerProfileSchema, updateVendorProfileSchema } from '../validators/userValidator.js';

const router = express.Router();

// Protected route to get the authenticated user's profile
router.get('/me', protect, getMe);

// Protected route to update the authenticated user's profile
// The validation schema will be applied conditionally in the controller based on user role
router.put('/me', protect, updateUserProfile);

export default router;