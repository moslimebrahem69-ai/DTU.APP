import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Youtube, 
  GraduationCap, 
  BookOpen, 
  Timer,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wrench
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const sections = [
  {
    id: 'ai-tools',
    titleKey: 'aiTools',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500',
    route: '/ai-tools'
  },
  {
    id: 'youtube',
    titleKey: 'youtubeChannels',
    icon: Youtube,
    gradient: 'from-red-500 to-orange-500',
    route: '/youtube'
  },
  {
    id: 'platforms',
    titleKey: 'learningPlatforms',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-indigo-500',
    route: '/platforms'
  },
  {
    id: 'college',
    titleKey: 'collegeSubjects',
    icon: BookOpen,
    gradient: 'from-green-500 to-teal-500',
    route: '/college'
  },
  {
    id: 'engineering-software',
    titleKey: 'engineeringSoftware',
    customTitle: 'دليل البرامج الهندسية',
    icon: Wrench,
    gradient: 'from-cyan-500 to-blue-600',
    route: '/engineering-software'
  },
  {
    id: 'timer',
    titleKey: 'studyTimer',
    icon: Timer,
    gradient: 'from-yellow-500 to-amber-500',
    route: '/timer'
  }
];

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { animationsEnabled } = useTheme();
  const { elementRef: heroRef, isIntersecting: heroInView } = useIntersectionObserver();

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-1 sm:px-0">
      {/* Hero Section */}
      <motion.div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        initial={animationsEnabled ? { y: 20, opacity: 0, scale: 0.98 } : {}}
        animate={heroInView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center py-5 sm:py-8 md:py-16 relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-border/40 bg-card/40"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl sm:rounded-2xl md:rounded-3xl"
          animate={animationsEnabled ? {
            background: [
              "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(16, 185, 129, 0.05) 100%)",
              "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 50%, rgba(245, 158, 11, 0.05) 100%)",
              "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)"
            ]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          animate={animationsEnabled ? { 
            rotate: 360,
            scale: [1, 1.08, 1],
          } : {}}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-block mb-2 sm:mb-4 relative z-10"
        >
          <Sparkles className="h-7 w-7 sm:h-10 sm:w-10 md:h-16 md:w-16 text-primary mx-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-xl sm:text-3xl md:text-5xl font-bold text-foreground mb-1.5 sm:mb-4 relative z-10"
        >
          DTU Learning Hub
        </motion.h1>
        
        <motion.p 
          className="text-xs sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed relative z-10 px-3"
          initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          مركز تعليمي شامل لجميع احتياجاتك الدراسية والمهنية
        </motion.p>
        
        <motion.div
          className="mt-3 sm:mt-6 flex items-center justify-center space-x-3 sm:space-x-6 rtl:space-x-reverse relative z-10"
          initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center text-[11px] sm:text-xs md:text-sm text-muted-foreground">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 rtl:ml-1 text-green-500" />
            أداء عالي
          </div>
          <div className="flex items-center text-[11px] sm:text-xs md:text-sm text-muted-foreground">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 rtl:ml-1 text-blue-500" />
            تجربة متطورة
          </div>
        </motion.div>
      </motion.div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => navigate(section.route)}
            initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={animationsEnabled ? { y: -3, scale: 1.01 } : {}}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
            className="group relative bg-card border border-border/70 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6 text-right hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            <div className="relative z-10 flex items-center">
              <motion.div 
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center ml-3 sm:ml-4 shadow-sm shrink-0`}
              >
                <section.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300 truncate"
                >
                  {t(section.titleKey) !== section.titleKey ? t(section.titleKey) : (section.customTitle || t(section.titleKey))}
                </motion.h3>
                
                <p className="text-muted-foreground text-[11px] sm:text-xs leading-tight truncate">
                  اكتشف أفضل الأدوات والموارد التعليمية
                </p>
              </div>

              <div className="hidden sm:flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats Grid - Compact Mobile Design */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-10"
      >
        {[
          { label: 'أدوات AI', value: '100+', icon: Bot },
          { label: 'قنوات تعليمية', value: '50+', icon: Youtube },
          { label: 'منصات تعلم', value: '25+', icon: GraduationCap },
          { label: 'مواد دراسية', value: '30+', icon: BookOpen },
          { label: 'برامج هندسية', value: '15+', icon: Wrench }
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="text-center p-2.5 sm:p-3 bg-card/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-border/50 flex flex-col items-center justify-center"
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 mb-1 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-snug">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}