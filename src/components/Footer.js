import React from 'react'
import '../styles/footer.css'
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id="contact">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="logo">Ares Voyage</div>
          <p>Luxury beyond Earth.</p>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#features">Why Mars</a>
          <a href="#timeline">Journey</a>
          <a href="#pricing">Packages</a>
        </div>
        <div className="footer-newsletter">
          <h4>Stay updated</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-social">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>&copy; 2026 Ares Voyage. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer