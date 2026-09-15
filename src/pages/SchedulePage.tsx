import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, MapPin, Filter, Sparkles, BookOpen, Layers, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface PeriodTime {
  period: number;
  time: string;
}

const PERIODS: PeriodTime[] = [
  { period: 1, time: '09:00 - 10:30' },
  { period: 2, time: '10:40 - 12:10' },
  { period: 3, time: '12:30 - 02:00' },
  { period: 4, time: '02:00 - 03:30' },
  { period: 5, time: '03:30 - 05:00' },
];

interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  periods: number[]; // الفترات
  course: string;
  type: 'lecture' | 'section';
  instructor?: string;
  location?: string;
  sections?: number[]; // لو سكشن، مخصص لسكاشن معينة. لو undefined يعني كل السكاشن (محاضرة عامة)
}

const DAYS_MAP = [
  { key: 'Monday', label: 'الأثنين' },
  { key: 'Tuesday', label: 'الثلاثاء' },
  { key: 'Wednesday', label: 'الأربعاء' },
  { key: 'Thursday', label: 'الخميس' },
] as const;

// بيانات الجدول المستخرجة بدقة متناهية من الجدول
const SCHEDULE_DATA: ScheduleItem[] = [
  // --- يوم الأثنين ---
  {
    id: 'mon-lec-1',
    day: 'Monday',
    periods: [2],
    course: 'التحكم بالحاسبات',
    type: 'lecture',
    instructor: 'د/ حامد حميدة',
    location: 'مدرج م4'
  },
  {
    id: 'mon-sec-1',
    day: 'Monday',
    periods: [1],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [1,2]
  },
  {
    id: 'mon-sec-2',
    day: 'Monday',
    periods: [1],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [3]
  },
  {
    id: 'mon-sec-3',
    day: 'Monday',
    periods: [4],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'د/ تقى',
    location: 'ق الاختبارات',
    sections: [3,4]
  },
  {
    id: 'mon-sec-4-1',
    day: 'Monday',
    periods: [3],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل الهيدروليك',
    sections: [4]
  },
  {
    id: 'mon-sec-4-2',
    day: 'Monday',
    periods: [1],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ عبد القادر',
    location: 'معمل الميكاترونيات',
    sections: [4]
  },
  {
    id: 'mon-sec-5',
    day: 'Monday',
    periods: [4],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ عبد القادر',
    location: 'معمل الميكاترونيات',
    sections: [5]
  },
  {
    id: 'mon-sec-6',
    day: 'Monday',
    periods: [3],
    course: 'PLC',
    type: 'section',
    instructor: '',
    location: 'معمل الميكاترونيات',
    sections: [6]
  },
  {
    id: 'mon-sec-7-1',
    day: 'Monday',
    periods: [4],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل حاسب 1',
    sections: [7]
  },
  {
    id: 'mon-sec-7-2',
    day: 'Monday',
    periods: [1],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ محمد رمضان',
    location: 'معمل PLC',
    sections: [7]
  },
  {
    id: 'mon-sec-9',
    day: 'Monday',
    periods: [1],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'د/ تقى',
    location: 'ق الاختبارات',
    sections: [9,10]
  },
  {
    id: 'mon-sec-12',
    day: 'Monday',
    periods: [4],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [12]
  },
  {
    id: 'mon-sec-13-1',
    day: 'Monday',
    periods: [1],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل ت حاسب 1',
    sections: [13,12]
  },
  {
    id: 'mon-sec-13-2',
    day: 'Monday',
    periods: [3],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [13]
  },

  // --- يوم الثلاثاء ---
  {
    id: 'tue-lec-1',
    day: 'Tuesday',
    periods: [1],
    course: 'ت الهيدروليك',
    type: 'lecture',
    instructor: 'د/ محمد فرحات',
    location: 'مدرج م5'
  },
  {
    id: 'tue-lec-2',
    day: 'Tuesday',
    periods: [2],
    course: 'برمجة تطبيقات الميكاترونكس',
    type: 'lecture',
    instructor: 'أ.د/ محمد عزت',
    location: 'مدرج م5'
  },
  {
    id: 'tue-sec-1',
    day: 'Tuesday',
    periods: [3],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [1,2]
  },
  {
    id: 'tue-sec-2',
    day: 'Tuesday',
    periods: [4],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ عبد القادر',
    location: 'معمل PLC',
    sections: [2]
  },
  {
    id: 'tue-sec-3',
    day: 'Tuesday',
    periods: [3],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'ق الاختبارات',
    sections: [3]
  },
   {
    id: 'tue-sec-4',
    day: 'Tuesday',
    periods: [3],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'ق الاختبارات',
    sections: [6]
  },
  {
    id: 'tue-sec-5',
    day: 'Tuesday',
    periods: [4],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'د/ تقى',
    location: 'ق الاختبارات',
    sections: [5,6]
  },
  {
    id: 'tue-sec-6',
    day: 'Tuesday',
    periods: [3],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [13]
  },
  {
    id: 'tue-sec-11-1',
    day: 'Tuesday',
    periods: [4],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل ت حاسب 1',
    sections: [11]
  },
  {
    id: 'tue-sec-11-2',
    day: 'Tuesday',
    periods: [3],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ عبد القادر',
    location: 'معمل PLC',
    sections: [11]
  },
  {
    id: 'tue-sec-12',
    day: 'Tuesday',
    periods: [4],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ محمد رمضان',
    location: 'معمل ميكاترونيات',
    sections: [12]
  },
  {
    id: 'tue-sec-13',
    day: 'Tuesday',
    periods: [4],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [7]
  },

  // --- يوم الأربعاء ---
  {
    id: 'wed-lec-1',
    day: 'Wednesday',
    periods: [1],
    course: 'إختيار المواد',
    type: 'lecture',
    instructor: 'د/ أسماء سعد',
    location: 'مدرج م5'
  },
  {
    id: 'wed-lec-2',
    day: 'Wednesday',
    periods: [2],
    course: 'PLC',
    type: 'lecture',
    instructor: 'أ.د/ هيثم عزازي',
    location: 'مدرج م5'
  },
  {
    id: 'wed-sec-4',
    day: 'Wednesday',
    periods: [3],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [5]
  },
  {
    id: 'wed-sec-5',
    day: 'Wednesday',
    periods: [3],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'د/ تقى',
    location: 'ق الاختبارات',
    sections: [7,8]
  },
  {
    id: 'wed-sec-7-1',
    day: 'Wednesday',
    periods: [3],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل الهيدروليك',
    sections: [11]
  },
  {
    id: 'wed-sec-7-2',
    day: 'Wednesday',
    periods: [4],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [8]
  },
  {
    id: 'wed-sec-8-1',
    day: 'Wednesday',
    periods: [4],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ سيد',
    location: 'معمل الهيدروليك',
    sections: [9]
  },

  
  {
    id: 'wed-sec-13-2',
    day: 'Wednesday',
    periods: [4],
    course: 'التحكم بالحاسبات',
    type: 'section',
    instructor: 'م/ منار',
    location: 'ق الاختبارات',
    sections: [11,12,13]
  },

  // --- يوم الخميس ---
  {
    id: 'thu-sec-1',
    day: 'Thursday',
    periods: [3],
    course: 'إختيار المواد',
    type: 'section',
    instructor: 'م/ فاطمة',
    location: 'مدرج م4',
    sections: [1,2,3,4,5,6]
  },
   {
    id: 'thu-sec-2',
    day: 'Thursday',
    periods: [4],
    course: 'إختيار المواد',
    type: 'section',
    instructor: 'م/ فاطمة',
    location: 'مدرج م4',
    sections: [7,8,9,10,11,12,13]
  },
  {
    id: 'thu-sec-3',
    day: 'Thursday',
    periods: [4],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [1]
  },
  {
    id: 'thu-sec-4',
    day: 'Thursday',
    periods: [2],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [1,2]
  },
  {
    id: 'thu-sec-5',
    day: 'Thursday',
    periods: [2],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [3]
  },
  {
    id: 'thu-sec-6',
    day: 'Thursday',
    periods: [4],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [4]
  },
  {
    id: 'thu-sec-7',
    day: 'Thursday',
    periods: [1],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [5]
  },
  {
    id: 'thu-sec-8',
    day: 'Thursday',
    periods: [4],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [6]
  },
  {
    id: 'thu-sec-8-1',
    day: 'Thursday',
    periods: [3],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [8]
  },
  {
    id: 'thu-sec-8-2',
    day: 'Thursday',
    periods: [1],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [8,9]
  },
  {
    id: 'thu-sec-8-3',
    day: 'Thursday',
    periods: [1],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [10]
  },
  {
    id: 'thu-sec-9-1',
    day: 'Thursday',
    periods: [3],
    course: 'Matlab',
    type: 'section',
    instructor: 'م/ منار',
    location: 'معمل CNC',
    sections: [10]
  },
  {
    id: 'thu-sec-9-2',
    day: 'Thursday',
    periods: [2],
    course: 'هيدروليك',
    type: 'section',
    instructor: 'م/ صبري',
    location: 'معمل الهيدروليك',
    sections: [10]
  },
  {
    id: 'thu-sec-9-3',
    day: 'Thursday',
    periods: [3],
    course: 'PLC',
    type: 'section',
    instructor: 'م/ تقى',
    location: 'معمل PLC',
    sections: [9]
  },


  
];

export function SchedulePage() {
  const { animationsEnabled } = useTheme();

  // الحالة للسكشن المختار (0 تعني عرض جميع السكاشن)
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'ALL'>('ALL');

  // وظيفة لتحديد اليوم الحالي تلقائياً عند الضغط
  const handleSelectToday = () => {
    const todayIndex = new Date().getDay(); // 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday
    switch (todayIndex) {
      case 1: setSelectedDay('Monday'); break;
      case 2: setSelectedDay('Tuesday'); break;
      case 3: setSelectedDay('Wednesday'); break;
      case 4: setSelectedDay('Thursday'); break;
      default: setSelectedDay('Monday'); break; // افتراضي لأول الأسبوع لو كان جمعة أو سبت
    }
  };

  // فلترة المواد بناءً على السكشن واليوم
  const filteredSchedule = useMemo(() => {
    return SCHEDULE_DATA.filter((item) => {
      // فلتر اليوم
      if (selectedDay !== 'ALL' && item.day !== selectedDay) {
        return false;
      }
      // فلتر السكشن
      if (selectedSection !== 0) {
        if (item.type === 'section' && item.sections) {
          return item.sections.includes(selectedSection);
        }
      }
      return true;
    });
  }, [selectedSection, selectedDay]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-2 sm:px-4 py-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2 mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
          <Sparkles className="h-4 w-4" />
          <span>جدول محاضرات وسكاشن الفرقة الثانية - ميكاترونكس</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-foreground">
          الجدول الدراسي التفاعلي 📅
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          اختر رقم السكشن واليوم لمشاهدة جميع المحاضرات والسكاشن الخاصة بك بدقة متناهية
        </p>
      </motion.div>

      {/* Control Panel / Filters */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border/80 rounded-3xl p-4 sm:p-6 shadow-xl space-y-5"
      >
        {/* Section Picker */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-primary" /> اختر رقم السكشن (1 - 13):
            </span>
            {selectedSection !== 0 && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                تم اختيار سكشن {selectedSection}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedSection(0)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                selectedSection === 0
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-background hover:bg-accent text-muted-foreground border-border'
              }`}
            >
              جميع السكاشن
            </button>
            {Array.from({ length: 13 }, (_, i) => i + 1).map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`w-10 h-10 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer border flex items-center justify-center ${
                  selectedSection === sec
                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                    : 'bg-background hover:bg-accent text-foreground border-border'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Days Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/40">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedDay('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedDay === 'ALL'
                  ? 'bg-foreground text-background font-bold shadow'
                  : 'bg-background text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              كل الأيام
            </button>
            {DAYS_MAP.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedDay === d.key
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-background text-muted-foreground border-border hover:bg-accent'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <Button
            onClick={handleSelectToday}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs font-bold border-primary/40 text-primary hover:bg-primary/10 cursor-pointer"
          >
            <Calendar className="h-4 w-4 ml-1.5" /> جدول اليوم
          </Button>
        </div>
      </motion.div>

      {/* Schedule Display Grid */}
      <div className="space-y-4">
        {DAYS_MAP.map((d) => {
          if (selectedDay !== 'ALL' && selectedDay !== d.key) return null;

          const dayItems = filteredSchedule.filter((item) => item.day === d.key);

          return (
            <motion.div
              key={d.key}
              initial={animationsEnabled ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/80 rounded-3xl p-4 sm:p-6 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-black text-foreground">
                    يوم {d.label}
                  </h2>
                </div>
                <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {dayItems.length} حصة/محاضرة
                </span>
              </div>

              {dayItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm flex flex-col items-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground/40" />
                  <span>لا توجد محاضرات أو سكاشن مسجلة لهذا السكشن في يوم {d.label} 🎉</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dayItems.map((item) => {
                    const periodDetails = PERIODS.filter((p) => item.periods.includes(p.period));
                    const timeRange = periodDetails.length > 1 
                      ? `${periodDetails[0].time.split(' - ')[0]} - ${periodDetails[periodDetails.length - 1].time.split(' - ')[1]}`
                      : periodDetails[0]?.time;

                    const isLecture = item.type === 'lecture';

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all space-y-2.5 relative overflow-hidden ${
                          isLecture
                            ? 'bg-primary/5 border-primary/30 hover:border-primary/60 shadow-xs'
                            : 'bg-background/80 border-border/70 hover:border-border shadow-xs'
                        }`}
                      >
                        {/* Top Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                              isLecture
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            }`}
                          >
                            {isLecture ? 'محاضرة عامة' : `سكشن ${item.sections ? item.sections.join(', ') : ''}`}
                          </span>

                          <span className="text-[11px] font-mono font-bold text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> الفترات: {item.periods.join(', ')}
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-foreground">
                            {item.course}
                          </h3>
                          <p className="text-xs text-primary font-mono font-bold">{timeRange}</p>
                        </div>

                        {/* Instructor & Location */}
                        <div className="pt-2 border-t border-border/40 text-xs text-muted-foreground space-y-1">
                          {item.instructor && (
                            <div className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="font-semibold">{item.instructor}</span>
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              <span className="font-bold text-foreground">{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}