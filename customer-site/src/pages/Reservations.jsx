import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, Calendar, Users, ArrowRight } from 'lucide-react';
import './Reservations.css';

const TIME_SLOTS = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
];

const Reservations = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: 2
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.reservation_time) {
            setErrorMsg('Please select a preferred time slot');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        const isDemoMode = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

        try {
            const payload = {
                data: {
                    ...formData,
                    people: Number(formData.people)
                }
            };

            if (isDemoMode) {
                // Intercept and save to local storage for demo
                const reservations = JSON.parse(localStorage.getItem('LETHE_RESERVATIONS')) || [];
                const newRes = { ...payload.data, reservation_id: Date.now(), status: 'booked' };
                reservations.push(newRes);
                localStorage.setItem('LETHE_RESERVATIONS', JSON.stringify(reservations));

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setStatus('success');
                return;
            }

            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
            const response = await fetch(`${API_URL}/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to submit reservation');
            }

            setStatus('success');
        } catch (err) {
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectTime = (time) => {
        setFormData({ ...formData, reservation_time: time });
    };

    return (
        <div className="reservation-page pt-150">
            <div className="container">
                <div className="reservation-layout">
                    {/* Left Side: Info & Aesthetic */}
                    <motion.div
                        className="reservation-info"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="subtitle text-gold">Exceptional Moments</span>
                        <h1 className="title-large mb-3">Reserve<br />The Night</h1>
                        <p className="desc-text mb-4">
                            Join us for an evening of unparalleled culinary artistry. Each table at LÉTHÉ is reserved for a standard duration of 120 minutes to ensure a relaxed and immersive experience.
                        </p>
                        <div className="reservation-features">
                            <div className="feature-item">
                                <Clock size={20} className="text-gold" />
                                <span>2-Hour Dining Windows</span>
                            </div>
                            <div className="feature-item">
                                <Calendar size={20} className="text-gold" />
                                <span>Instant Confirmation</span>
                            </div>
                            <div className="feature-item">
                                <Users size={20} className="text-gold" />
                                <span>Private Tables Only</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Professional Form */}
                    <motion.div
                        className="reservation-glass"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    className="success-message text-center"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <CheckCircle size={64} className="text-gold mx-auto mb-4" />
                                    <h2 className="title-medium">Request Confirmed</h2>
                                    <p className="desc-text">
                                        Your reservation for {formData.reservation_date} at {formData.reservation_time} for {formData.people} guests has been securely placed.
                                    </p>
                                    <button className="btn-primary mt-5" onClick={() => window.location.reload()}>Book Another</button>
                                </motion.div>
                            ) : (
                                <motion.div key="form">
                                    {status === 'error' && (
                                        <div className="error-banner mb-4">
                                            <AlertCircle size={20} />
                                            <span>{errorMsg}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="professional-form">
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="form-label">First Name</label>
                                                <input type="text" name="first_name" required className="form-input" placeholder="Jane" value={formData.first_name} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" name="last_name" required className="form-input" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="form-label">Mobile Number</label>
                                                <input type="tel" name="mobile_number" required placeholder="+49 ..." className="form-input" value={formData.mobile_number} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Guests</label>
                                                <input type="number" name="people" min="1" max="10" required className="form-input" value={formData.people} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Preferred Date</label>
                                            <input type="date" name="reservation_date" min={new Date().toISOString().split('T')[0]} required className="form-input custom-date" value={formData.reservation_date} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Select Time Slot</label>
                                            <div className="time-slots-container">
                                                {TIME_SLOTS.map(slot => (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        className={`slot-pill ${formData.reservation_time === slot ? 'active' : ''}`}
                                                        onClick={() => selectTime(slot)}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            className="btn-primary w-100 mt-4"
                                            disabled={status === 'loading'}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {status === 'loading' ? 'Securing Table...' : (
                                                <span className="flex-center gap-2">
                                                    Complete Reservation <ArrowRight size={18} />
                                                </span>
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Reservations;
