import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Typed from 'typed.js';
import { FaFilePdf, FaCode, FaPaperPlane, FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const heroTitles = [
  'Software Developer',
  'Java Developer',
  'Frontend Developer',
  'Android Developer',
  'Python Programmer',
  'Data Science Enthusiast',
  'AI & ML Explorer',
];

function Hero() {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = 0.6 + Math.random() * 0.4;
      colors[i * 3] = (212 / 255) * c;
      colors[i * 3 + 1] = (175 / 255) * c;
      colors[i * 3 + 2] = (55 / 255) * c;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const geo2 = new THREE.BufferGeometry();
    const pos2 = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos2[i * 3] = (Math.random() - 0.5) * 22;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.09,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const particles2 = new THREE.Points(geo2, mat2);
    scene.add(particles2);

    camera.position.z = 7;

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', onMouse);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0004;
      particles2.rotation.x -= 0.00015;
      particles2.rotation.y += 0.0003;
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.015;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.015;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      geo2.dispose();
      mat2.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: heroTitles,
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const wrap = imgWrapRef.current;
    if (!wrap) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      wrap.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero">
      <div id="hero-canvas" ref={canvasRef}></div>
      <div className="floating-shapes">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="container hero-content">
        <div className="hero-text" data-aos="fade-right" data-aos-duration="1000">
          <div className="hero-greeting">Hello, I'm</div>
          <h1 className="hero-name">
            Jai Sarathi <span className="gold">V</span>
          </h1>
          <div className="hero-titles">
            <span ref={typedRef}></span>
          </div>
          <p className="hero-description">
            I enjoy building modern software solutions with Java, Python, Android, and Web technologies while continuously learning new technologies.
          </p>
          <div className="hero-buttons">
            <a href="#resume" className="btn btn-primary">
              <FaFilePdf /> Download Resume
            </a>
            <a href="#projects" className="btn btn-secondary">
              <FaCode /> View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              <FaPaperPlane /> Contact Me
            </a>
          </div>
          <div className="hero-social">
            <a href="https://github.com/jaisarathi5" aria-label="GitHub" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/jai-sarathi-v-546a38385/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a href="mailto:jaisarathi.adgms@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll</span>
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          <div className="hero-image-wrapper" ref={imgWrapRef}>
            <div className="hero-image-glow"></div>
            <div className="hero-image-ring"></div>
            <div className="hero-image-ring2"></div>
            <img src="profile.png" alt="Jai Sarathi V" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
