import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
import Product from '../models/Product.js';

// --- User Management ---

// @desc    Get all users (customers and vendors)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const { role, status, search } = req.query;
  let query = {};

  if (role && role !== 'all') {
    query.role = role;
  }
  if (status && status !== 'all') {
    query.isActive = status === 'active';
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const users = await User.find(query).select('-password');
  res.json(users);
});

// @desc    Update user status (activate/deactivate)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { isActive } = req.body;

  if (user) {
    if (typeof isActive !== 'boolean') {
      res.status(400);
      throw new Error('isActive must be a boolean value.');
    }
    user.isActive = isActive;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      message: `User ${updatedUser.name} status updated to ${updatedUser.isActive ? 'active' : 'inactive'}.`
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role === 'admin') {
      res.status(403);
      throw new Error('Cannot delete an admin user.');
    }

    if (user.role === 'vendor' && user.storeId) {
      await Product.deleteMany({ store: user.storeId });
      await Store.deleteOne({ _id: user.storeId });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User and associated data removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// --- Product Management (Admin) ---

// @desc    Update any product (Admin)
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const adminUpdateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, originalPrice, stock, category, image, isActive } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
  product.stock = stock !== undefined ? stock : product.stock;
  product.category = category || product.category;
  product.image = image || product.image;
  product.isActive = isActive !== undefined ? isActive : product.isActive;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete any product (Admin)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed by admin' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// --- Store Management (Admin) ---

// @desc    Update any store (Admin)
// @route   PUT /api/admin/stores/:id
// @access  Private/Admin
const adminUpdateStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  
  const { name, description, category, address, phone, email, logo, isActive } = req.body;
  store.name = name || store.name;
  store.description = description || store.description;
  store.category = category || store.category;
  store.phone = phone || store.phone;
  store.email = email || store.email;
  store.logo = logo || store.logo;
  store.isActive = isActive !== undefined ? isActive : store.isActive;
  if (address) {
    store.address = { ...store.address, ...address };
  }

  const updatedStore = await store.save();
  res.json(updatedStore);
});

// @desc    Delete any store (Admin)
// @route   DELETE /api/admin/stores/:id
// @access  Private/Admin
const adminDeleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store) {
    await Product.deleteMany({ store: store._id });
    await Store.deleteOne({ _id: store._id });
    // Note: This does not delete the owner user, only their store and products.
    res.json({ message: 'Store and its products removed by admin' });
  } else {
    res.status(404);
    throw new Error('Store not found');
  }
});

export {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUpdateStore,
  adminDeleteStore,
};