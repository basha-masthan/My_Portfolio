import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import MoneyModal from './MoneyDemo';
import { 
    FaGamepad, 
    FaUserMd, 
    FaBug, 
    FaChartBar, 
    FaClipboardCheck, 
    FaExternalLinkAlt, 
    FaEye 
} from 'react-icons/fa';

/* Project image mapping by link */
const PROJECT_PREVIEWS = {
    '/project-demo/jobhunt': '/ai_job_engine.png',
};

/* Which projects get the "featured" treatment */
const FEATURED_LINKS = ['/project-demo/jobhunt'];

/* Icon mapping for projects without preview images */
const PROJECT_ICONS = {
    '/project-demo/tournament': <FaGamepad size={28} />,
    '/project-demo/doc2book': <FaUserMd size={28} />,
    'https://github.com/basha-masthan': <FaBug size={28} />,
    '#project-demo/money': <FaChartBar size={28} />,
    '/project-demo/audit': <FaClipboardCheck size={28} />
};

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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    {resumeData.projects.map((project, index) => {
                        const isFeatured = FEATURED_LINKS.includes(project.link);
                        const previewImg = PROJECT_PREVIEWS[project.link];
                        const icon = PROJECT_ICONS[project.link];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="glass"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    overflow: 'hidden',
                                    padding: '0',
                                    border: isFeatured 
                                        ? '1px solid rgba(99, 102, 241, 0.4)' 
                                        : '1px solid var(--glass-border)',
                                    boxShadow: isFeatured 
                                        ? '0 15px 35px rgba(99, 102, 241, 0.15), 0 20px 40px rgba(0,0,0,0.3)' 
                                        : '0 10px 30px rgba(0,0,0,0.2)',
                                    position: 'relative'
                                }}
                            >
                                {/* Preview Image (for featured cards) */}
                                {previewImg ? (
                                    <div style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '180px',
                                        borderBottom: '1px solid var(--glass-border)'
                                    }}>
                                        <img
                                            src={previewImg}
                                            alt={project.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                                transition: 'transform 0.4s ease',
                                            }}
                                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        {/* Gradient overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to bottom, transparent 40%, rgba(10, 10, 20, 0.9) 100%)',
                                        }} />
                                        {/* Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            padding: '4px 10px',
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '0.5px',
                                        }}>
                                            ⚡ AI — Featured Project
                                        </div>
                                    </div>
                                ) : (
                                    /* Beautiful Icon placeholder header for standard projects */
                                    <div style={{
                                        height: '140px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.03))',
                                        borderBottom: '1px solid var(--glass-border)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            background: isFeatured ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                                            filter: 'blur(40px)',
                                            opacity: 0.12
                                        }} />
                                        <div style={{
                                            position: 'relative',
                                            zIndex: 1,
                                            color: 'var(--accent-primary)',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid var(--glass-border)',
                                            padding: '14px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            {icon || <FaExternalLinkAlt size={24} />}
                                        </div>
                                    </div>
                                )}

                                {/* Card Body */}
                                <div style={{ 
                                    padding: '24px', 
                                    flex: 1, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between' 
                                }}>
                                    <div>
                                        <h3 style={{ 
                                            fontSize: '1.2rem', 
                                            marginBottom: '12px', 
                                            lineHeight: 1.35,
                                            fontWeight: '700',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {project.title}
                                        </h3>
                                        <p style={{ 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '20px', 
                                            fontSize: '0.9rem', 
                                            lineHeight: 1.6 
                                        }}>
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        {project.tags && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                                {project.tags.map(tag => (
                                                    <span key={tag} style={{
                                                        padding: '4px 10px',
                                                        background: 'rgba(59, 130, 246, 0.08)',
                                                        border: '1px solid rgba(59, 130, 246, 0.15)',
                                                        borderRadius: '20px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        color: 'var(--accent-primary)',
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ 
                                        marginTop: 'auto', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        paddingTop: '16px',
                                        borderTop: '1px solid rgba(255,255,255,0.03)'
                                    }}>
                                        {/* Visual decoration line */}
                                        <div style={{
                                            width: '40px', 
                                            height: '3px',
                                            background: isFeatured 
                                                ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' 
                                                : 'var(--accent-primary)',
                                            borderRadius: '2px'
                                        }}></div>

                                        {project.link && (
                                            project.link.startsWith('http') ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        textDecoration: 'none',
                                                        padding: '8px 18px',
                                                        background: 'transparent',
                                                        border: '1px solid var(--accent-primary)',
                                                        color: 'var(--accent-primary)',
                                                        borderRadius: '6px',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.85rem',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.background = 'var(--accent-primary)';
                                                        e.currentTarget.style.color = '#fff';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = 'var(--accent-primary)';
                                                    }}
                                                >
                                                    View Code <FaExternalLinkAlt size={12} />
                                                </a>
                                            ) : (
                                                <Link
                                                    to={project.link}
                                                    onClick={(e) => handleProjectClick(e, project.link)}
                                                    style={{
                                                        textDecoration: 'none',
                                                        padding: '8px 18px',
                                                        background: isFeatured
                                                            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                                            : 'var(--accent-primary)',
                                                        color: '#fff',
                                                        borderRadius: '6px',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.85rem',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: isFeatured ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (!isFeatured) e.currentTarget.style.filter = 'brightness(1.1)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (!isFeatured) e.currentTarget.style.filter = 'none';
                                                    }}
                                                >
                                                    {isFeatured ? <><FaEye /> Live Preview</> : 'View Project'}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {showMoneyDemo && <MoneyModal onClose={() => setShowMoneyDemo(false)} />}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
