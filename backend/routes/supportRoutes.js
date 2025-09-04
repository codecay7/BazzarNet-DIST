import express from 'express';
import { submitSupportRequest } from '../controllers/supportController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { submitSupportSchema } from '../validators/supportValidator.js';

const router = express.Router();

// Public route for submitting support requests
router.post('/submit', validate(submitSupportSchema), submitSupportRequest);

export default router;