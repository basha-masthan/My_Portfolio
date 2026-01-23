import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUndo } from 'react-icons/fa';
import './CareerTree.css';

const timelineData = [
    { year: 2020, text: "Planted the roots with HTML & CSS" },
    { year: 2021, text: "Strengthened fundamentals with JavaScript & Linux" },
    { year: 2022, text: "Deployed fully functional real-world applications" },
    { year: 2023, text: "Expanded into React, Android, SQL & MongoDB" },
    { year: 2024, text: "Integrated Data Science & Automation workflows" },
    { year: 2025, text: "Full Stack Developer Intern at DevLoom Labs & AI/ML Architecture" }
];

const CareerTree = () => {
    const [isGrowing, setIsGrowing] = useState(false);
    const [stage, setStage] = useState(0); // 0 = Seed, 1..N = Growth Steps
    const [completed, setCompleted] = useState(false);

    const totalStages = timelineData.length;

    useEffect(() => {
        let interval;
        if (isGrowing && stage < totalStages) {
            interval = setInterval(() => {
                setStage(prev => prev + 1);
            }, 800); // Speed of each year appearing
        } else if (stage >= totalStages) {
            setCompleted(true);
            setIsGrowing(false);
        }
        return () => clearInterval(interval);
    }, [isGrowing, stage, totalStages]);

    const startGrowth = () => {
        if (!isGrowing && stage === 0) {
            setIsGrowing(true);
            setStage(1); // Start immediately
        }
    };

    const resetGrowth = () => {
        setStage(0);
        setCompleted(false);
        setIsGrowing(false);
    };

    return (
        <div className="career-tree-container">
            {stage === 0 && !isGrowing && (
                <div style={{ textAlign: 'center' }}>
                    <button className="tree-start-btn" onClick={startGrowth}>
                        🌱
                        <span className="tooltip">Click to see my growth</span>
                    </button>
                    <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#94a3b8', opacity: 0.8 }}>
                        Click the seed to reveal my journey
                    </p>
                </div>
            )}

            {(stage > 0 || isGrowing) && (
                <div className="tree-layout">
                    {/* Left: Tree Visual */}
                    <div className="tree-visual-area">
                        <TreeVisual stage={stage} total={totalStages} />
                    </div>

                    {/* Right: Timeline */}
                    <div className="timeline-area">
                        <AnimatePresence>
                            {timelineData.slice(0, stage).map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20, height: 0 }}
                                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                                    transition={{ duration: 0.5 }}
                                    className="timeline-item"
                                >
                                    <span className="timeline-year">{item.year}</span>
                                    {item.text}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {completed && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={resetGrowth}
                                className="reset-btn"
                            >
                                <FaUndo size={12} /> Replay Journey
                            </motion.button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const TreeVisual = ({ stage, total }) => {
    // Simple SVG construction based on stage
    // Scale grows from 0.2 to 1.5
    const progress = Math.min(stage / total, 1);
    const scale = 0.5 + (progress * 1);

    return (
        <svg width="300" height="400" viewBox="0 0 200 300" className="svg-tree">
            {/* Ground */}
            <line x1="20" y1="280" x2="180" y2="280" stroke="#8D6E63" strokeWidth="4" strokeLinecap="round" />

            <motion.g
                initial={{ scale: 0, originX: 0.5, originY: 1 }}
                animate={{ scale: scale }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
            >
                {/* Trunk */}
                <path d="M100 280 L100 150" stroke="#795548" strokeWidth="12" strokeLinecap="round" />

                {/* Branches - Appear based on progress */}
                {progress > 0.3 && (
                    <motion.path
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        d="M100 220 L60 180" stroke="#795548" strokeWidth="8" strokeLinecap="round"
                    />
                )}
                {progress > 0.5 && (
                    <motion.path
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        d="M100 200 L140 160" stroke="#795548" strokeWidth="8" strokeLinecap="round"
                    />
                )}

                {/* Foliage - Main Top */}
                <motion.circle
                    cx="100" cy="120" r={progress * 40}
                    fill="#4CAF50"
                />

                {/* Foliage - Side Clusters */}
                {progress > 0.4 && (<motion.circle cx="60" cy="180" r={progress * 25} fill="#66BB6A" />)}
                {progress > 0.6 && (<motion.circle cx="140" cy="160" r={progress * 30} fill="#81C784" />)}
                {progress > 0.8 && (<motion.circle cx="100" cy="80" r={progress * 20} fill="#A5D6A7" />)}
            </motion.g>
        </svg>
    );
};

export default CareerTree;
