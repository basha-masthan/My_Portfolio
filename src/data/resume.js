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
            role: "Technical Trainer",
            company: "DPSQUANT",
            location: "India",
            duration: "Nov 2025 – Feb 2026",
            details: [
                "Delivered comprehensive technical training to diverse cohorts on modern full-stack development and cloud technologies.",
                "Designed and refined curriculum to bridge the gap between academic learning and industry demands.",
                "Mentored students through hands-on projects, fostering a practical understanding of software engineering best practices."
            ]
        },
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
            title: "AI Job Hunt — Career Intelligence Platform",
            description: "A full-stack AI-powered career platform built with Next.js & Google Gemini AI. Features: smart job discovery across multiple portals, ATS-optimized resume builder, Kanban application tracker, interview prep engine, skills gap analyzer, and a multi-model AI consensus assistant. Click 'View Project' to explore the full interactive preview.",
            link: "/project-demo/jobhunt",
            tags: ["Next.js", "Google Gemini AI", "MongoDB", "REST APIs", "Full-Stack"]
        },
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
            description: "Engineered automated testing scripts using Selenium and Python to improve software reliability and reduce manual testing cycles. Click 'View Code' to explore the automated test suites on GitHub.",
            link: "https://github.com/basha-masthan",
            tags: ["Selenium", "Python", "Automation", "Testing"]
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
        },
        {
            institution: "TNC Junior College, Nellore",
            degree: "Intermediate",
            duration: "2019 – 2021",
            score: "GPA: 8.6"
        },
        {
            institution: "Ravindra Bharathi School, Nellore",
            degree: "10th / SSC",
            duration: "2018 – 2019",
            score: "GPA: 9.5"
        }
    ],
    certifications: [
        {
            title: "Engineer AI Agents with ADK",
            issuer: "Google Cloud",
            icon: "cloud",
            link: "https://www.credly.com/badges/8c64daab-f36d-4597-90af-6c6e8c7c2d5a",
            image: "/adk_credly_badge.png"
        },
        {
            title: "AWS Academy Graduate - Cloud Architecting",
            issuer: "AWS",
            icon: "cloud",
            link: "https://www.credly.com/badges/e1096cca-da8b-4215-9240-1fd37f3f3b36"
        },
        {
            title: "Certified Ethical Hacking (v12)",
            issuer: "Learnkarts",
            icon: "shield",
            link: "https://www.linkedin.com/in/masthan-basha-ms/details/certifications/",
            image: "/cybersecurity_cert.jpg"
        },
        {
            title: "Python for Cybersecurity",
            issuer: "Infosec",
            icon: "shield",
            link: "https://coursera.org/share/2c2be412a4397e9b5c30f95f75ef7e86",
            image: "/python_cybersecurity_cert.png"
        },
        {
            title: "Developing Front-End Apps with React",
            issuer: "IBM",
            icon: "code",
            link: "https://www.coursera.org/account/accomplishments/verify/KK92NJL1ALPC"
        },
        {
            title: "Selenium Automation Frameworks",
            issuer: "Packt",
            icon: "check",
            link: "https://www.coursera.org/account/accomplishments/verify/FB4M3KZLN88C"
        },
        {
            title: "Data Analytics Essentials",
            issuer: "Cisco Networking Academy",
            icon: "database",
            link: "https://www.credly.com/users/masthan-basha-shaik/badges#credly",
            image: "/cisco_analytics_cert.png"
        }
    ]
};
