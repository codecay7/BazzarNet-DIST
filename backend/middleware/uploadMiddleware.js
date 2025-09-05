import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import env from '../config/env.js'; // Import env for Cloudinary credentials

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bazzarnet_uploads', // Folder name in Cloudinary
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional: resize images
  },
});

// Check file type to allow only images (Multer's fileFilter)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|svg/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;