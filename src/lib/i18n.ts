import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      // Header
      developer: "محمد إبراهيم",
      
      // Navigation
      home: "الرئيسية",
      aiTools: "أدوات الذكاء الاصطناعي",
      youtubeChannels: "قنوات يوتيوب",
      learningPlatforms: "منصات التعلم",
      collegeSubjects: "أقسام الكلية",
      studyTimer: "تايمر الدراسة",
      
      // Drawer
      socialLinks: "روابط منصاتنا",
      youtube: "يوتيوب",
      telegram: "تيلجرام",
      facebook: "فيسبوك",
      email: "بريد للتواصل",
      version: "الإصدار 2",
      settings: "الإعدادات",
      theme: "الثيم",
      language: "اللغة",
      animations: "الأنيميشن",
      
      // Themes
      light: "فاتح",
      dark: "داكن",
      blue: "أزرق",
      green: "أخضر",
      yellow: "أصفر",
      
      // Search and Filters
      search: "البحث",
      searchPlaceholder: "ابحث في جميع المحتويات...",
      category: "الفئة",
      allCategories: "جميع الفئات",
      free: "مجاني",
      paid: "مدفوع",
      both: "الكل",
      arabic: "عربي",
      english: "إنجليزي",
      
      // Study Timer
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني",
      start: "بدء",
      pause: "إيقاف",
      resume: "استكمال",
      reset: "إعادة تعيين",
      pomodoroMode: "وضع بومودورو",
      workSession: "جلسة عمل",
      breakSession: "استراحة",
      sessions: "الجلسات",
      soundLibrary: "مكتبة النغمات",
      bell: "جرس",
      piano: "بيانو",
      glockenspiel: "جلوكنشبيل",
      violin: "كمان",
      whistle: "صفارة",
      preview: "معاينة",
      timerFinished: "انتهى الوقت!",
      workTime: "وقت العمل",
      breakTime: "وقت الاستراحة",
      
      // Categories
      programming: "البرمجة والتكنولوجيا",
      design: "التصميم والجرافيك",
      business: "الإدارة والأعمال",
      education: "التعليم واللغات",
      science: "العلوم والمعرفة",
      productivity: "الإنتاجية وتطوير الذات",
      study_tools: "أدوات الدراسة",
      molds_dies: "فورم وديدات",
      it_networking: "شبكات وتكنولوجيا",
      academic_reports: "تقارير أكاديمية",
      
      // Actions
      copy: "نسخ",
      share: "مشاركة",
      copyLink: "نسخ الرابط",
      linkCopied: "تم نسخ الرابط!",
      
      // College
      year1: "الفرقة الأولى",
      year2: "الفرقة الثانية", 
      year3: "الفرقة الثالثة",
      year4: "الفرقة الرابعة",
      mechatronics: "ميكاترونكس",
      it: "تكنولوجيا المعلومات",
      refrigeration: "تبريد وتكييف",
      hvac: "تبريد وتكييف (HVAC)",
      stamping: "اسطمبات",
      autotronics: "أوتوترونكس",
      renewableEnergy: "طاقة متجددة",
      renewable_energy: "طاقة متجددة",
      waterTreatment: "تكنولوجيا معالجة وتحلية المياه",
      comingSoon: "سيتم إضافتها قريباً - بالتوفيق يا صديقي!",
      
      // Course Materials
      lectures: "محاضرات",
      sheets: "شيتات",
      exams: "امتحانات سابقة",
      notes: "ملاحظات",
      
      // Course Names
      "3dCad": "3D CAD",
      mathematics: "الرياضيات",
      robotics: "الروبوتات", 
      sensors: "أجهزة الاستشعار",
      automaticControl: "التحكم الآلي",
      cncTechnology: "تكنولوجيا CNC",
      mechanismDesign: "تصميم الآليات",
      microprocessor: "المعالجات الدقيقة",
      powerElectronics: "إلكترونيات القوى",
      productionPlanning: "التخطيط والإنتاج",
    }
  },
  en: {
    translation: {
      // Header
      developer: "Mohamed Ibrahim",
      
      // Navigation
      home: "Home",
      aiTools: "AI Tools",
      youtubeChannels: "YouTube Channels",
      learningPlatforms: "Learning Platforms", 
      collegeSubjects: "College Subjects",
      studyTimer: "Study Timer",
      
      // Drawer
      socialLinks: "Our Social Links",
      youtube: "YouTube",
      telegram: "Telegram",
      facebook: "Facebook", 
      email: "Contact Email",
      version: "Version 2",
      settings: "Settings",
      theme: "Theme",
      language: "Language",
      animations: "Animations",
      
      // Themes
      light: "Light",
      dark: "Dark",
      blue: "Blue",
      green: "Green",
      yellow: "Yellow",
      
      // Search and Filters
      search: "Search",
      searchPlaceholder: "Search all content...",
      category: "Category",
      allCategories: "All Categories",
      free: "Free",
      paid: "Paid",
      both: "Both",
      arabic: "Arabic",
      english: "English",
      
      // Study Timer
      hours: "Hours",
      minutes: "Minutes", 
      seconds: "Seconds",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      pomodoroMode: "Pomodoro Mode",
      workSession: "Work Session",
      breakSession: "Break Session",
      sessions: "Sessions",
      soundLibrary: "Sound Library",
      bell: "Bell",
      piano: "Piano",
      glockenspiel: "Glockenspiel",
      violin: "Violin", 
      whistle: "Whistle",
      preview: "Preview",
      timerFinished: "Timer Finished!",
      workTime: "Work Time",
      breakTime: "Break Time",
      
      // Categories
      programming: "Programming & Technology",
      design: "Design & Graphics",
      business: "Management & Business",
      education: "Education & Languages",
      science: "Science & Knowledge",
      productivity: "Productivity & Self Development",
      study_tools: "Study Tools",
      molds_dies: "Molds & Dies",
      it_networking: "IT & Networking",
      academic_reports: "Academic Reports",
      
      // Actions
      copy: "Copy",
      share: "Share", 
      copyLink: "Copy Link",
      linkCopied: "Link copied!",
      
      // College
      year1: "First Year",
      year2: "Second Year",
      year3: "Third Year", 
      year4: "Fourth Year",
      mechatronics: "Mechatronics",
      it: "Information Technology",
      refrigeration: "Refrigeration & Air Conditioning",
      hvac: "HVAC",
      stamping: "Stamping",
      autotronics: "Autotronics",
      renewableEnergy: "Renewable Energy",
      renewable_energy: "Renewable Energy",
      waterTreatment: "Water Treatment Technology",
      comingSoon: "Coming Soon - Good luck my friend!",
      
      // Course Materials
      lectures: "Lectures",
      sheets: "Sheets",
      exams: "Past Exams", 
      notes: "Notes",
      
      // Course Names
      "3dCad": "3D CAD",
      mathematics: "Mathematics",
      robotics: "Robotics",
      sensors: "Sensors", 
      automaticControl: "Automatic Control",
      cncTechnology: "CNC Technology",
      mechanismDesign: "Mechanism Design",
      microprocessor: "Microprocessor",
      powerElectronics: "Power Electronics",
      productionPlanning: "Production & Planning",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;