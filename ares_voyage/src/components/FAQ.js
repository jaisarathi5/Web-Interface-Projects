import React, { useState, useEffect, useRef } from 'react'
import '../styles/faq.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  const faqs = [
    { q: 'Is training required?', a: 'Yes, all passengers undergo a 2-week comprehensive training program covering safety, zero-G adaptation, and emergency procedures.' },
    { q: 'How long is the mission?', a: 'Mission duration ranges from 7 to 21 days depending on the package, including travel and surface stay.' },
    { q: 'Is Mars safe?', a: 'Our spacecraft and habitats are built with multiple redundancies and meet the highest safety standards. We also have a dedicated medical team on board.' },
    { q: 'Can families travel?', a: 'Absolutely. We offer family packages with age-appropriate activities and accommodations for children and adults.' },
    { q: 'What is included?', a: 'All packages include transportation, accommodation, meals, guided tours, and access to our AI concierge. Premium packages add bespoke experiences.' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.faq-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq-header reveal">
          <span className="section-label">Questions</span>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                {faq.q}
                <span className="faq-icon">{openIndex === idx ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ