import { useState } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import projects from '../data/projects';

const filters = ['all', 'java', 'python', 'web'];

function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gold">Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A showcase of my work across Java, Python, and Web Development.
          </p>
        </div>
        <div className="projects-filters" data-aos="fade-up" data-aos-delay="100">
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
        <div className="projects-grid" key={filter}>
          {filtered.map((proj, i) => (
            <div className="project-card enter-card" key={proj.title} style={{ animationDelay: `${i * 80}ms` }}>
              <img className="project-img" src={proj.img} alt={proj.title} loading="lazy" />
              <div className="project-body">
                {proj.featured && <span className="featured-badge">Featured</span>}
                <h4>{proj.title}</h4>
                <p>{proj.desc}</p>
                <div className="project-tech">
                  {proj.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href="#projects" onClick={(e) => e.preventDefault()}>
                    <FaGithub /> Code
                  </a>
                  <a href="#projects" onClick={(e) => e.preventDefault()}>
                    <FaEye /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
