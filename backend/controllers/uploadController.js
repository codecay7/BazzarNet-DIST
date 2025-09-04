import asyncHandler from '../middleware/asyncHandler.js';
import path from 'path';

// @desc    Upload image file
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (req.file) {
    // Construct the URL for the uploaded file
    // Assuming your frontend is served from the root and backend is on :5000
    // and 'uploads' is a static folder served by Express
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ message: 'Image uploaded successfully', filePath });
  } else {
    res.status(400);
    throw new Error('No image file provided');
  }
});

export { uploadImage };