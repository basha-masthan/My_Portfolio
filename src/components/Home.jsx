import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Background from './Background';
import { motion, useScroll, useSpring } from 'framer-motion';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <Background />
            <Navbar />

            {/* Scroll Progress Bar */}
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--accent-primary)',
                    transformOrigin: '0%',
                    zIndex: 1001
                }}
            />

            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />

            <footer style={{
                textAlign: 'center',
                padding: '20px',
                borderTop: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
            }}>
                <p>© {new Date().getFullYear()} Masthan Basha Shaik. All rights reserved.</p>
                <p>Built with React & Framer Motion</p>
            </footer>
        </>
    );
};

export default Home;
