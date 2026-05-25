import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaCertificate, FaFolderOpen, FaEnvelope } from 'react-icons/fa';

const navLinks = [
    { title: 'Home', href: '#home', icon: FaHome },
    { title: 'About', href: '#about', icon: FaUser },
    { title: 'Skills', href: '#skills', icon: FaCode },
    { title: 'Experience', href: '#experience', icon: FaBriefcase },
    { title: 'Education', href: '#education', icon: FaGraduationCap },
    { title: 'Certifications', href: '#certifications', icon: FaCertificate },
    { title: 'Projects', href: '#projects', icon: FaFolderOpen },
    { title: 'Contact', href: '#contact', icon: FaEnvelope },
];

const SideNavbar = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.substring(1));
            let current = 'home';
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is near the top of the viewport
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="side-navbar">
            <div className="snake-chain">
                <div className="snake-line"></div>
                {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href.substring(1);
                    
                    return (
                        <div key={link.title} className={`nav-node ${isActive ? 'active' : ''}`}>
                            <a href={link.href} className="node-link">
                                <motion.div 
                                    className="node-circle"
                                    animate={{ 
                                        scale: isActive ? 1.2 : 1,
                                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--glass-bg)',
                                        borderColor: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Icon className="node-icon" />
                                </motion.div>
                                <span className="node-text">{link.title}</span>
                            </a>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default SideNavbar;
