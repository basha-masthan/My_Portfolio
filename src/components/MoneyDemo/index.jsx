import React from 'react';
import { motion } from 'framer-motion';
import { FaWifi, FaBatteryFull, FaSignal, FaHome, FaChartPie, FaUser } from 'react-icons/fa';
import MoneyApp from './MoneyApp';
import './styles.css';

const MoneyModal = ({ onClose }) => {
    return (
        <div className="md-overlay" onClick={onClose}>
            <button className="md-close-btn" onClick={onClose}>&times;</button>

            <motion.div
                className="md-phone-frame"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
            >
                {/* Mock Status Bar */}
                <div className="md-status-bar">
                    <div>9:41</div>
                    <div style={{ width: 100, height: 18, background: '#000', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: -5, borderRadius: '0 0 10px 10px', zIndex: 20 }}></div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <FaSignal size={12} />
                        <FaWifi size={12} />
                        <FaBatteryFull size={12} />
                    </div>
                </div>

                {/* The App Screen */}
                <MoneyApp />

                {/* Mock Bottom Navigation of the App */}
                <div className="md-bottom-nav">
                    <div className="md-nav-item active">
                        <FaHome size={20} />
                        <span>Home</span>
                    </div>
                    <div className="md-nav-item">
                        <FaChartPie size={20} />
                        <span>Analytics</span>
                    </div>
                    <div className="md-nav-item">
                        <FaUser size={20} />
                        <span>Profile</span>
                    </div>
                </div>

                {/* Home Indicator */}
                <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 120, height: 4, background: '#000', borderRadius: 2, opacity: 0.2 }}></div>
            </motion.div>
        </div>
    );
};

export default MoneyModal;
