import React, { useEffect, useRef } from 'react'

const Cursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const onMouseEnter = (e) => {
      if (e.target.closest('a, button, .btn, .card, .gallery-item')) {
        cursor.classList.add('hover')
      }
    }

    const onMouseLeave = (e) => {
      if (e.target.closest('a, button, .btn, .card, .gallery-item')) {
        cursor.classList.remove('hover')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseEnter)
    document.addEventListener('mouseout', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseEnter)
      document.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  return (
    <div id="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot"></div>
    </div>
  )
}

export default Cursor