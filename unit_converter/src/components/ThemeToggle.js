import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="btn btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}