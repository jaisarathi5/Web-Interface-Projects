import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

const learningItems = ['React JS', 'Android Development', 'Data Structures', 'DBMS (MySQL)', 'Data Science with Python'];

function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper" data-aos="fade-right" data-aos-duration="800">
            <img src="profile.png" alt="Jai Sarathi V" loading="lazy" />
          </div>
          <div className="about-content" data-aos="fade-left" data-aos-duration="800">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              Building the Future, <span className="gold">One Line at a Time</span>
            </h2>
            <div className="about-text">
              <p>
                I'm Jai Sarathi V, a passionate Artificial Intelligence enthusiast with expertise in Java, Python,
                Android, and web technologies. I thrive on solving complex problems and building elegant, user-centric
                applications that make a difference.
              </p>
            </div>
            <div className="about-objective">
              <p>
                "To leverage my technical expertise and creative problem-solving skills to build innovative software
                solutions that drive meaningful impact."
              </p>
            </div>
            <div className="about-cards">
              <div className="about-edu-item">
                <FaUniversity />
                <div className="edu-info">
                  <h4>B.Tech. AI &amp; Data Science</h4>
                  <p>Dr. K. Vasudevan College of Engg and Tech</p>
                </div>
              </div>
              <div className="about-edu-item">
                <FaGraduationCap />
                <div className="edu-info">
                  <h4>BS Data Science &amp; Apps</h4>
                  <p>IIT Madras</p>
                </div>
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Currently Learning
              </span>
              <div className="about-learning">
                {learningItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
