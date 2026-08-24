import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useNav } from '../context/NavigationContext';

export default function TeacherDashboard() {
  const { user, getAllStudents } = useAuth();
  const { getTeacherQuizzes, attempts } = useQuiz();
  const { navigateTo } = useNav();
  const myQuizzes = getTeacherQuizzes(user?.id);
  const students = getAllStudents();

  const stats = useMemo(() => {
    const published = myQuizzes.filter((q) => q.status === 'Published').length;
    const drafts = myQuizzes.filter((q) => q.status === 'Draft').length;
    const myQuizIds = new Set(myQuizzes.map((q) => q.id));
    const myAttempts = attempts.filter((a) => myQuizIds.has(a.quizId));
    const avgStudentScore = myAttempts.length > 0 ? Math.round(myAttempts.reduce((s, a) => s + a.percentage, 0) / myAttempts.length) : 0;
    return { totalQuizzes: myQuizzes.length, published, drafts, totalStudents: students.length, totalAttempts: myAttempts.length, avgStudentScore };
  }, [myQuizzes, attempts, students]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div><h1>Welcome, {user?.name?.split(' ')[0]}!</h1><p>Manage your quizzes and track student performance</p></div>
        <button className="btn btn-primary" onClick={() => navigateTo('t-create-quiz')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Create Quiz</button>
      </div>
      <div className="stats-grid">
        <div className="stat-card stat-blue"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg></div><div className="stat-info"><h3>{stats.totalQuizzes}</h3><p>Total Quizzes</p></div></div>
        <div className="stat-card stat-green"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><div className="stat-info"><h3>{stats.published}</h3><p>Published</p></div></div>
        <div className="stat-card stat-yellow"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></div><div className="stat-info"><h3>{stats.drafts}</h3><p>Drafts</p></div></div>
        <div className="stat-card stat-purple"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div><div className="stat-info"><h3>{stats.totalStudents}</h3><p>Total Students</p></div></div>
        <div className="stat-card stat-orange"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div><div className="stat-info"><h3>{stats.totalAttempts}</h3><p>Total Attempts</p></div></div>
        <div className="stat-card stat-red"><div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><div className="stat-info"><h3>{stats.avgStudentScore}%</h3><p>Avg Student Score</p></div></div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-section"><div className="section-header"><h2>Quick Actions</h2></div><div className="quick-actions">
          <span className="action-card" onClick={() => navigateTo('t-create-quiz')}><div className="action-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg></div><span>Create New Quiz</span></span>
          <span className="action-card" onClick={() => navigateTo('t-manage-quizzes')}><div className="action-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></div><span>Manage Quizzes</span></span>
          <span className="action-card" onClick={() => navigateTo('t-results')}><div className="action-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div><span>View Results</span></span>
        </div></div>
      </div>
    </div>
  );
}
