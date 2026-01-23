import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

const Experience = () => {
    return (
        <section id="experience">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Professional <span className="gradient-text">Experience</span>
                </motion.h2>

                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        height: '100%',
                        width: '2px',
                        background: 'var(--glass-border)'
                    }} />

                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            style={{ marginBottom: '50px', position: 'relative', paddingLeft: '30px' }}
                        >
                            {/* Dot */}
                            <div style={{
                                position: 'absolute',
                                left: '-9px',
                                top: '0',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'var(--accent-primary)',
                                boxShadow: '0 0 10px var(--accent-primary)'
                            }} />

                            <div className="glass" style={{ padding: '30px' }}>
                                <h3 style={{ marginBottom: '5px' }}>{exp.role}</h3>
                                <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '15px' }}>{exp.company} | {exp.duration}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>{exp.location}</p>
                                <ul style={{ paddingLeft: '20px' }}>
                                    {exp.details.map((detail, i) => (
                                        <li key={i} style={{ marginBottom: '10px', color: 'var(--text-secondary)', listStyleType: 'disc' }}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
