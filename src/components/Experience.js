import React, { useEffect, useRef } from 'react'
import '../styles/experience.css'

const Experience = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.exp-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 200)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const experiences = [
    { title: 'Drive a Mars Rover', desc: 'Take the wheel of a custom rover across the Martian plains.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkDDmKcCMQ3B9KeQwHDZepn1_JjbpakFC5wdTcvTmtQ&s=10' },
    { title: 'Luxury Dome Resort', desc: 'Stay in a glass-domed suite with 360° views of the Red Planet.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJBqwvnu4FWiGcEY4Lj_cH3LzHZrNVDlU09FDW0YH3ecFWW9hsT3V1w35p&s=10' },
    { title: 'Martian Canyon Trek', desc: 'Explore the Valles Marineris with expert guides.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLSHRoCP3TRcQtqJIdtBfS8-8v585IpufT88HLXwKFRQ&s=10' },
    { title: 'Low Gravity Sports', desc: 'Play zero-G basketball and other sports in a specially designed arena.', image: 'https://pbs.twimg.com/media/G8XCT20aAAAPcw2.jpg' },
    { title: 'Visit Olympus Mons', desc: 'Stand on the highest peak in the solar system.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeIwbo5s3BfFZGt3RcDRijFK3ONM0RVr4pB6-yQf2oQ&s=10' },
    { title: 'Scientific Discovery Center', desc: 'Participate in real Martian research at our state-of-the-art lab.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYBXp2ndD15dKpq5mrP9AqwmxsfcMpUV_kmTNtZLVOQ&s=10' }
  ]

  return (
    <section id="experience" ref={sectionRef}>
      <div className="container">
        <div className="experience-header reveal">
          <span className="section-label">Mars Experience</span>
          <h2 className="section-title">Unforgettable <span>Adventures</span></h2>
        </div>
        <div className="experience-grid">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`exp-item ${idx % 2 === 0 ? 'exp-left' : 'exp-right'}`}>
              <div className="exp-image" style={{ backgroundImage: `url(${exp.image})` }}>
                <div className="exp-overlay"></div>
              </div>
              <div className="exp-text">
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience