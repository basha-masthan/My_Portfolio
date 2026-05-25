import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
    return (
        <section id="education">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Education <span className="gradient-text">Journey</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                    {resumeData.education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass"
                            style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                <div style={{ 
                                    background: 'rgba(59, 130, 246, 0.1)', 
                                    padding: '15px', 
                                    borderRadius: '12px',
                                    color: 'var(--accent-primary)'
                                }}>
                                    <FaGraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{edu.degree}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{edu.duration}</p>
                                </div>
                            </div>
                            
                            <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>{edu.institution}</h4>
                            <p style={{ marginTop: 'auto', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                {edu.score}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
