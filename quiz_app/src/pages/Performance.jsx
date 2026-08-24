import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Performance() {
  const { user } = useAuth();
  const { getUserAttempts, quizzes } = useQuiz();
  const myAttempts = getUserAttempts(user?.id);

  const stats = useMemo(() => {
    if (myAttempts.length === 0) return { avgScore: 0, bestScore: 0, worstScore: 0, totalAttempted: 0, totalPassed: 0, totalFailed: 0 };
    const scores = myAttempts.map((a) => a.percentage);
    return {
      avgScore: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length),
      bestScore: Math.max(...scores), worstScore: Math.min(...scores),
      totalAttempted: myAttempts.length, totalPassed: myAttempts.filter((a) => a.passed).length, totalFailed: myAttempts.filter((a) => !a.passed).length,
    };
  }, [myAttempts]);

  const scoreHistoryData = useMemo(() => {
    return [...myAttempts].sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)).map((a, i) => {
      const quiz = quizzes.find((q) => q.id === a.quizId);
      return { name: `Quiz ${i + 1}`, quizTitle: quiz?.title || 'Quiz', score: a.percentage };
    });
  }, [myAttempts, quizzes]);

  const categoryData = useMemo(() => {
    const catMap = {};
    myAttempts.forEach((a) => {
      const quiz = quizzes.find((q) => q.id === a.quizId);
      if (quiz) {
        if (!catMap[quiz.category]) catMap[quiz.category] = { scores: [], count: 0 };
        catMap[quiz.category].scores.push(a.percentage);
        catMap[quiz.category].count++;
      }
    });
    return Object.entries(catMap).map(([category, data]) => ({
      category, avgScore: Math.round(data.scores.reduce((s, v) => s + v, 0) / data.scores.length), attempts: data.count,
    }));
  }, [myAttempts, quizzes]);

  const completionData = useMemo(() => {
    return [{ name: 'Passed', value: stats.totalPassed }, { name: 'Failed', value: stats.totalFailed }].filter((d) => d.value > 0);
  }, [stats]);

  return (
    <div className="page-container">
      <div className="page-header"><h1>Performance Overview</h1><p>Track your progress and improvement over time</p></div>
      <div className="stats-grid">
        <div className="stat-card stat-blue"><div className="stat-info"><h3>{stats.totalAttempted}</h3><p>Quizzes Attempted</p></div></div>
        <div className="stat-card stat-green"><div className="stat-info"><h3>{stats.avgScore}%</h3><p>Average Score</p></div></div>
        <div className="stat-card stat-purple"><div className="stat-info"><h3>{stats.bestScore}%</h3><p>Highest Score</p></div></div>
        <div className="stat-card stat-orange"><div className="stat-info"><h3>{stats.totalPassed}/{stats.totalAttempted}</h3><p>Quizzes Passed</p></div></div>
      </div>
      {myAttempts.length === 0 ? (
        <div className="empty-state"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg><h3>No performance data yet</h3><p>Complete some quizzes to see your performance charts</p></div>
      ) : (
        <div className="charts-grid">
          <div className="chart-card"><h3>Score History</h3><ResponsiveContainer width="100%" height={300}><LineChart data={scoreHistoryData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis domain={[0, 100]} /><Tooltip formatter={(value) => [`${value}%`, 'Score']} labelFormatter={(label, payload) => { if (payload && payload[0]) return payload[0].payload.quizTitle; return label; }} /><Legend /><Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
          <div className="chart-card"><h3>Category-wise Performance</h3><ResponsiveContainer width="100%" height={300}><BarChart data={categoryData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="category" /><YAxis domain={[0, 100]} /><Tooltip formatter={(value) => [`${value}%`, 'Avg Score']} /><Legend /><Bar dataKey="avgScore" fill="#6366f1" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
          {completionData.length > 0 && (<div className="chart-card"><h3>Pass/Fail Distribution</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={completionData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{completionData.map((entry) => (<Cell key={entry.name} fill={entry.name === 'Passed' ? '#22c55e' : '#ef4444'} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>)}
        </div>
      )}
    </div>
  );
}
