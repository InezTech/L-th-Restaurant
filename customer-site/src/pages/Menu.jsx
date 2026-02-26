import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Menu.css';

gsap.registerPlugin(ScrollTrigger);

const menuSections = [
    {
        title: 'Les Entrées',
        subtitle: 'To Awaken the Palate',
        image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=2000&auto=format&fit=crop',
        items: [
            { name: 'Scallop St. Jacques', desc: 'Golden caviar, celery root foam, brown butter', price: '42' },
            { name: 'Heirloom Beetroot', desc: 'Goat cheese mousse, hazelnut crumble, balsamic pearls', price: '28' },
            { name: 'Foie Gras Terrine', desc: 'Fig compote, toasted brioche, port wine reduction', price: '38' }
        ]
    },
    {
        title: 'Les Plats Principaux',
        subtitle: 'The Heart of the Experience',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop',
        items: [
            { name: 'Dry-Aged Wagyu', desc: 'Truffle pomme purée, bone marrow jus, wild mushrooms', price: '120' },
            { name: 'Wild Atlantic Turbot', desc: 'Sea buckthorn, samphire, champagne velouté', price: '85' },
            { name: 'Venison Loin', desc: 'Juniper crust, spiced red cabbage, chestnut', price: '75' }
        ]
    },
    {
        title: 'Les Desserts',
        subtitle: 'A Final Symphony',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2000&auto=format&fit=crop',
        items: [
            { name: 'Valrhona Grand Cru', desc: 'Smoked sea salt, gold leaf, raspberry sorbet', price: '24' },
            { name: 'Tahitian Vanilla Soufflé', desc: 'Grand Marnier crème anglaise, orange zest', price: '22' }
        ]
    }
];

const Menu = () => {
    useEffect(() => {
        gsap.utils.toArray('.menu-section-reveal').forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    }
                }
            );
        });
    }, []);

    return (
        <div className="menu-page">
            <section className="menu-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="subtitle text-gold">The Art of Dining</span>
                        <h1 className="title-large">Gastronomy</h1>
                    </motion.div>
                </div>
            </section>

            <div className="container pb-10">
                {menuSections.map((section, idx) => (
                    <div key={idx} className={`menu-section-reveal menu-row ${idx % 2 !== 0 ? 'inverse' : ''}`}>
                        <div className="menu-image-col">
                            <div className="menu-img-wrapper">
                                <img src={section.image} alt={section.title} className="menu-item-pic" />
                            </div>
                        </div>
                        <div className="menu-content-col">
                            <span className="subtitle text-gold">{section.subtitle}</span>
                            <h2 className="section-title-large">{section.title}</h2>
                            <div className="menu-items-grid">
                                {section.items.map((item, i) => (
                                    <div key={i} className="menu-item-premium">
                                        <div className="menu-item-header">
                                            <h3>{item.name}</h3>
                                            <div className="line-spacer"></div>
                                            <span className="price">€{item.price}</span>
                                        </div>
                                        <p className="item-desc">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
