import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

const Skills = () => {
    return (
        <section id="skills" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.05), transparent)' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Technical <span className="gradient-text">Skills</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {resumeData.skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass"
                            style={{ padding: '25px' }}
                        >
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
                                {skillGroup.category}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {skillGroup.items.map((skill, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem',
                                            color: 'var(--text-primary)',
                                            border: '1px solid transparent',
                                            transition: '0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.borderColor = 'var(--accent-secondary)';
                                            e.target.style.background = 'rgba(188, 19, 254, 0.1)';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.borderColor = 'transparent';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications Section */}
                <div style={{ marginTop: '80px' }}>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}
                    >
                        Certifications & Education
                    </motion.h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                        {/* Certs */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass"
                            style={{ padding: '30px' }}
                        >
                            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '20px' }}>Certifications</h4>
                            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                                    {resumeData.certifications.map((cert, i) => (
                                        <li key={i} style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>{cert.title} | {cert.issuer}</li>
                                    ))}
                            </ul>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass"
                            style={{ padding: '30px' }}
                        >
                            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '20px' }}>Education</h4>
                            {resumeData.education.map((edu, i) => (
                                <div key={i}>
                                    <h5 style={{ fontSize: '1.2rem' }}>{edu.degree}</h5>
                                    <p style={{ color: 'var(--text-secondary)' }}>{edu.institution}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.duration}</p>
                                    <p style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginTop: '5px' }}>{edu.score}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
