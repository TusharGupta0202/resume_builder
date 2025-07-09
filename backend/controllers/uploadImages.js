const Resume = require('../models/Resume');
const upload = require('../middlewares/uploadMiddleware');

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

      if (newThumbnail) {
        resume.thumbnailLink = newThumbnail.path; // Cloudinary returns a direct image URL in .path
      }

      if (newProfileImage) {
        resume.profileInfo = resume.profileInfo || {}; // ensure it's not undefined
        resume.profileInfo.profilePreviewUrl = newProfileImage.path;
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
