import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import certifications from '../data/certifications';

const filters = ['all', 'java', 'python', 'web', 'other'];

function Certifications() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? certifications : certifications.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Credentials</span>
          <h2 className="section-title">
            Certifications &amp; <span className="gold">Awards</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Professional certifications that validate my expertise and commitment to learning.
          </p>
        </div>
        <div className="certs-controls" data-aos="fade-up" data-aos-delay="100">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="certs-grid" key={filter}>
          {filtered.map((cert, i) => (
            <div className="cert-card enter-card" key={cert.title} style={{ animationDelay: `${i * 60}ms` }}>
              <img className="cert-img" src={cert.img} alt={cert.title} loading="lazy" />
              <div className="cert-body">
                <h4>{cert.title}</h4>
                <div className="cert-org">{cert.org}</div>
                <div className="cert-date">Issued: {cert.date}</div>
                <button className="cert-btn">
                  <FaExternalLinkAlt /> Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
