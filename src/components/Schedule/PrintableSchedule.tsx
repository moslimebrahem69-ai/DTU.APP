import { forwardRef } from 'react';
import { Calendar, Clock, MapPin, User, GraduationCap } from 'lucide-react';

interface PeriodTime {
  period: number;
  time: string;
}

interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  periods: number[];
  course: string;
  type: 'lecture' | 'section';
  instructor?: string;
  location?: string;
  sections?: number[];
}

interface PrintableScheduleProps {
  sectionNumber: number;
  scheduleData: ScheduleItem[];
  periods: PeriodTime[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const DAYS_ARABIC: Record<string, string> = {
  Monday: 'الأثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس'
};

export const PrintableSchedule = forwardRef<HTMLDivElement, PrintableScheduleProps>(
  ({ sectionNumber, scheduleData, periods }, ref) => {
    return (
      /* الغلاف الخارجي (Wrapper): وظيفته الوحيدة يرمي العنصر بره الشاشة من غير ما يبوظ أبعاده */
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', width: 0, height: 0, overflow: 'hidden' }}>
        
        {/* العنصر الداخلي اللي هيتصور (واخد أبعاده الطبيعية 100%) */}
        <div 
          ref={ref}
          className="w-[900px] bg-white text-black p-8 font-sans" 
          dir="rtl"
          style={{ backgroundColor: 'white', color: 'black', width: '900px' }}
        >
          {/* Header */}
          <div className="border-b-4 border-blue-600 pb-6 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                الجدول الدراسي - سكشن {sectionNumber}
              </h1>
              <p className="text-gray-600 font-bold text-lg">الفرقة الثانية - ميكاترونكس | جامعة الدلتا التكنولوجية (DTU)</p>
            </div>
            <div className="text-left bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
              <p className="text-sm font-bold text-blue-800">العام الجامعي: 2026/2027</p>
              <p className="text-sm font-bold text-blue-800">الفصل الدراسي الأول</p>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="space-y-6">
            {DAYS.map((dayKey) => {
              const dayItems = scheduleData.filter((item) => item.day === dayKey);
              if (dayItems.length === 0) return null;

              return (
                <div key={dayKey} className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm bg-gray-50">
                  <div className="bg-blue-600 text-white p-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <h2 className="text-xl font-black">يوم {DAYS_ARABIC[dayKey]}</h2>
                  </div>
                  
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {dayItems.map((item) => {
                      const periodDetails = periods.filter((p) => item.periods.includes(p.period));
                      const timeRange = periodDetails.length > 1 
                        ? `${periodDetails[0].time.split(' - ')[0]} - ${periodDetails[periodDetails.length - 1].time.split(' - ')[1]}`
                        : periodDetails[0]?.time;
                      
                      const isLecture = item.type === 'lecture';

                      return (
                        <div key={item.id} className={`p-4 rounded-xl border-2 ${isLecture ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-white'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{item.course}</h3>
                            <span className={`text-xs font-black px-2 py-1 rounded-md ${isLecture ? 'bg-blue-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                              {isLecture ? 'محاضرة' : 'سكشن'}
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 mt-3">
                            <div className="flex items-center gap-1.5 text-sm text-gray-700 font-bold">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span dir="ltr">{timeRange}</span>
                              <span className="text-xs text-gray-500 ml-1">(فترة {item.periods.join(',')})</span>
                            </div>
                            {item.instructor && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-700 font-semibold">
                                <User className="w-4 h-4 text-blue-500" />
                                {item.instructor}
                              </div>
                            )}
                            {item.location && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-900 font-black mt-1">
                                <MapPin className="w-4 h-4 text-rose-500" />
                                {item.location}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm font-bold border-t border-gray-200 pt-4">
            تم إنشاء هذا الجدول عبر منصة DTU Learning Hub
          </div>
        </div>
      </div>
    );
  }
);