import React, { useState, useEffect } from 'react'
import '../styles/testimonials.css'
import { FaStar, FaUserAstronaut } from 'react-icons/fa'

const Testimonials = () => {
  const [current, setCurrent] = useState(0)

  const reviews = [
    { name: 'Elena V.', mission: 'Pioneer', text: 'An experience beyond words. The Mars sunset from the dome was breathtaking.', rating: 5 },
    { name: 'Marcus T.', mission: 'Explorer', text: 'Professional, safe, and absolutely luxurious. A dream come true.', rating: 5 },
    { name: 'Sophia L.', mission: 'Legend', text: 'Every moment was curated to perfection. I felt like a true explorer.', rating: 5 },
    { name: 'James K.', mission: 'Pioneer', text: 'The low gravity sports were incredible. I’ll never forget this journey.', rating: 5 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-header reveal">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our <span>Pioneers</span> Say</h2>
        </div>
        <div className="testimonials-slider">
          {reviews.map((rev, idx) => (
            <div key={idx} className={`testimonial-card ${idx === current ? 'active' : ''}`}>
              <div className="testimonial-avatar">
                <FaUserAstronaut />
              </div>
              <div className="testimonial-stars">
                {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="testimonial-text">"{rev.text}"</p>
              <div className="testimonial-author">
                <strong>{rev.name}</strong> – {rev.mission}
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {reviews.map((_, idx) => (
            <span key={idx} className={`dot ${idx === current ? 'active' : ''}`} onClick={() => setCurrent(idx)}></span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials