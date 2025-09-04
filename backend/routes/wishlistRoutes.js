import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getWishlist, addItemToWishlist, removeItemFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.route('/')
  .get(protect, getWishlist)
  .post(protect, addItemToWishlist);

router.route('/:id')
  .delete(protect, removeItemFromWishlist);

export default router;