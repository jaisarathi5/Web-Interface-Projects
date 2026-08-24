import React from 'react';

export default function Favorites({ favorites, onSelect }) {
  if (favorites.length === 0) {
    return <p className="text-muted" style={{ color: 'var(--text-muted)' }}>No favorites yet.</p>;
  }
  return (
    <div className="favorites-section">
      <h3>⭐ Favorites</h3>
      {favorites.map((fav, idx) => (
        <span key={idx} className="favorite-chip" onClick={() => onSelect(fav)}>
          {fav}
        </span>
      ))}
    </div>
  );
}