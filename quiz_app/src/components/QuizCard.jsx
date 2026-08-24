import { useNav } from '../context/NavigationContext';
import { getDifficultyColor } from '../utils/quizUtils';

export default function QuizCard({ quiz, isTeacher = false, isCompleted = false, onStart }) {
  const { navigateTo } = useNav();
  const maxMarks = quiz.questions?.reduce((sum, q) => sum + (q.marks || 0), 0) || 0;

  const handleStart = () => {
    if (onStart) onStart(quiz);
    else if (!isTeacher) navigateTo('s-take-quiz', { quizId: quiz.id });
  };

  return (
    <div className={`quiz-card ${isCompleted ? 'completed' : ''}`}>
      <div className="quiz-card-header">
        <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}>{quiz.difficulty}</span>
        <span className="category-badge">{quiz.category}</span>
      </div>
      <h3 className="quiz-card-title">{quiz.title}</h3>
      <p className="quiz-card-description">{quiz.description}</p>
      <div className="quiz-card-meta">
        <div className="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          <span>{quiz.timeLimit} min</span>
        </div>
        <div className="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          <span>{quiz.questions?.length || 0} Ques</span>
        </div>
        <div className="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <span>{maxMarks} Marks</span>
        </div>
        <div className="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span>Pass: {quiz.passingPercentage}%</span>
        </div>
      </div>
      <div className="quiz-card-footer">
        {isCompleted && (
          <span className="completed-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            Completed
          </span>
        )}
        {!isTeacher && (
          <button className="btn btn-primary" onClick={handleStart}>
            {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
          </button>
        )}
        {isTeacher && (
          <button className="btn btn-secondary" onClick={() => navigateTo('t-manage-quizzes')}>Manage</button>
        )}
      </div>
    </div>
  );
}
