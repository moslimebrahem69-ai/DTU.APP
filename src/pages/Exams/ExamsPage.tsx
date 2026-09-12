import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  Bot,
  Monitor,
  Snowflake,
  Cpu,
  Car,
  SunMedium,
  Droplets,
  GraduationCap, 
  Layers,
  FileCheck2,
  LucideIcon
} from 'lucide-react';
import { collegeData, year1MechatronicsCourses } from '../../data/collegeData';

const DEPARTMENT_ICONS: Record<string, LucideIcon> = {
  mechatronics: Bot,
  it: Monitor,
  refrigeration: Snowflake,
  stamping: Cpu,
  autotronics: Car,
  renewable: SunMedium,
  waterTreatment: Droplets,
};

// بيانات مواد الفرقة الثانية ميكاترونكس
const year2MechatronicsCourses: Record<string, Array<{ id: string; name: string }>> = {
  semester1: [
    { id: 'pneumatics-hydraulics', name: 'تطبيقات النيوماتيك والهيدروليك' },
    { id: 'mechatronics-programming', name: 'برمجة لتطبيقات الميكاترونيكس' },
    { id: 'materials-selection', name: 'اختيار المواد' },
    { id: 'computer-control-basics', name: 'أساسيات التحكم بالحاسبات' },
    { id: 'plc', name: 'المتحكم المنطقي البرمجي (PLC)' },
  ],
  semester2: [
    { id: 'elec-elec-workshops', name: 'ورش كهربائية وإلكترونية' },
    { id: 'electromech-maintenance', name: 'صيانة الأنظمة الكهروميكانيكية' },
    { id: 'capstone-design', name: 'تصميم كابستون' },
    { id: 'mechatronics-systems', name: 'أنظمة الميكاترونيات' },
    { id: 'elective1', name: 'مقرر اختياري 1' },
    { id: 'projects-entrepreneurship', name: 'المشاريع وريادة الأعمال' },
  ]
};

export function ExamsPage() {
  const navigate = useNavigate();
  const [selectedYearId, setSelectedYearId] = useState<string | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [selectedSemKey, setSelectedSemKey] = useState<'semester1' | 'semester2' | null>(null);

  const selectedYear = collegeData.find((y: any) => y.id === selectedYearId);

  const getYearName = (yearObj: any) => {
    if (!yearObj) return '';
    const yearNames: Record<string, string> = {
      year1: 'الفرقة الأولى',
      year2: 'الفرقة الثانية',
      year3: 'الفرقة الثالثة',
      year4: 'الفرقة الرابعة',
    };
    return yearNames[yearObj.id] || yearObj.name || yearObj.id;
  };

  // ترتيب السنوات تصاعدياً (year1, year2, year3, year4)
  const sortedCollegeData = [...collegeData].sort((a: any, b: any) => {
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  // جلب المواد مباشرة حسب السنة والترم
  const getCoursesList = () => {
    if (!selectedSemKey) return [];
    if (selectedYearId === 'year1') {
      return year1MechatronicsCourses[selectedSemKey] || [];
    }
    if (selectedYearId === 'year2') {
      return year2MechatronicsCourses[selectedSemKey] || [];
    }
    return [];
  };

  const activeCourses = getCoursesList();

  return (
    <div className="pt-20 pb-12 px-3 sm:px-4 max-w-7xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>منصة الاختبارات الإلكترونية</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-foreground mb-2">
          اختبارات المحاضرات والامتحانات الذكية
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          اختر السنة والترم والمادة لمشاهدة الاختبارات المتاحة
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto pb-2">
        <button 
          onClick={() => { setSelectedYearId(null); setSelectedDeptId(null); setSelectedSemKey(null); }}
          className={`hover:text-primary transition-colors ${!selectedYearId ? 'font-bold text-primary' : ''}`}
        >
          السنوات الدراسية
        </button>
        {selectedYear && (
          <>
            <ChevronRight className="w-3 h-3 rotate-180 shrink-0" />
            <button 
              onClick={() => { setSelectedDeptId(null); setSelectedSemKey(null); }}
              className={`hover:text-primary transition-colors ${selectedYearId && !selectedDeptId ? 'font-bold text-primary' : ''}`}
            >
              {getYearName(selectedYear)}
            </button>
          </>
        )}
        {selectedDeptId && (
          <>
            <ChevronRight className="w-3 h-3 rotate-180 shrink-0" />
            <button 
              onClick={() => setSelectedSemKey(null)}
              className={`hover:text-primary transition-colors ${selectedDeptId && !selectedSemKey ? 'font-bold text-primary' : ''}`}
            >
              ميكاترونكس
            </button>
          </>
        )}
      </div>

      {/* الخطوة 1: اختيار السنة (تم ضبط الـ Grid ليكون عمودين في الموبايل و 4 أعمدة في الديسكتوب لتناسب الـ 4 فرق) */}
      {!selectedYearId && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {sortedCollegeData.map((year: any) => (
            <div
              key={year.id}
              onClick={() => setSelectedYearId(year.id)}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-right gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-xs sm:text-sm mb-1">{getYearName(year)}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">{year.departments?.length || 0} الأقسام المتاحة</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* الخطوة 2: اختيار القسم */}
      {selectedYearId && !selectedDeptId && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedYear?.departments?.map((dept: any) => {
            const IconComponent = DEPARTMENT_ICONS[dept.id] || GraduationCap;
            return (
              <div
                key={dept.id}
                onClick={() => {
                  if (dept.enabled) {
                    setSelectedDeptId(dept.id);
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl bg-card border border-border/60 transition-all shadow-xs flex items-center gap-4 ${
                  dept.enabled ? 'hover:border-primary/50 cursor-pointer group' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-sm truncate">{dept.name}</h3>
                    {dept.enabled && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium shrink-0">متاح</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.enabled ? 'عرض التيرمات والمواد' : 'قريباً'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* الخطوة 3: اختيار الترم */}
      {selectedYearId && selectedDeptId && !selectedSemKey && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div
            onClick={() => setSelectedSemKey('semester1')}
            className="p-5 sm:p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">الترم الأول</h3>
              <p className="text-xs text-muted-foreground">عرض اختبارات ومواد الترم الأول</p>
            </div>
          </div>

          <div
            onClick={() => setSelectedSemKey('semester2')}
            className="p-5 sm:p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">الترم الثاني</h3>
              <p className="text-xs text-muted-foreground">عرض اختبارات ومواد الترم الثاني</p>
            </div>
          </div>
        </div>
      )}

      {/* الخطوة 4: عرض كروت المواد مباشرة */}
      {selectedYearId && selectedDeptId && selectedSemKey && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              مواد {selectedSemKey === 'semester1' ? 'الترم الأول' : 'الترم الثاني'} - ({getYearName(selectedYear)})
            </h2>
            <button 
              onClick={() => setSelectedSemKey(null)}
              className="text-xs text-primary hover:underline font-medium"
            >
              تغيير الترم
            </button>
          </div>

          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/exams/${selectedDeptId}/${selectedYearId}/${selectedSemKey}/${course.id}`)}
                  className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-foreground text-xs sm:text-sm truncate">{course.name}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs bg-primary/10 text-primary px-2.5 sm:px-3 py-1.5 rounded-xl font-medium shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    ابدأ الاختبار
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border/60">
              <p className="text-sm text-muted-foreground">لا توجد مواد مضافة حالياً لهذا الترم.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}