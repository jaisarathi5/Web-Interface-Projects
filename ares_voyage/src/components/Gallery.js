import React, { useState, useEffect, useRef } from 'react'
import '../styles/gallery.css'

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null)
  const sectionRef = useRef(null)

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRem1G58IdrUtOooTBw3cqYKwyWVBF4NsVVszMsb_Wgeg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPzWZj3ikDXCu4VAYLwR3h1xKLaCAEPWlRghG5ozUjA&s=10',
    'https://cdn.britannica.com/93/93293-050-92D12F74/Artist-conception-Mars-Exploration-Rover.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEwri8vL0lm6Wzj60OdvyT5kwT8du0yiZVhMeehq3Xgq2-UWxxyNInBLA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoe9ATNnYYvz284BQaZqOoMpfLYlrHeST1PtuU_YqQw&s=10',
    'https://picsum.photos/seed/gallery6/600/600'
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.gallery-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header reveal">
          <span className="section-label">Visual Journey</span>
          <h2 className="section-title">Mars in <span>Focus</span></h2>
        </div>
        <div className="gallery-grid">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="gallery-item"
              style={{ backgroundImage: `url(${src})` }}
              onClick={() => setLightbox(src)}
            >
              <div className="gallery-overlay">
                <span>View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" />
          <button className="lightbox-close">&times;</button>
        </div>
      )}
    </section>
  )
}

export default Gallery