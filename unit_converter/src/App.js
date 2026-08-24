import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import Converter from './components/Converter';
import ConversionHistory from './components/ConversionHistory';
import Favorites from './components/Favorites';
import { useLocalStorage } from './hooks/useLocalStorage';
import { categories } from './utils/conversionConfig';

export default function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [activeCategory, setActiveCategory] = useState('length');
  const [history, setHistory] = useLocalStorage('history', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addHistory = useCallback((entry) => {
    setHistory(prev => {
      const newHistory = [entry, ...prev];
      return newHistory.slice(0, 10); // keep last 10
    });
  }, [setHistory]);

  const clearHistory = () => setHistory([]);

  // When a favorite is clicked, set category and maybe prefill units?
  const handleFavoriteSelect = (fav) => {
    // fav is like "km→mile" – we can parse but for simplicity set category
    // We'll just switch to the category that contains these units (not implemented perfectly)
    // For demo, we can switch to length, weight, etc.
    // Better: store category with favorite.
    // We'll just set active category to the first matching category.
    for (const [key, cat] of Object.entries(categories)) {
      if (fav.includes('→')) {
        const [from, to] = fav.split('→');
        if (cat.units[from] && cat.units[to]) {
          setActiveCategory(key);
          break;
        }
      }
    }
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container">
        <div className="hero">
          <h1>Convert Anything, Instantly</h1>
          <p>Quickly convert units across multiple categories with style.</p>
        </div>

        <CategoryGrid
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <Converter
          category={activeCategory}
          onAddHistory={addHistory}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginBottom: 40 }}>
          <ConversionHistory history={history} onClear={clearHistory} />
          <Favorites favorites={favorites} onSelect={handleFavoriteSelect} />
        </div>
      </main>
    </>
  );
}