import express from 'express';
import { getMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to get the authenticated user's profile
router.get('/me', protect, getMe);

export default router;