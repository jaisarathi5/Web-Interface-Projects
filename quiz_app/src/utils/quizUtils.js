export const CATEGORIES = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Programming',
  'Java',
  'JavaScript',
  'Python',
  'React.js',
  'HTML & CSS',
  'Data Structures',
  'Database / SQL',
  'General Knowledge',
  'Computer Science',
];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const STATUSES = ['Draft', 'Published'];

export function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function isPass(percentage, passingPercentage) {
  return percentage >= passingPercentage;
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'Easy': return '#22c55e';
    case 'Medium': return '#f59e0b';
    case 'Hard': return '#ef4444';
    default: return '#6b7280';
  }
}

export function getTotalMarks(questions) {
  return questions.reduce((sum, q) => sum + (q.marks || 1), 0);
}
