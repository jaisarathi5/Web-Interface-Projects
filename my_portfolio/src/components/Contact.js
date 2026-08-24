import { useState } from 'react';
import {
  FaPaperPlane,
  FaSpinner,
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from 'react-icons/fa';

function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 2500);
    }, 1800);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Connect</span>
          <h2 className="section-title">
            Let's <span className="gold">Work Together</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a project in mind? Reach out — I'd love to collaborate.
          </p>
        </div>
        <div className="contact-grid">
          <div data-aos="fade-right" data-aos-duration="800">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can I help?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell me about your project..." required></textarea>
              </div>
              <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                {status === 'idle' && (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <FaSpinner className="spin" /> Sending...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <FaCheck /> Sent!
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="contact-info" data-aos="fade-left" data-aos-duration="800">
            <div className="ci-item">
              <FaEnvelope />
              <div className="ci-text">
                <h4>Email</h4>
                <p>jai.sarathi@example.com</p>
              </div>
            </div>
            <div className="ci-item">
              <FaGithub />
              <div className="ci-text">
                <h4>GitHub</h4>
                <p>github.com/jaisarathi</p>
              </div>
            </div>
            <div className="ci-item">
              <FaLinkedinIn />
              <div className="ci-text">
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/jaisarathi</p>
              </div>
            </div>
            <div className="ci-item">
              <FaMapMarkerAlt />
              <div className="ci-text">
                <h4>Location</h4>
                <p>Chennai, India</p>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://github.com/jaisarathi5" aria-label="GitHub" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/jai-sarathi-v-546a38385/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a href="mailto:jaisarathi.adgms@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border-glass)',
                height: 180,
                background: 'var(--bg-glass)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88559477993!2d80.1778600295932!3d13.047368591842073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d799!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1740000000000"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Chennai map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
