import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    let responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      address: user.address,
      phone: user.phone,
      upiId: user.upiId,
      cardDetails: user.cardDetails,
      profileImage: user.profileImage,
    };

    if (user.role === 'vendor') {
      responseData.storeId = user.storeId;
      responseData.store = user.store;
      responseData.pan = user.pan;
      responseData.gst = user.gst;
      responseData.description = user.description;
      responseData.category = user.category;
      responseData.bankAccount = user.bankAccount;
      responseData.bankName = user.bankName;
      responseData.ifsc = user.ifsc;
    }

    res.json(responseData);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getMe };