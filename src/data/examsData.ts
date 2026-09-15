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
      lectureNumber: 1.2,
      url: 'https://forms.google.com/example-link-1',
      questionCount: 110,
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
  // مادة المتحكم المنطقي المبرمج (PLC) - الفرقة الثانية الترم الأول
  'plc-control': [
    {
      id: 'plc-lec1-exam',
      title: 'اختبار المحاضرة 1: المتحكم المنطقي المبرمج (PLC)',
      description: 'اختبار تفاعلي على المحاضرة الأولى لمادة المتحكم المنطقي المبرمج',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://lec-1-plc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'plc-lec2-exam',
      title: 'اختبار المحاضرة 2: المتحكم المنطقي المبرمج (PLC)',
      description: 'اختبار تفاعلي على المحاضرة الثانية لمادة المتحكم المنطقي المبرمج',
      type: 'lecture',
      lectureNumber: 2,
      url: 'https://lec-2-plc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'plc-lec3-exam',
      title: 'اختبار المحاضرة 3: المتحكم المنطقي المبرمج (PLC)',
      description: 'اختبار تفاعلي على المحاضرة الثالثة لمادة المتحكم المنطقي المبرمج',
      type: 'lecture',
      lectureNumber: 3,
      url: 'https://lec-3-plc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'plc-lec4-exam',
      title: 'اختبار المحاضرة 4: المتحكم المنطقي المبرمج (PLC)',
      description: 'اختبار تفاعلي على المحاضرة الرابعة لمادة المتحكم المنطقي المبرمج',
      type: 'lecture',
      lectureNumber: 4,
      url: 'https://lec-4-plc.vercel.app/',
      isAiGenerated: true,
    },
     {
      id: 'plc-lec5-exam',
      title: 'اختبار المحاضرة 5: المتحكم المنطقي المبرمج (PLC)',
      description: 'اختبار تفاعلي على المحاضرة الخامسة لمادة المتحكم المنطقي المبرمج',
      type: 'lecture',
      lectureNumber: 5,
      url: 'https://lec-5-plc.vercel.app/',
      isAiGenerated: true,
    }
  ],
  // مادة أساسيات التحكم بالحاسبات - الفرقة الثانية الترم الأول
  'computer-control-basics': [
    {
      id: 'pc-control-lec1-exam',
      title: 'اختبار المحاضرة 1: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة الأولى لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://lec-1-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec2-exam',
      title: 'اختبار المحاضرة 2: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة الثانية لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 2,
      url: 'https://lec-2-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec3-exam',
      title: 'اختبار المحاضرة 3: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة الثالثة لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 3,
      url: 'https://lec-3-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec4-exam',
      title: 'اختبار المحاضرة 4: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة الرابعة لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 4,
      url: 'https://lec-4-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec5-exam',
      title: 'اختبار المحاضرة 5: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة الخامسة لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 5,
      url: 'https://lec-5-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec6-exam',
      title: 'اختبار المحاضرة 6: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة السادسة لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 6,
      url: 'https://lec-6-pc.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'pc-control-lec7-exam',
      title: 'اختبار المحاضرة 7: أساسيات التحكم بالحاسبات',
      description: 'اختبار على المحاضرة السابعة لمادة أساسيات التحكم بالحاسبات',
      type: 'lecture',
      lectureNumber: 7,
      url: 'https://lec-7-pc.vercel.app/',
      isAiGenerated: true,
    }
  ],
  // مادة اختيار المواد - الفرقة الثانية الترم الأول
  'materials-selection': [
    {
      id: 'materials-lec1-exam',
      title: 'اختبار المحاضرة 1: إختيار المواد',
      description: 'اختبار على المحاضرة الأولى لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://materialsselection-1.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'materials-lec2-exam',
      title: 'اختبار المحاضرة 2: إختيار المواد',
      description: 'اختبار على المحاضرة الثانية لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 2,
      url: 'https://lec-2-azure.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'materials-lec3-exam',
      title: 'اختبار المحاضرة 3: إختيار المواد',
      description: 'اختبار على المحاضرة الثالثة لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 3,
      url: 'https://lec-3-mu.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'materials-lec4-exam',
      title: 'اختبار المحاضرة 4: إختيار المواد',
      description: 'اختبار على المحاضرة الرابعة لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 4,
      url: 'https://lec-4-nine.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'materials-lec5-exam',
      title: 'اختبار المحاضرة 5: إختيار المواد',
      description: 'اختبار على المحاضرة الخامسة لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 5,
      url: 'https://lec-5-beta.vercel.app/',
      isAiGenerated: true,
    },
    {
      id: 'materials-lec6-exam',
      title: 'اختبار المحاضرة 6: إختيار المواد',
      description: 'اختبار على المحاضرة السادسة لمادة إختيار المواد',
      type: 'lecture',
      lectureNumber: 6,
      url: 'https://lec-6-nine.vercel.app/',
      isAiGenerated: true,
    }
  ],
  // المفتاح هنا مطابق تماماً لـ ID المادة في year2MechatronicsCourses
  'pneumatics-hydraulics': [
    {
      id: 'pneumatics-lec1&2-exam',
      title: 'اختبار ع المحاضرة 1 & 2: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار تفاعلي على المحاضرة الأولى مع الترجمة والتقييم الفوري',
      type: 'lecture',
      lectureNumber: 1,
      url: 'https://pneumaticshydraulics-1-exam.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-exam',
      title: 'إختبار ع جميع المحاضرات: تطبيقات النيوماتيك والهيدروليك',
      description: 'امتحان ع كل المحاضرات بتاعت المادة',
      type: 'lecture',
      url: 'https://pneumatics-examhtml.vercel.app/',
      questionCount: 60,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec3-exam',
      title: 'إختبار ع المحاضرة 3: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة الثالثة',
      type: 'lecture',
      lectureNumber: 3,
      url: 'https://lec-3-five.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec4-exam',
      title: 'إختبار ع المحاضرة 4: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة الرابعة',
      type: 'lecture',
      lectureNumber: 4,
      url: 'https://lecture-4-sable.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec5-exam',
      title: 'إختبار ع المحاضرة 5: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة الخامسة',
      type: 'lecture',
      lectureNumber: 5,
      url: 'https://lecture5-three.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec6-exam',
      title: 'إختبار ع المحاضرة 6: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة السادسة',
      type: 'lecture',
      lectureNumber: 6,
      url: 'https://lecture-6-seven.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec7-exam',
      title: 'إختبار ع المحاضرة 7: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة السابعة',
      type: 'lecture',
      lectureNumber: 7,
      url: 'https://lecture-7-delta.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    },
    {
      id: 'pneumatics-lec8-exam',
      title: 'إختبار ع المحاضرة 8: تطبيقات النيوماتيك والهيدروليك',
      description: 'اختبار ع المحاضرة الثامنة',
      type: 'lecture',
      lectureNumber: 8,
      url: 'https://lecture8-two.vercel.app/',
      questionCount: 110,
      isAiGenerated: true,
    }
  ]
};