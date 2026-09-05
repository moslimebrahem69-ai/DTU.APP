import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Youtube, 
  GraduationCap, 
  BookOpen, 
  Timer, 
  Wrench,
  ChevronLeft
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const sections = [
  {
    id: 'ai-tools',
    titleKey: 'aiTools',
    desc: 'أدوات ذكية للتوليد والتلخيص والبحث',
    count: '100+',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400',
    route: '/ai-tools'
  },
  {
    id: 'youtube',
    titleKey: 'youtubeChannels',
    desc: 'قنوات شرح ودورات مجانية متخصصة',
    count: '50+',
    icon: Youtube,
    gradient: 'from-red-500 to-orange-500',
    bgLight: 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400',
    route: '/youtube'
  },
  {
    id: 'platforms',
    titleKey: 'learningPlatforms',
    desc: 'منصات تعليمية عالمية ومحلية',
    count: '25+',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    route: '/platforms'
  },
  {
    id: 'college',
    titleKey: 'collegeSubjects',
    desc: 'المحاضرات والملخصات والاختبارات',
    count: 'المقررات',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    route: '/college'
  },
  {
    id: 'engineering-software',
    titleKey: 'engineeringSoftware',
    customTitle: 'برامج هندسية',
    desc: 'دليل البرامج والأدوات الهندسية',
    count: '15+',
    icon: Wrench,
    gradient: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400',
    route: '/engineering-software'
  },
  {
    id: 'timer',
    titleKey: 'studyTimer',
    desc: 'مؤقت تقنية بومودورو وزيادة التركيز',
    count: 'أداة',
    icon: Timer,
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    route: '/timer'
  }
];

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { animationsEnabled } = useTheme();
  const { elementRef: heroRef, isIntersecting: heroInView } = useIntersectionObserver();

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 px-1 sm:px-0">
      
      {/* Compact & Ultra-Minimal Hero Banner */}
      <motion.div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
        animate={heroInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm px-4 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between shadow-2xs"
      >
        <div>
          <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
           اهلا بيك ي صديقي 🙋
          </h1>
          <p className="text-xs text-muted-foreground mt-0.1 sm:mt-1">
            كل اللي يساعدك تذاكر وتتعلم وتطوّر نفسك.
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          منصة متكاملة
        </span>
      </motion.div>

      {/* Grid sections */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => navigate(section.route)}
            initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
            className="group relative bg-card border border-border/60 hover:border-primary/40 rounded-2xl p-3.5 sm:p-5 text-right shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between overflow-hidden"
          >
            <div className={`absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-2xs shrink-0`}>
                  <section.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${section.bgLight}`}>
                  {section.count}
                </span>
              </div>

              <h3 className="text-xs sm:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {t(section.titleKey) !== section.titleKey ? t(section.titleKey) : (section.customTitle || t(section.titleKey))}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 leading-tight">
                {section.desc}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between text-[10px] sm:text-xs text-primary font-medium">
              <span>خش هتجيبك</span>
              <ChevronLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  );
}