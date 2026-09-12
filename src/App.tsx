import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
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

// Lazy Loading لصفحات قسم الاختبارات الإلكترونية الجديدة
const ExamsPage = lazy(() => import('./pages/Exams/ExamsPage').then(m => ({ default: m.ExamsPage })));
const CourseExamsPage = lazy(() => import('./pages/Exams/CourseExamsPage').then(m => ({ default: m.CourseExamsPage })));

// مكون شاشة التحميل الخرافية (App Splash Screen)
function AppLoader({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 1100); // مدة عرض شاشة التحميل الفخمة
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden"
    >
      {/* خلفية زجاجية متوهجة */}
      <div className="absolute w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center space-y-4 z-10"
      >
        {/* أيقونة البوت مع النجمة المضيئة وتأثير النبض */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground shadow-xl shadow-primary/30">
          <Bot className="h-10 w-10 animate-bounce" />
          <Sparkles className="h-5 w-5 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            DTU Learning Hub
          </h2>
          <p className="text-xs text-muted-foreground font-medium">جاري تجهيز منصتك الهندسية...</p>
        </div>

        {/* شريط التحميل المتطور */}
        <div className="w-36 h-1.5 bg-muted/60 rounded-full overflow-hidden mt-2">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="w-full h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('dtu-language') || 'ar';
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
    
    const savedTheme = localStorage.getItem('dtu-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const animationsEnabled = localStorage.getItem('dtu-animations');
    document.documentElement.setAttribute('data-animations', animationsEnabled || 'true');
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {!appIsReady && <AppLoader onLoaded={() => setAppIsReady(true)} />}
      </AnimatePresence>

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

              {/* مسارات قسم الاختبارات الإلكترونية */}
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/exams/:deptId/:yearId/:semesterId/:courseId" element={<CourseExamsPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;