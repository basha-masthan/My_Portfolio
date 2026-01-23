import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBoxes, FaClipboardCheck, FaStore, FaChartLine, FaCheckCircle, FaExclamationCircle, FaPlus, FaTrash, FaCog, FaLayerGroup } from 'react-icons/fa';

const AdminWebPanel = ({ audits }) => {
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'templates'
    const [filter, setFilter] = useState('All');

    // Stats calculation
    const stats = {
        total: audits.length,
        completed: audits.filter(a => a.status === 'Completed').length,
        pending: audits.filter(a => a.status === 'Pending').length,
        issues: audits.reduce((acc, curr) => acc + (curr.issues || 0), 0)
    };

    return (
        <div className="audit-web-pane">
            {/* Top Navigation */}
            <div className="admin-top-nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#1e293b', padding: '8px', borderRadius: '4px', color: '#fff' }}>
                        <FaStore />
                    </div>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>RetailAudit Command Center</h2>
                </div>

                {/* Navigation Tabs */}
                <div style={{ display: 'flex', gap: '24px', marginLeft: '40px', flex: 1 }}>
                    {['dashboard', 'templates'].map(tab => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                cursor: 'pointer',
                                padding: '20px 0',
                                borderBottom: activeTab === tab ? '2px solid #1976d2' : '2px solid transparent',
                                color: activeTab === tab ? '#1976d2' : '#64748b',
                                fontWeight: 500,
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Admin: Masthan Basha</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#cbd5e1' }}></div>
                </div>
            </div>

            <div className="admin-content-area">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' ? (
                        <DashboardView key="dashboard" stats={stats} audits={audits} filter={filter} setFilter={setFilter} />
                    ) : (
                        <TemplateBuilder key="templates" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Sub-component: Dashboard View
const DashboardView = ({ stats, audits, filter, setFilter }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <StatCard label="TOTAL AUDITS" value={stats.total} color="#1e293b" />
            <StatCard label="COMPLETED" value={stats.completed} color="#10b981" />
            <StatCard label="PENDING" value={stats.pending} color="#f59e0b" />
            <StatCard label="ISSUES FOUND" value={stats.issues} color="#ef4444" />
        </div>

        {/* Main Table Content */}
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Active Audits</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['All', 'Completed', 'Pending'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', background: filter === f ? '#f1f5f9' : '#fff', cursor: 'pointer', fontSize: '13px' }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <table className="audit-table" style={{ marginTop: 0 }}>
                <thead>
                    <tr>
                        <th>Store ID</th>
                        <th>Location</th>
                        <th>Auditor</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {audits
                            .filter(a => filter === 'All' ? true : a.status === filter)
                            .map(audit => (
                                <motion.tr
                                    key={audit.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td style={{ fontWeight: 600 }}>#{audit.storeId}</td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{audit.location}</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>{audit.address}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                                                {audit.auditor.charAt(0)}
                                            </div>
                                            {audit.auditor}
                                        </div>
                                    </td>
                                    <td>{new Date(audit.date).toLocaleDateString()}</td>
                                    <td>
                                        {audit.status === 'Completed' ? (
                                            <span style={{ fontWeight: 600, color: audit.score > 80 ? '#10b981' : '#f59e0b' }}>
                                                {audit.score}%
                                            </span>
                                        ) : (
                                            <span style={{ color: '#94a3b8' }}>--</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`audit-status status-${audit.status.toLowerCase().replace(' ', '-')}`}>
                                            {audit.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    </motion.div>
);

// Sub-component: Template Builder
const TemplateBuilder = () => {
    const [templates, setTemplates] = useState([
        { id: 1, name: 'Standard Retail Audit', questions: 12, version: '1.2' },
        { id: 2, name: 'Safety Compliance Check', questions: 8, version: '1.0' }
    ]);
    const [isCreating, setIsCreating] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', questions: [] });

    // Question Form State
    const [qText, setQText] = useState('');
    const [qType, setQType] = useState('Yes/No');
    const [qCondition, setQCondition] = useState('');

    const addQuestion = () => {
        if (!qText) return;
        setNewTemplate({
            ...newTemplate,
            questions: [...newTemplate.questions, { text: qText, type: qType, condition: qCondition }]
        });
        setQText('');
        setQCondition('');
    };

    const saveTemplate = () => {
        if (!newTemplate.name) return;
        setTemplates([
            ...templates,
            { id: Date.now(), name: newTemplate.name, questions: newTemplate.questions.length, version: '1.0' }
        ]);
        setIsCreating(false);
        setNewTemplate({ name: '', questions: [] });
    };

    if (!isCreating) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>Audit Templates</h2>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="mobile-btn"
                        style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0 }}
                    >
                        <FaPlus /> Create New Template
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {templates.map(t => (
                        <div key={t.id} style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{ background: '#e3f2fd', padding: '10px', borderRadius: '8px', color: '#1976d2' }}>
                                    <FaClipboardCheck size={20} />
                                </div>
                                <div style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', height: 'fit-content' }}>v{t.version}</div>
                            </div>
                            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{t.name}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{t.questions} Questions Configured</p>
                            <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                                <button style={{ flex: 1, padding: '8px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '4px', cursor: 'pointer', color: '#475569' }}>Edit</button>
                                <button style={{ width: '36px', border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: '4px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => setIsCreating(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>← Back</button>
                <h2 style={{ margin: 0, color: '#1e293b' }}>Create Template</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Left: Builder */}
                <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#475569' }}>Template Name</label>
                        <input
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                            placeholder="e.g., Morning Opening Checklist"
                            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem' }}
                        />
                    </div>

                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <h4 style={{ margin: '0 0 16px', color: '#475569' }}>Add Logic & Questions</h4>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>Question</label>
                                <input value={qText} onChange={e => setQText(e.target.value)} className="mobile-input" placeholder="e.g., Are fire exits clear?" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>Type</label>
                                <select value={qType} onChange={e => setQType(e.target.value)} className="mobile-input">
                                    <option>Yes/No</option>
                                    <option>Multiple Choice</option>
                                    <option>Photo Proof</option>
                                    <option>Number Input</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FaLayerGroup style={{ color: '#f59e0b' }} /> Conditional Logic (Optional)
                            </label>
                            <input value={qCondition} onChange={e => setQCondition(e.target.value)} className="mobile-input" placeholder="e.g., IF Answer = 'No' THEN Require Photo" />
                        </div>

                        <button onClick={addQuestion} style={{ background: '#334155', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
                            + Add Question
                        </button>
                    </div>
                </div>

                {/* Right: Preview */}
                <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', color: '#1e293b' }}>Preview Structure</h3>
                    {newTemplate.questions.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px', border: '1px dashed #e2e8f0', borderRadius: '6px' }}>
                            No questions added yet.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {newTemplate.questions.map((q, idx) => (
                                <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{idx + 1}. {q.text}</div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                        <span style={{ fontSize: '11px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>{q.type}</span>
                                        {q.condition && (
                                            <span style={{ fontSize: '11px', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FaCog size={10} /> {q.condition}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={saveTemplate}
                        disabled={!newTemplate.name || newTemplate.questions.length === 0}
                        style={{ width: '100%', marginTop: '24px', padding: '12px', background: (!newTemplate.name || newTemplate.questions.length === 0) ? '#cbd5e1' : '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Save Template
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className="audit-stat-card">
        <div style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '28px', fontWeight: 700, margin: '8px 0', color: color }}>{value}</div>
    </div>
);

export default AdminWebPanel;
