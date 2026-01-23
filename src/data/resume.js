import { FaGithub, FaLinkedin, FaHackerrank, FaCode, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const resumeData = {
    header: {
        name: "Masthan Basha Shaik",
        title: "Dynamic Software Engineer | Full-Stack & DevOps",
        resumeLink: "/resume.pdf",
        contact: {
            email: "official4basha@gmail.com",
            phone: "+91 78937 02635",
            location: "India"
        },
        socials: [
            { name: "LinkedIn", url: "https://linkedin.com/in/masthan-basha-ms", icon: FaLinkedin },
            { name: "GitHub", url: "https://github.com/basha-masthan", icon: FaGithub },
            { name: "HackerRank", url: "https://hackerrank.com/profile/bashamasthan31", icon: FaHackerrank },
            { name: "LeetCode", url: "https://leetcode.com/u/Basha-Masthan", icon: SiLeetcode }
        ]
    },
    summary: "Dynamic Software Engineer with a focus on Full-Stack Development and DevOps. Proven track record in building scalable web applications using React, Node.js, and Python. Expertise in Linux environments (3+ years) and Cloud Infrastructure, recently certified in Google Cloud & Generative AI. Experienced in QA automation with Selenium and deploying secure, high-performance applications.",
    skills: [
        { category: "Languages", items: ["Python (Full Stack)", "Java", "C", "Bash Scripting"] },
        { category: "Frontend", items: ["React.js", "React Native", "JavaScript (ES6+)", "HTML5", "CSS3"] },
        { category: "Backend", items: ["Node.js (REST APIs)", "Python (Django/Flask)"] },
        { category: "Cloud & DevOps", items: ["Google Cloud Platform (GCP)", "AWS", "CI/CD Pipelines", "Docker", "Linux Administration"] },
        { category: "Databases & Tools", items: ["MongoDB", "MySQL", "Cloudinary", "Postman", "Selenium", "Git"] },
        { category: "AI/ML", items: ["Generative AI Fundamentals", "YOLO v8", "DenseNet 121", "Prompt Engineering"] }
    ],
    experience: [
        {
            role: "Full Stack Developer",
            company: "Devloom Labs",
            location: "Punjab, India",
            duration: "Nov 2024 – Oct 2025",
            details: [
                "Architected and developed a complete eSports tournament platform using the MERN stack (MongoDB, Express, React, Node.js).",
                "Engineered a secure wallet system with automated transaction logic and real-time reward distribution.",
                "Built responsive, interactive frontend interfaces with React.js for seamless user experience.",
                "Integrated Cloudinary for optimized media management and orchestrated server-side logic for high-performance content delivery."
            ]
        }
    ],
    projects: [
        {
            title: "Free Fire Tournament Platform (Live Demo)",
            description: "A comprehensive eSports management system. Features include Admin Dashboard for tournament creation/management, user registration flow, and real-time updates. Click 'View Project' to try the interactive split-screen demo.",
            link: "/project-demo/tournament",
            tags: ["React", "Interactive Demo", "Management System"]
        },
        {
            title: "Doctor Appointment Booking System",
            description: "Built a role-based access control (RBAC) system for healthcare providers and patients. Automated communication workflows using SMTP email alerts for booking confirmations. Click 'View Project' to try the interactive split-screen demo.",
            link: "/project-demo/doc2book",
            tags: ["React", "RBAC", "Node.js"]
        },
        {
            title: "QA Automation Suite",
            description: "Engineered automated testing scripts using Selenium and Python to improve software reliability and reduce manual testing cycles."
        },
        {
            title: "Business Management & Analytics Platform",
            description: "Developed a full-stack dashboard (React/Node/MongoDB) for business owners to track P&L statements. Implemented custom date-range filtering for financial analytics. Click 'View Project' to see the mobile app demo.",
            link: "#project-demo/money",
            tags: ["React Native", "Business Tool", "Mobile App"]
        },
        {
            title: "New Retail Audit System",
            description: "A hybrid solution featuring a web-based Admin Command Center and a mobile Field Audit App. Streamlines compliance checks with real-time syncing. Click 'View Project' to see the Web + Mobile hybrid demo.",
            link: "/project-demo/audit",
            tags: ["React", "Enterprise", "Hybrid Demo"]
        }
    ],
    education: [
        {
            institution: "JNTUA (University)",
            degree: "B.Tech CSE",
            duration: "Nov 2021 – May 2025",
            score: "CGPA: 8.1"
        }
    ],
    certifications: [
        "Google Cloud Computing Foundations & Generative AI | Google Cloud Skills Boost",
        "Certified Ethical Hacking (v12) | Learnkarts",
        "Developing Front-End Apps with React | IBM",
        "Selenium Automation and Testing Frameworks | Packt"
    ]
};
