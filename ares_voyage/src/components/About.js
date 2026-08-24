import React, { useEffect, useRef } from 'react'
import '../styles/about.css'
import { FaShieldAlt, FaUserAstronaut, FaRocket } from 'react-icons/fa'

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const cards = [
    {
      icon: <FaRocket />,
      title: 'Luxury Accommodation',
      desc: 'State-of-the-art zero-gravity suites with panoramic views of the Martian landscape.'
    },
    {
      icon: <FaUserAstronaut />,
      title: 'AI Mission Assistance',
      desc: 'Personalized AI concierge to guide you through every step of your interplanetary journey.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Certified Space Safety',
      desc: 'Rigorous safety protocols and certified spacecraft ensuring your peace of mind.'
    }
  ]

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal">
            <span className="section-label">About Ares Voyage</span>
            <h2 className="section-title">Redefining <span>Space Travel</span></h2>
            <p className="section-sub">
              We are a pioneering luxury space tourism company, dedicated to making the dream of
              visiting Mars a reality. Our mission is to deliver an unparalleled experience that
              combines safety, comfort, and the thrill of exploration.
            </p>
          </div>
          <div className="about-cards">
            {cards.map((card, idx) => (
              <div key={idx} className="about-card reveal" style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About