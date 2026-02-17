import React from 'react';
import { sendEmail, SERVICE_ID, TEMPLATE_ID_CONTACT } from '../utils/emailService';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(37, 211, 102, 0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: '#25D366', fontSize: '1.2rem'
                                }}>
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>WhatsApp</h4>
                                    <a
                                        href="https://wa.link/l0w6d6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#25D366',
                                            textDecoration: 'none',
                                            transition: 'opacity 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                                    >
                                        Chat on WhatsApp
                                    </a>
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
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const templateParams = {
                                user_name: formData.get('user_name'),
                                user_email: formData.get('user_email'),
                                message: formData.get('message'),
                                to_name: 'Admin',
                                reply_to: formData.get('user_email')
                            };

                            const btn = e.target.querySelector('button');
                            const originalText = btn.innerText;
                            btn.innerText = 'Sending...';
                            btn.disabled = true;

                            try {
                                await sendEmail(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams);
                                alert('Message sent successfully!');
                                e.target.reset();
                            } catch (error) {
                                console.error('Failed to send message:', error);
                                alert('Failed to send message. Please try again or contact via other methods.');
                            } finally {
                                btn.innerText = originalText;
                                btn.disabled = false;
                            }
                        }}
                    >
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Name</label>
                            <input name="user_name" type="text" placeholder="Your Name" required style={{
                                width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '8px',
                                color: 'white', outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Email</label>
                            <input name="user_email" type="email" placeholder="Your Email" required style={{
                                width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '8px',
                                color: 'white', outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Message</label>
                            <textarea name="message" rows="5" placeholder="Your Message" required style={{
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
