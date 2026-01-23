import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaClock, FaCheck, FaTimes, FaFilter, FaList } from 'react-icons/fa';

const DoctorPanel = ({ appointments, updateStatus }) => {
    const [filter, setFilter] = useState('All');

    const filteredAppointments = appointments.filter(apt =>
        filter === 'All' ? true : apt.status === filter
    );

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'pending').length,
        approved: appointments.filter(a => a.status === 'approved').length,
        rejected: appointments.filter(a => a.status === 'rejected').length
    };

    return (
        <div className="doc-split-pane" style={{ background: '#f4f6f8' }}>
            <div className="doc-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#e3f2fd', padding: '8px', borderRadius: '8px' }}>
                        <FaUserMd size={24} color="#1565c0" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1a202c' }}>Dr. Smith's Dashboard</h2>
                        <span style={{ fontSize: '0.8rem', color: '#718096' }}>Cardiologist • MBBS, MD</span>
                    </div>
                </div>
                <div className="doc-badge" style={{ background: '#e0f2f1', color: '#00695c', fontSize: '14px', padding: '6px 12px' }}>
                    Online
                </div>
            </div>

            <div className="doc-stat-grid">
                <div className="doc-stat-card">
                    <div className="doc-stat-label">Total Appointments</div>
                    <div className="doc-stat-value">{stats.total}</div>
                </div>
                <div className="doc-stat-card">
                    <div className="doc-stat-label">Pending Requests</div>
                    <div className="doc-stat-value" style={{ color: '#f57c00' }}>{stats.pending}</div>
                </div>
                <div className="doc-stat-card">
                    <div className="doc-stat-label">Confirmed</div>
                    <div className="doc-stat-value" style={{ color: '#2e7d32' }}>{stats.approved}</div>
                </div>
                <div className="doc-stat-card">
                    <div className="doc-stat-label">Cancelled</div>
                    <div className="doc-stat-value" style={{ color: '#c62828' }}>{stats.rejected}</div>
                </div>
            </div>

            <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0 }}>Appointments</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {['All', 'pending', 'approved', 'rejected'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: '1px solid #ddd',
                                    background: filter === f ? '#1a73e8' : '#fff',
                                    color: filter === f ? '#fff' : '#666',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <AnimatePresence>
                        {filteredAppointments.map(apt => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="doc-card"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', margin: 0 }}
                            >
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        👤
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '1rem' }}>{apt.patientName}</div>
                                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCalendarCheck size={12} /> {new Date(apt.date).toLocaleDateString()}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaClock size={12} /> {apt.time}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span className={`doc-badge status-${apt.status}`}>
                                        {apt.status}
                                    </span>
                                    {apt.status === 'pending' && (
                                        <>
                                            <button onClick={() => updateStatus(apt.id, 'approved')} className="doc-btn doc-btn-accept" title="Approve">
                                                <FaCheck />
                                            </button>
                                            <button onClick={() => updateStatus(apt.id, 'rejected')} className="doc-btn doc-btn-reject" title="Reject">
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredAppointments.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                            No appointments found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorPanel;
