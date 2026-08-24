import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/Toast';
import { useNav } from '../context/NavigationContext';
import Modal from '../components/Modal';
import { CATEGORIES, DIFFICULTIES, formatDate } from '../utils/quizUtils';

export default function ManageQuizzes() {
  const { user } = useAuth();
  const { getTeacherQuizzes, deleteQuiz, togglePublish, quizzes } = useQuiz();
  const { success } = useToast();
  const { navigateTo } = useNav();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [previewModal, setPreviewModal] = useState(null);
  const myQuizzes = getTeacherQuizzes(user?.id);

  const filteredQuizzes = useMemo(() => {
    return myQuizzes.filter((quiz) => {
      const matchSearch = !search || quiz.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || quiz.category === category;
      const matchDifficulty = !difficulty || quiz.difficulty === difficulty;
      const matchStatus = !statusFilter || quiz.status === statusFilter;
      return matchSearch && matchCategory && matchDifficulty && matchStatus;
    });
  }, [myQuizzes, search, category, difficulty, statusFilter]);

  const handleDelete = () => { if (deleteModal) { deleteQuiz(deleteModal.id); success('Quiz deleted successfully'); setDeleteModal(null); } };
  const handleTogglePublish = (quiz) => { togglePublish(quiz.id); success(`Quiz ${quiz.status === 'Published' ? 'unpublished' : 'published'} successfully`); };

  return (
    <div className="page-container">
      <div className="page-header"><div><h1>Manage Quizzes</h1><p>Create, edit, and manage your quizzes</p></div><button className="btn btn-primary" onClick={() => navigateTo('t-create-quiz')}>+ Create Quiz</button></div>
      <div className="filters-bar">
        <div className="search-box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><input type="text" placeholder="Search quizzes..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All Categories</option>{CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}</select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option value="">All Difficulties</option>{DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">All Status</option><option value="Published">Published</option><option value="Draft">Draft</option></select>
      </div>
      {filteredQuizzes.length === 0 ? (
        <div className="empty-state"><h3>No quizzes found</h3><button className="btn btn-primary" onClick={() => navigateTo('t-create-quiz')}>Create Your First Quiz</button></div>
      ) : (
        <div className="table-container"><table className="data-table"><thead><tr><th>Quiz</th><th>Category</th><th>Questions</th><th>Difficulty</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead><tbody>
          {filteredQuizzes.map((quiz) => (
            <tr key={quiz.id}><td><strong>{quiz.title}</strong></td><td><span className="category-badge">{quiz.category}</span></td><td>{quiz.questions?.length || 0}</td><td><span className="difficulty-badge" data-difficulty={quiz.difficulty}>{quiz.difficulty}</span></td><td><span className={`status-badge ${quiz.status === 'Published' ? 'status-published' : 'status-draft'}`}>{quiz.status}</span></td><td>{formatDate(quiz.createdAt)}</td><td><div className="action-buttons"><button className="btn btn-sm btn-icon" title="Preview" onClick={() => setPreviewModal(quiz)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></button><button className="btn btn-sm btn-icon" title={quiz.status === 'Published' ? 'Unpublish' : 'Publish'} onClick={() => handleTogglePublish(quiz)}>{quiz.status === 'Published' ? (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>) : (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>)}</button><button className="btn btn-sm btn-icon danger" title="Delete" onClick={() => setDeleteModal(quiz)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button></div></td></tr>
          ))}
        </tbody></table></div>
      )}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Quiz" footer={<><button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>Cancel</button><button className="btn btn-danger" onClick={handleDelete}>Delete</button></>}><p>Are you sure you want to delete <strong>"{deleteModal?.title}"</strong>?</p><p className="warning-text">This action cannot be undone.</p></Modal>
      <Modal isOpen={!!previewModal} onClose={() => setPreviewModal(null)} title="Quiz Preview">
        {previewModal && (<div className="quiz-preview"><h3>{previewModal.title}</h3><p>{previewModal.description}</p><div className="preview-details"><span>Category: {previewModal.category}</span><span>Difficulty: {previewModal.difficulty}</span><span>Time: {previewModal.timeLimit} min</span><span>Pass: {previewModal.passingPercentage}%</span><span>Questions: {previewModal.questions?.length || 0}</span></div><div className="preview-questions"><h4>Questions:</h4>{previewModal.questions?.map((q, i) => (<div key={q.id} className="preview-question"><p><strong>Q{i + 1}:</strong> {q.text}</p><ul>{q.options.map((opt, j) => (<li key={j} className={j === q.correctAnswer ? 'correct-option' : ''}>{['A', 'B', 'C', 'D'][j]}. {opt}{j === q.correctAnswer && ' \u2713'}</li>))}</ul>{q.explanation && <p className="explanation">Explanation: {q.explanation}</p>}</div>))}</div></div>)}
      </Modal>
    </div>
  );
}
