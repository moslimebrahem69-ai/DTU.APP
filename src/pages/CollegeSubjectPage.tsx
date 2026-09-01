import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FileText, BookOpen, ClipboardList, StickyNote } from 'lucide-react';
import { year1MechatronicsCourses, year3MechatronicsCourses } from '../data/collegeData';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useTheme } from '../contexts/ThemeContext';

const materialIcons = {
  lectures: FileText,
  sheets: ClipboardList,
  exams: BookOpen,
  notes: StickyNote,
};

export function CollegeSubjectPage() {
  const { yearId, deptId } = useParams();
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  // Map requested courses based on year and department
  const getCourseData = () => {
    if (deptId === 'mechatronics') {
      if (yearId === 'year1') return year1MechatronicsCourses;
      if (yearId === 'year3') return year3MechatronicsCourses;
    }
    return null;
  };

  const courses = getCourseData();

  // Show fallback if selected year/dept is not supported yet
  if (!courses) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{t('comingSoon')}</p>
        <Link to="/college">
          <Button>العودة للأقسام</Button>
        </Link>
      </div>
    );
  }

  // Dynamic titles according to selected year
  const yearTitle = yearId === 'year1' ? t('year1') : t('year3');
  const yearDescription = yearId === 'year1' 
    ? 'جميع مواد الفرقة الأولى قسم ميكاترونكس' 
    : 'جميع مواد الفرقة الثالثة قسم ميكاترونكس';

  return (
    <div>
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Link to="/college" className="inline-block mb-4">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2" />
            العودة للأقسام
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {yearTitle} - {t('mechatronics')}
        </h1>
        <p className="text-muted-foreground">
          {yearDescription}
        </p>
      </motion.div>

      <Tabs defaultValue="semester1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="semester1">الترم الأول</TabsTrigger>
          <TabsTrigger value="semester2">الترم الثاني</TabsTrigger>
        </TabsList>

        <TabsContent value="semester1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.semester1.map((course, index) => (
              <motion.div
                key={course.id}
                initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: animationsEnabled ? index * 0.1 : 0 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">{course.name}</h3>
                <div className="space-y-3">
                  {course.materials.map((material, materialIndex) => {
                    const IconComponent = materialIcons[material.type];
                    return (
                      <motion.a
                        key={materialIndex}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={animationsEnabled ? { x: 4 } : {}}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span className="flex-1 text-sm font-medium">{material.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="semester2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.semester2.map((course, index) => (
              <motion.div
                key={course.id}
                initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: animationsEnabled ? index * 0.1 : 0 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-foreground mb-4">{course.name}</h3>
                <div className="space-y-3">
                  {course.materials.map((material, materialIndex) => {
                    const IconComponent = materialIcons[material.type];
                    return (
                      <motion.a
                        key={materialIndex}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={animationsEnabled ? { x: 4 } : {}}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span className="flex-1 text-sm font-medium">{material.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}