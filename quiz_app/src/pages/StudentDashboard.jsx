import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useNav } from '../context/NavigationContext';
import { formatDate } from '../utils/quizUtils';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { getPublishedQuizzes, getUserAttempts, quizzes } = useQuiz();
  const { navigateTo } = useNav();
  const publishedQuizzes = getPublishedQuizzes();
  const myAttempts = getUserAttempts(user?.id);

  const stats = useMemo(() => {
    const completed = myAttempts.length;
    const avgScore = completed > 0 ? Math.round(myAttempts.reduce((sum, a) => sum + a.percentage, 0) / completed) : 0;
    const bestScore = completed > 0 ? Math.max(...myAttempts.map((a) => a.percentage)) : 0;
    const completedQuizIds = new Set(myAttempts.map((a) => a.quizId));
    const available = publishedQuizzes.filter((q) => !completedQuizIds.has(q.id)).length;
    return { completed, avgScore, bestScore, available };
  }, [myAttempts, publishedQuizzes]);

  const recentAttempts = [...myAttempts].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div><h1>Welcome back, {user?.name?.split(' ')[0]}!</h1><p>Here's your learning overview</p></div>
      </div>
      <div className="stats-grid">
        <span className="stat-card stat-blue" onClick={() => navigateTo('s-quizzes')}><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg></div><div className="stat-info"><h3>{stats.available}</h3><p>Available Quizzes</p></div></span>
        <span className="stat-card stat-green" onClick={() => navigateTo('s-results')}><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><div className="stat-info"><h3>{stats.completed}</h3><p>Completed Quizzes</p></div></span>
        <span className="stat-card stat-purple" onClick={() => navigateTo('s-performance')}><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg></div><div className="stat-info"><h3>{stats.avgScore}%</h3><p>Average Score</p></div></span>
        <div className="stat-card stat-orange"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><div className="stat-info"><h3>{stats.bestScore}%</h3><p>Best Score</p></div></div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header"><h2>Recent Attempts</h2><span className="see-all" onClick={() => navigateTo('s-results')}>View All</span></div>
          {recentAttempts.length === 0 ? (
            <div className="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg><p>No attempts yet. Start a quiz!</p><button className="btn btn-primary" onClick={() => navigateTo('s-quizzes')}>Browse Quizzes</button></div>
          ) : (
            <div className="table-container"><table className="data-table"><thead><tr><th>Quiz</th><th>Score</th><th>Result</th><th>Date</th></tr></thead><tbody>
              {recentAttempts.map((attempt) => { const quiz = quizzes.find((q) => q.id === attempt.quizId); return (
                <tr key={attempt.id}><td>{quiz?.title || 'Unknown'}</td><td>{attempt.score}/{attempt.totalMarks} ({attempt.percentage}%)</td><td><span className={`result-badge ${attempt.passed ? 'badge-pass' : 'badge-fail'}`}>{attempt.passed ? 'Passed' : 'Failed'}</span></td><td>{formatDate(attempt.submittedAt)}</td></tr>
              );})}
            </tbody></table></div>
          )}
        </div>
        <div className="dashboard-section">
          <div className="section-header"><h2>Quick Actions</h2></div>
          <div className="quick-actions">
            <span className="action-card" onClick={() => navigateTo('s-quizzes')}><div className="action-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></div><span>Browse Quizzes</span></span>
            <span className="action-card" onClick={() => navigateTo('s-performance')}><div className="action-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div><span>My Performance</span></span>
            <span className="action-card" onClick={() => navigateTo('s-profile')}><div className="action-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div><span>My Profile</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
