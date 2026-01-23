import React, { useState, useEffect } from 'react';
import DoctorPanel from './DoctorPanel';
import PatientPanel from './PatientPanel';
import './styles.css';

const DocDemo = () => {
    // Demo Data Persistence
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('demo_doc_appointments');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: '1',
                patientName: "Alice Johnson",
                symptoms: "Persistent headache",
                date: new Date(Date.now() + 86400000).toISOString(),
                time: "10:30",
                status: "pending"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('demo_doc_appointments', JSON.stringify(appointments));
    }, [appointments]);

    const handleBooking = (bookingData) => {
        const newAppointment = {
            ...bookingData,
            id: Date.now().toString(),
            status: 'pending' // pending -> approved/rejected
        };
        setAppointments(prev => [newAppointment, ...prev]);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setAppointments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, status: newStatus } : apt
        ));
    };

    return (
        <div className="doc-container">
            {/* Left: Doctor Dashboard */}
            <DoctorPanel
                appointments={appointments}
                updateStatus={handleStatusUpdate}
            />

            {/* Right: Patient Mobile App */}
            <PatientPanel
                appointments={appointments}
                onBook={handleBooking}
            />
        </div>
    );
};

export default DocDemo;
