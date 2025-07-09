const fs = require('node:fs');
const path = require('node:path');
const Resume = require('../models/resume');
const upload = require('../middlewares/uploadMiddleware')

const uploadResumeImages = async (req, res) => {
    try {

        upload.fields([{name: 'thumbnail'}, {name: 'profileImg'}]) (req, res, async (err) => {
        const resumeId = req.params.id;

        const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or unauthorized' });
        }

        const uploadsFolder = path.join(__dirname, '..','uploads');
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImg?.[0];

        if (newThumbnail) {
            if (resume.thumbnailLink) {
                const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
            }
            resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        if (newProfileImage) {
            if (resume.profileInfo?.profilePreviewUrl) {
                const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
            }
            resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }
        
        await resume.save();
        res.status(200).json({
            message: 'Images uploaded successfully',
            thumbnailLink: resume.thumbnailLink,
            profilePreviewUrl: resume.profileInfo.profilePreviewUrl
        });
    });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Failed to upload images', error: error.message });
    }
}

module.exports = {uploadResumeImages};