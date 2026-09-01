import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Cpu, Zap, Snowflake, Wrench, Car, Leaf } from 'lucide-react';
import { collegeData } from '../data/collegeData';
import { useTheme } from '../contexts/ThemeContext';

const departmentIcons = {
  mechatronics: Cpu,
  it: Zap,
  refrigeration: Snowflake,
  stamping: Wrench,
  autotronics: Car,
  renewable: Leaf,
};

export function CollegePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { animationsEnabled } = useTheme();

  return (
    <div>
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('collegeSubjects')}</h1>
        <p className="text-muted-foreground">
          مواد الكلية منظمة بطريقة سهلة للوصول السريع
        </p>
      </motion.div>

      <div className="space-y-8">
        {collegeData.map((year, yearIndex) => (
          <motion.div
            key={year.id}
            initial={animationsEnabled ? { y: 30, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: animationsEnabled ? yearIndex * 0.1 : 0 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 rtl:ml-2" />
              {t(year.nameKey)}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: animationsEnabled ? (yearIndex * 0.1 + deptIndex * 0.05) : 0 }}
                    whileHover={animationsEnabled && dept.enabled ? { y: -4 } : {}}
                    disabled={!dept.enabled}
                    className={`relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 ${
                      dept.enabled 
                        ? 'hover:shadow-md cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        dept.enabled 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <DeptIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground">{t(dept.nameKey)}</h3>
                    </div>
                    
                    {dept.enabled ? (
                      <p className="text-sm text-muted-foreground">
                        انقر للوصول لمواد القسم
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t('comingSoon')}
                      </p>
                    )}
                    
                    {dept.enabled && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    )}
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