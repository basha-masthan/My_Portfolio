import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaWallet, FaChartPie, FaArrowLeft, FaShoppingBag, FaUtensils, FaCar, FaGamepad, FaHome } from 'react-icons/fa';

const MoneyApp = () => {
    const [view, setView] = useState('dashboard'); // dashboard, add
    const [transactions, setTransactions] = useState([
        { id: 1, title: 'Grocery Shopping', amount: 1500, category: 'Shopping', date: new Date().toISOString() },
        { id: 2, title: 'Uber to Office', amount: 250, category: 'Transport', date: new Date(Date.now() - 86400000).toISOString() },
        { id: 3, title: 'Dinner with Team', amount: 800, category: 'Food', date: new Date(Date.now() - 172800000).toISOString() },
    ]);

    const totalExpense = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTx = {
            id: Date.now(),
            title: formData.get('title'),
            amount: Number(formData.get('amount')),
            category: formData.get('category'),
            date: new Date().toISOString()
        };
        setTransactions([newTx, ...transactions]);
        setView('dashboard');
    };

    const getIcon = (cat) => {
        switch (cat) {
            case 'Food': return <FaUtensils color="#ff9800" />;
            case 'Transport': return <FaCar color="#2196f3" />;
            case 'Shopping': return <FaShoppingBag color="#e91e63" />;
            default: return <FaWallet color="#6200ee" />;
        }
    };

    return (
        <div className="md-app-content">
            <AnimatePresence mode="wait">
                {view === 'dashboard' ? (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <div className="md-header">
                            <div style={{ marginBottom: 10, opacity: 0.8 }}>Total Spent</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>₹{totalExpense.toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', marginTop: 5, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4, display: 'inline-block' }}>
                                Running Low
                            </div>
                        </div>

                        <div style={{ padding: '0 16px', marginTop: '-20px' }}>
                            <div className="md-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: '#666', fontSize: '0.8rem' }}>Income</div>
                                    <div style={{ color: '#4caf50', fontWeight: 600 }}>₹50,000</div>
                                </div>
                                <div style={{ width: 1, background: '#eee' }}></div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: '#666', fontSize: '0.8rem' }}>Daily Avg</div>
                                    <div style={{ color: '#f57c00', fontWeight: 600 }}>₹950</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '0 16px', marginBottom: 10 }}>
                            <h4 style={{ color: '#333' }}>Recent Transactions</h4>
                        </div>

                        <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto', paddingBottom: 80 }}>
                            {transactions.map(tx => (
                                <div key={tx.id} className="md-card" style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
                                        {getIcon(tx.category)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 500, color: '#333' }}>{tx.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#999' }}>{new Date(tx.date).toLocaleDateString()} • {tx.category}</div>
                                    </div>
                                    <div style={{ fontWeight: 600, color: '#e53935' }}>-₹{tx.amount}</div>
                                </div>
                            ))}
                        </div>

                        <button className="md-fab" onClick={() => setView('add')}>
                            <FaPlus />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ height: '100%', padding: 20, background: '#fff' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                            <button onClick={() => setView('dashboard')} style={{ background: 'none', border: 'none', fontSize: 20, marginRight: 15, cursor: 'pointer' }}><FaArrowLeft /></button>
                            <h2 style={{ margin: 0 }}>Add Expense</h2>
                        </div>

                        <form onSubmit={handleAdd}>
                            <label style={{ display: 'block', marginBottom: 5, fontSize: '0.9rem', color: '#666' }}>Amount (₹)</label>
                            <input name="amount" type="number" className="md-input" autoFocus required placeholder="0.00" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} />

                            <label style={{ display: 'block', marginBottom: 5, fontSize: '0.9rem', color: '#666' }}>Purpose</label>
                            <input name="title" className="md-input" required placeholder="e.g. Lunch" />

                            <label style={{ display: 'block', marginBottom: 5, fontSize: '0.9rem', color: '#666' }}>Category</label>
                            <select name="category" className="md-input" style={{ width: '105%' }}>
                                <option>Food</option>
                                <option>Transport</option>
                                <option>Shopping</option>
                                <option>Bills</option>
                            </select>

                            <button type="submit" style={{ width: '100%', background: '#6200ee', color: '#fff', padding: 15, borderRadius: 12, border: 'none', fontSize: '1rem', fontWeight: 600, marginTop: 20, cursor: 'pointer' }}>
                                Save Transaction
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MoneyApp;
