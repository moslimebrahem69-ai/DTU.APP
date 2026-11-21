import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Megaphone,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  ArrowUpLeft
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { supabase } from '../lib/supabase';

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  academic_year: string;
  department: string;
  priority: 'urgent' | 'warning' | 'success' | 'info';
  action_url: string | null;
  action_label: string | null;
  is_active: boolean;
  created_at: string;
}

const YEAR_FILTER_OPTIONS = [
  { id: 'all', label: 'كل الفرق' },
  { id: 'year1', label: 'الفرقة 1' },
  { id: 'year2', label: 'الفرقة 2' },
  { id: 'year3', label: 'الفرقة 3' },
];

const sections = [
  {
    id: 'ai-tools',
    titleKey: 'aiTools',
    desc: 'أدوات ذكية للتوليد والتلخيص والبحث',
    count: '100+',
    icon: Bot,
    gradient: 'from-amber-500 to-rose-500',
    bgLight: 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-500/40',
    route: '/ai-tools'
  },
  {
    id: 'youtube',
    titleKey: 'youtubeChannels',
    desc: 'قنوات شرح ودورات مجانية متخصصة',
    count: '50+',
    icon: Youtube,
    gradient: 'from-red-500 to-orange-500',
    bgLight: 'bg-red-500/20 text-red-800 dark:text-red-200 border-red-500/40',
    route: '/youtube'
  },
  {
    id: 'platforms',
    titleKey: 'learningPlatforms',
    desc: 'منصات تعليمية عالمية ومحلية',
    count: '25+',
    icon: GraduationCap,
    gradient: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-500/20 text-teal-800 dark:text-teal-200 border-teal-500/40',
    route: '/platforms'
  },
  {
    id: 'college',
    titleKey: 'collegeSubjects',
    desc: 'المحاضرات والملخصات والاختبارات',
    count: 'المقررات',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border-emerald-500/40',
    route: '/college'
  },
  {
    id: 'exams',
    titleKey: 'examsPlatform',
    customTitle: 'الاختبارات الإلكترونية',
    desc: 'اختبارات المحاضرات والامتحانات الذكية',
    count: 'جديد',
    icon: FileCheck2,
    gradient: 'from-cyan-600 to-teal-600',
    bgLight: 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 border-cyan-500/40',
    route: '/exams'
  },
  {
    id: 'timer',
    titleKey: 'studyTimer',
    desc: 'مؤقت تقنية بومودورو وزيادة التركيز',
    count: 'أداة',
    icon: Timer,
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-500/40',
    route: '/timer'
  }
];

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { animationsEnabled } = useTheme();
  const { elementRef: heroRef, isIntersecting: heroInView } = useIntersectionObserver();

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>(() => {
    return localStorage.getItem('dtu-student-year') || 'all';
  });
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setAnnouncements(data as AnnouncementItem[]);
      }
    }

    fetchAnnouncements();
  }, []);

  const handleYearFilterChange = (yearId: string) => {
    setSelectedYearFilter(yearId);
    localStorage.setItem('dtu-student-year', yearId);
  };

  const visibleAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      if (dismissedIds.includes(item.id)) return false;
      if (selectedYearFilter !== 'all' && item.academic_year !== 'all' && item.academic_year !== selectedYearFilter) {
        return false;
      }
      return true;
    });
  }, [announcements, dismissedIds, selectedYearFilter]);

  const getPriorityStyles = (priority: AnnouncementItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return {
          container: 'bg-rose-500/10 border-rose-500/30 text-foreground',
          badge: 'bg-rose-500 text-white',
          icon: AlertTriangle,
          iconColor: 'text-rose-500',
          label: 'عاجل',
        };
      case 'warning':
        return {
          container: 'bg-amber-500/10 border-amber-500/30 text-foreground',
          badge: 'bg-amber-500 text-white',
          icon: Megaphone,
          iconColor: 'text-amber-500',
          label: 'تنبيه هام',
        };
      case 'success':
        return {
          container: 'bg-emerald-500/10 border-emerald-500/30 text-foreground',
          badge: 'bg-emerald-600 text-white',
          icon: CheckCircle2,
          iconColor: 'text-emerald-500',
          label: 'تم التحديث',
        };
      default:
        return {
          container: 'bg-primary/10 border-primary/25 text-foreground',
          badge: 'bg-primary text-primary-foreground',
          icon: Info,
          iconColor: 'text-primary',
          label: 'إعلان',
        };
    }
  };

  const handleAnnouncementAction = (url: string) => {
    if (url.startsWith('/')) {
      navigate(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground dark:text-primary font-bold text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لوحة التحكم الرئيسية</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            أهلاً بيك يا صديقي <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-medium">
            كل الأدوات، المحاضرات، والاختبارات اللي تساعدك تذاكر وتتميز بكل سهولة.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            جاهز للإنجاز
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold">التحديث الأخير نشط 🚀</span>
        </div>
      </motion.div>

      {/* Smart Announcements Center Banner */}
      {announcements.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <Megaphone className="w-3.5 h-3.5 text-primary" />
              <span>تنبيهات وإعلانات المنصة</span>
            </div>

            <div className="flex items-center gap-1 bg-card border border-border/50 p-1 rounded-xl">
              {YEAR_FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleYearFilterChange(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                    selectedYearFilter === opt.id
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {visibleAnnouncements.map((item) => {
              const style = getPriorityStyles(item.priority);
              const IconComp = style.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`rounded-2xl border p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs ${style.container}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${style.iconColor}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${style.badge}`}>
                          {style.label}
                        </span>
                        <h3 className="text-xs sm:text-sm font-black text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {item.action_url && (
                      <button
                        type="button"
                        onClick={() => handleAnnouncementAction(item.action_url as string)}
                        className="px-3.5 py-1.5 rounded-xl bg-card hover:bg-accent border border-border/60 text-foreground text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{item.action_label || 'عرض التفاصيل'}</span>
                        <ArrowUpLeft className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setDismissedIds((prev) => [...prev, item.id])}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      title="إخفاء التنبيه"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Grid Sections */}
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

              <h2 className="text-sm sm:text-base font-black text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                {section.customTitle || t(section.titleKey)}
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
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