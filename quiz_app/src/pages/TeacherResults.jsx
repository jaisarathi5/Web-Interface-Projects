import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { formatDate, formatTime } from '../utils/quizUtils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function TeacherResults() {
  const { user, getAllStudents } = useAuth();
  const { getTeacherQuizzes, attempts, quizzes } = useQuiz();
  const myQuizzes = getTeacherQuizzes(user?.id);
  const students = getAllStudents();
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const publishedQuizzes = myQuizzes.filter((q) => q.status === 'Published');

  const filteredAttempts = useMemo(() => {
    if (!selectedQuiz) return [];
    return attempts.filter((a) => a.quizId === selectedQuiz).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }, [attempts, selectedQuiz]);

  const quizStats = useMemo(() => {
    if (filteredAttempts.length === 0) return null;
    const scores = filteredAttempts.map((a) => a.percentage);
    return { avgScore: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length), highestScore: Math.max(...scores), lowestScore: Math.min(...scores), passPercentage: Math.round((filteredAttempts.filter((a) => a.passed).length / filteredAttempts.length) * 100), totalAttempts: filteredAttempts.length };
  }, [filteredAttempts]);

  const chartData = useMemo(() => {
    if (filteredAttempts.length === 0) return [];
    return filteredAttempts.map((a) => { const student = students.find((s) => s.id === a.userId); return { name: student?.name?.split(' ')[0] || 'Student', score: a.percentage }; });
  }, [filteredAttempts, students]);

  const passFailData = useMemo(() => {
    if (!quizStats) return [];
    const passed = filteredAttempts.filter((a) => a.passed).length;
    const failed = filteredAttempts.length - passed;
    return [{ name: 'Passed', value: passed }, { name: 'Failed', value: failed }].filter((d) => d.value > 0);
  }, [filteredAttempts, quizStats]);

  return (
    <div className="page-container">
      <div className="page-header"><h1>Student Results</h1><p>View student performance and quiz statistics</p></div>
      <div className="filters-bar"><select value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)} className="quiz-select"><option value="">Select a Quiz</option>{publishedQuizzes.map((quiz) => (<option key={quiz.id} value={quiz.id}>{quiz.title} ({quiz.category})</option>))}</select></div>
      {!selectedQuiz ? (
        <div className="empty-state"><h3>Select a quiz to view results</h3><p>Choose a quiz from the dropdown above</p></div>
      ) : filteredAttempts.length === 0 ? (
        <div className="empty-state"><h3>No attempts yet</h3><p>No students have taken this quiz yet</p></div>
      ) : (<>
        {quizStats && (<div className="stats-grid">
          <div className="stat-card stat-blue"><div className="stat-info"><h3>{quizStats.totalAttempts}</h3><p>Total Attempts</p></div></div>
          <div className="stat-card stat-green"><div className="stat-info"><h3>{quizStats.avgScore}%</h3><p>Average Score</p></div></div>
          <div className="stat-card stat-purple"><div className="stat-info"><h3>{quizStats.highestScore}%</h3><p>Highest Score</p></div></div>
          <div className="stat-card stat-orange"><div className="stat-info"><h3>{quizStats.lowestScore}%</h3><p>Lowest Score</p></div></div>
          <div className="stat-card stat-red"><div className="stat-info"><h3>{quizStats.passPercentage}%</h3><p>Pass Rate</p></div></div>
        </div>)}
        <div className="charts-grid">
          <div className="chart-card"><h3>Student Scores</h3><ResponsiveContainer width="100%" height={300}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis domain={[0, 100]} /><Tooltip formatter={(value) => [`${value}%`, 'Score']} /><Legend /><Bar dataKey="score" fill="#ffa116" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
          {passFailData.length > 0 && (<div className="chart-card"><h3>Pass/Fail Distribution</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={passFailData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{passFailData.map((entry) => (<Cell key={entry.name} fill={entry.name === 'Passed' ? '#2ec27e' : '#ef47b2'} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>)}
        </div>
        <div className="table-container"><table className="data-table"><thead><tr><th>Student</th><th>Score</th><th>Percentage</th><th>Result</th><th>Time Taken</th><th>Date</th></tr></thead><tbody>
          {filteredAttempts.map((attempt) => { const student = students.find((s) => s.id === attempt.userId); return (
            <tr key={attempt.id}><td><div className="student-info"><div className="avatar-sm">{student?.name?.charAt(0).toUpperCase()}</div><div><strong>{student?.name || 'Unknown'}</strong><span>{student?.email}</span></div></div></td><td>{attempt.score}/{attempt.totalMarks}</td><td>{attempt.percentage}%</td><td><span className={`result-badge ${attempt.passed ? 'badge-pass' : 'badge-fail'}`}>{attempt.passed ? 'Passed' : 'Failed'}</span></td><td>{formatTime(attempt.timeTaken)}</td><td>{formatDate(attempt.submittedAt)}</td></tr>
          );})}
        </tbody></table></div>
      </>)}
    </div>
  );
}
