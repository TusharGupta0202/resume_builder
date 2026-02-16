const Resume = require('../models/Resume');
const upload = require('../middlewares/uploadMiddleware');
const cloudinary = require('cloudinary').v2;

// Helper to extract public_id from Cloudinary URL
const extractPublicId = (url) => {
  const parts = url.split('/');
  const filename = parts.slice(-2).join('/').split('.')[0]; // folder/filename (without extension)
  return filename;
};

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: 'thumbnail' }, { name: 'profileImg' }])(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: 'Resume not found or unauthorized' });
      }

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImg?.[0];

      // Delete old thumbnail if uploading a new one
      if (newThumbnail && resume.thumbnailLink) {
        try {
          const publicId = extractPublicId(resume.thumbnailLink);
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteErr) {
          console.warn('Failed to delete old thumbnail from Cloudinary:', deleteErr.message);
        }
        resume.thumbnailLink = newThumbnail.secure_url;
      }

      // Delete old profile image if uploading a new one
      if (newProfileImage && resume.profileInfo?.profilePreviewUrl) {
        try {
          const publicId = extractPublicId(resume.profileInfo.profilePreviewUrl);
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteErr) {
          console.warn('Failed to delete old profile image from Cloudinary:', deleteErr.message);
        }
        resume.profileInfo = resume.profileInfo || {};
        resume.profileInfo.profilePreviewUrl = newProfileImage.secure_url;
      }

      await resume.save();

      res.status(200).json({
        message: 'Images uploaded successfully',
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo?.profilePreviewUrl,
      });
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
};

module.exports = { uploadResumeImages };
