import { useState, useCallback, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/Toast';
import { useNav } from '../context/NavigationContext';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import Modal from '../components/Modal';

export default function TakeQuiz() {
  const { params, navigateTo } = useNav();
  const { quizzes, submitQuiz, getUserAttemptForQuiz } = useQuiz();
  const { success, error: toastError } = useToast();
  const quiz = quizzes.find((q) => q.id === params.quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startedAt] = useState(new Date().toISOString());
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quiz) {
      setShuffledQuestions(quiz.questions.map((q) => ({ ...q })));
    }
  }, [quiz]);

  useEffect(() => {
    if (quiz) {
      const existingAttempts = getUserAttemptForQuiz(quiz.id);
      if (existingAttempts.length > 0) { toastError('You have already attempted this quiz'); navigateTo('s-quizzes'); }
    }
  }, [quiz]);

  if (!quiz) return (<div className="empty-state"><h3>Quiz not found</h3><button className="btn btn-primary" onClick={() => navigateTo('s-quizzes')}>Back to Quizzes</button></div>);
  if (submitted) return null;

  const questions = shuffledQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswerSelect = (optionIndex) => { setAnswers({ ...answers, [currentQuestion.id]: optionIndex }); };

  const handleTimeUp = useCallback(() => { handleSubmit(); }, [answers, quiz]);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const timeTaken = Math.round((Date.now() - new Date(startedAt).getTime()) / 1000);
    const attempt = submitQuiz(quiz.id, answers, timeTaken, startedAt);
    if (attempt) { success('Quiz submitted successfully!'); navigateTo('s-quiz-result', { attemptId: attempt.id }); }
  };

  if (!quizStarted) {
    return (
      <div className="quiz-start-page">
        <div className="quiz-start-card">
          <h1>{quiz.title}</h1>
          <p className="quiz-start-description">{quiz.description}</p>
          <div className="quiz-start-details">
            <div className="detail-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg><span>{quiz.category}</span></div>
            <div className="detail-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg><span>{quiz.difficulty}</span></div>
            <div className="detail-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span>{quiz.timeLimit} Minutes</span></div>
            <div className="detail-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg><span>{totalQuestions} Questions</span></div>
            <div className="detail-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg><span>Pass: {quiz.passingPercentage}%</span></div>
          </div>
          <div className="quiz-start-rules"><h3>Instructions</h3><ul><li>The quiz has a time limit of {quiz.timeLimit} minutes.</li><li>The quiz will auto-submit when the timer reaches zero.</li><li>You can navigate between questions using the panel.</li><li>Each question has one correct answer.</li><li>You cannot retake the quiz once submitted.</li></ul></div>
          <div className="quiz-start-actions"><button className="btn btn-secondary" onClick={() => navigateTo('s-quizzes')}>Cancel</button><button className="btn btn-primary btn-lg" onClick={() => setQuizStarted(true)}>Start Quiz</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="take-quiz">
      <div className="quiz-top-bar">
        <div className="quiz-top-left"><h2>{quiz.title}</h2><span className="category-badge">{quiz.category}</span></div>
        <Timer duration={quiz.timeLimit} onTimeUp={handleTimeUp} />
      </div>
      <div className="quiz-content">
        <div className="quiz-main">
          <div className="quiz-progress"><span>Question {currentIndex + 1} of {totalQuestions}</span><span>{answeredCount} answered</span></div>
          <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} /></div>
          {currentQuestion && (<QuestionCard question={currentQuestion} questionNumber={currentIndex + 1} totalQuestions={totalQuestions} selectedAnswer={answers[currentQuestion.id]} onAnswerSelect={handleAnswerSelect} />)}
          <div className="quiz-navigation">
            <button className="btn btn-secondary" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>Previous</button>
            <div className="quiz-nav-center">
              {currentIndex < totalQuestions - 1 ? (<button className="btn btn-primary" onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>) : (<button className="btn btn-success" onClick={() => setShowSubmitModal(true)}>Submit Quiz</button>)}
            </div>
          </div>
        </div>
        <div className="quiz-sidebar-panel">
          <h3>Question Navigator</h3>
          <div className="question-nav-grid">{questions.map((q, idx) => (<button key={q.id} className={`question-nav-btn ${idx === currentIndex ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`} onClick={() => setCurrentIndex(idx)}>{idx + 1}</button>))}</div>
          <div className="question-legend"><div className="legend-item"><span className="legend-dot current" /> Current</div><div className="legend-item"><span className="legend-dot answered" /> Answered</div><div className="legend-item"><span className="legend-dot unanswered" /> Unanswered</div></div>
          <button className="btn btn-success btn-full" onClick={() => setShowSubmitModal(true)}>Submit Quiz</button>
        </div>
      </div>
      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="Submit Quiz?" footer={<><button className="btn btn-secondary" onClick={() => setShowSubmitModal(false)}>Cancel</button><button className="btn btn-success" onClick={handleSubmit}>Submit ({answeredCount}/{totalQuestions} answered)</button></>}>
        <div className="submit-confirm"><p>Are you sure you want to submit the quiz?</p><div className="submit-stats"><span className="answered">{answeredCount} answered</span><span className="unanswered">{totalQuestions - answeredCount} unanswered</span></div>{totalQuestions - answeredCount > 0 && (<p className="warning-text">You have {totalQuestions - answeredCount} unanswered question(s). They will be marked as incorrect.</p>)}</div>
      </Modal>
    </div>
  );
}
