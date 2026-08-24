import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../utils/conversionConfig';

export default function CategoryGrid({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-grid">
      {Object.entries(categories).map(([key, cat]) => (
        <CategoryCard
          key={key}
          category={key}
          icon={cat.icon}       // now it's a component
          label={cat.label}
          isActive={activeCategory === key}
          onClick={() => onSelectCategory(key)}
        />
      ))}
    </div>
  );
}