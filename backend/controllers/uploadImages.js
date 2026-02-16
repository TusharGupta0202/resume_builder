// backend/controllers/uploadImages.js

const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "profileImg", maxCount: 1 },
    ])(req, res, async (err) => {

      if (err) {
        return res.status(400).json({
          message: "Upload failed",
          error: err.message,
        });
      }

      const resumeId = req.params.id;

      const resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user._id,
      });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfile = req.files?.profileImg?.[0];

      if (newThumbnail) {
        resume.thumbnailLink =
          newThumbnail.path || newThumbnail.secure_url;
      }

      if (newProfile) {
        if (!resume.profileInfo) resume.profileInfo = {};

        resume.profileInfo.profilePreviewUrl =
          newProfile.path || newProfile.secure_url;
      }

      const saved = await resume.save();

      return res.status(200).json({
        message: "Images uploaded",
        thumbnailLink: saved.thumbnailLink,
        profilePreviewUrl: saved.profileInfo.profilePreviewUrl,
      });
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { uploadResumeImages };
