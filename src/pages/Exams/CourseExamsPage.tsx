import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';
import { EXAMS_DATA, ExamItem } from '../../data/examsData';
import { collegeData } from '../../data/collegeData';

export function CourseExamsPage() {
  const { deptId, yearId, semesterId, courseId } = useParams<{
    deptId?: string;
    yearId?: string;
    semesterId?: string;
    courseId?: string;
  }>();
  const navigate = useNavigate();

  // الحصول على بيانات الفرقة والقسم بشكل آمن من collegeData
  const yearObj = collegeData.find((y: any) => y.id === yearId);
  const deptObj = yearObj?.departments?.find((d: any) => d.id === deptId);

  const exams: ExamItem[] = courseId ? (EXAMS_DATA[courseId] || []) : [];

  return (
    <div className="pt-20 pb-12 px-4 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/exams')}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        <span>العودة لقائمة المواد</span>
      </button>

      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs text-primary font-bold mb-1">
          <span>{deptObj?.id || deptId}</span> • <span>{yearObj?.id || yearId}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-foreground mb-2">
          اختبارات المادة ({courseId || 'عام'})
        </h1>
        <p className="text-xs text-muted-foreground">
          اختر الاختبار المطلوب للانتقال لنظام حل الأسئلة الإلكتروني
        </p>
      </div>

      {exams.length > 0 ? (
        <div className="space-y-3">
          {exams.map((exam: ExamItem) => (
            <div
              key={exam.id}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    exam.type === 'midterm' || exam.type === 'final'
                      ? 'bg-amber-500/10 text-amber-600'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {exam.type === 'lecture' && `محاضرة ${exam.lectureNumber || ''}`}
                    {exam.type === 'midterm' && 'اختبار ميدترم'}
                    {exam.type === 'final' && 'اختبار فاينل'}
                    {exam.type === 'quiz' && 'كويز سريع'}
                  </span>

                  {exam.isAiGenerated && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-purple-500/10 text-purple-600 font-bold">
                      <Sparkles className="w-2.5 h-2.5" />
                      مُولد بـ AI
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-foreground">{exam.title}</h3>
                {exam.description && (
                  <p className="text-xs text-muted-foreground">{exam.description}</p>
                )}

                <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
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
                </div>
              </div>

              <a
                href={exam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0"
              >
                <span>بدء الاختبار</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-6 bg-card border border-border/40 rounded-3xl">
          <CheckCircle2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-foreground mb-1">لا توجد اختبارات مضافة حالياً</h3>
          <p className="text-xs text-muted-foreground">جاري إعداد امتحانات هذه المادة بواسطة الذكاء الاصطناعي قريباً.</p>
        </div>
      )}
    </div>
  );
}