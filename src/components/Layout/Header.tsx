import { Bot, Sparkles, Home, Cpu, Youtube, GraduationCap, BookOpen, Timer, Wrench } from 'lucide-react';
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

  return (
    <motion.header
      initial={animationsEnabled ? { y: -100, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
          >
            <div className="relative">
              <Bot className="h-8 w-8 text-primary relative z-10" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-yellow-500" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                DTU Learning Hub
              </h1>
            </div>
          </motion.div>

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
        </div>
      </div>
    </motion.header>
  );
}