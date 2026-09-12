import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Youtube, 
  GraduationCap, 
  BookOpen, 
  Timer, 
  FileCheck2, 
  ChevronLeft,
  Sparkles,
  Flame
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
    id: 'exams',
    titleKey: 'examsPlatform',
    customTitle: 'الاختبارات الإلكترونية',
    desc: 'اختبارات المحاضرات والامتحانات الذكية',
    count: 'جديد',
    icon: FileCheck2,
    gradient: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400',
    route: '/exams'
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
    <div className="space-y-6 pb-12 px-2 sm:px-0">
      
      {/* Enhanced Hero Banner with Glowing Ambient Effect */}
      <motion.div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={heroInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 backdrop-blur-xl px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between shadow-sm"
      >
        {/* Ambient background glow */}
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لوحة التحكم الرئيسية</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            أهلاً بيك يا صديقي <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            كل الأدوات، المحاضرات، والاختبارات اللي تساعدك تذاكر وتتميز بكل سهولة.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            جاهز للإنجاز
          </span>
          <span className="text-[10px] text-muted-foreground">التحديث الأخير نشط 🚀</span>
        </div>
      </motion.div>

      {/* Grid Sections with Spring Animation & Hover Effects */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => navigate(section.route)}
            initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
            whileHover={animationsEnabled ? { y: -4, transition: { duration: 0.2 } } : {}}
            whileTap={animationsEnabled ? { scale: 0.96 } : {}}
            className="group relative bg-card/90 hover:bg-card border border-border/70 hover:border-primary/50 rounded-2xl p-4 sm:p-6 text-right shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Top Glowing Line on Hover */}
            <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  <section.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border shadow-2xs ${section.bgLight}`}>
                  {section.count}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-black text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                {section.customTitle || t(section.titleKey)}
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {section.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-primary font-bold">
              <span className="group-hover:translate-x-0.5 transition-transform">خش هتجيبك</span>
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ChevronLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  );
}