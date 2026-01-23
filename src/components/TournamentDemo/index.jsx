import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';
import './styles.css';

const TournamentDemo = () => {
    // Demo Data Persistence
    const [tournaments, setTournaments] = useState(() => {
        const saved = localStorage.getItem('demo_tournaments');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: '1',
                gameName: 'Free Fire MAX',
                mode: 'Squad',
                image: 'https://images.hdqwalls.com/wallpapers/garena-free-fire-4k-2020-qt.jpg',
                entryFee: '100',
                winPrize: '2000',
                startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
                roomId: 'ROOM123',
                password: 'PASS',
                registrations: [
                    { userId: 'PlayerOne', timestamp: new Date().toISOString() },
                    { userId: 'ProSniper', timestamp: new Date().toISOString() }
                ]
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('demo_tournaments', JSON.stringify(tournaments));
    }, [tournaments]);

    const handleRegister = (tournamentId, userId) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                // Prevent duplicate registration demo
                if (t.registrations.some(r => r.userId === userId)) {
                    alert("User already registered!");
                    return t;
                }
                return {
                    ...t,
                    registrations: [...t.registrations, { userId, timestamp: new Date().toISOString() }]
                };
            }
            return t;
        }));
    };

    return (
        <div className="td-container">
            {/* Left Interface: Admin */}
            <AdminPanel
                tournaments={tournaments}
                setTournaments={setTournaments}
            />

            {/* Right Interface: User */}
            <UserPanel
                tournaments={tournaments}
                onRegister={handleRegister}
            />
        </div>
    );
};

export default TournamentDemo;
