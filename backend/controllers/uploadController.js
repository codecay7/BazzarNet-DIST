import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Upload image file
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (req.file) {
    // req.file.path contains the URL from CloudinaryStorage
    const filePath = req.file.path; 
    res.json({ message: 'Image uploaded successfully', filePath });
  } else {
    res.status(400);
    throw new Error('No image file provided');
  }
});

export { uploadImage };