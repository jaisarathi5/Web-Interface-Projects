import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <FaArrowUp />
    </button>
  );
}

export default BackToTop;
