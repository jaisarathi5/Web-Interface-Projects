import React, { useEffect, useRef } from 'react'
import '../styles/pricing.css'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.pricing-card').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const plans = [
    {
      name: 'Explorer',
      price: '$250,000',
      duration: '7 Days',
      features: ['Standard cabin', 'Guided surface tour', 'Meals included', 'Basic training'],
      highlighted: false
    },
    {
      name: 'Pioneer',
      price: '$550,000',
      duration: '14 Days',
      features: ['Luxury suite', 'Private rover', 'AI concierge', 'Extended excursions', 'Priority booking'],
      highlighted: true
    },
    {
      name: 'Legend',
      price: '$1,200,000',
      duration: '21 Days',
      features: ['Presidential suite', 'Custom itinerary', 'Personal butler', 'All expeditions', 'Helicopter tour'],
      highlighted: false
    }
  ]

  return (
    <section id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing-header reveal">
          <span className="section-label">Mission Packages</span>
          <h2 className="section-title">Choose Your <span>Voyage</span></h2>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              <div className="pricing-badge">{plan.highlighted && 'Most Popular'}</div>
              <h3>{plan.name}</h3>
              <div className="pricing-price">{plan.price}</div>
              <div className="pricing-duration">{plan.duration}</div>
              <ul className="pricing-features">
                {plan.features.map((f, i) => (
                  <li key={i}><FaCheck /> {f}</li>
                ))}
              </ul>
              <a href="#" className="btn btn-primary">Reserve Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing