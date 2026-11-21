import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  Clock,
  HelpCircle,
  CheckCircle2,
  Play,
  Code2,
  X,
  Loader2,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EXAMS_DATA, ExamItem } from "../../data/examsData";
import {
  collegeData,
  year1MechatronicsCourses,
  year1RenewableCourses,
  year2MechatronicsCourses,
  year3MechatronicsCourses,
  Year,
  Department,
  Course,
} from "../../data/collegeData";
import { supabase } from "../../lib/supabase";

interface DynamicExamRow {
  id: string;
  title: string;
  description: string | null;
  exam_type: "lecture" | "midterm" | "final" | "quiz";
  lecture_number: number | null;
  question_count: number | null;
  duration_minutes: number | null;
  source_type: "html" | "link";
  html_code: string | null;
  exam_url: string | null;
  is_ai_generated: boolean;
  views_count?: number;
}

interface UnifiedExamItem extends ExamItem {
  sourceType: "html" | "link";
  htmlCode?: string | null;
  viewsCount?: number;
  isDynamic?: boolean;
}

const COURSE_ID_ALIASES: Record<string, string[]> = {
  plc: ["plc", "plc-control"],
  "material-selection": ["material-selection", "materials-selection"],
  "pc-control-basics": ["pc-control-basics", "computer-control-basics"],
  "matlab-mechatronics": ["matlab-mechatronics", "mechatronics-programming"],
};

function findCourseInfo(
  yearId?: string,
  deptId?: string,
  semesterId?: string,
  courseId?: string
): Course | undefined {
  if (!yearId || !deptId || !semesterId || !courseId) return undefined;
  let map: Record<string, Course[]> | undefined;
  if (deptId === "mechatronics") {
    if (yearId === "year1") map = year1MechatronicsCourses;
    if (yearId === "year2") map = year2MechatronicsCourses;
    if (yearId === "year3") map = year3MechatronicsCourses;
  } else if (deptId === "renewable" && yearId === "year1") {
    map = year1RenewableCourses;
  }
  return map?.[semesterId]?.find((c) => c.id === courseId);
}

export function CourseExamsPage() {
  const { deptId, yearId, semesterId, courseId } = useParams<{
    deptId?: string;
    yearId?: string;
    semesterId?: string;
    courseId?: string;
  }>();
  const navigate = useNavigate();

  const [dynamicExams, setDynamicExams] = useState<UnifiedExamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHtmlExam, setActiveHtmlExam] = useState<UnifiedExamItem | null>(null);

  const yearObj = collegeData.find((y: Year) => y.id === yearId);
  const deptObj = yearObj?.departments.find((d: Department) => d.id === deptId);
  const courseObj = findCourseInfo(yearId, deptId, semesterId, courseId);

  useEffect(() => {
    async function fetchDynamicExams() {
      if (!courseId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const dbSemester = semesterId === "semester1" ? "first" : "second";
        const aliases = COURSE_ID_ALIASES[courseId] || [courseId];

        const { data, error } = await supabase
          .from("exams")
          .select("*")
          .in("course_id", aliases)
          .eq("semester", dbSemester)
          .order("created_at", { ascending: false });

        if (!error && data) {
          const mapped: UnifiedExamItem[] = (data as DynamicExamRow[]).map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description || undefined,
            type: row.exam_type,
            lectureNumber: row.lecture_number || undefined,
            url: row.exam_url || "",
            questionCount: row.question_count || undefined,
            durationMinutes: row.duration_minutes || undefined,
            isAiGenerated: row.is_ai_generated,
            sourceType: row.source_type,
            htmlCode: row.html_code,
            viewsCount: row.views_count || 0,
            isDynamic: true,
          }));
          setDynamicExams(mapped);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicExams();
  }, [courseId, semesterId]);

  const trackExamStart = (exam: UnifiedExamItem) => {
    if (!exam.isDynamic) return;
    setDynamicExams((prev) =>
      prev.map((item) =>
        item.id === exam.id
          ? { ...item, viewsCount: (item.viewsCount || 0) + 1 }
          : item
      )
    );
    void supabase.rpc("increment_exam_views", { row_id: exam.id });
  };

  const staticExams: UnifiedExamItem[] = useMemo(() => {
    if (!courseId) return [];
    const aliases = COURSE_ID_ALIASES[courseId] || [courseId];
    const collected: ExamItem[] = [];
    for (const key of aliases) {
      if (EXAMS_DATA[key]) {
        collected.push(...EXAMS_DATA[key]);
      }
    }
    return collected.map((item) => ({
      ...item,
      sourceType: "link",
      isDynamic: false,
    }));
  }, [courseId]);

  const allExams = useMemo(() => {
    return [...dynamicExams, ...staticExams];
  }, [dynamicExams, staticExams]);

  return (
    <div className="pt-20 pb-12 px-4 max-w-5xl mx-auto" dir="rtl">
      <button
        onClick={() => navigate("/exams")}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        <span>العودة لقائمة المواد</span>
      </button>

      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs text-primary font-bold mb-1">
          <span>{deptObj?.name || deptId}</span> • <span>{yearObj?.name || yearId}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-foreground mb-2">
          اختبارات مادة {courseObj?.name || courseId || "عام"}
        </h1>
        <p className="text-xs text-muted-foreground">
          اختر الاختبار المطلوب للانتقال لنظام حل الأسئلة التفاعلي
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : allExams.length > 0 ? (
        <div className="space-y-3">
          {allExams.map((exam: UnifiedExamItem) => (
            <div
              key={exam.id}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      exam.type === "midterm" || exam.type === "final"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {exam.type === "lecture" && `محاضرة ${exam.lectureNumber || ""}`}
                    {exam.type === "midterm" && "اختبار ميدترم"}
                    {exam.type === "final" && "اختبار فاينل"}
                    {exam.type === "quiz" && "كويز سريع"}
                  </span>

                  {exam.sourceType === "html" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold">
                      <Code2 className="w-3 h-3" />
                      اختبار تفاعلي مدمج
                    </span>
                  )}

                  {exam.isAiGenerated && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-emerald-500/10 text-emerald-600 font-bold">
                      <Sparkles className="w-2.5 h-2.5" />
                      تقييم فوري
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-foreground">{exam.title}</h3>
                {exam.description && (
                  <p className="text-xs text-muted-foreground">{exam.description}</p>
                )}

                <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1 flex-wrap">
                  {exam.questionCount && (
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {exam.questionCount} سؤال
                    </span>
                  )}
                  {exam.durationMinutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.durationMinutes} دقيقة
                    </span>
                  )}
                  {(exam.viewsCount || 0) > 0 && (
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <Eye className="w-3.5 h-3.5" />
                      {exam.viewsCount} محاولة
                    </span>
                  )}
                </div>
              </div>

              {exam.sourceType === "html" && exam.htmlCode ? (
                <button
                  type="button"
                  onClick={() => {
                    trackExamStart(exam);
                    setActiveHtmlExam(exam);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0 shadow-sm cursor-pointer"
                >
                  <span>بدء الاختبار الآن</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              ) : (
                <a
                  href={exam.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExamStart(exam)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  <span>بدء الاختبار</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-6 bg-card border border-border/40 rounded-3xl">
          <CheckCircle2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-foreground mb-1">
            لا توجد اختبارات مضافة حالياً
          </h3>
          <p className="text-xs text-muted-foreground">
            جاري إعداد امتحانات هذه المادة قريباً.
          </p>
        </div>
      )}

      {/* Full-Screen Interactive HTML Exam Player */}
      <AnimatePresence>
        {activeHtmlExam && activeHtmlExam.htmlCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
              <div className="overflow-hidden">
                <h2 className="font-black text-sm sm:text-base truncate">
                  {activeHtmlExam.title}
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  {courseObj?.name || "نظام الاختبارات التفاعلية"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveHtmlExam(null)}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" /> إنهاء وإغلاق
              </button>
            </div>

            <div className="flex-1 bg-white overflow-hidden">
              <iframe
                srcDoc={activeHtmlExam.htmlCode}
                title={activeHtmlExam.title}
                sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}