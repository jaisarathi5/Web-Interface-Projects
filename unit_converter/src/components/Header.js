import React from 'react';
import { Ruler } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-icon"><Ruler size={28} /></span>
          Convertly
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}