export default function ResultCard({ attempt, quiz, showDetails = false }) {
  const passed = attempt.passed;

  return (
    <div className={`result-card ${passed ? 'passed' : 'failed'}`}>
      <div className="result-card-header">
        <h3>{quiz?.title || 'Quiz'}</h3>
        <span className={`result-badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
          {passed ? 'Passed' : 'Failed'}
        </span>
      </div>
      <div className="result-card-body">
        <div className="result-score">
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="score-ring">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={passed ? '#22c55e' : '#ef4444'} strokeWidth="3" strokeDasharray={`${attempt.percentage}, 100`} />
            </svg>
            <span className="score-text">{attempt.percentage}%</span>
          </div>
        </div>
        <div className="result-details">
          <div className="detail-row">
            <span>Score</span>
            <strong>{attempt.score} / {attempt.totalMarks}</strong>
          </div>
          <div className="detail-row">
            <span>Percentage</span>
            <strong>{attempt.percentage}%</strong>
          </div>
          <div className="detail-row">
            <span>Time Taken</span>
            <strong>{Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s</strong>
          </div>
          <div className="detail-row">
            <span>Date</span>
            <strong>{new Date(attempt.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
