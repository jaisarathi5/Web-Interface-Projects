import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/Toast';
import { useNav } from '../context/NavigationContext';
import { CATEGORIES, DIFFICULTIES, generateId } from '../utils/quizUtils';

const emptyQuestion = () => ({ id: generateId(), text: '', options: ['', '', '', ''], correctAnswer: 0, marks: 1, explanation: '' });

export default function CreateQuiz() {
  const { user } = useAuth();
  const { createQuiz } = useQuiz();
  const { success, error: toastError } = useToast();
  const { navigateTo } = useNav();
  const [quizData, setQuizData] = useState({ title: '', description: '', category: '', difficulty: 'Medium', timeLimit: 15, passingPercentage: 50, status: 'Draft' });
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: name === 'timeLimit' || name === 'passingPercentage' ? Number(value) : value });
  };

  const handleQuestionChange = (field, value) => {
    const updated = [...questions];
    updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], [field]: value };
    setQuestions(updated);
  };

  const handleOptionChange = (optIndex, value) => {
    const updated = [...questions];
    const options = [...updated[currentQuestionIndex].options];
    options[optIndex] = value;
    updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], options };
    setQuestions(updated);
  };

  const addQuestion = () => { setQuestions([...questions, emptyQuestion()]); setCurrentQuestionIndex(questions.length); };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    if (currentQuestionIndex >= updated.length) setCurrentQuestionIndex(updated.length - 1);
  };

  const moveQuestion = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= questions.length) return;
    const updated = [...questions];
    [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
    setQuestions(updated);
    setCurrentQuestionIndex(toIndex);
  };

  const validate = () => {
    const newErrors = {};
    if (!quizData.title.trim()) newErrors.title = 'Title is required';
    if (!quizData.description.trim()) newErrors.description = 'Description is required';
    if (!quizData.category) newErrors.category = 'Category is required';
    questions.forEach((q, i) => {
      if (!q.text.trim()) newErrors[`q${i}_text`] = `Question ${i + 1}: text is required`;
      q.options.forEach((opt, j) => { if (!opt.trim()) newErrors[`q${i}_opt${j}`] = `Question ${i + 1}: Option ${j + 1} is required`; });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (status) => {
    if (!validate()) { toastError('Please fix the errors before saving'); return; }
    createQuiz({ ...quizData, status, questions, createdBy: user.id });
    success(`Quiz ${status === 'Published' ? 'published' : 'saved as draft'} successfully!`);
    navigateTo('t-manage-quizzes');
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>Create Quiz</h1><p>Create a new quiz with questions</p></div><button className="btn btn-secondary" onClick={() => navigateTo('t-manage-quizzes')}>Back to Manage</button></div>
      <div className="create-quiz-layout">
        <div className="quiz-form-section">
          <h3>Quiz Details</h3>
          <div className="form-grid">
            <div className="form-group full-width"><label>Quiz Title *</label><input type="text" name="title" value={quizData.title} onChange={handleQuizChange} placeholder="Enter quiz title" />{errors.title && <span className="field-error">{errors.title}</span>}</div>
            <div className="form-group full-width"><label>Description *</label><textarea name="description" value={quizData.description} onChange={handleQuizChange} placeholder="Enter quiz description" rows="3" />{errors.description && <span className="field-error">{errors.description}</span>}</div>
            <div className="form-group"><label>Category *</label><select name="category" value={quizData.category} onChange={handleQuizChange}><option value="">Select Category</option>{CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}</select>{errors.category && <span className="field-error">{errors.category}</span>}</div>
            <div className="form-group"><label>Difficulty</label><select name="difficulty" value={quizData.difficulty} onChange={handleQuizChange}>{DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}</select></div>
            <div className="form-group"><label>Time Limit (minutes)</label><input type="number" name="timeLimit" value={quizData.timeLimit} onChange={handleQuizChange} min="1" /></div>
            <div className="form-group"><label>Passing Percentage (%)</label><input type="number" name="passingPercentage" value={quizData.passingPercentage} onChange={handleQuizChange} min="1" max="100" /></div>
          </div>
        </div>
        <div className="questions-section">
          <div className="questions-header"><h3>Questions ({questions.length})</h3><button className="btn btn-primary btn-sm" onClick={addQuestion}>+ Add Question</button></div>
          <div className="question-tabs">{questions.map((q, i) => (<button key={q.id} className={`question-tab ${i === currentQuestionIndex ? 'active' : ''} ${q.text ? 'filled' : ''}`} onClick={() => setCurrentQuestionIndex(i)}>{i + 1}{questions.length > 1 && (<span className="tab-remove" onClick={(e) => { e.stopPropagation(); removeQuestion(i); }}>x</span>)}</button>))}</div>
          {currentQuestion && (
            <div className="question-form">
              <div className="form-group"><label>Question {currentQuestionIndex + 1} Text *</label><textarea value={currentQuestion.text} onChange={(e) => handleQuestionChange('text', e.target.value)} placeholder="Enter your question" rows="2" />{errors[`q${currentQuestionIndex}_text`] && <span className="field-error">{errors[`q${currentQuestionIndex}_text`]}</span>}</div>
              <div className="options-form"><label>Options * (Select the correct answer)</label>{currentQuestion.options.map((opt, i) => (<div key={i} className="option-input-row"><input type="radio" name="correctAnswer" checked={currentQuestion.correctAnswer === i} onChange={() => handleQuestionChange('correctAnswer', i)} /><span className="option-label">{['A', 'B', 'C', 'D'][i]}</span><input type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${['A', 'B', 'C', 'D'][i]}`} />{errors[`q${currentQuestionIndex}_opt${i}`] && <span className="field-error">{errors[`q${currentQuestionIndex}_opt${i}`]}</span>}</div>))}</div>
              <div className="form-grid"><div className="form-group"><label>Marks</label><input type="number" value={currentQuestion.marks} onChange={(e) => handleQuestionChange('marks', Number(e.target.value))} min="1" max="10" /></div><div className="form-group"><label>Explanation (optional)</label><input type="text" value={currentQuestion.explanation} onChange={(e) => handleQuestionChange('explanation', e.target.value)} placeholder="Explain the correct answer" /></div></div>
              <div className="question-actions"><button className="btn btn-secondary btn-sm" onClick={() => moveQuestion(currentQuestionIndex, -1)} disabled={currentQuestionIndex === 0}>Move Up</button><button className="btn btn-secondary btn-sm" onClick={() => moveQuestion(currentQuestionIndex, 1)} disabled={currentQuestionIndex === questions.length - 1}>Move Down</button></div>
            </div>
          )}
          <div className="quiz-save-actions"><button className="btn btn-secondary" onClick={() => handleSave('Draft')}>Save as Draft</button><button className="btn btn-success" onClick={() => handleSave('Published')}>Publish Quiz</button></div>
        </div>
      </div>
    </div>
  );
}
