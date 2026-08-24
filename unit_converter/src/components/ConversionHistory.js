import React from 'react';

export default function ConversionHistory({ history, onClear }) {
  if (history.length === 0) {
    return <p className="text-muted" style={{ color: 'var(--text-muted)' }}>No conversions yet.</p>;
  }
  return (
    <div className="history-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>History</h3>
        <button className="btn btn-ghost" onClick={onClear}>Clear</button>
      </div>
      {history.map((item, idx) => (
        <div key={idx} className="history-item">
          <span>{item.fromValue} {item.fromUnit} → {item.toValue} {item.toUnit}</span>
          <span className="detail">{item.category}</span>
        </div>
      ))}
    </div>
  );
}