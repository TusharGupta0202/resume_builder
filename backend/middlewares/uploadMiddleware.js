// backend/middlewares/uploadMiddleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

// File type filter (same as yours)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed.'), false);
  }
};

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'resume_builder', // optional folder name in your Cloudinary media library
    public_id: `${Date.now()}-${file.originalname}`,
    resource_type: 'image', // ensures it's handled as image
  }),
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
