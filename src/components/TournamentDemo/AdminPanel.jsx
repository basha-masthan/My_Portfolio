import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTrash, FaUsers, FaPlus, FaEdit, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const AdminPanel = ({ tournaments, setTournaments }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [editingId, setEditingId] = useState(null);

    // Form State
    const initialForm = {
        gameName: 'Free Fire MAX',
        mode: 'Solo',
        image: 'https://wallpaperaccess.com/full/2266858.jpg',
        entryFee: '50',
        winPrize: '500',
        startTime: '',
        roomId: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setTournaments(prev => prev.map(t => t.id === editingId ? { ...t, ...formData } : t));
            setEditingId(null);
        } else {
            const newTournament = {
                ...formData,
                id: Date.now().toString(),
                registrations: []
            };
            setTournaments(prev => [...prev, newTournament]);
        }
        setFormData(initialForm);
        alert(editingId ? "Tournament Updated!" : "Tournament Created!");
    };

    const deleteTournament = (id) => {
        if (confirm("Are you sure you want to delete this tournament?")) {
            setTournaments(prev => prev.filter(t => t.id !== id));
        }
    };

    const editTournament = (tournament) => {
        setFormData(tournament);
        setEditingId(tournament.id);
        setActiveTab('create');
    };

    return (
        <div className="td-split-pane" style={{ background: '#0a0a0c' }}>
            <div className="admin-header">
                <h2 className="td-title">Admin Dashboard</h2>
                <p className="td-subtitle">Manage Tournaments & Users</p>
            </div>

            <div className="admin-content">
                <div className="td-tabs">
                    <div
                        className={`td-tab ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        Create / Manage
                    </div>
                    <div
                        className={`td-tab ${activeTab === 'registrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('registrations')}
                    >
                        Match Registrations
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'create' ? (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <form onSubmit={handleSubmit} className="td-glass-panel td-card">
                                <h3 style={{ marginBottom: '1rem', color: '#fff' }}>{editingId ? 'Edit Tournament' : 'Create New Tournament'}</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label className="td-label">Game Name</label>
                                        <input name="gameName" value={formData.gameName} onChange={handleInputChange} className="td-input" required />
                                    </div>
                                    <div>
                                        <label className="td-label">Mode (Solo/Duo/Squad)</label>
                                        <select name="mode" value={formData.mode} onChange={handleInputChange} className="td-input">
                                            <option>Solo</option>
                                            <option>Duo</option>
                                            <option>Squad</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="td-label">Entry Fee (₹)</label>
                                        <input type="number" name="entryFee" value={formData.entryFee} onChange={handleInputChange} className="td-input" required />
                                    </div>
                                    <div>
                                        <label className="td-label">Win Prize (₹)</label>
                                        <input type="number" name="winPrize" value={formData.winPrize} onChange={handleInputChange} className="td-input" required />
                                    </div>
                                    <div>
                                        <label className="td-label">Start Time</label>
                                        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange} className="td-input" required />
                                    </div>
                                    <div>
                                        <label className="td-label">Image URL</label>
                                        <input name="image" value={formData.image} onChange={handleInputChange} className="td-input" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="td-label">Room ID (Secret)</label>
                                        <input name="roomId" value={formData.roomId} onChange={handleInputChange} className="td-input" placeholder="Only visible to joined" />
                                    </div>
                                    <div>
                                        <label className="td-label">Password (Secret)</label>
                                        <input name="password" value={formData.password} onChange={handleInputChange} className="td-input" placeholder="****" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                    <button type="submit" className="td-btn td-btn-primary" style={{ flex: 1 }}>
                                        {editingId ? <><FaEdit /> Update Tournament</> : <><FaPlus /> Create Tournament</>}
                                    </button>
                                    {editingId && (
                                        <button type="button" onClick={() => { setEditingId(null); setFormData(initialForm); }} className="td-btn td-btn-secondary">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>

                            <h3 style={{ margin: '2rem 0 1rem', color: '#fff' }}>Active Tournaments</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {tournaments.map(t => (
                                    <div key={t.id} className="td-glass-panel td-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img src={t.image} alt="game" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                                            <div>
                                                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{t.gameName}</h4>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>ID: {t.id} | {t.mode}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => editTournament(t)} className="td-btn td-btn-secondary"><FaEdit /></button>
                                            <button onClick={() => deleteTournament(t.id)} className="td-btn td-btn-danger"><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}
                                {tournaments.length === 0 && <p style={{ color: '#666', textAlign: 'center' }}>No tournaments created yet.</p>}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="registrations"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {tournaments.map(t => (
                                <div key={t.id} className="td-glass-panel td-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, color: '#FF6B00' }}>{t.gameName} <span style={{ color: '#fff', fontSize: '0.8rem' }}>(ID: {t.id})</span></h4>
                                        <span className="td-badge"><FaUsers /> {t.registrations.length} Joined</span>
                                    </div>

                                    {t.registrations.length > 0 ? (
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                            <thead>
                                                <tr style={{ color: '#888', textAlign: 'left' }}>
                                                    <th style={{ padding: '8px' }}>User ID / IGN</th>
                                                    <th style={{ padding: '8px' }}>Joined At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {t.registrations.map((reg, idx) => (
                                                    <tr key={idx} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <td style={{ padding: '8px' }}>{reg.userId}</td>
                                                        <td style={{ padding: '8px' }}>{new Date(reg.timestamp).toLocaleTimeString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>No registrations yet.</div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminPanel;
