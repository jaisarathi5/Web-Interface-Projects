import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { useNav } from '../context/NavigationContext';
import QuestionCard from '../components/QuestionCard';

export default function QuizResult() {
  const { params, navigateTo } = useNav();
  const { quizzes, attempts } = useQuiz();
  const { user } = useAuth();
  const attempt = attempts.find((a) => a.id === params.attemptId);
  const quiz = attempt ? quizzes.find((q) => q.id === attempt.quizId) : null;

  if (!attempt || !quiz) return (<div className="empty-state"><h3>Result not found</h3><button className="btn btn-primary" onClick={() => navigateTo('s-results')}>View My Results</button></div>);

  const timeMinutes = Math.floor(attempt.timeTaken / 60);
  const timeSeconds = attempt.timeTaken % 60;
  const correctAnswers = quiz.questions.filter((q) => { const answer = attempt.answers[q.id]; return answer !== undefined && answer === q.correctAnswer; }).length;
  const incorrectAnswers = quiz.questions.filter((q) => { const answer = attempt.answers[q.id]; return answer !== undefined && answer !== q.correctAnswer; }).length;
  const unanswered = quiz.questions.filter((q) => attempt.answers[q.id] === undefined).length;

  return (
    <div className="page-container result-page">
      <div className="result-header-card">
        <div className="result-header-info"><h1>{quiz.title}</h1><p>{quiz.category} &middot; {quiz.difficulty}</p></div>
        <div className={`result-status ${attempt.passed ? 'passed' : 'failed'}`}>
          {attempt.passed ? (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>) : (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>)}
          <span>{attempt.passed ? 'Congratulations! You Passed' : 'You Did Not Pass'}</span>
        </div>
      </div>
      <div className="result-summary-grid">
        <div className="summary-card"><div className="summary-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><h3>{attempt.score}/{attempt.totalMarks}</h3><p>Score</p></div>
        <div className="summary-card"><div className="summary-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div><h3>{attempt.percentage}%</h3><p>Percentage</p></div>
        <div className="summary-card"><div className="summary-icon green"><h3 className="correct-color">{correctAnswers}</h3></div><p>Correct</p></div>
        <div className="summary-card"><div className="summary-icon red"><h3 className="incorrect-color">{incorrectAnswers}</h3></div><p>Incorrect</p></div>
        <div className="summary-card"><div className="summary-icon gray"><h3>{unanswered}</h3></div><p>Unanswered</p></div>
        <div className="summary-card"><div className="summary-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div><h3>{timeMinutes}m {timeSeconds}s</h3><p>Time Taken</p></div>
      </div>
      <div className="section-header"><h2>Review Answers</h2></div>
      <div className="review-questions">{quiz.questions.map((question, index) => (<QuestionCard key={question.id} question={question} questionNumber={index + 1} totalQuestions={quiz.questions.length} selectedAnswer={attempt.answers[question.id]} showResult={true} />))}</div>
      <div className="result-actions"><button className="btn btn-secondary" onClick={() => navigateTo('s-quizzes')}>Back to Quizzes</button><button className="btn btn-primary" onClick={() => navigateTo('s-results')}>View All Results</button></div>
    </div>
  );
}
