import { createContext, useContext, useState, useCallback } from 'react';
import Storage, { KEYS } from '../utils/localStorage';
import { generateId, calculatePercentage, isPass, getTotalMarks } from '../utils/quizUtils';
import { useAuth } from './AuthContext';

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState(() => Storage.get(KEYS.QUIZZES, []));
  const [attempts, setAttempts] = useState(() => Storage.get(KEYS.ATTEMPTS, []));

  const refreshQuizzes = useCallback(() => {
    setQuizzes(Storage.get(KEYS.QUIZZES, []));
  }, []);

  const refreshAttempts = useCallback(() => {
    setAttempts(Storage.get(KEYS.ATTEMPTS, []));
  }, []);

  const createQuiz = useCallback((quizData) => {
    const newQuiz = {
      id: generateId(),
      ...quizData,
      createdAt: new Date().toISOString(),
    };
    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    Storage.set(KEYS.QUIZZES, updated);
    return newQuiz;
  }, [quizzes]);

  const updateQuiz = useCallback((quizId, updates) => {
    const updated = quizzes.map((q) =>
      q.id === quizId ? { ...q, ...updates } : q
    );
    setQuizzes(updated);
    Storage.set(KEYS.QUIZZES, updated);
  }, [quizzes]);

  const deleteQuiz = useCallback((quizId) => {
    const updated = quizzes.filter((q) => q.id !== quizId);
    setQuizzes(updated);
    Storage.set(KEYS.QUIZZES, updated);
    const updatedAttempts = attempts.filter((a) => a.quizId !== quizId);
    setAttempts(updatedAttempts);
    Storage.set(KEYS.ATTEMPTS, updatedAttempts);
  }, [quizzes, attempts]);

  const togglePublish = useCallback((quizId) => {
    const updated = quizzes.map((q) =>
      q.id === quizId
        ? { ...q, status: q.status === 'Published' ? 'Draft' : 'Published' }
        : q
    );
    setQuizzes(updated);
    Storage.set(KEYS.QUIZZES, updated);
  }, [quizzes]);

  const submitQuiz = useCallback((quizId, answers, timeTaken, startedAt) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;

    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
        score += q.marks;
      }
    });

    const totalMarks = getTotalMarks(quiz.questions);
    const percentage = calculatePercentage(score, totalMarks);
    const passed = isPass(percentage, quiz.passingPercentage);

    const attempt = {
      id: generateId(),
      userId: user.id,
      quizId,
      answers,
      score,
      totalMarks,
      percentage,
      passed,
      timeTaken,
      startedAt,
      submittedAt: new Date().toISOString(),
    };

    const updated = [...attempts, attempt];
    setAttempts(updated);
    Storage.set(KEYS.ATTEMPTS, updated);
    return attempt;
  }, [quizzes, attempts, user]);

  const getQuizAttempts = useCallback((quizId) => {
    return attempts.filter((a) => a.quizId === quizId);
  }, [attempts]);

  const getUserAttempts = useCallback((userId) => {
    return attempts.filter((a) => a.userId === (userId || user?.id));
  }, [attempts, user]);

  const getUserAttemptForQuiz = useCallback((quizId, userId) => {
    return attempts.filter(
      (a) => a.quizId === quizId && a.userId === (userId || user?.id)
    );
  }, [attempts, user]);

  const getPublishedQuizzes = useCallback(() => {
    return quizzes.filter((q) => q.status === 'Published');
  }, [quizzes]);

  const getTeacherQuizzes = useCallback((teacherId) => {
    return quizzes.filter((q) => q.createdBy === (teacherId || user?.id));
  }, [quizzes, user]);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        attempts,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        togglePublish,
        submitQuiz,
        getQuizAttempts,
        getUserAttempts,
        getUserAttemptForQuiz,
        getPublishedQuizzes,
        getTeacherQuizzes,
        refreshQuizzes,
        refreshAttempts,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
