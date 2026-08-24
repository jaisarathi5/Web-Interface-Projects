import { useEffect, useRef } from 'react';
import { FaGitAlt, FaGithub, FaFigma, FaDatabase } from 'react-icons/fa';
import { BiCodeBlock } from 'react-icons/bi';
import tools from '../data/tools';

const iconMap = {
  vscode: BiCodeBlock,
  git: FaGitAlt,
  github: FaGithub,
  figma: FaFigma,
  database: FaDatabase,
};

function Tools() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemNodes = container.querySelectorAll('.orbit-item');
    if (itemNodes.length === 0) return;

    const compute = () => ({
      radius: Math.min(container.offsetWidth * 0.38, 170),
      cx: container.offsetWidth / 2,
      cy: container.offsetHeight / 2,
    });

    let { radius, cx, cy } = compute();
    let orbitAngle = 0;
    let rafId;

    const baseAngles = tools.map((_, i) => (i / tools.length) * Math.PI * 2);

    const animateOrbit = () => {
      orbitAngle += 0.005;
      itemNodes.forEach((el, i) => {
        const a = baseAngles[i] + orbitAngle;
        const x = cx + radius * Math.cos(a) - 28;
        const y = cy + radius * Math.sin(a) - 28;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        const scale = 1 + 0.05 * Math.sin(a * 2 + i);
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });
      rafId = requestAnimationFrame(animateOrbit);
    };
    animateOrbit();

    const onResize = () => {
      const next = compute();
      radius = next.radius;
      cx = next.cx;
      cy = next.cy;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="tools" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center' }} data-aos="fade-up">
          <span className="section-tag">Toolbox</span>
          <h2 className="section-title">
            My <span className="gold">Tools</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The tools I use daily to build amazing software.
          </p>
        </div>
        <div className="orbit-container" id="orbitContainer" ref={containerRef}>
          <div className="orbit-ring r1"></div>
          <div className="orbit-ring r2"></div>
          <div className="orbit-ring r3"></div>
          <div className="orbit-center">Tools</div>
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] || FaGitAlt;
            return (
              <div className="orbit-item" title={tool.label} key={tool.label}>
                <Icon />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tools;
