import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import CareerTree from './CareerTree/CareerTree';

const About = () => {
    return (
        <section id="about">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About <span className="gradient-text">Me</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass"
                    style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
                >
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        {resumeData.summary}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
                        {/* Highlights based on resume */}
                        <div className="highlight-item">
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '5px' }}>1+</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Years of Experience</p>
                        </div>
                        <div className="highlight-item">
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)', marginBottom: '5px' }}>3+</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Production Apps</p>
                        </div>
                        <div className="highlight-item">
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '5px' }}>300+</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>DSA Problems Solved</p>
                        </div>
                    </div>

                    {/* Career Growth Tree */}
                    <CareerTree />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
