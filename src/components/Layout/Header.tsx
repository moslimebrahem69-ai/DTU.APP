import { useState } from 'react';
import { Bot, Sparkles, Home, Cpu, Youtube, GraduationCap, BookOpen, Timer, Wrench, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';

const navigationItems = [
  { id: 'home', path: '/', icon: Home, labelKey: 'home', defaultLabel: 'الرئيسية' },
  { id: 'ai-tools', path: '/ai-tools', icon: Cpu, labelKey: 'aiTools', defaultLabel: 'أدوات الذكاء الاصطناعي' },
  { id: 'youtube', path: '/youtube', icon: Youtube, labelKey: 'youtubeChannels', defaultLabel: 'قنوات يوتيوب' },
  { id: 'platforms', path: '/platforms', icon: GraduationCap, labelKey: 'learningPlatforms', defaultLabel: 'منصات التعلم' },
  { id: 'college', path: '/college', icon: BookOpen, labelKey: 'collegeSubjects', defaultLabel: 'أقسام الكلية' },
  { id: 'engineering-software', path: '/engineering-software', icon: Wrench, labelKey: 'engineeringSoftware', defaultLabel: 'البرامج الهندسية' },
  { id: 'timer', path: '/timer', icon: Timer, labelKey: 'studyTimer', defaultLabel: 'تايمر الدراسة' }
];

export function Header() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={animationsEnabled ? { y: -100, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* اللوجو واسم المنصة */}
          <motion.div 
            className="flex items-center space-x-2.5 rtl:space-x-reverse cursor-pointer select-none"
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
          >
            <div className="relative">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-primary relative z-10" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-500" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent tracking-tight">
                DTU Learning Hub
              </h1>
            </div>
          </motion.div>

          {/* القائمة الخاصة بالشاشات الكبيرة (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            <AnimatePresence>
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                const label = t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.defaultLabel;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={animationsEnabled ? { opacity: 0, y: -20 } : {}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => navigate(item.path)}
                      className={`relative px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium hidden xl:inline">
                          {label}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* زر القائمة للشاشات الصغيرة والموبايل */}
          <div className="flex lg:hidden items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* المنيو المنسدلة المخصصة للموبايل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border/50 px-3 pt-2 pb-4 space-y-1 shadow-xl overflow-hidden"
          >
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              const label = t(item.labelKey) !== item.labelKey ? t(item.labelKey) : item.defaultLabel;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-foreground hover:bg-accent/60'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}