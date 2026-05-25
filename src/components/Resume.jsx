import React, { useEffect } from 'react';
import { resumeData } from '../data/resume';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaDownload } from 'react-icons/fa';
import resumePDF from '../assets/Masthan-Basha-SDE.pdf';

const Resume = () => {
    const { header, summary, skills, experience, projects, education, certifications } = resumeData;

    useEffect(() => {
        document.title = `${header.name} - Resume`;
    }, [header.name]);

    return (
        <div style={{
            background: '#fff',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            minHeight: '100vh',
            padding: '40px 0',
            lineHeight: '1.5'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px',
                background: '#fff',
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
            }} className="resume-paper">

                {/* Header */}
                <header style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#111', margin: 0 }}>
                        {header.name}
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '5px', fontWeight: '500' }}>{header.title}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaEnvelope /> <a href={`mailto:${header.contact.email}`} style={{ color: '#333', textDecoration: 'none' }}>{header.contact.email}</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaPhone /> <span>{header.contact.phone}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaMapMarkerAlt /> <span>{header.contact.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaLinkedin /> <a href={header.socials[0].url} target="_blank" rel="noreferrer" style={{ color: '#333', textDecoration: 'none' }}>LinkedIn</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaGithub /> <a href={header.socials[1].url} target="_blank" rel="noreferrer" style={{ color: '#333', textDecoration: 'none' }}>GitHub</a>
                        </div>
                    </div>
                </header>

                {/* Summary */}
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                        Profile Summary
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#444' }}>{summary}</p>
                </section>

                {/* Skills */}
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                        Technical Skills
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, auto) 1fr', gap: '10px', fontSize: '0.95rem' }}>
                        {skills.map((grp, i) => (
                            <React.Fragment key={i}>
                                <div style={{ fontWeight: '600', color: '#333' }}>{grp.category}:</div>
                                <div style={{ color: '#444' }}>{grp.items.join(', ')}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                        Professional Experience
                    </h3>
                    {experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111', margin: 0 }}>{exp.role}</h4>
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>{exp.duration}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px', fontSize: '0.95rem' }}>
                                <span style={{ fontWeight: '600', color: '#333' }}>{exp.company}</span>
                                <span style={{ color: '#666' }}>{exp.location}</span>
                            </div>
                            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#444', marginTop: '5px' }}>
                                {exp.details.map((detail, idx) => (
                                    <li key={idx} style={{ marginBottom: '3px' }}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                        Key Projects
                    </h3>
                    {projects.map((proj, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111', margin: 0, marginBottom: '2px' }}>{proj.title}</h4>
                            <p style={{ fontSize: '0.95rem', color: '#444', margin: 0 }}>{proj.description}</p>
                        </div>
                    ))}
                </section>

                {/* Education & Certs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <section>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                            Education
                        </h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111', margin: 0 }}>{edu.degree}</h4>
                                <div style={{ fontSize: '0.9rem', color: '#333' }}>{edu.institution}</div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>{edu.duration} | {edu.score}</div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', color: '#222' }}>
                            Certifications
                        </h3>
                        <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#444' }}>
                            {certifications.map((cert, i) => (
                                <li key={i} style={{ marginBottom: '5px' }}>{cert.title} | {cert.issuer}</li>
                            ))}
                        </ul>
                    </section>
                </div>

            </div>

            {/* Floating Action Buttons */}
            <div className="no-print" style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 100
            }}>
                {/* Download Button */}
                <a
                    href={resumePDF}
                    download="Masthan-Basha-SDE.pdf"
                    style={{
                        background: '#25D366',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <FaDownload /> Download Resume
                </a>
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .resume-paper { box-shadow: none !important; margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
          @page { margin: 1cm; }
        }
      `}</style>
        </div>
    );
};

export default Resume;
