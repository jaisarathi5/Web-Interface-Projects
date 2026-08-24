import { useEffect, useRef } from 'react';

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    };

    const enter = () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(212,175,55,0.5)';
      ring.style.boxShadow = '0 0 40px rgba(212,175,55,0.1)';
      dot.style.width = '12px';
      dot.style.height = '12px';
    };

    const leave = () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(212,175,55,0.25)';
      ring.style.boxShadow = '0 0 30px rgba(212,175,55,0.05)';
      dot.style.width = '8px';
      dot.style.height = '8px';
    };

    document.addEventListener('mousemove', onMove);
    const targets = document.querySelectorAll(
      'a, button, .project-card, .cert-card, .skill-category, .glass-card, .about-edu-item, .ci-item, .stat-card'
    );
    targets.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    animateRing();

    return () => {
      document.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}

export default Cursor;
