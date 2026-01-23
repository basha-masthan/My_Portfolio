import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const { contact } = resumeData.header;

    return (
        <section id="contact" style={{ paddingBottom: '150px' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Get In <span className="gradient-text">Touch</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                            I am currently available for freelance work or full-time opportunities.
                            If you have a project that needs some creative touch, feel free to contact me.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(0, 242, 255, 0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--accent-primary)', fontSize: '1.2rem'
                                }}>
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</h4>
                                    <p>{contact.email}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(188, 19, 254, 0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--accent-secondary)', fontSize: '1.2rem'
                                }}>
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone</h4>
                                    <p>{contact.phone}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--text-primary)', fontSize: '1.2rem'
                                }}>
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Location</h4>
                                    <p>{contact.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass"
                        style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Name</label>
                            <input type="text" placeholder="Your Name" style={{
                                width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '8px',
                                color: 'white', outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Email</label>
                            <input type="email" placeholder="Your Email" style={{
                                width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '8px',
                                color: 'white', outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Message</label>
                            <textarea rows="5" placeholder="Your Message" style={{
                                width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '8px',
                                color: 'white', outline: 'none', resize: 'none'
                            }}></textarea>
                        </div>
                        <button className="btn" style={{ width: '100%' }}>Send Message</button>
                    </motion.form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
