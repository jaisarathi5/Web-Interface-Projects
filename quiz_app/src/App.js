import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/Toast';
import { NavigationProvider, useNav } from './context/NavigationContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AvailableQuizzes from './pages/AvailableQuizzes';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';
import MyResults from './pages/MyResults';
import Performance from './pages/Performance';
import Profile from './pages/Profile';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateQuiz from './pages/CreateQuiz';
import ManageQuizzes from './pages/ManageQuizzes';
import TeacherResults from './pages/TeacherResults';
import TeacherProfile from './pages/TeacherProfile';
import { initializeData } from './utils/seedData';
import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/quiz.css';
import './styles/responsive.css';

initializeData();

const studentViews = {
  's-dashboard': StudentDashboard,
  's-quizzes': AvailableQuizzes,
  's-take-quiz': TakeQuiz,
  's-quiz-result': QuizResult,
  's-results': MyResults,
  's-performance': Performance,
  's-profile': Profile,
};

const teacherViews = {
  't-dashboard': TeacherDashboard,
  't-create-quiz': CreateQuiz,
  't-manage-quizzes': ManageQuizzes,
  't-results': TeacherResults,
  't-profile': TeacherProfile,
};

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { view } = useNav();
  const PageComponent = studentViews[view] || StudentDashboard;

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} role={user?.role} />
        <main className="main-content"><PageComponent /></main>
      </div>
    </div>
  );
}

function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { view } = useNav();
  const PageComponent = teacherViews[view] || TeacherDashboard;

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} role={user?.role} />
        <main className="main-content"><PageComponent /></main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  const { view } = useNav();

  if (!user) {
    if (view === 'register') return <Register />;
    return <Login />;
  }

  if (user.role === 'teacher') return <TeacherLayout />;
  return <StudentLayout />;
}

export default function App() {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <QuizProvider>
              <AppRoutes />
            </QuizProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
}
