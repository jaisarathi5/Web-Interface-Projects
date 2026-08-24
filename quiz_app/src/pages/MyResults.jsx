import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useNav } from '../context/NavigationContext';
import { formatDate, formatTime } from '../utils/quizUtils';

export default function MyResults() {
  const { user } = useAuth();
  const { getUserAttempts, quizzes } = useQuiz();
  const { navigateTo } = useNav();
  const myAttempts = [...getUserAttempts(user?.id)].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div className="page-container">
      <div className="page-header"><h1>My Results</h1><p>View all your quiz attempts and results</p></div>
      {myAttempts.length === 0 ? (
        <div className="empty-state"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg><h3>No results yet</h3><p>Take a quiz to see your results here</p><button className="btn btn-primary" onClick={() => navigateTo('s-quizzes')}>Browse Quizzes</button></div>
      ) : (
        <div className="table-container"><table className="data-table"><thead><tr><th>Quiz</th><th>Category</th><th>Score</th><th>Percentage</th><th>Result</th><th>Time</th><th>Date</th><th>Action</th></tr></thead><tbody>
          {myAttempts.map((attempt) => { const quiz = quizzes.find((q) => q.id === attempt.quizId); return (
            <tr key={attempt.id}><td><strong>{quiz?.title || 'Unknown'}</strong></td><td><span className="category-badge">{quiz?.category}</span></td><td>{attempt.score}/{attempt.totalMarks}</td><td>{attempt.percentage}%</td><td><span className={`result-badge ${attempt.passed ? 'badge-pass' : 'badge-fail'}`}>{attempt.passed ? 'Passed' : 'Failed'}</span></td><td>{formatTime(attempt.timeTaken)}</td><td>{formatDate(attempt.submittedAt)}</td><td><button className="btn btn-sm btn-primary" onClick={() => navigateTo('s-quiz-result', { attemptId: attempt.id })}>Review</button></td></tr>
          );})}
        </tbody></table></div>
      )}
    </div>
  );
}
