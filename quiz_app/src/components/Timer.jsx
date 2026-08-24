import { useState, useEffect } from 'react';
import { formatTime } from '../utils/quizUtils';

export default function Timer({ duration, onTimeUp, isPaused = false }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft, onTimeUp]);

  const percentage = (timeLeft / (duration * 60)) * 100;
  const isLow = timeLeft < 60;
  const isCritical = timeLeft < 30;

  return (
    <div className={`timer ${isLow ? 'timer-low' : ''} ${isCritical ? 'timer-critical' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <div className="timer-display">
        <span className="timer-time">{formatTime(timeLeft)}</span>
        <div className="timer-bar">
          <div className="timer-bar-fill" style={{ width: `${percentage}%`, backgroundColor: isCritical ? '#ef4444' : isLow ? '#f59e0b' : '#22c55e' }} />
        </div>
      </div>
    </div>
  );
}
