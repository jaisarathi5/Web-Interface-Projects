// src/components/CategoryCard.js
import React from 'react';

export default function CategoryCard({ category, icon: IconComponent, label, isActive, onClick }) {
  return (
    <div
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="icon">
        <IconComponent 
          size={20}                       // ← reduced from 28
          strokeWidth={1.5} 
          color="var(--text-secondary)" 
        />
      </div>
      <div className="label">{label}</div>
    </div>
  );
}