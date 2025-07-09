const fs = require('node:fs');
const path = require('node:path');
const cloudinary = require('../cloudinary');

const Resume = require('../models/Resume');

const createResume = async (req, res) => {
    try {
        const { title} = req.body;
        const defaultResumeTemplate = {
            profileInfo: {
                profileImg : null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedIn: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeTemplate,
        });

        res.status(201).json(newResume);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create resume', error: error.message });
        
    }
}

const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({updatedAt: -1});
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
    }
};

const getResumeById = async (req, res) => {
     try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
    }
}

const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        Object.assign(resume, req.body);

        const updatedResume = await resume.save();
        res.json(updatedResume);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
    }
}



const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const deleteCloudinaryImage = async (url) => {
      if (!url) return;
      const publicId = url.split('/').pop().split('.')[0]; // extract from URL
      try {
        await cloudinary.uploader.destroy(`resume_builder/${publicId}`);
      } catch (err) {
        console.warn('Cloudinary deletion failed:', err.message);
      }
    };

    await deleteCloudinaryImage(resume.thumbnailLink);
    await deleteCloudinaryImage(resume.profileInfo?.profilePreviewUrl);

    await Resume.deleteOne({ _id: req.params.id, userId: req.user._id });

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
};


module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
};