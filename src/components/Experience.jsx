import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';

const Experience = () => {
    // Keep track of which experience items are expanded by index
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (index) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

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

                    {resumeData.experience.map((exp, index) => {
                        const isExpanded = !!expanded[index];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                                }} />

                                <div className="glass" style={{ padding: '30px', cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => toggleExpand(index)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0' }}>{exp.role}</h3>
                                            <h4 style={{ color: 'var(--accent-secondary)', margin: 0, fontSize: '1.1rem' }}>{exp.company}</h4>
                                        </div>
                                        <button style={{
                                            background: isExpanded ? 'var(--accent-primary)' : 'transparent',
                                            border: '1px solid var(--accent-primary)',
                                            color: isExpanded ? '#fff' : 'var(--accent-primary)',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {isExpanded ? 'Hide Content' : 'Show Content'}
                                        </button>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '20px' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ 
                                                    paddingTop: '15px', 
                                                    borderTop: '1px solid var(--glass-border)',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    <p style={{ fontSize: '0.9rem', marginBottom: '15px', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>📍 {exp.location}</span>
                                                        <span style={{ color: 'var(--accent-primary)' }}>⏱ {exp.duration}</span>
                                                    </p>
                                                    <ul style={{ paddingLeft: '20px' }}>
                                                        {exp.details.map((detail, i) => (
                                                            <li key={i} style={{ marginBottom: '10px', lineHeight: '1.6', listStyleType: 'disc' }}>
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
