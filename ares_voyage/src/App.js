import React, { useEffect, useState } from 'react'
import './App.css'

// Components
import Loader from './components/Loader.js'
import Cursor from './components/Cursor.js'
import ScrollProgress from './components/ScrollProgress.js'
import Navbar from './components/Navbar.js'
import Hero from './components/Hero.js'
import About from './components/About.js'
import Features from './components/Features.js'
import Timeline from './components/Timeline.js'
import Experience from './components/Experience.js'
import Gallery from './components/Gallery.js'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials.js'
import FAQ from './components/FAQ.js'
import CTA from './components/CTA.js'
import Footer from './components/Footer.js'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Timeline />
      <Experience />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}

export default App