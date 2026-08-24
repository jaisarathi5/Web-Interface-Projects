import React from 'react'
import '../styles/cta.css'
import { FaRocket } from 'react-icons/fa'

const CTA = () => {
  return (
    <section id="cta">
      <div className="cta-bg">
        <div className="cta-overlay"></div>
      </div>
      <div className="container cta-content">
        <div className="cta-text reveal">
          <span className="section-label" style={{ color: '#e6b85c' }}>Final Call</span>
          <h2 className="section-title">Your Journey <span>Starts Here</span></h2>
          <p className="section-sub" style={{ color: 'rgba(247,243,238,0.9)' }}>
            Reserve your place before humanity's next giant leap.
          </p>
          <div className="cta-buttons">
            <a href="#pricing" className="btn btn-gold">Reserve Mission</a>
            <a href="#" className="btn btn-secondary">Download Mission Guide</a>
          </div>
        </div>
        <div className="cta-rocket">
          <FaRocket />
        </div>
      </div>
    </section>
  )
}

export default CTA