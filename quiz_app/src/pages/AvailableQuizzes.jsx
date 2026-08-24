import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useNav } from '../context/NavigationContext';
import QuizCard from '../components/QuizCard';
import { CATEGORIES, DIFFICULTIES } from '../utils/quizUtils';

export default function AvailableQuizzes() {
  const { user } = useAuth();
  const { getPublishedQuizzes, getUserAttempts } = useQuiz();
  const { navigateTo } = useNav();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const publishedQuizzes = getPublishedQuizzes();
  const myAttempts = getUserAttempts(user?.id);
  const completedQuizIds = new Set(myAttempts.map((a) => a.quizId));

  const filteredQuizzes = useMemo(() => {
    return publishedQuizzes.filter((quiz) => {
      const matchSearch = !search || quiz.title.toLowerCase().includes(search.toLowerCase()) || quiz.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || quiz.category === category;
      const matchDifficulty = !difficulty || quiz.difficulty === difficulty;
      let matchStatus = true;
      if (statusFilter === 'completed') matchStatus = completedQuizIds.has(quiz.id);
      else if (statusFilter === 'not-completed') matchStatus = !completedQuizIds.has(quiz.id);
      return matchSearch && matchCategory && matchDifficulty && matchStatus;
    });
  }, [publishedQuizzes, search, category, difficulty, statusFilter, completedQuizIds]);

  const handleStartQuiz = (quiz) => navigateTo('s-take-quiz', { quizId: quiz.id });

  return (
    <div className="page-container">
      <div className="page-header"><h1>Available Quizzes</h1><p>Browse and take quizzes to test your knowledge</p></div>
      <div className="filters-bar">
        <div className="search-box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><input type="text" placeholder="Search quizzes..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All Categories</option>{CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}</select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option value="">All Difficulties</option>{DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">All Status</option><option value="completed">Completed</option><option value="not-completed">Not Completed</option></select>
      </div>
      {filteredQuizzes.length === 0 ? (
        <div className="empty-state"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><h3>No quizzes found</h3><p>Try adjusting your filters</p></div>
      ) : (
        <div className="quiz-grid">{filteredQuizzes.map((quiz) => (<QuizCard key={quiz.id} quiz={quiz} isCompleted={completedQuizIds.has(quiz.id)} onStart={handleStartQuiz} />))}</div>
      )}
    </div>
  );
}
