import asyncHandler from '../middleware/asyncHandler.js';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product', 'name price image');

  if (wishlist) {
    res.json(wishlist.items);
  } else {
    res.json([]); // Return empty array if no wishlist exists
  }
});

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addItemToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    // Create a new wishlist if one doesn't exist for the user
    wishlist = new Wishlist({ user: req.user._id, items: [] });
  }

  const existingItem = wishlist.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    res.status(400);
    throw new Error('Product already in wishlist');
  } else {
    wishlist.items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  }

  await wishlist.save();
  const updatedWishlist = await Wishlist.findById(wishlist._id).populate('items.product', 'name price image');
  res.status(201).json(updatedWishlist.items);
});

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeItemFromWishlist = asyncHandler(async (req, res) => {
  const { id: productId } = req.params; // Product ID to remove

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  const initialLength = wishlist.items.length;
  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (wishlist.items.length === initialLength) {
    res.status(404);
    throw new Error('Product not found in wishlist');
  }

  await wishlist.save();
  const updatedWishlist = await Wishlist.findById(wishlist._id).populate('items.product', 'name price image');
  res.json(updatedWishlist.items);
});

export { getWishlist, addItemToWishlist, removeItemFromWishlist };