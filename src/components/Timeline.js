import React, { useEffect, useRef, useState } from 'react'
import '../styles/timeline.css'
import { FaGlobe, FaRocket, FaMoon, FaSatellite, FaMars, FaFlag } from 'react-icons/fa'

const Timeline = () => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const steps = [
    { icon: <FaGlobe />, label: 'Earth', desc: 'Departure from Earth orbit' },
    { icon: <FaRocket />, label: 'Launch', desc: 'Trans-Mars injection burn' },
    { icon: <FaMoon />, label: 'Moon Flyby', desc: 'Lunar gravity assist' },
    { icon: <FaSatellite />, label: 'Deep Space Cruise', desc: '6-month journey' },
    { icon: <FaMars />, label: 'Mars Orbit', desc: 'Insertion and aerobraking' },
    { icon: <FaFlag />, label: 'Landing', desc: 'Descent to surface' },
    { icon: <FaMars />, label: 'Luxury Base Arrival', desc: 'Welcome to Ares Base' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item')
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('active')
                setActiveIndex(i)
              }, i * 300)
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="timeline" ref={sectionRef}>
      <div className="container">
        <div className="timeline-header reveal">
          <span className="section-label">Your Journey</span>
          <h2 className="section-title">The <span>Path</span> to Mars</h2>
        </div>
        <div className="timeline">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => (
            <div key={idx} className={`timeline-item ${idx <= activeIndex ? 'active' : ''}`}>
              <div className="timeline-icon">{step.icon}</div>
              <div className="timeline-content">
                <h4>{step.label}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline