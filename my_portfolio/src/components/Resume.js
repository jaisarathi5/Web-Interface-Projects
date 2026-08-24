import { FaDownload, FaEye } from 'react-icons/fa';

function Resume() {
  return (
    <section id="resume" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Resume</span>
          <h2 className="section-title">
            My <span className="gold">Resume</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Preview and download my professional resume.
          </p>
        </div>
        <div className="resume-wrapper" data-aos="fade-up" data-aos-delay="100">
          <div className="resume-preview">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=700&h=900&fit=crop&auto=format"
              alt="Resume Preview"
              loading="lazy"
            />
          </div>
          <div className="resume-buttons">
            <a
              href="#resume"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                alert('Resume download would start here. (PDF placeholder)');
              }}
            >
              <FaDownload /> Download Resume
            </a>
            <a href="#resume" className="btn btn-secondary" onClick={(e) => e.preventDefault()}>
              <FaEye /> View Full Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
