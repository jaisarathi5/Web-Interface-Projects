import React, { useEffect, useRef } from 'react'
import '../styles/hero.css'
import { FaRocket, FaChevronDown } from 'react-icons/fa'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const handleParallax = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      const layers = heroRef.current?.querySelectorAll('.parallax-layer')
      layers?.forEach((layer, i) => {
        const speed = (i + 1) * 0.5
        layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`
      })
    }
    window.addEventListener('mousemove', handleParallax)
    return () => window.removeEventListener('mousemove', handleParallax)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="parallax-layer mars-bg"></div>
        <div className="parallax-layer stars"></div>
        <div className="parallax-layer nebula"></div>
        <div className="parallax-layer dust"></div>
        <div className="parallax-layer glow"></div>
        <div className="parallax-layer spacecraft">
          <svg viewBox="0 0 200 120" className="rocket-svg">
            <path d="M100 10 L70 70 L100 90 L130 70 Z" fill="none" stroke="#B85C38" strokeWidth="2" />
            <rect x="92" y="70" width="16" height="20" rx="2" fill="none" stroke="#D67A45" strokeWidth="1.5" />
            <circle cx="100" cy="45" r="6" fill="#E6B85C" opacity="0.6" />
            <ellipse cx="100" cy="95" rx="12" ry="6" fill="#D67A45" opacity="0.4" className="flame" />
            <ellipse cx="100" cy="90" rx="8" ry="10" fill="#E6B85C" opacity="0.6" className="flame" />
          </svg>
        </div>
        <div className="parallax-layer satellite">
          <svg viewBox="0 0 80 80" width="40" height="40">
            <rect x="35" y="10" width="10" height="20" rx="2" fill="none" stroke="#B85C38" strokeWidth="1.5" />
            <rect x="20" y="30" width="40" height="8" rx="2" fill="none" stroke="#D67A45" strokeWidth="1.5" />
            <line x1="20" y1="34" x2="10" y2="20" stroke="#B85C38" strokeWidth="1" />
            <line x1="60" y1="34" x2="70" y2="20" stroke="#B85C38" strokeWidth="1" />
            <circle cx="40" cy="20" r="4" fill="none" stroke="#E6B85C" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Luxury Beyond Earth</h1>
          <p className="hero-sub">
            Experience the world's first premium journey to Mars with comfort,
            innovation, and unforgettable exploration.
          </p>
          <div className="hero-buttons">
            <a href="#pricing" className="btn btn-primary">Reserve Your Mission</a>
            <a href="#about" className="btn btn-secondary">Explore the Journey</a>
          </div>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">Launch Countdown</span>
              <span className="meta-value">2032</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Mission Status</span>
              <span className="meta-value">Accepting Reservations</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <FaChevronDown />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}

export default Hero