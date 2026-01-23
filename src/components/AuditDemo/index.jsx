import React, { useState, useEffect } from 'react';
import AdminWebPanel from './AdminWebPanel';
import MobileAuditApp from './MobileAuditApp';
import './styles.css';

const AuditDemo = () => {
    // Demo Data Persistence
    const [audits, setAudits] = useState(() => {
        const saved = localStorage.getItem('demo_audit_data');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: '1',
                storeId: 'S204',
                location: 'Northside Mall',
                address: '88 North Ave',
                auditor: 'Sarah Lee',
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'Completed',
                score: 92,
                issues: 1
            },
            {
                id: '2',
                storeId: 'S205',
                location: 'Central Plaza',
                address: '10 Central St',
                auditor: 'Mike Chen',
                date: new Date(Date.now() - 172800000).toISOString(),
                status: 'Pending',
                score: 0,
                issues: 0
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('demo_audit_data', JSON.stringify(audits));
    }, [audits]);

    const handleNewAudit = (auditData) => {
        const newAudit = {
            ...auditData,
            id: Date.now().toString()
        };
        setAudits(prev => [newAudit, ...prev]);
    };

    return (
        <div className="audit-container">
            {/* Left: Desktop Web Dashboard */}
            <AdminWebPanel audits={audits} />

            {/* Right: Mobile App Simulation */}
            <MobileAuditApp onCompleteAudit={handleNewAudit} />
        </div>
    );
};

export default AuditDemo;
