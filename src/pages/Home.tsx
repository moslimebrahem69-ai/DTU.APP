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
    <div className="space-y-6 md:space-y-8 px-2 sm:px-0">
      {/* Hero Section */}
      <motion.div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        initial={animationsEnabled ? { y: 30, opacity: 0, scale: 0.95 } : {}}
        animate={heroInView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center py-8 md:py-16 relative overflow-hidden rounded-2xl md:rounded-3xl"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl md:rounded-3xl"
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
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-block mb-4 md:mb-6 relative z-10"
        >
          <Sparkles className="h-10 w-10 md:h-16 md:w-16 text-primary mx-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-foreground mb-3 md:mb-6 relative z-10"
        >
          DTU Learning Hub
        </motion.h1>
        
        <motion.p 
          className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed relative z-10 px-4"
          initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          مركز تعليمي شامل لجميع احتياجاتك الدراسية والمهنية
        </motion.p>
        
        <motion.div
          className="mt-5 md:mt-8 flex items-center justify-center space-x-4 md:space-x-6 rtl:space-x-reverse relative z-10"
          initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center text-xs md:text-sm text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 text-green-500" />
            أداء عالي
          </div>
          <div className="flex items-center text-xs md:text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 text-blue-500" />
            تجربة متطورة
          </div>
        </motion.div>
      </motion.div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => navigate(section.route)}
            initial={animationsEnabled ? { y: 40, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={animationsEnabled ? { y: -6, scale: 1.02 } : {}}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
            className="group relative bg-card border border-border rounded-2xl md:rounded-3xl p-5 md:p-8 text-left hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            <div className="relative z-10 flex items-center sm:block">
              <motion.div 
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-0 sm:mb-6 ml-4 sm:ml-0 shadow-md shrink-0`}
              >
                <section.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </motion.div>
              
              <div>
                <motion.h3 
                  className="text-base sm:text-xl font-bold text-foreground mb-1 sm:mb-3 group-hover:text-primary transition-colors duration-300"
                >
                  {t(section.titleKey) !== section.titleKey ? t(section.titleKey) : (section.customTitle || t(section.titleKey))}
                </motion.h3>
                
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-0 sm:mb-4">
                  اكتشف أفضل الأدوات والموارد التعليمية
                </p>
                
                <div className="hidden sm:flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>استكشف الآن</span>
                  <ArrowRight className="h-3 w-3 mr-1 rtl:ml-1" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={animationsEnabled ? { y: 30, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 mt-10 md:mt-16"
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
            className="text-center p-3 md:p-4 bg-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/50"
            whileHover={animationsEnabled ? { scale: 1.03 } : {}}
          >
            <div className="w-9 h-9 md:w-12 md:h-12 mx-auto mb-1.5 md:mb-2 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
            </div>
            <div className="text-lg md:text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}