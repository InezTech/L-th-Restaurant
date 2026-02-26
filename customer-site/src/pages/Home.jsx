import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const descRef = useRef(null);
    const btnRef = useRef(null);

    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // Hero entry animations
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(title1Ref.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.2 })
            .fromTo(title2Ref.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 }, "-=1.0")
            .fromTo(descRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }, "-=0.8")
            .fromTo(btnRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }, "-=0.8");

        // Scroll parallax on hero background
        gsap.to('.parallax-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Reveal animations for philosophy section
        gsap.fromTo('.phil-text',
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );

        gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );

    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero" ref={heroRef}>
                <div className="hero-bg">
                    <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop" alt="Luxury Dining Room" className="parallax-bg" />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content container">
                    <div className="overflow-hidden">
                        <h1 className="title-large" ref={title1Ref}>
                            Taste The
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="title-large text-gold" ref={title2Ref}>
                            Extraordinary
                        </h1>
                    </div>

                    <p className="hero-desc" ref={descRef}>
                        Redefining luxury dining in Germany. A symphony of flavors, architectural brilliance, and uncompromised service crafted for perfection.
                    </p>

                    <div className="hero-cta" ref={btnRef}>
                        <Link to="/reservations" className="btn-primary">
                            Book A Table <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding philosophy" ref={sectionRef}>
                <div className="container grid-2 align-center">
                    <div className="philosophy-text phil-text">
                        <span className="subtitle text-gold">Our Philosophy</span>
                        <h2 className="title-medium mt-2">Art on a plate, magic in the ambiance.</h2>
                        <p className="desc-text">
                            We source only the rarest ingredients from local German purveyors and international artisans. Every dish is meticulously crafted to awaken your senses, plated with the precision of a master artist. The ambiance echoes sophistication and elegance, making every visit unforgettable.
                        </p>
                        <div className="awards mt-4">
                            <div className="award-item">
                                <Star className="text-gold" fill="var(--accent-gold)" />
                                <Star className="text-gold" fill="var(--accent-gold)" />
                                <Star className="text-gold" fill="var(--accent-gold)" />
                                <span>Michelin Excellence</span>
                            </div>
                        </div>
                    </div>

                    <div className="philosophy-image">
                        <div className="image-wrapper" ref={imageRef}>
                            <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2571&auto=format&fit=crop" alt="Gourmet Dish" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="ingredients-showcase">
                <div className="ingredients-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670&auto=format&fit=crop')` }}></div>
                <div className="overlay-dark"></div>
                <div className="container text-center flex-center" style={{ minHeight: '600px', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                    <span className="subtitle text-gold">The Finest Elements</span>
                    <h2 className="title-medium mt-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Only the most pristine, high-end ingredients enter our kitchen.
                    </h2>
                    <Link to="/menu" className="btn-outline mt-5" style={{ marginTop: '3rem' }}>
                        Discover Our Menu
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
