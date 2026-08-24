import React, { useEffect, useRef } from 'react'
import '../styles/features.css'
import { FaHotel, FaMountain, FaSun, FaWeightHanging } from 'react-icons/fa'

const Features = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.feature-card').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: <FaHotel />, title: 'Luxury Space Hotels', desc: 'Orbital suites with zero-gravity pools and panoramic Mars views.' },
    { icon: <FaWeightHanging />, title: 'Low Gravity Adventures', desc: 'Experience Martian low-G sports and soaring flights.' },
    { icon: <FaMountain />, title: 'Olympus Mons Expedition', desc: 'Guided treks to the largest volcano in the solar system.' },
    { icon: <FaSun />, title: 'Martian Sunset Experience', desc: 'Witness the blue-tinted sunsets unique to the Red Planet.' }
  ]

  return (
    <section id="features" ref={sectionRef}>
      <div className="container">
        <div className="features-header reveal">
          <span className="section-label">Why Choose Mars</span>
          <h2 className="section-title">The <span>Ultimate</span> Destination</h2>
          <p className="section-sub centered">Discover a world of wonder, adventure, and unparalleled luxury.</p>
        </div>
        <div className="features-grid">
          {features.map((f, idx) => (
            <div key={idx} className="feature-card reveal-scale" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features