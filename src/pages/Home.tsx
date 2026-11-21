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
  ArrowUpLeft,
  MessageSquare,
  Send,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { supabase } from '../lib/supabase';

type ReactionKey = 'like' | 'heart' | 'fire';

interface AnnouncementComment {
  id: string;
  announcement_id: string;
  student_name: string;
  comment_text: string;
  is_admin_reply: boolean;
  created_at: string;
}

interface AnnouncementRow {
  id: string;
  title: string;
  message: string;
  academic_year: string;
  department: string;
  priority: 'urgent' | 'warning' | 'success' | 'info';
  action_url: string | null;
  action_label: string | null;
  is_active: boolean;
  likes_count: number;
  hearts_count: number;
  fires_count: number;
  created_at: string;
  announcement_comments?: Array<{ count: number }>;
}

interface AnnouncementItem extends Omit<AnnouncementRow, 'announcement_comments'> {
  comments_count: number;
}

const YEAR_FILTER_OPTIONS = [
  { id: 'all', label: 'كل الفرق' },
  { id: 'year1', label: 'الفرقة 1' },
  { id: 'year2', label: 'الفرقة 2' },
  { id: 'year3', label: 'الفرقة 3' },
];

const REACTION_BUTTONS: Array<{ key: ReactionKey; emoji: string; label: string }> = [
  { key: 'like', emoji: '👍', label: 'تمام' },
  { key: 'heart', emoji: '❤️', label: 'شكراً' },
  { key: 'fire', emoji: '🔥', label: 'عاش' },
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

function formatRelativeTime(isoDate: string): string {
  const diffSec = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (diffSec < 60) return 'الآن';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `منذ ${diffMin} د`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} س`;
  const diffDays = Math.floor(diffHours / 24);
  return `منذ ${diffDays} ي`;
}

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

  // تفاعلات الطالب المحفوظة محلياً: { [announcementId]: ['like', 'heart'] }
  const [userReactions, setUserReactions] = useState<Record<string, ReactionKey[]>>(() => {
    try {
      const saved = localStorage.getItem('dtu-ann-reactions');
      return saved ? (JSON.parse(saved) as Record<string, ReactionKey[]>) : {};
    } catch {
      return {};
    }
  });

  // حالة التعليقات لكل إعلان
  const [expandedCommentsId, setExpandedCommentsId] = useState<string | null>(null);
  const [commentsByAnn, setCommentsByAnn] = useState<Record<string, AnnouncementComment[]>>({});
  const [loadingCommentsId, setLoadingCommentsId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('dtu-student-name') || '';
  });
  const [commentInput, setCommentInput] = useState<string>('');
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*, announcement_comments(count)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped: AnnouncementItem[] = (data as AnnouncementRow[]).map((row) => ({
          id: row.id,
          title: row.title,
          message: row.message,
          academic_year: row.academic_year,
          department: row.department,
          priority: row.priority,
          action_url: row.action_url,
          action_label: row.action_label,
          is_active: row.is_active,
          likes_count: row.likes_count || 0,
          hearts_count: row.hearts_count || 0,
          fires_count: row.fires_count || 0,
          created_at: row.created_at,
          comments_count: row.announcement_comments?.[0]?.count ?? 0,
        }));
        setAnnouncements(mapped);
      }
    }

    fetchAnnouncements();
  }, []);

  const handleYearFilterChange = (yearId: string) => {
    setSelectedYearFilter(yearId);
    localStorage.setItem('dtu-student-year', yearId);
  };

  const handleToggleReaction = (announcementId: string, key: ReactionKey) => {
    const currentForAnn = userReactions[announcementId] || [];
    const alreadyReacted = currentForAnn.includes(key);
    const delta = alreadyReacted ? -1 : 1;

    const updatedForAnn = alreadyReacted
      ? currentForAnn.filter((r) => r !== key)
      : [...currentForAnn, key];

    const nextReactions = { ...userReactions, [announcementId]: updatedForAnn };
    setUserReactions(nextReactions);
    localStorage.setItem('dtu-ann-reactions', JSON.stringify(nextReactions));

    const colName =
      key === 'like' ? 'likes_count' : key === 'heart' ? 'hearts_count' : 'fires_count';

    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === announcementId
          ? { ...ann, [colName]: Math.max(0, (ann[colName] || 0) + delta) }
          : ann
      )
    );

    void supabase.rpc('toggle_announcement_reaction', {
      row_id: announcementId,
      reaction_type: key,
      delta,
    });
  };

  const handleToggleCommentsSection = async (announcementId: string) => {
    if (expandedCommentsId === announcementId) {
      setExpandedCommentsId(null);
      return;
    }

    setExpandedCommentsId(announcementId);

    if (!commentsByAnn[announcementId]) {
      try {
        setLoadingCommentsId(announcementId);
        const { data, error } = await supabase
          .from('announcement_comments')
          .select('*')
          .eq('announcement_id', announcementId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          setCommentsByAnn((prev) => ({
            ...prev,
            [announcementId]: data as AnnouncementComment[],
          }));
        }
      } finally {
        setLoadingCommentsId(null);
      }
    }
  };

  const handleAddComment = async (e: React.FormEvent, announcementId: string) => {
    e.preventDefault();
    const cleanName = studentName.trim();
    const cleanText = commentInput.trim();
    if (!cleanName || !cleanText || submittingComment) return;

    try {
      setSubmittingComment(true);
      localStorage.setItem('dtu-student-name', cleanName);

      const { data, error } = await supabase
        .from('announcement_comments')
        .insert([
          {
            announcement_id: announcementId,
            student_name: cleanName,
            comment_text: cleanText,
            is_admin_reply: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setCommentsByAnn((prev) => ({
          ...prev,
          [announcementId]: [...(prev[announcementId] || []), data as AnnouncementComment],
        }));
        setAnnouncements((prev) =>
          prev.map((ann) =>
            ann.id === announcementId
              ? { ...ann, comments_count: ann.comments_count + 1 }
              : ann
          )
        );
      }
      setCommentInput('');
    } finally {
      setSubmittingComment(false);
    }
  };

  const visibleAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      if (dismissedIds.includes(item.id)) return false;
      if (
        selectedYearFilter !== 'all' &&
        item.academic_year !== 'all' &&
        item.academic_year !== selectedYearFilter
      ) {
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
      
      {/* Hero Banner */}
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

      {/* Interactive Announcements Center */}
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
              const activeReactions = userReactions[item.id] || [];
              const isCommentsOpen = expandedCommentsId === item.id;
              const itemComments = commentsByAnn[item.id] || [];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`rounded-2xl border p-3.5 sm:p-4 space-y-3 shadow-2xs ${style.container}`}
                >
                  {/* Top Row: Content & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                          <span className="text-[10px] text-muted-foreground">
                            • {formatRelativeTime(item.created_at)}
                          </span>
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
                  </div>

                  {/* Interactive Bar: Reactions + Comments Toggle */}
                  <div className="pt-2.5 border-t border-border/30 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {REACTION_BUTTONS.map((btn) => {
                        const count =
                          btn.key === 'like'
                            ? item.likes_count
                            : btn.key === 'heart'
                            ? item.hearts_count
                            : item.fires_count;
                        const isSelected = activeReactions.includes(btn.key);

                        return (
                          <button
                            key={btn.key}
                            type="button"
                            onClick={() => handleToggleReaction(item.id, btn.key)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-primary/15 border-primary/50 text-primary scale-105'
                                : 'bg-card/80 hover:bg-card border-border/50 text-muted-foreground hover:text-foreground'
                            }`}
                            title={btn.label}
                          >
                            <span>{btn.emoji}</span>
                            <span>{count}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleCommentsSection(item.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                        isCommentsOpen
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card/80 hover:bg-card border-border/50 text-foreground'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>التعليقات ({item.comments_count})</span>
                    </button>
                  </div>

                  {/* Collapsible Comments Drawer */}
                  <AnimatePresence>
                    {isCommentsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-border/30 space-y-3">
                          {loadingCommentsId === item.id ? (
                            <div className="flex justify-center py-4">
                              <Loader2 className="w-5 h-5 text-primary animate-spin" />
                            </div>
                          ) : itemComments.length === 0 ? (
                            <p className="text-center text-xs text-muted-foreground py-2">
                              لا توجد تعليقات حتى الآن. كن أول من يعلق أو يسأل!
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                              {itemComments.map((c) => (
                                <div
                                  key={c.id}
                                  className={`p-2.5 rounded-xl text-xs space-y-1 ${
                                    c.is_admin_reply
                                      ? 'bg-primary/10 border border-primary/30'
                                      : 'bg-card/90 border border-border/50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-black text-foreground">
                                        {c.student_name}
                                      </span>
                                      {c.is_admin_reply && (
                                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
                                          <ShieldCheck className="w-3 h-3" /> الإدارة
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">
                                      {formatRelativeTime(c.created_at)}
                                    </span>
                                  </div>
                                  <p className="text-foreground/90 leading-relaxed">
                                    {c.comment_text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Comment Form */}
                          <form
                            onSubmit={(e) => handleAddComment(e, item.id)}
                            className="flex flex-col sm:flex-row gap-2"
                          >
                            <input
                              type="text"
                              required
                              maxLength={60}
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
                              placeholder="اسمك (مثال: أحمد - سكشن 4)"
                              className="sm:w-44 bg-card border border-border/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                required
                                maxLength={500}
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="اكتب سؤالك أو تعليقك هنا..."
                                className="flex-1 bg-card border border-border/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                              />
                              <button
                                type="submit"
                                disabled={submittingComment}
                                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>إرسال</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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