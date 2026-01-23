import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTrophy, FaCalendarAlt, FaUser, FaLock } from 'react-icons/fa';

const UserPanel = ({ tournaments, onRegister }) => {
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [userId, setUserId] = useState('');

    const handleJoinClick = (tournament) => {
        setSelectedTournament(tournament);
        setUserId('');
    };

    const handleConfirmJoin = (e) => {
        e.preventDefault();
        if (userId.trim()) {
            onRegister(selectedTournament.id, userId);
            setSelectedTournament(null);
            alert(`Successfully registered for ${selectedTournament.gameName}!`);
        }
    };

    return (
        <div className="td-split-pane" style={{ background: '#121216', borderLeft: '1px solid #333' }}>
            <div className="user-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 className="td-title" style={{ fontSize: '1.5rem' }}>E-Sports Arena</h2>
                    <p className="td-subtitle" style={{ fontSize: '1rem' }}>User Dashboard</p>
                </div>
                <div className="td-badge" style={{ background: '#FF6B00', color: '#000' }}>DEMO USER</div>
            </div>

            <div className="user-content">
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaGamepad /> Live Tournaments
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {tournaments.length === 0 ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                            <FaGamepad size={40} style={{ marginBottom: '1rem' }} />
                            <p>No active tournaments found. Create one in the Admin Panel!</p>
                        </div>
                    ) : (
                        tournaments.map(t => (
                            <motion.div
                                key={t.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="td-glass-panel"
                                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={t.image} alt={t.gameName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 'bold', color: '#FFD600' }}>
                                        ₹{t.winPrize} Prize
                                    </div>
                                </div>

                                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{t.gameName}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#ccc', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaTrophy color="#FFD600" /> Win: ₹{t.winPrize} | Entry: ₹{t.entryFee}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaCalendarAlt color="#FF6B00" /> {new Date(t.startTime).toLocaleString()}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaGamepad /> Mode: {t.mode}</div>
                                    </div>

                                    <button
                                        onClick={() => handleJoinClick(t)}
                                        className="td-btn td-btn-primary"
                                        style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                                    >
                                        Join Match
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {selectedTournament && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="td-glass-panel"
                            style={{ width: '90%', maxWidth: '400px', padding: '2rem' }}
                        >
                            <h3 style={{ marginTop: 0 }}>Join {selectedTournament.gameName}</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Enter your Game ID / IGN to register for this match.</p>

                            <form onSubmit={handleConfirmJoin}>
                                <label className="td-label">Game ID / IGN</label>
                                <input
                                    autoFocus
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="td-input"
                                    placeholder="e.g. ProGamer123"
                                    required
                                />

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <button type="button" onClick={() => setSelectedTournament(null)} className="td-btn td-btn-secondary" style={{ flex: 1 }}>Cancel</button>
                                    <button type="submit" className="td-btn td-btn-primary" style={{ flex: 1 }}>Confirm Join</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserPanel;
