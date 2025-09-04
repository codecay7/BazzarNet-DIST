import express from 'express';
import { getMe, updateUserProfile, updateUserProfileImage } from '../controllers/userController.js'; // Import updateUserProfileImage
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { updateCustomerProfileSchema, updateVendorProfileSchema } from '../validators/userValidator.js';
import upload from '../middleware/uploadMiddleware.js'; // Import upload middleware

const router = express.Router();

// Protected route to get the authenticated user's profile
router.get('/me', protect, getMe);

// Protected route to update the authenticated user's profile
// The validation schema will be applied conditionally in the controller based on user role
router.put('/me', protect, updateUserProfile);

// Protected route to update user's profile image
router.put('/me/profile-image', protect, upload.single('image'), updateUserProfileImage); // New route for image upload

export default router;