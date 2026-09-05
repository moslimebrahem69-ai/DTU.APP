import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Cpu, Zap, Snowflake, Wrench, Car, Leaf, Droplets } from 'lucide-react';
import { collegeData } from '../data/collegeData';
import { useTheme } from '../contexts/ThemeContext';
import { GlobalSearch } from '../components/Common/GlobalSearch';

// Icon mapping dictionary
const departmentIcons = {
  mechatronics: Cpu,
  it: Zap,
  refrigeration: Snowflake,
  stamping: Wrench,
  autotronics: Car,
  renewable: Leaf,
  waterTreatment: Droplets,
};

export function CollegePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { animationsEnabled } = useTheme();

  return (
    <div className="space-y-4 sm:space-y-6 pt-2 pb-8">
      {/* Page Header & Global Search */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-2.5"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('collegeSubjects')}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            مواد الكلية منظمة بطريقة سهلة للوصول السريع
          </p>
        </div>

        {/* Global Search Component */}
        <div className="pt-1">
          <GlobalSearch />
        </div>
      </motion.div>

      {/* Academic Years & Departments Section */}
      <div className="space-y-5 sm:space-y-8">
        {collegeData.map((year, yearIndex) => (
          <motion.div
            key={year.id}
            initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: animationsEnabled ? yearIndex * 0.08 : 0 }}
          >
            {/* Year Title */}
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-2.5 flex items-center">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 rtl:ml-1.5 text-primary" />
              {t(year.nameKey)}
            </h2>
            
            {/* Departments Grid: 2 columns on mobile, 3 on tablet/desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
              {year.departments.map((dept, deptIndex) => {
                const DeptIcon = departmentIcons[dept.id as keyof typeof departmentIcons] || Users;
                
                return (
                  <motion.button
                    key={dept.id}
                    onClick={() => {
                      if (dept.enabled) {
                        navigate(`/college/${year.id}/${dept.id}`);
                      }
                    }}
                    initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: animationsEnabled ? (yearIndex * 0.08 + deptIndex * 0.04) : 0 }}
                    whileHover={animationsEnabled && dept.enabled ? { y: -2 } : {}}
                    disabled={!dept.enabled}
                    className={`relative bg-card border border-border/80 rounded-xl p-3 sm:p-4 text-right transition-all duration-200 flex flex-col justify-between ${
                      dept.enabled 
                        ? 'hover:shadow-md cursor-pointer active:scale-[0.98]' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      {/* Department Icon & Status Light */}
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          dept.enabled 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <DeptIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        
                        {dept.enabled && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>

                      {/* Department Name */}
                      <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-1 mb-0.5">
                        {t(dept.nameKey)}
                      </h3>
                    </div>
                    
                    {/* Status Subtitle */}
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                      {dept.enabled ? 'عرض المواد' : t('comingSoon')}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}