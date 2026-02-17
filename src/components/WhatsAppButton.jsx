import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    return (
        <motion.a
            href="https://wa.link/l0w6d6"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                textDecoration: 'none',
            }}
        >
            {/* Pulse animation ring */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 0, 0.7],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '3px solid #25D366',
                }}
            />

            {/* WhatsApp Icon */}
            <FaWhatsapp
                style={{
                    fontSize: '32px',
                    color: 'white',
                    zIndex: 1
                }}
            />
        </motion.a>
    );
};

export default WhatsAppButton;
