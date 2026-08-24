export default function ProgressBar({ current, total, label }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-container">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="progress-text">{current}/{total}</span>
    </div>
  );
}
