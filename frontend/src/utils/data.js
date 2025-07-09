import TEMPLATE_ONE_IMG from '../assets/template-one.png';
import TEMPLATE_TWO_IMG from '../assets/template-two.png';
import TEMPLATE_THREE_IMG from '../assets/template-three.png';

export const resumeTemplates = [
    {
        id : '01',
        thumbnailImg : TEMPLATE_ONE_IMG,
        colorpalatteCode : 'themeOne',
    },
    {
        id : '02',
        thumbnailImg : TEMPLATE_TWO_IMG,
        colorpalatteCode : 'themeTwo',
    },
    {
        id : '03',
        thumbnailImg : TEMPLATE_THREE_IMG,
        colorpalatteCode : 'themeThree',
    },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2FB", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#ADF0FF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7AA", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f8", "#1E88E5", "#0D47A1"],
  ],
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
      profileImg:null,
      profilePreviewUrl: "",
      fullName: "John Doe",
      designation: "Senior Software Engineer",
      summary: "Passionate software engineer with over 5 years of experience in developing scalable web applications. Proficient in JavaScript, React, and Node.js.",
    },
    contactInfo: {
      email: "Johndoe@ex.com",
      phone: "8574748596",
      location: "12 Street, City, Country",
      website: "www.johndoe.com",
      linkedIn: "https://www.linkedin.com/in/johndoe",
      github: "www.github.com/johndoe",
    },
    workExperience: [{
        company: "tech company",
        role: "software engineer",
        startDate: "2024-03",
        endDate: "2025-03",
        description: "Leading a team of developers to build scalable web applications. Implementing best practices in software development and ensuring code quality.",
    },
    {
        company: "another tech company",
        role: "junior software engineer",
        startDate: "2022-01",
        endDate: "2024-02",
        description: "Assisted in the development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software.",
    },
    {
        company: "startup",
        role: "intern",
        startDate: "2021-06",
        endDate: "2021-12",
        description: "Gained hands-on experience in software development and learned about agile methodologies. Contributed to the development of a mobile application.",
    },
    {
        company: "freelance",
        role: "web developer",
        startDate: "2020-01",
        endDate: "2021-05",
        description: "Developed and maintained websites for various clients. Focused on responsive design and user experience.",
    }
    ],
    education: [{
        degree: "M.Sc. in Computer Science",
        institution: "University of Technology",
        startDate: "2020-09",
        endDate: "2022-06",
    },
    {
        degree: "B.Sc. in Information Technology",
        institution: "City College",
        startDate: "2016-09",
        endDate: "2020-06",
    },
    {
        degree: "High School Diploma",
        institution: "Local High School",
        startDate: "2012-09",
        endDate: "2016-06",
    }
    ],
    skills: [
        { name: "JavaScript", progress: 90 },
        { name: "React", progress: 85 },
        { name: "Node.js", progress: 80 },
        { name: "CSS", progress: 75 },
        { name: "HTML", progress: 95 },
        { name: "Python", progress: 70 },
        { name: "SQL", progress: 65 },
        { name: "Git", progress: 80 },
        { name: "Agile Methodologies", progress: 75 },
    ],
    projects: [{
        title: "Project Manager App",
        description: "A web application for managing projects and tasks. Built with React and Node.js.",
        github: "https://www.github.com/johndoe/project-manager-app",
    },
    {
        title: "E-commerce Website",
        description: "An e-commerce platform for buying and selling products. Developed using MERN stack.",
        github: "https://www.github.com/johndoe/e-commerce-website",
        liveDemo: "https://www.johndoe-ecommerce.com",
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website to showcase my work and skills.",
        github: "https://www.github.com/johndoe/portfolio-website",
        liveDemo: "https://www.johndoe-portfolio.com",
    }
    ],
    certifications: [{
        title: "Full Stack Web Development Certification",
        issuer: "Udemy",
        year: "2023",
    },
    {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        year: "2022",
    },
    {
        title: "React - The Complete Guide",
        issuer: "Udemy",
        year: "2021",
    }
    ],
    languages: [
        { name: "English", progress: 100 },
        { name: "Spanish", progress: 75 },
        { name: "French", progress: 50 },
    ],
    interests : ["Reading", "Traveling", "Coding", "Gaming", "Photography"],
};
