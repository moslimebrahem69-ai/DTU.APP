import { useState, useEffect, useMemo } from 'react';
import { 
  Bot, Sparkles, Home, Cpu, Youtube, GraduationCap, 
  BookOpen, Timer, Wrench, Menu, X, Search, FileText, ArrowLeft, ExternalLink, ChevronLeft, FileCheck 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../Common/ThemeToggle';
import { globalSearch } from '../../data/collegeData';

const normalizeArabicText = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\bو\s+/g, 'و')
    .trim();
};

const STATIC_SEARCH_ITEMS = [
  { id: 'p-1', title: 'الرئيسية', category: 'صفحة', path: '/', icon: Home },
  { id: 'p-2', title: 'أدوات الذكاء الاصطناعي', category: 'قسم', path: '/ai-tools', icon: Cpu, keywords: 'chatgpt claude gemini ai ذكاء اصطناعي' },
  { id: 'p-3', title: 'قنوات يوتيوب التعليمية', category: 'قسم', path: '/youtube', icon: Youtube, keywords: 'شرح كورسات يوتيوب فيديوهات' },
  { id: 'p-4', title: 'منصات التعليم', category: 'قسم', path: '/platforms', icon: GraduationCap, keywords: 'udemy coursera منصات كورسات' },
  { id: 'p-5', title: 'أقسام الكلية والمواد', category: 'قسم', path: '/college', icon: BookOpen, keywords: 'مواد محاضرة سكاشن امتحانات فرق دراسية' },
  { id: 'p-6', title: 'البرامج الهندسية', category: 'قسم', path: '/engineering-software', icon: Wrench, keywords: 'autocad solidworks matlab proteus برامج' },
  { id: 'p-7', title: 'تايمر الدراسة (بومودورو)', category: 'أداة', path: '/timer', icon: Timer, keywords: 'بومودورو تايمر دراسة وقت' },
  { id: 'p-8', title: 'الاختبارات الإلكترونية', category: 'قسم', path: '/exams', icon: FileCheck, keywords: 'امتحانات كويزات اختبارات كويز ميدترم فاينل quiz test' },

  { id: 'ai-1', title: 'ChatGPT', category: 'أداة AI', path: '/ai-tools', icon: Cpu, keywords: 'شات جي بي تي توليد نصوص' },
  { id: 'ai-2', title: 'Claude AI', category: 'أداة AI', path: '/ai-tools', icon: Cpu, keywords: 'كلاود برمجة كتابة' },
  { id: 'ai-3', title: 'Gemini', category: 'أداة AI', path: '/ai-tools', icon: Cpu, keywords: 'جميناي جوجل' },

  { id: 'sw-1', title: 'AutoCAD', category: 'برنامج هندسي', path: '/engineering-software', icon: Wrench, keywords: 'أوتوكاد رسم هندسي 2D' },
  { id: 'sw-2', title: 'SolidWorks', category: 'برنامج هندسي', path: '/engineering-software', icon: Wrench, keywords: 'سوليد وركس تصميم 3D' },
];

export function Header() {
  const { } = useTranslation();
  const { animationsEnabled } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredResults = useMemo(() => {
    const rawQuery = searchQuery.trim();
    
    if (!rawQuery) {
      return STATIC_SEARCH_ITEMS.slice(0, 8).map(item => ({ ...item, isExternal: false }));
    }

    const normalizedQuery = normalizeArabicText(rawQuery);

    const matchedStaticItems = STATIC_SEARCH_ITEMS.filter(item => {
      const title = normalizeArabicText(item.title);
      const category = normalizeArabicText(item.category);
      const keywords = normalizeArabicText(item.keywords || '');
      return title.includes(normalizedQuery) || category.includes(normalizedQuery) || keywords.includes(normalizedQuery);
    }).map(item => ({
      ...item,
      isExternal: false
    }));

    const collegeCourseResults = globalSearch(rawQuery).map((res, index) => ({
      id: `college-res-${index}`,
      title: `${res.courseName} - ${res.materialName}`,
      category: `${res.yearName} (${res.deptName}) • ${res.semesterName}`,
      path: res.materialUrl,
      icon: res.materialType === 'drive' ? FileText : BookOpen,
      isExternal: true
    }));

    return [...collegeCourseResults, ...matchedStaticItems];
  }, [searchQuery]);

  const handleSelectResult = (path: string, isExternal: boolean) => {
    if (isExternal && (path.startsWith('http://') || path.startsWith('https://'))) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
    setSearchModalOpen(false);
    setSearchQuery('');
  };

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home, desc: 'الصفحة الرئيسية للمنصة' },
    { path: '/ai-tools', label: 'أدوات AI', icon: Cpu, desc: 'أفضل أدوات الذكاء الاصطناعي' },
    { path: '/youtube', label: 'يوتيوب', icon: Youtube, desc: 'قنوات ومصادر الشرح' },
    { path: '/platforms', label: 'المنصات', icon: GraduationCap, desc: 'منصات التعلم الكبرى' },
    { path: '/college', label: 'أقسام الكلية', icon: BookOpen, desc: 'المواد والفرق الأكاديمية' },
    { path: '/exams', label: 'الاختبارات', icon: FileCheck, desc: 'امتحانات تفاعلية واختبارات AI' },
    { path: '/engineering-software', label: 'برامج هندسية', icon: Wrench, desc: 'برامج الرسم والمحاكاة' },
    { path: '/timer', label: 'التايمر', icon: Timer, desc: 'مؤقت بومودورو للتركيز' }
  ];

  return (
    <>
      <motion.header
        initial={animationsEnabled ? { y: -30, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-2xs"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 flex-row-reverse lg:flex-row">
            
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer select-none"
              onClick={() => {
                navigate('/');
                setMobileDrawerOpen(false);
              }}
              whileHover={animationsEnabled ? { scale: 1.02 } : {}}
              whileTap={animationsEnabled ? { scale: 0.97 } : {}}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary shadow-2xs">
                <Bot className="h-4 w-4" />
                <Sparkles className="h-2 w-2 text-amber-500 absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <h1 className="text-sm sm:text-base font-black text-foreground tracking-tight">
                DTU Hub
              </h1>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse overflow-x-auto py-1 max-w-[62vw] no-scrollbar">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    whileHover={animationsEnabled ? { scale: 1.03 } : {}}
                    whileTap={animationsEnabled ? { scale: 0.97 } : {}}
                    className={`relative px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop Actions (Search & Theme) */}
            <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse shrink-0">
              <motion.button
                onClick={() => setSearchModalOpen(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-muted-foreground hover:text-foreground bg-accent/40 hover:bg-accent/80 px-3.5 py-1.5 rounded-xl transition-all border border-border/50 cursor-pointer shadow-2xs"
              >
                <Search className="h-3.5 w-3.5 text-primary" />
                <span className="truncate max-w-[130px]">بحث سريع...</span>
                <kbd className="text-[10px] bg-background px-1.5 py-0.5 rounded border border-border/60 text-muted-foreground font-mono">⌘K</kbd>
              </motion.button>

              <ThemeToggle />
            </div>

            {/* Mobile Actions Header */}
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileDrawerOpen(true)}
                className="w-9 h-9 rounded-xl text-foreground hover:bg-accent/80 transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-2xs"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-primary" />
              </button>

              <ThemeToggle />
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Side Drawer with Smooth Spring Animation */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-[85%] max-w-xs bg-card/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between p-4 border-b border-border/40 bg-primary/5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-xs sm:text-sm font-bold text-foreground">DTU Learning Hub</h2>
                      <p className="text-[10px] text-muted-foreground">منصتك الهندسية المتكاملة</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Navigation List */}
                <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-130px)]">
                  {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <motion.button
                        key={item.path}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => {
                          navigate(item.path);
                          setMobileDrawerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl text-right transition-all group cursor-pointer ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 font-bold'
                            : 'hover:bg-accent/70 text-foreground/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-xl transition-colors shrink-0 ${
                            isActive 
                              ? 'bg-white/20 text-primary-foreground' 
                              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 text-right">
                            <div className="text-xs font-bold truncate">{item.label}</div>
                            <div className={`text-[10px] truncate ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <ChevronLeft className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'text-primary-foreground' : 'text-muted-foreground/40 group-hover:-translate-x-1'}`} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 m-3 rounded-2xl bg-accent/30 border border-border/40 text-center flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground font-medium">DTU Learning © 2026</p>
                <ThemeToggle />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchModalOpen(false)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center px-4 border-b border-border/50 bg-accent/20">
                <Search className="h-4 w-4 text-primary shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن مادة، فرقة دراسية، أداة AI، اختبار..."
                  className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectResult(item.path, item.isExternal)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl text-right hover:bg-accent/60 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 text-right">
                            <div className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <span>{item.isExternal ? 'فتح الرابط' : 'انتقال'}</span>
                          {item.isExternal ? (
                            <ExternalLink className="h-3 w-3" />
                          ) : (
                            <ArrowLeft className="h-3 w-3 rtl:rotate-0" />
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-muted-foreground">
                    لم نجد أي نتائج تطابق "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}