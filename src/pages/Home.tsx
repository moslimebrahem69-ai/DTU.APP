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
    <div className="space-y-8">
      <motion.div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        initial={animationsEnabled ? { y: 50, opacity: 0, scale: 0.9 } : {}}
        animate={heroInView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center py-16 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"
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
            filter: [
              "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
              "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
              "drop-shadow(0 0 0px rgba(59, 130, 246, 0))"
            ]
          } : {}}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-block mb-8 relative z-10"
        >
          <Sparkles className="h-16 w-16 text-primary mx-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-foreground mb-6 relative z-10"
          animate={animationsEnabled ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          } : {}}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            background: "linear-gradient(90deg, currentColor 0%, rgba(59, 130, 246, 1) 50%, currentColor 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text"
          }}
        >
          DTU Learning Hub
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed relative z-10"
          initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          مركز تعليمي شامل لجميع احتياجاتك الدراسية والمهنية
        </motion.p>
        
        <motion.div
          className="mt-8 flex items-center justify-center space-x-6 rtl:space-x-reverse relative z-10"
          initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
          animate={heroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
          >
            <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
            أداء عالي
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
          >
            <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
            تجربة متطورة
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => navigate(section.route)}
            initial={animationsEnabled ? { y: 60, opacity: 0, rotateX: 15 } : {}}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={animationsEnabled ? { 
              y: -12, 
              scale: 1.03,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            } : {}}
            whileTap={animationsEnabled ? { scale: 0.97, rotateY: 0 } : {}}
            className="group relative bg-card border border-border rounded-3xl p-8 text-left hover:shadow-2xl transition-all duration-500 overflow-hidden perspective-1000"
          >
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
            />
            
            <div className="relative z-10">
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={animationsEnabled ? { 
                  scale: 1.15,
                  rotate: 5,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <section.icon className="h-8 w-8 text-white drop-shadow-sm" />
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
              >
                {t(section.titleKey) !== section.titleKey ? t(section.titleKey) : (section.customTitle || t(section.titleKey))}
              </motion.h3>
              
              <motion.p className="text-muted-foreground text-sm leading-relaxed mb-4">
                اكتشف أفضل الأدوات والموارد التعليمية
              </motion.p>
              
              <motion.div className="flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>استكشف الآن</span>
                <ArrowRight className="h-3 w-3 mr-1 rtl:ml-1" />
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={animationsEnabled ? { y: 50, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16"
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
            className="text-center p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50"
            whileHover={animationsEnabled ? { 
              scale: 1.05,
              backgroundColor: "rgba(59, 130, 246, 0.05)"
            } : {}}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}