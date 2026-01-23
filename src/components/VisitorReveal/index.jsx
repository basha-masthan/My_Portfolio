import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VisitorReveal.css';

const VISITOR_KEY = 'portfolio_visitor_revealed';
const LOGS_KEY = 'portfolio_visitor_logs';

const VisitorReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(1); // 1: Role Selection, 2: Details
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({ email: '', company: '' });

    useEffect(() => {
        // Check if already revealed
        if (localStorage.getItem(VISITOR_KEY)) {
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const timestamp = new Date().toLocaleString();

        const newLog = {
            role: selectedRole,
            email: formData.email || 'N/A',
            company: formData.company || 'N/A',
            time: timestamp
        };

        // Save locally "online file simulation"
        // Save locally "online file simulation"
        let specificLogs = [];
        try {
            specificLogs = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
        } catch (e) {
            console.error("Failed to parse existing visitor logs", e);
            specificLogs = [];
        }
        specificLogs.push(newLog);
        localStorage.setItem(LOGS_KEY, JSON.stringify(specificLogs));

        // Mark as revealed so it doesn't show again
        localStorage.setItem(VISITOR_KEY, 'true');

        // Simulating "Text File Saved" action
        console.log("Visitor Logged:", newLog);

        setIsVisible(false);
        alert(`Thanks for connecting! I'm glad a ${selectedRole} is viewing my work.`);
    };

    // Secret Admin Access: Ctrl + Shift + L
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                downloadLogs();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const downloadLogs = () => {
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
        } catch (e) {
            logs = [];
        }
        if (logs.length === 0) {
            alert('No visitor logs found yet.');
            return;
        }

        let txtContent = "VISITOR ACCESS LOGS\n===================\n\n";
        logs.forEach((log, index) => {
            txtContent += `Entry #${index + 1}\n`;
            txtContent += `Role: ${log.role}\n`;
            txtContent += `Email: ${log.email}\n`;
            txtContent += `Company: ${log.company}\n`;
            txtContent += `Date: ${log.time}\n`;
            txtContent += `-------------------\n\n`;
        });

        const element = document.createElement("a");
        const file = new Blob([txtContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "visitor_logs.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Temporary dev reset function (optional)
    const reset = () => {
        localStorage.removeItem(VISITOR_KEY);
        window.location.reload();
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="vr-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="vr-modal"
                    >
                        {step === 1 ? (
                            <>
                                <h2 className="vr-title">Time to Reveal Yourself!</h2>
                                <p style={{ textAlign: 'center', marginBottom: '30px', color: '#999' }}>I'd love to know who is visiting my portfolio.</p>

                                <div className="vr-options-grid">
                                    {["Tech Recruitment Team", "HR Professional", "Tech Person", "Other"].map(role => (
                                        <div
                                            key={role}
                                            className="vr-option-btn"
                                            onClick={() => handleRoleSelect(role)}
                                        >
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h2 className="vr-title">Just a Few Details</h2>
                                <p style={{ textAlign: 'center', marginBottom: '20px', color: '#ccc' }}>
                                    You selected: <span style={{ color: '#FF6B00', fontWeight: 'bold' }}>{selectedRole}</span>
                                </p>

                                <div className="vr-input-group">
                                    <label className="vr-label">Email (Optional)</label>
                                    <input
                                        type="email"
                                        className="vr-input"
                                        placeholder="to connect with you..."
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="vr-input-group">
                                    <label className="vr-label">Company Name (Optional)</label>
                                    <input
                                        type="text"
                                        className="vr-input"
                                        placeholder="where are you from?"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="vr-submit-btn">
                                    Submit & Continue
                                </button>
                                <div
                                    onClick={() => setStep(1)}
                                    style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.85rem', color: '#666', cursor: 'pointer' }}
                                >
                                    Cancel Selection
                                </div>
                            </form>
                        )}

                        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.7rem', color: '#444' }}>
                            * Your response is stored securely.
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VisitorReveal;
