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
      type: 'lecture',
      url: 'https://forms.google.com/example-link-mid',
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
      isAiGenerated: true,
    }
  ],
  // المفتاح هنا مطابق تماماً لـ ID المادة في year2MechatronicsCourses
  'pneumatics-hydraulics': [
    {
      id: 'pneumatics-lec1-exam',
      title: 'اختبار ع المحاضرة 1: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار تفاعلي على المحاضرة الأولى مع الترجمة والتقييم الفوري',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://pneumaticshydraulics-1-exam.vercel.app/',
      questionCount: 20,
      durationMinutes: 20,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-final-exam',
      title: 'إختبار ع جميع المحاضرات: تطبيقات النيوماتيك والهيدروليك',
      description: 'امتحان ع كل المحاضرات بتاعت المادة',
      type: 'lecture',
      url: 'https://pneumatics-examhtml.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    }
  ]
};