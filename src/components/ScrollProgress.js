import React, { useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      if (barRef.current) {
        barRef.current.style.width = progress + '%'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div id="scroll-progress" ref={barRef}></div>
}

export default ScrollProgress