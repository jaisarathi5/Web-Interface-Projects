import { useEffect, useRef, useState } from 'react';
import { FaCoffee, FaPython, FaGlobe, FaCertificate, FaCode, FaClock } from 'react-icons/fa';
import stats from '../data/stats';

const iconMap = {
  coffee: FaCoffee,
  python: FaPython,
  globe: FaGlobe,
  certificate: FaCertificate,
  code: FaCode,
  clock: FaClock,
};

function Counter({ target }) {
  const [value, setValue] = useState(0);
  const elRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const update = (time) => {
              const progress = Math.min((time - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * target;
              setValue(target % 1 === 0 ? Math.floor(current) : current.toFixed(1));
              if (progress < 1) requestAnimationFrame(update);
              else setValue(target % 1 === 0 ? target : target.toFixed(1));
            };
            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-number" ref={elRef}>
      {value}
    </div>
  );
}

function Statistics() {
  return (
    <section id="statistics" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Milestones</span>
          <h2 className="section-title">
            Achievements <span className="gold">by the Numbers</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A snapshot of my journey and accomplishments.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || FaCode;
            return (
              <div className="stat-card" key={stat.label} data-aos="zoom-in" data-aos-delay={100 + i * 50}>
                <div className="stat-icon">
                  <Icon />
                </div>
                <Counter target={stat.count} />
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
