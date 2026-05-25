import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { resumeData } from '../data/resume';
import { FaCloud, FaShieldAlt, FaCode, FaCheckCircle, FaExternalLinkAlt, FaDatabase, FaEye, FaTimes } from 'react-icons/fa';

// Map icon strings to actual React Icons
const getIcon = (iconName) => {
    switch (iconName) {
        case 'cloud': return <FaCloud size={40} />;
        case 'shield': return <FaShieldAlt size={40} />;
        case 'code': return <FaCode size={40} />;
        case 'database': return <FaDatabase size={40} />;
        default: return <FaCheckCircle size={40} />;
    }
};

const TiltCard = ({ cert, index, onViewImage }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useTransform(x, [-100, 100], [12, -12]);
    const mouseYSpring = useTransform(y, [-100, 100], [-12, 12]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                display: 'block',
                textDecoration: 'none',
                height: '100%'
            }}
        >
            <motion.div
                className="glass"
                style={{
                    rotateX: mouseYSpring,
                    rotateY: mouseXSpring,
                    transformStyle: "preserve-3d",
                    padding: '0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.02)',
                    overflow: 'hidden'
                }}
                whileHover={{ scale: 1.03 }}
            >
                {/* Header (Image or Icon) */}
                {cert.image ? (
                    <div style={{
                        height: '160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(15, 23, 42, 0.4)',
                        borderBottom: '1px solid var(--glass-border)',
                        position: 'relative',
                        padding: '15px',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src={cert.image} 
                            alt={cert.title} 
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                        {/* Overlay eye icon for certificate viewer */}
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewImage(cert);
                            }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(3, 7, 18, 0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                            className="cert-overlay"
                        >
                            <span style={{
                                background: 'var(--accent-primary)',
                                color: '#fff',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}>
                                <FaEye /> View Certificate
                            </span>
                        </div>
                        <style>{`
                            .glass:hover .cert-overlay {
                                opacity: 1 !important;
                            }
                        `}</style>
                    </div>
                ) : (
                    <div style={{
                        height: '160px',
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
                            background: 'var(--accent-primary)',
                            filter: 'blur(40px)',
                            opacity: 0.1
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
                            {getIcon(cert.icon)}
                        </div>
                    </div>
                )}

                {/* Card Content */}
                <div style={{ 
                    padding: '24px', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h3 style={{ 
                            fontSize: '1.15rem', 
                            marginBottom: '10px', 
                            color: 'var(--text-primary)',
                            fontWeight: '700',
                            lineHeight: '1.4',
                            transform: 'translateZ(40px)'
                        }}>
                            {cert.title}
                        </h3>
                        
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '0.9rem',
                            marginBottom: '20px',
                            transform: 'translateZ(30px)'
                        }}>
                            {cert.issuer}
                        </p>
                    </div>

                    <div style={{ 
                        marginTop: 'auto', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(255,255,255,0.03)'
                    }}>
                        <a 
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px', 
                                color: 'var(--accent-primary)',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                transform: 'translateZ(20px)'
                            }}
                        >
                            {cert.issuer === 'Cisco Networking Academy' ? 'See All Cisco Badges' : 'Verify Online'} <FaExternalLinkAlt size={10} />
                        </a>

                        {cert.image && (
                            <button
                                onClick={() => onViewImage(cert)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'color 0.2s',
                                    transform: 'translateZ(20px)'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <FaEye size={12} /> Preview
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Global <span className="gradient-text">Certifications</span>
                </motion.h2>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '30px', 
                    marginTop: '40px',
                    padding: '20px 0'
                }}>
                    {resumeData.certifications.map((cert, idx) => (
                        <TiltCard 
                            key={idx} 
                            cert={cert} 
                            index={idx} 
                            onViewImage={(c) => setSelectedCert(c)}
                        />
                    ))}
                </div>
            </div>

            {/* Certificate Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(3, 7, 18, 0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: '#1e293b',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '24px',
                                maxWidth: '900px',
                                width: '100%',
                                position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                <FaTimes size={16} />
                            </button>

                            <h3 style={{ 
                                fontSize: '1.25rem', 
                                color: '#fff', 
                                marginBottom: '6px',
                                paddingRight: '40px' 
                            }}>
                                {selectedCert.title}
                            </h3>
                            <p style={{ 
                                color: 'var(--text-secondary)', 
                                fontSize: '0.9rem',
                                marginBottom: '20px'
                            }}>
                                {selectedCert.issuer}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#0f172a',
                                borderRadius: '12px',
                                padding: '10px',
                                overflow: 'hidden',
                                maxHeight: '70vh'
                            }}>
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '65vh',
                                        objectFit: 'contain',
                                        borderRadius: '8px'
                                    }}
                                />
                            </div>

                            <div style={{ 
                                marginTop: '20px', 
                                display: 'flex', 
                                justifyContent: 'flex-end',
                                gap: '15px'
                            }}>
                                <a
                                    href={selectedCert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '0.9rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Verify Online <FaExternalLinkAlt size={12} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
