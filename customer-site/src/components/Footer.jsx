import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col" style={{ gridColumn: 'span 2' }}>
                        <h3 className="footer-brand">LÉTHÉ</h3>
                        <p className="footer-desc">
                            Experience modern culinary art in the heart of Germany.
                            Elevate your senses with our extravagant fine dining and atmospheric ambiance.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-list">
                            <li><MapPin size={16} /> Friedrichstraße 123, Berlin</li>
                            <li><Phone size={16} /> +49 30 1234 5678</li>
                            <li><Mail size={16} /> info@lethe-dining.de</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-title">Hours</h4>
                        <ul className="footer-list">
                            <li>Mon - Thu: 17:00 - 23:00</li>
                            <li>Fri - Sat: 17:00 - 01:00</li>
                            <li>Sunday: Full Day 12:00 - 22:00</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Léthe Restaurant. All rights reserved. </p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
