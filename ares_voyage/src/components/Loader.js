import React from 'react'
import '../styles/global.css' // Loader styles are in global (inline)

const Loader = () => {
  return (
    <div id="loader">
      <div className="rocket-loader">
        <svg viewBox="0 0 100 100">
          <ellipse cx="50" cy="82" rx="10" ry="6" fill="#B85C38" opacity="0.4" className="flame" />
          <ellipse cx="50" cy="76" rx="8" ry="14" fill="#D67A45" opacity="0.6" className="flame" />
          <ellipse cx="50" cy="70" rx="6" ry="12" fill="#E6B85C" opacity="0.8" className="flame" />
          <path d="M30 60 L35 20 L50 10 L65 20 L70 60 L50 70 Z" fill="none" stroke="#B85C38" strokeWidth="2" />
          <path d="M35 20 L38 35 L50 42 L62 35 L65 20" fill="none" stroke="#D67A45" strokeWidth="1.5" />
          <circle cx="50" cy="30" r="4" fill="#B85C38" opacity="0.3" />
          <rect x="45" y="50" width="10" height="12" rx="2" fill="none" stroke="#B85C38" strokeWidth="1.5" />
          <line x1="35" y1="55" x2="30" y2="60" stroke="#B85C38" strokeWidth="1.5" />
          <line x1="65" y1="55" x2="70" y2="60" stroke="#B85C38" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="loader-text">Ares Voyage</div>
      <div className="loader-bar"></div>
    </div>
  )
}

export default Loader