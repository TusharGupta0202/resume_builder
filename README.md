# 🚀 Resume Builder – Full Stack Web Application

A modern, responsive, and fully-featured **Resume Builder Web Application** that allows users to create, customize, preview, and download professional resumes effortlessly.

Live Demo:  
👉 https://resume-builder-mu-murex.vercel.app/

---

## 📌 Table of Contents

- About the Project
- Features
- Tech Stack
- Screenshots
- System Architecture
- Project Structure
- Installation
- Environment Variables
- Running Locally
- Deployment
- API Overview
- Cloudinary Integration
- Authentication Flow
- Resume Generation Flow
- Troubleshooting
- Future Improvements
- License
- Author

---

## 📖 About the Project

Resume Builder is a full-stack web application that enables users to:

- Register and log in securely
- Create multiple resumes
- Edit resume sections step-by-step
- Upload profile photos
- Choose resume templates
- Apply color themes
- Preview resumes in real time
- Generate thumbnails
- Download resumes as PDF
- Store data securely in MongoDB
- Upload and manage images using Cloudinary

The application is designed to be fast, scalable, and user-friendly.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Secure Password Hashing

### 📄 Resume Management
- Create Multiple Resumes
- Edit Resume
- Delete Resume
- Auto Save
- Resume Dashboard

### 🧩 Resume Sections
- Personal Information
- Contact Details
- Work Experience
- Education
- Skills with Rating
- Projects
- Certifications
- Languages
- Interests

### 🎨 Customization
- Multiple Resume Templates
- Color Palette Selection
- Live Preview
- Theme Selector

### 🖼️ Media Handling
- Profile Photo Upload
- Resume Thumbnail Generation
- Cloudinary Image Storage
- Auto Replace Old Images

### 📥 Export
- Resume Preview
- Print to PDF
- Download Resume

### ☁️ Deployment
- Backend hosted on Render
- Frontend hosted on Vercel
- Cloudinary for media

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Multer
- Cloudinary
- JWT
- Bcrypt

### DevOps
- Render (Backend)
- Vercel (Frontend)
- MongoDB Atlas
- Cloudinary CDN

---

## 📸 Screenshots

> Note: All screenshots use demo data and placeholder names.

### Landing Page
- Homepage
- Call-to-action
- Login / Signup Modal

<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/0c7e9fdc-be18-4e83-97e9-fa3a68670c6d" />


### Authentication
- Login Modal
- Signup Modal

<img width="1901" height="917" alt="image" src="https://github.com/user-attachments/assets/14c230d2-d77b-456a-a1eb-f54b71232227" />
<img width="1901" height="912" alt="image" src="https://github.com/user-attachments/assets/2b3469eb-7348-4b49-b563-2b9f6c7bfbf8" />


### Dashboard
- Resume Cards
- Add Resume
- Thumbnails

<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/a2e8f5a7-4747-4ac9-89cb-baff7fa6607a" />


### Resume Editor
- Step-by-step Forms
- Live Preview
- Profile Photo Upload

<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/9920b0d8-acc0-424e-9086-989b6364173b" />


### Theme Selector
- Template Selection
- Color Palettes
- Real-Time Preview

<img width="1897" height="912" alt="image" src="https://github.com/user-attachments/assets/ea1994fc-613a-45ef-9e8a-ac720d80c817" />
<img width="1903" height="914" alt="image" src="https://github.com/user-attachments/assets/2113d981-d4e9-426c-8697-8e613789c957" />


### Resume Preview
- Full Resume
- Download Option


---

## 🏗 System Architecture

Frontend (Vercel)
|
| Axios (REST API)
|
Backend (Render)
|
|
MongoDB Atlas
|
|
Cloudinary CDN


---

## ⚙️ Installation

### 1. Clone Repository
- git clone https://github.com/your-username/resume_builder.git
- cd resume_builder

### 2. Install Backend Dependencies
- cd backend
- npm install

### 3. Install Frontend Dependencies
- cd ../frontend
- npm install

## 🔐 Environment Variables

### Backend .env

- Create backend/.env

PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173

### Frontend .env

- Create frontend/.env

VITE_API_BASE_URL=http://localhost:8000/api

## ▶️ Running Locally

### Start Backend
- cd backend
- npm run dev


Backend runs on:
http://localhost:8000

### Start Frontend
- cd frontend
- npm run dev

Frontend runs on:
http://localhost:5173

## 🚀 Deployment

### Backend (Render)

- Create new Web Service
- Connect GitHub repository
- Select backend folder
- Add Environment Variables
- Set Start Command:  npm start

### Frontend (Vercel)

- Import GitHub Repo
- Select frontend folder
- Add Environment Variables
- Deploy

## 📡 API Overview

### Auth Routes
- POST   /api/auth/register
- POST   /api/auth/login
- GET    /api/auth/profile

### Resume Routes
- POST   /api/resume/create
- GET    /api/resume/all
- GET    /api/resume/:id
- PUT    /api/resume/update/:id
- DELETE /api/resume/delete/:id

### Image Upload
- PUT /api/resume/upload-images/:id

## ☁️ Cloudinary Integration

### Packages

- cloudinary@1.41.3
- multer@1.4.5-lts.1
- multer-storage-cloudinary@4.0.0

### Storage Setup

- Images are stored in:
- resume_builder/
   ├── thumbnails
   └── profile_images

Auto delete of old images is implemented.

## 🔐 Authentication Flow

- User registers
- Password is hashed (bcrypt)
- JWT token generated
- Token stored in localStorage
- Axios interceptor attaches token
- Backend validates token
- Protected routes unlocked

## 📝 Resume Generation Flow

- User fills form
- Live preview updates
- DOM captured as image
- Image converted to file
- File uploaded to backend
- Backend uploads to Cloudinary
- URL saved in MongoDB
- Dashboard shows thumbnail

## 🐞 Troubleshooting

### 401 Unauthorized
- Check JWT token
- Check Authorization header

### Re-login

- Images Upload but Not Showing
- Verify Cloudinary URL saved in DB
- Check response from upload API
- Ensure frontend updates state
- MongoDB Connection Error
- Check IP whitelist
- Verify MONGO_URI
- Enable Network Access in Atlas
- CORS Error
- Verify CLIENT_URL in backend
- Enable CORS middleware

## 🔮 Future Improvements

- Resume Sharing Link
- AI Resume Suggestions
- Resume Analytics
- Cover Letter Generator
- Multi-language Support
- Drag & Drop Sections
- Payment Integration
- Admin Dashboard

## 📜 License

This project is licensed under the MIT License.

You are free to:
- Use
- Modify
- Distribute
- Commercialize

With attribution.

## 👨‍💻 Author

### Developed by:
- Tushar Gupta
- Full Stack Developer

### Specialized in:
- MERN Stack
- REST APIs
- Cloud Deployment
- UI/UX Design
- Performance Optimization

For collaboration, feel free to open issues and pull requests.
