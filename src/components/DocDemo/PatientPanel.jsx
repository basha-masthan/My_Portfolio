import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaNotesMedical, FaSearch } from 'react-icons/fa';

const PatientPanel = ({ appointments, onBook }) => {
    const [view, setView] = useState('home'); // home, book
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Mock Doctor Database
    const doctors = [
        {
            id: 1,
            name: "Dr. John Smith",
            specialty: "Cardiologist",
            hospital: "City Hearts Hospital",
            distance: "2.4 km",
            rating: 4.8,
            image: "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg"
        }
    ];

    const handleBookClick = (doc) => {
        setSelectedDoctor(doc);
        setView('book');
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onBook({
            patientName: formData.get('patientName'),
            symptoms: formData.get('symptoms'),
            date: formData.get('date'),
            time: formData.get('time')
        });
        setView('success');
        setTimeout(() => setView('home'), 2000);
    };

    return (
        <div className="doc-split-pane" style={{ background: '#fff' }}>
            {/* Mobile Header Simulation */}
            <div className="patient-app-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>ValueHealth App</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Hello, Patient</div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', color: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        JD
                    </div>
                </div>

                <div className="patient-search-bar">
                    <FaSearch style={{ marginRight: '10px' }} />
                    <input
                        placeholder="Search doctors, specialties..."
                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%' }}
                    />
                </div>
            </div>

            <div className="mobile-scroll-content" style={{ flex: 1, overflowY: 'auto', background: '#f8f9fa' }}>
                <AnimatePresence mode="wait">
                    {view === 'home' && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            padding="1rem"
                        >
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ margin: '0 0 16px', color: '#333' }}>Nearby Doctors</h3>
                                {doctors.map(doc => (
                                    <div key={doc.id} className="patient-card">
                                        <div style={{ display: 'flex', padding: '16px' }}>
                                            <img src={doc.image} alt={doc.name} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', marginRight: '16px' }} />
                                            <div>
                                                <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{doc.name}</h4>
                                                <div style={{ fontSize: '0.9rem', color: '#1a73e8', fontWeight: 600 }}>{doc.specialty}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>{doc.hospital}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '0.8rem', color: '#555' }}>
                                                    <span><FaMapMarkerAlt style={{ color: 'red' }} /> {doc.distance}</span>
                                                    <span><FaStar style={{ color: 'orange' }} /> {doc.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ borderTop: '1px solid #eee', padding: '12px' }}>
                                            <button onClick={() => handleBookClick(doc)} className="patient-btn">Book Appointment</button>
                                        </div>
                                    </div>
                                ))}

                                <h3 style={{ margin: '24px 0 16px', color: '#333' }}>My Appointments</h3>
                                {appointments.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#888', background: '#fff', borderRadius: '8px' }}>
                                        No active bookings.
                                    </div>
                                ) : (
                                    appointments.map(apt => (
                                        <div key={apt.id} style={{ background: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ fontWeight: 600 }}>{doctors[0].name}</div>
                                                <span className={`doc-badge status-${apt.status}`}>{apt.status}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                                                {new Date(apt.date).toDateString()} at {apt.time}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {view === 'book' && (
                        <motion.div
                            key="book"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            style={{ padding: '20px' }}
                        >
                            <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#666', marginBottom: '15px', cursor: 'pointer' }}>← Back</button>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Book Appointment</h2>

                            <form onSubmit={handleConfirmBooking} style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>Doctor</label>
                                    <div style={{ padding: '10px', background: '#f0f4f8', borderRadius: '6px', color: '#555' }}>
                                        {selectedDoctor?.name} - {selectedDoctor?.specialty}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>Patient Name</label>
                                    <input name="patientName" required placeholder="Enter full name" defaultValue="Jane Doe" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>Symptoms</label>
                                    <textarea name="symptoms" required placeholder="Briefly describe your issue" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', height: '80px' }} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>Date</label>
                                        <input name="date" type="date" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>Time</label>
                                        <input name="time" type="time" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                    </div>
                                </div>

                                <button type="submit" className="patient-btn">Confirm Booking</button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center' }}
                        >
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#d4edda', color: '#155724', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '20px' }}>
                                <FaCheck />
                            </div>
                            <h3>Booking Request Sent!</h3>
                            <p style={{ color: '#666' }}>Your appointment is pending doctor approval. Check the dashboard for updates.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PatientPanel;
