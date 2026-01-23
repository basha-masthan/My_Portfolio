import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
    const { name, title, socials, resumeLink } = resumeData.header;

    return (
        <section id="home" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 0
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontSize: '1.2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: 'var(--text-secondary)',
                        marginBottom: '10px'
                    }}>
                        Hello, I am
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="gradient-text"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        marginBottom: '20px',
                        lineHeight: 1.1
                    }}
                >
                    {name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        marginBottom: '40px'
                    }}>
                        {title}
                    </h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
                >
                    <a href="/resume" className="btn" target="_blank" rel="noopener noreferrer" style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)', boxShadow: '0 0 10px rgba(188, 19, 254, 0.3)' }}>Resume</a>
                    <a href="#projects" className="btn">View My Work</a>
                    <a href="#contact" className="btn" style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}>Contact Me</a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '1.5rem' }}
                >
                    {socials.map((social) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} aria-label={social.name}>
                            <social.icon className="hover-icon" />
                        </a>
                    ))}
                </motion.div>
            </div>

            <style>{`
        .hover-icon {
          transition: 0.3s;
        }
        .hover-icon:hover {
          color: var(--accent-primary);
          transform: translateY(-5px);
        }
      `}</style>
        </section>
    );
};

export default Hero;
