import express from 'express';
import { registerUser, registerVendor, login } from '../controllers/authController.js';
import { validate } from '../middleware/validationMiddleware.js'; // We'll create this next
import { registerUserSchema, registerVendorSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

// Public routes for authentication
router.post('/register/customer', validate(registerUserSchema), registerUser);
router.post('/register/vendor', validate(registerVendorSchema), registerVendor);
router.post('/login', validate(loginSchema), login);

export default router;