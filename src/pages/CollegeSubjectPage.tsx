import { useState, useEffect } from 'react';
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
  CheckCircle, 
  Circle,
  Eye,
  X,
  Maximize2
} from 'lucide-react';
import { 
  year1MechatronicsCourses, 
  year3MechatronicsCourses,
  year1RenewableCourses 
} from '../data/collegeData';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useTheme } from '../contexts/ThemeContext';

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

  // state للمعاينة الداخلية للملفات
  const [selectedFile, setSelectedFile] = useState<{ name: string; url: string } | null>(null);

  // state لتخزين معرفات المواد المكتملة
  const [completedMaterials, setCompletedMaterials] = useState<string[]>(() => {
    const saved = localStorage.getItem('completed_materials');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completed_materials', JSON.stringify(completedMaterials));
  }, [completedMaterials]);

  const toggleMaterial = (id: string) => {
    setCompletedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // تحويل رابط Google Drive إلى رابط معاينة Embed
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view.*$/, '/preview').replace(/\/edit.*$/, '/preview');
    }
    return url;
  };

  const getCourseData = () => {
    if (deptId === 'mechatronics') {
      if (yearId === 'year1') return year1MechatronicsCourses;
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
        <p className="text-muted-foreground mb-4">{t('comingSoon')}</p>
        <Link to="/college">
          <Button>العودة للأقسام</Button>
        </Link>
      </div>
    );
  }

  const deptName = deptId === 'renewable' ? 'طاقة متجددة' : t('mechatronics');
  const yearTitle = yearId === 'year1' ? t('year1') : t('year3');
  const yearDescription = `جميع مواد الفرقة ${yearId === 'year1' ? 'الأولى' : 'الثالثة'} قسم ${deptName}`;

  const renderCourseCard = (course: any, index: number) => {
    const totalItems = course.materials.length;
    const completedItems = course.materials.filter((_: any, idx: number) =>
      completedMaterials.includes(`${course.id}-${idx}`)
    ).length;
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return (
      <motion.div
        key={course.id}
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: animationsEnabled ? index * 0.1 : 0 }}
        className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {progress}%
            </span>
          </div>

          {/* شريط التقدم Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-2">
            {course.materials.map((material: any, materialIndex: number) => {
              const materialId = `${course.id}-${materialIndex}`;
              const isCompleted = completedMaterials.includes(materialId);
              const IconComponent = materialIcons[material.type] || FileText;

              return (
                <div
                  key={materialIndex}
                  className="flex items-center space-x-3 rtl:space-x-reverse p-2.5 rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <button
                    onClick={() => toggleMaterial(materialId)}
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                    title={isCompleted ? 'تحديد كغير مكتمل' : 'تحديد كمكتمل'}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  <IconComponent className="h-4 w-4 text-primary shrink-0" />

                  <span 
                    className={`flex-1 text-sm font-medium cursor-pointer transition-all ${
                      isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}
                    onClick={() => setSelectedFile({ name: material.name, url: material.url })}
                  >
                    {material.name}
                  </span>

                  <div className="flex items-center space-x-1 rtl:space-x-reverse shrink-0">
                    {/* زر المعاينة الداخلية */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile({ name: material.name, url: material.url })}
                      className="h-8 px-2 text-xs text-primary hover:bg-primary/10"
                      title="معاينة داخل التطبيق"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1 rtl:ml-1" />
                      عرض
                    </Button>

                    {/* زر الفتح الخارجي */}
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
                      title="فتح في نافذة جديدة"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
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
          {yearTitle} - {deptName}
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
            {courses.semester1.map((course: any, index: number) => renderCourseCard(course, index))}
          </div>
        </TabsContent>

        <TabsContent value="semester2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.semester2.map((course: any, index: number) => renderCourseCard(course, index))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal المعاينة الداخلية للملفات */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header المعاينة */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-hidden">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground truncate">{selectedFile.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Maximize2 className="h-4 w-4 mr-1 rtl:ml-1" />
                      فتح خارجي
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Body المعاينة (Iframe) */}
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