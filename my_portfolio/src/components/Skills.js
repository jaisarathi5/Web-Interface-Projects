import { useEffect, useRef, useState } from 'react';
import { FaCode, FaDatabase, FaGlobe } from 'react-icons/fa';
import skillCategories from '../data/skills';

const iconMap = {
  code: FaCode,
  database: FaDatabase,
  globe: FaGlobe,
};

function Skills() {
  const [inView, setInView] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const fills = gridRef.current?.querySelectorAll('.fill');
    fills?.forEach((f, i) => {
      const w = f.dataset.width;
      setTimeout(() => {
        f.style.width = w + '%';
      }, 200 + i * 60);
    });
  }, [inView]);

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">
            My <span className="gold">Skills</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A comprehensive toolkit spanning languages, databases, tools, and current learning.
          </p>
        </div>
        <div className="skills-grid" ref={gridRef}>
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || FaCode;
            return (
              <div className="skill-category" key={cat.title} data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                <div className="skill-category-header">
                  <Icon />
                  <h3>{cat.title}</h3>
                </div>
                <div className="skill-items">
                  {cat.skills.map((s) => (
                    <div className="skill-item" key={s.name}>
                      <div className="skill-info">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="fill" data-width={s.level}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
