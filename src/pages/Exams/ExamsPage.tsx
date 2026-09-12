import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { collegeData } from '../../data/collegeData';

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

// بيانات وهمية للفرقة الأولى (أو يمكن ربطها لاحقاً)
const year1MechatronicsCourses: Record<string, Array<{ id: string; name: string }>> = {
  semester1: [],
  semester2: []
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
    <div className="pt-16 pb-12 px-3 sm:px-6 max-w-7xl mx-auto" dir="rtl">
      {/* Header محسّن ومضغوط للموبايل */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl mx-auto mb-5"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-2">
          <Sparkles className="w-3 h-3" />
          <span>منصة الاختبارات الإلكترونية</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-black text-foreground tracking-tight mb-1">
          اختبارات المحاضرات والامتحانات الذكية
        </h1>
        <p className="text-[11px] sm:text-xs text-muted-foreground">
          اختر السنة والترم والمادة لمشاهدة الاختبارات المتاحة
        </p>
      </motion.div>

      {/* Breadcrumb مدمج */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 overflow-x-auto pb-1 no-scrollbar px-1">
        <button 
          onClick={() => { setSelectedYearId(null); setSelectedDeptId(null); setSelectedSemKey(null); }}
          className={`hover:text-primary transition-colors shrink-0 ${!selectedYearId ? 'font-bold text-primary' : ''}`}
        >
          السنوات الدراسية
        </button>
        {selectedYear && (
          <>
            <ChevronRight className="w-3 h-3 rotate-180 shrink-0 text-muted-foreground/60" />
            <button 
              onClick={() => { setSelectedDeptId(null); setSelectedSemKey(null); }}
              className={`hover:text-primary transition-colors shrink-0 ${selectedYearId && !selectedDeptId ? 'font-bold text-primary' : ''}`}
            >
              {getYearName(selectedYear)}
            </button>
          </>
        )}
        {selectedDeptId && (
          <>
            <ChevronRight className="w-3 h-3 rotate-180 shrink-0 text-muted-foreground/60" />
            <button 
              onClick={() => setSelectedSemKey(null)}
              className={`hover:text-primary transition-colors shrink-0 ${selectedDeptId && !selectedSemKey ? 'font-bold text-primary' : ''}`}
            >
              ميكاترونكس
            </button>
          </>
        )}
      </div>

      {/* الخطوة 1: اختيار السنة (تصميم مدمج وشيك جداً للموبايل عمودين) */}
      {!selectedYearId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
        >
          {sortedCollegeData.map((year: any) => (
            <div
              key={year.id}
              onClick={() => setSelectedYearId(year.id)}
              className="p-3.5 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-xs sm:text-sm mb-0.5">{getYearName(year)}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{year.departments?.length || 0} أقسام متاحة</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* الخطوة 2: اختيار القسم */}
      {selectedYearId && !selectedDeptId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
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
                className={`p-3.5 sm:p-5 rounded-2xl bg-card border border-border/60 transition-all shadow-2xs flex items-center gap-3.5 ${
                  dept.enabled ? 'hover:border-primary/50 cursor-pointer group' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="font-bold text-foreground text-xs sm:text-sm truncate">{dept.name}</h3>
                    {dept.enabled && <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold shrink-0">متاح</span>}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{dept.enabled ? 'عرض التيرمات والمواد' : 'قريباً'}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* الخطوة 3: اختيار الترم */}
      {selectedYearId && selectedDeptId && !selectedSemKey && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto"
        >
          <div
            onClick={() => setSelectedSemKey('semester1')}
            className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-foreground text-xs sm:text-sm mb-0.5">الترم الأول</h3>
              <p className="text-[10px] text-muted-foreground">عرض اختبارات ومواد الترم الأول</p>
            </div>
          </div>

          <div
            onClick={() => setSelectedSemKey('semester2')}
            className="p-4 sm:p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-foreground text-xs sm:text-sm mb-0.5">الترم الثاني</h3>
              <p className="text-[10px] text-muted-foreground">عرض اختبارات ومواد الترم الثاني</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* الخطوة 4: عرض كروت المواد */}
      {selectedYearId && selectedDeptId && selectedSemKey && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5 mb-3">
            <h2 className="text-xs sm:text-sm font-bold text-foreground">
              مواد {selectedSemKey === 'semester1' ? 'الترم الأول' : 'الترم الثاني'} - ({getYearName(selectedYear)})
            </h2>
            <button 
              onClick={() => setSelectedSemKey(null)}
              className="text-[11px] text-primary hover:underline font-bold"
            >
              تغيير الترم
            </button>
          </div>

          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/exams/${selectedDeptId}/${selectedYearId}/${selectedSemKey}/${course.id}`)}
                  className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-foreground text-xs truncate">{course.name}</span>
                  </div>
                  <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-xl font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    ابدأ
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-card rounded-2xl border border-border/60">
              <p className="text-xs text-muted-foreground">لا توجد مواد مضافة حالياً لهذا الترم.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}