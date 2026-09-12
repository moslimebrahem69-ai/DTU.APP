import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  ClipboardList, 
  StickyNote
} from 'lucide-react';
import { 
  year1MechatronicsCourses, 
  year3MechatronicsCourses,
  year2MechatronicsCourses,
  year1RenewableCourses 
} from '../data/collegeData';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useTheme } from '../contexts/ThemeContext';

// Material type icon map
const materialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  lectures: FileText,
  sheets: ClipboardList,
  exams: BookOpen,
  notes: StickyNote,
};

export function CollegeSubjectPage() {
  const { yearId, deptId } = useParams();
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  const getCourseData = () => {
    if (deptId === 'mechatronics') {
      if (yearId === 'year1') return year1MechatronicsCourses;
      if (yearId === 'year2') return year2MechatronicsCourses;
      if (yearId === 'year3') return year3MechatronicsCourses;
    } else if (deptId === 'renewable') {
      if (yearId === 'year1') return year1RenewableCourses;
    }
    return null;
  };

  const courses = getCourseData();

  if (!courses) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm mb-4">{t('comingSoon')}</p>
        <Link to="/college">
          <Button size="sm">العودة للأقسام</Button>
        </Link>
      </div>
    );
  }

  const deptName = deptId === 'renewable' ? 'طاقة متجددة' : t('mechatronics');
  const yearTitle = yearId === 'year1' ? t('year1') : yearId === 'year2' ?  t('year2') : t('year3');
  const yearDescription = `جميع مواد الفرقة ${yearId === 'year1' ? 'الأولى' : yearId === 'year2' ? 'الثانية' : 'الثالثة'} قسم ${deptName}`;

  // فتح رابط المحاضرة أو الدرايف في صفحة خارجية مباشرة بضغطة واحدة
  const handleOpenMaterial = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Render course item card
  const renderCourseCard = (course: any, index: number) => {
    return (
      <motion.div
        key={course.id}
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: animationsEnabled ? index * 0.05 : 0 }}
        className="bg-card border border-border/80 rounded-xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-base sm:text-lg font-bold text-foreground">{course.name}</h3>
          </div>

          {/* Material Items List */}
          <div className="space-y-1.5">
            {course.materials.map((material: any, materialIndex: number) => {
              const IconComponent = materialIcons[material.type] || FileText;

              return (
                <div
                  key={materialIndex}
                  onClick={() => handleOpenMaterial(material.url)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-accent/40 transition-colors group cursor-pointer"
                >
                  <IconComponent className="h-4 w-4 text-primary shrink-0" />

                  <span className="flex-1 text-xs sm:text-sm font-medium truncate text-foreground group-hover:text-primary transition-all">
                    {material.name}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="p-1.5 text-muted-foreground group-hover:text-primary rounded-md transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4 pt-2 pb-8">
      {/* Top Navigation & Header */}
      <motion.div
        initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-2"
      >
        <Link to="/college" className="inline-block">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5" />
            العودة للأقسام
          </Button>
        </Link>
        
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            {yearTitle} - {deptName}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {yearDescription}
          </p>
        </div>
      </motion.div>

      {/* Semester Tabs */}
      <Tabs defaultValue="semester1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 h-9 p-1">
          <TabsTrigger value="semester1" className="text-xs">الترم الأول</TabsTrigger>
          <TabsTrigger value="semester2" className="text-xs">الترم الثاني</TabsTrigger>
        </TabsList>

        <TabsContent value="semester1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {courses.semester1.map((course: any, index: number) => renderCourseCard(course, index))}
          </div>
        </TabsContent>

        <TabsContent value="semester2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {courses.semester2.map((course: any, index: number) => renderCourseCard(course, index))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}