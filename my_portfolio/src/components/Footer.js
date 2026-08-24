import { FaGithub, FaLinkedinIn, FaEnvelope, FaHeart } from 'react-icons/fa';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            Jai<span>Sarathi</span>
          </div>
          <div className="footer-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="footer-social">
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
        </div>
        <div className="footer-bottom">
          &copy; 2026 <span className="gold">Jai Sarathi V</span> — Built with{' '}
          <FaHeart style={{ color: 'var(--gold)', display: 'inline-block' }} /> using React.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
