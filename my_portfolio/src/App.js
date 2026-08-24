import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Loader from './components/Loader.js';
import Cursor from './components/Cursor.js';
import ScrollProgress from './components/ScrollProgress.js';
import BackToTop from './components/BackToTop.js';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import About from './components/About.js';
import Skills from './components/Skills.js';
import Certifications from './components/Certifications.js';
import Projects from './components/Projects.js';
import Timeline from './components/Timeline.js';
import Statistics from './components/Statistics.js';
import Tools from './components/Tools.js';
import Resume from './components/Resume.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Loader hidden={!loading} />
      <Cursor />
      <ScrollProgress />
      <BackToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Timeline />
        <Statistics />
        <Tools />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
