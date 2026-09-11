import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  ClipboardList, 
  StickyNote, 
  X,
  Maximize2
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

  // Modal file preview state
  const [selectedFile, setSelectedFile] = useState<{ name: string; url: string } | null>(null);

  // Convert Google Drive view URL to preview embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view.*$/, '/preview').replace(/\/edit.*$/, '/preview');
    }
    return url;
  };

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
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-accent/40 transition-colors group"
                >
                  <IconComponent className="h-4 w-4 text-primary shrink-0" />

                  <span 
                    className="flex-1 text-xs sm:text-sm font-medium cursor-pointer truncate text-foreground hover:text-primary transition-all"
                    onClick={() => setSelectedFile({ name: material.name, url: material.url })}
                  >
                    {material.name}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-accent transition-colors"
                      title="فتح في نافذة جديدة"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
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

      {/* Modal Preview for Documents */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground truncate">{selectedFile.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                      <Maximize2 className="h-3 w-3 mr-1 rtl:ml-1" />
                      فتح خارجي
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    className="h-7 w-7 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Embed Body */}
              <div className="flex-1 bg-black/5 relative">
                <iframe
                  src={getEmbedUrl(selectedFile.url)}
                  className="w-full h-full border-0"
                  title={selectedFile.name}
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}