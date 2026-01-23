import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import MoneyModal from './MoneyDemo';

const Projects = () => {
    const [showMoneyDemo, setShowMoneyDemo] = useState(false);

    const handleProjectClick = (e, link) => {
        if (link === '#project-demo/money') {
            e.preventDefault();
            setShowMoneyDemo(true);
        }
    };

    return (
        <section id="projects">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="glass"
                            style={{
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%' // Ensure equal height
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{project.description}</p>
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Visual decoration line */}
                                <div style={{ width: '50px', height: '4px', background: 'var(--accent-secondary)', borderRadius: '2px' }}></div>

                                {project.link && (
                                    <Link
                                        to={project.link.startsWith('#') ? '#' : project.link}
                                        onClick={(e) => handleProjectClick(e, project.link)}
                                        style={{
                                            textDecoration: 'none',
                                            padding: '8px 16px',
                                            background: 'var(--accent-primary, #FF6B00)',
                                            color: '#fff',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        View Project
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showMoneyDemo && <MoneyModal onClose={() => setShowMoneyDemo(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
