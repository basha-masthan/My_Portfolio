import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWifi, FaBatteryFull, FaSignal, FaArrowLeft, FaCamera, FaCheck } from 'react-icons/fa';

const MobileAuditApp = ({ onCompleteAudit }) => {
    const [view, setView] = useState('list'); // list, form, success
    const [selectedStore, setSelectedStore] = useState(null);

    const pendingAudits = [
        { id: 'S101', name: 'Downtown Market', address: '123 Main St', type: 'Supermarket' },
        { id: 'S102', name: 'Westside Retail', address: '45 West Ave', type: 'Convenience' }
    ];

    const handleStartAudit = (store) => {
        setSelectedStore(store);
        setView('form');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const auditData = {
            storeId: selectedStore.id,
            location: selectedStore.name,
            address: selectedStore.address,
            auditor: 'John Field',
            date: new Date().toISOString(),
            status: 'Completed',
            score: Math.floor(Math.random() * (100 - 70) + 70), // Random score for demo
            issues: formData.get('issueCount') ? parseInt(formData.get('issueCount')) : 0
        };

        onCompleteAudit(auditData);
        setView('success');
        setTimeout(() => {
            setView('list');
            setSelectedStore(null);
        }, 2000);
    };

    return (
        <div className="audit-mobile-pane-container">
            <div className="audit-phone-frame">
                {/* Status Bar */}
                <div className="audit-status-bar">
                    <span>10:24</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <FaSignal size={10} />
                        <FaWifi size={10} />
                        <FaBatteryFull size={10} />
                    </div>
                </div>

                {/* App Header */}
                <div className="mobile-header">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: 0 }}>FieldAudit</h3>
                        <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4 }}>Sync: ON</div>
                    </div>
                </div>

                <div className="audit-mobile-app-content">
                    <AnimatePresence mode="wait">
                        {view === 'list' && (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{ padding: '10px' }}
                            >
                                <h4 style={{ margin: '10px 10px 15px', color: '#666' }}>Assigned Visits</h4>
                                {pendingAudits.map(store => (
                                    <div key={store.id} className="mobile-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{store.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>{store.address}</div>
                                            <div style={{ fontSize: '0.75rem', marginTop: 4, color: '#1976d2', background: '#e3f2fd', display: 'inline-block', padding: '2px 6px', borderRadius: 4 }}>{store.type}</div>
                                        </div>
                                        <button onClick={() => handleStartAudit(store)} style={{ background: '#e3f2fd', color: '#1976d2', border: 'none', padding: '8px 12px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>
                                            Start
                                        </button>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'center', marginTop: 40, color: '#aaa', fontSize: '0.8rem' }}>
                                    All other tasks synced.
                                </div>
                            </motion.div>
                        )}

                        {view === 'form' && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                style={{ padding: '20px', background: '#fff', minHeight: '100%' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                                    <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', fontSize: 18, marginRight: 15, cursor: 'pointer', color: '#333' }}><FaArrowLeft /></button>
                                    <h3 style={{ margin: 0 }}>Audit: {selectedStore?.name}</h3>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#444' }}>Shelf Compliance</label>
                                        <select className="mobile-input" style={{ width: '105%' }}>
                                            <option>Fully Compliant</option>
                                            <option>Partial Issue</option>
                                            <option>Major Issue</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#444' }}>Stock Levels</label>
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}><input type="radio" name="stock" /> High</label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}><input type="radio" name="stock" defaultChecked /> Medium</label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}><input type="radio" name="stock" /> Low</label>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#444' }}>Issues Observed</label>
                                        <input type="number" name="issueCount" className="mobile-input" placeholder="0" defaultValue="0" />
                                    </div>

                                    <div style={{ marginBottom: 25 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#444' }}>Photo Proof</label>
                                        <div style={{ border: '2px dashed #ddd', borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', background: '#fafafa', cursor: 'pointer' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <FaCamera />
                                                <div style={{ fontSize: '0.7rem' }}>Tap to capture</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="mobile-btn">Submit Audit Report</button>
                                </form>
                            </motion.div>
                        )}

                        {view === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 20 }}
                            >
                                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#4caf50', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, marginBottom: 20 }}>
                                    <FaCheck />
                                </div>
                                <h3 style={{ margin: 0, color: '#333' }}>Submitted!</h3>
                                <p style={{ color: '#666', textAlign: 'center', fontSize: '0.9rem' }}>Data synced to cloud.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 4, background: '#fff', borderRadius: 2, opacity: 0.5 }}></div>
            </div>
        </div>
    );
};

export default MobileAuditApp;
