import timeline from '../data/timeline';

function Timeline() {
  return (
    <section id="timeline" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Journey</span>
          <h2 className="section-title">
            My <span className="gold">Timeline</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A visual story of my learning, certifications, projects, and growth.
          </p>
        </div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-item" key={item.title} data-aos="fade-up" data-aos-delay={((i % 3) + 1) * 100}>
              <div className="tl-header">
                <h4>{item.title}</h4>
                <span className="tl-date">{item.date}</span>
              </div>
              <div className="tl-org">{item.org}</div>
              <div className="tl-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
