import React, { useState, useEffect } from 'react'
import '../styles/navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <div className="logo">
          <span>Ares</span> Voyage
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about">About</a>
          <a href="#features">Why Mars</a>
          <a href="#timeline">Journey</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Packages</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar