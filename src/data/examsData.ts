import { 
  Bot,          // ميكاترونكس
  Monitor,      // تكنولوجيا المعلومات
  Snowflake,    // تبريد وتكييف
  Cpu,          // اسطمبات
  Car,          // أوتوترونكس
  SunMedium,    // طاقة متجددة
  Droplets,     // تكنولوجيا معالجة وتحلية المياه
  LucideIcon 
} from 'lucide-react';

export interface ExamDepartment {
  id: string;
  name: string;
  enabled: boolean;
  icon: LucideIcon;
}

export const EXAM_DEPARTMENTS: ExamDepartment[] = [
  { id: 'mechatronics', name: 'ميكاترونكس', enabled: true, icon: Bot },
  { id: 'it', name: 'تكنولوجيا المعلومات', enabled: false, icon: Monitor },
  { id: 'refrigeration', name: 'تبريد وتكييف', enabled: false, icon: Snowflake },
  { id: 'stamping', name: 'اسطمبات', enabled: false, icon: Cpu },
  { id: 'autotronics', name: 'أوتوترونكس', enabled: false, icon: Car },
  { id: 'renewable', name: 'طاقة متجددة', enabled: true, icon: SunMedium },
  { id: 'waterTreatment', name: 'تكنولوجيا معالجة وتحلية المياه', enabled: false, icon: Droplets },
];

export interface ExamItem {
  id: string;
  title: string;
  description?: string;
  type: 'lecture' | 'midterm' | 'final' | 'quiz';
  lectureNumber?: number;
  url: string;
  questionCount?: number;
  durationMinutes?: number;
  isAiGenerated?: boolean;
}

export interface CourseExamsMap {
  [courseId: string]: ExamItem[];
}

export const EXAMS_DATA: CourseExamsMap = {
  'mechatronics-intro': [
    {
      id: 'ex-1',
      title: 'اختبار المحاضرة 1: مقدمة في الميكاترونكس',
      description: 'اختبار تقييمي سريع على المفاهيم الأساسية للمحاضرة الأولى',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://forms.google.com/example-link-1',
      questionCount: 10,
      durationMinutes: 15,
      isAiGenerated: true,
    },
    {
      id: 'ex-mid',
      title: 'امتحان النصف دراسي (Midterm AI)',
      description: 'اختبار شامل للمحتوى حتى منتصف الفصل الدراسي توليد ذكي',
      type: 'midterm',
      url: 'https://forms.google.com/example-link-mid',
      questionCount: 25,
      durationMinutes: 45,
      isAiGenerated: true,
    }
  ],
  'english-2': [
    {
      id: 'eng2-ex-1',
      title: 'اختبار 1: إنجليزي 2 (الترم الثاني)',
      description: 'الاختبار الإلكتروني الأول لمادة اللغة الإنجليزية للفرقة الأولى',
      type: 'quiz',
      url: 'https://exam1e.vercel.app/',
      questionCount: 15,
      durationMinutes: 20,
      isAiGenerated: false,
    }
  ],
  // المفتاح هنا مطابق تماماً لـ ID المادة في year2MechatronicsCourses
  'pneumatics-hydraulics': [
    {
      id: 'pneumatics-final-exam',
      title: 'الاختبار الشامل: تطبيقات النيوماتيك والهيدروليك',
      description: 'منصة اختبارات تفاعلية شاملة تغطي المحاضرات الثلاث مع الترجمة الفورية والتقييم',
      type: 'final',
      url: 'https://pneumatics-examhtml.vercel.app/',
      questionCount: 60,
      isAiGenerated: false,
    }
  ]
};