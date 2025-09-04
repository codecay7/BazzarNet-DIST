import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import Store from '../models/Store.js'; // Needed for cascading delete

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

    // If the user is a vendor, delete their associated store and products
    if (user.role === 'vendor' && user.storeId) {
      await Store.deleteOne({ _id: user.storeId });
      // In a real app, you'd also delete all products associated with this store
      // await Product.deleteMany({ store: user.storeId });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getAllUsers, updateUserStatus, deleteUser };