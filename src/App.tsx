import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import './lib/i18n';

const AIToolsPage = lazy(() => import('./pages/AIToolsPage').then(m => ({ default: m.AIToolsPage })));
const YouTubePage = lazy(() => import('./pages/YouTubePage').then(m => ({ default: m.YouTubePage })));
const LearningPlatformsPage = lazy(() => import('./pages/LearningPlatformsPage').then(m => ({ default: m.LearningPlatformsPage })));
const CollegePage = lazy(() => import('./pages/CollegePage').then(m => ({ default: m.CollegePage })));
const CollegeSubjectPage = lazy(() => import('./pages/CollegeSubjectPage').then(m => ({ default: m.CollegeSubjectPage })));
const TimerPage = lazy(() => import('./pages/TimerPage').then(m => ({ default: m.TimerPage })));
const EngineeringSoftwarePage = lazy(() => import('./pages/EngineeringSoftware').then(m => ({ default: m.EngineeringSoftware })));

function App() {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dtu-language') || 'ar';
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
    
    const savedTheme = localStorage.getItem('dtu-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const animationsEnabled = localStorage.getItem('dtu-animations');
    document.documentElement.setAttribute('data-animations', animationsEnabled || 'true');
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-tools" element={<AIToolsPage />} />
              <Route path="/youtube" element={<YouTubePage />} />
              <Route path="/platforms" element={<LearningPlatformsPage />} />
              <Route path="/college" element={<CollegePage />} />
              <Route path="/college/:yearId/:deptId" element={<CollegeSubjectPage />} />
              <Route path="/engineering-software" element={<EngineeringSoftwarePage />} />
              <Route path="/timer" element={<TimerPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;