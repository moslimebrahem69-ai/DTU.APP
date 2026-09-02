export interface LearningPlatform {
  id: string;
  name: string;
  description: string;
  url: string;
  category: keyof typeof learningPlatformCategories;
  paid: boolean;
  language: 'ar' | 'en' | 'both';
  tags: string[];
  iconName?: string; // أداة اختيارية لإصدار أيقونة خاصة بكل منصة
}

export const learningPlatformCategories = {
  general_arabic: {
    name: 'منصات تعليمية عربية',
    icon: 'Globe'
  },
  general_international: {
    name: 'منصات عالمية وشهادات acadimic',
    icon: 'GraduationCap'
  },
  mechatronics: {
    name: 'الميكاترونيكس والأنظمة المدمجة',
    icon: 'Cpu'
  },
  autotronics: {
    name: 'الأوتوترونكس وهندسة السيارات',
    icon: 'Car'
  },
  hvac: {
    name: 'التبريد والتكييف والطاقة الحرارية',
    icon: 'Fan'
  },
  renewable_energy: {
    name: 'الطاقة الجديدة والمتجددة',
    icon: 'Zap'
  },
  it_programming: {
    name: 'تكنولوجيا المعلومات والبرمجة',
    icon: 'Code2'
  },
  english_language: {
    name: 'تعلم اللغة الإنجليزية والتواصل الفني',
    icon: 'Languages'
  },
  soft_skills: {
    name: 'تطوير المهارات الشخصية والمهنية',
    icon: 'Briefcase'
  }
};

export const learningPlatformsData: LearningPlatform[] = [
  // 1. منصات عربية عامة
  {
    id: 'rwaq',
    name: 'رواق',
    description: 'منصة تعليمية عربية تقدم مواد أكاديمية مجانية في مختلف التخصصات الهندسية والإدارية.',
    url: 'https://rwaq.org',
    category: 'general_arabic',
    paid: false,
    language: 'ar',
    tags: ['عربي', 'دورات', 'أكاديمي'],
    iconName: 'BookOpen'
  },
  {
    id: 'edraak',
    name: 'إدراك',
    description: 'منصة مساقات هائلة للتعلم المفتوح توفر مسارات تعليمية ومهارات وظيفية باللغة العربية.',
    url: 'https://edraak.org',
    category: 'general_arabic',
    paid: false,
    language: 'ar',
    tags: ['عربي', 'مهارات', 'شهادات'],
    iconName: 'Award'
  },
  {
    id: 'maharagtech',
    name: 'مهارة تك (Mahara-Tech)',
    description: 'مبادرة من معهد تكنولوجيا المعلومات (ITI) للتعليم التكنولوجي باللغة العربية مع شهادات موثقة.',
    url: 'https://maharatech.gov.eg',
    category: 'general_arabic',
    paid: false,
    language: 'both',
    tags: ['مصر', 'ITI', 'تكنولوجيا', 'مجاني'],
    iconName: 'Terminal'
  },

  // 2. منصات عالمية
  {
    id: 'coursera',
    name: 'Coursera',
    description: 'كورسات وشهادات متخصصة ودبلومات من أفضل الجامعات والشركات العالمية مثل IBM وGoogle.',
    url: 'https://coursera.org',
    category: 'general_international',
    paid: true,
    language: 'both',
    tags: ['جامعات', 'شهادات', 'دبلومات'],
    iconName: 'GraduationCap'
  },
  {
    id: 'edx',
    name: 'edX',
    description: 'مساقات تعليمية مجانية مدعومة من جامعة هارفارد ومعهد MIT في مختلف علوم الهندسة والتكنولوجيا.',
    url: 'https://edx.org',
    category: 'general_international',
    paid: false,
    language: 'en',
    tags: ['MIT', 'Harvard', 'هندسة'],
    iconName: 'BookMarked'
  },
  {
    id: 'udemy',
    name: 'Udemy',
    description: 'سوق عالمي للكورسات التطبيقية العملية في البرمجة والتصميم والتصنيع وبرامج الهندسة.',
    url: 'https://udemy.com',
    category: 'general_international',
    paid: true,
    language: 'both',
    tags: ['تطبيقي', 'عملي', 'برمجيات'],
    iconName: 'Video'
  },

  // 3. الميكاترونيكس والأنظمة المدمجة
  {
    id: 'tinkercad',
    name: 'Tinkercad Circuits',
    description: 'منصة محاكاة تفاعلية أونلاين لدوائر الأردوينو والإلكترونيات مجاناً مناسبة لجميع الفرق.',
    url: 'https://www.tinkercad.com',
    category: 'mechatronics',
    paid: false,
    language: 'both',
    tags: ['Arduino', 'محاكاة', 'إلكترونيات', 'الفرقة الأولى'],
    iconName: 'Cpu'
  },
  {
    id: 'robot-academy',
    name: 'QUT Robot Academy',
    description: 'دروس ومحاضرات مجانية في أساسيات الروبوتات والأنظمة الديناميكية والتحكم الآلي.',
    url: 'https://robotacademy.net.au',
    category: 'mechatronics',
    paid: false,
    language: 'en',
    tags: ['Robotics', 'Control', 'ميكاترونيكس'],
    iconName: 'Bot'
  },
  {
    id: 'wokwi',
    name: 'Wokwi Simulator',
    description: 'محاكي أونلاين متقدم للمتحكمات الدقيقة مثل ESP32 وArduino وSTM32 وكتابة كود C++ مباشره.',
    url: 'https://wokwi.com',
    category: 'mechatronics',
    paid: false,
    language: 'en',
    tags: ['ESP32', 'Embedded', 'IoT'],
    iconName: 'CircuitBoard'
  },

  // 4. الأوتوترونكس وهندسة السيارات
  {
    id: 'electude',
    name: 'Electude',
    description: 'المنصة القياسية العالمية لمحاكاة أعطال السيارات، وأنظمة الكهرباء والأوتوترونكس التفاعلية.',
    url: 'https://www.electude.com',
    category: 'autotronics',
    paid: true,
    language: 'both',
    tags: ['سيارات', 'محاكاة', 'أعطال', 'OBD2'],
    iconName: 'Car'
  },
  {
    id: 'autoshop101',
    name: 'AutoShop 101',
    description: 'دروس وملفات فنية لشرح الحساسات، الضفائر الكهربائية، وأنظمة التحكم الإلكتروني في السيارات.',
    url: 'http://www.autoshop101.com',
    category: 'autotronics',
    paid: false,
    language: 'en',
    tags: ['Sensors', 'Electrical', 'Diagrams'],
    iconName: 'Wrench'
  },

  // 5. التبريد والتكييف (HVAC)
  {
    id: 'danfoss-learning',
    name: 'Danfoss Learning',
    description: 'منصة تدريبية مجانية متخصصة في دورات التبريد والتكييف، الصمامات، وضواغط الهواء.',
    url: 'https://www.danfoss.com/en/service-and-support/learning',
    category: 'hvac',
    paid: false,
    language: 'both',
    tags: ['تبريد', 'تكييف', 'Chillers', 'شهادات'],
    iconName: 'Fan'
  },
  {
    id: 'ashrae-learning',
    name: 'ASHRAE E-Learning',
    description: 'المنصة الرسمية للجمعية الأمريكية لمهندسي التبريد والتكييف لحساب الأحمال وتصميم الأنظمة.',
    url: 'https://www.ashrae.org/professional-development/learning-portal',
    category: 'hvac',
    paid: true,
    language: 'en',
    tags: ['ASHRAE', 'أحمال حرارية', 'معايير'],
    iconName: 'Thermometer'
  },

  // 6. الطاقة الجديدة والمتجددة
  {
    id: 'pveda',
    name: 'PV Education',
    description: 'دليل شامل وتفاعلي لتعلم فيزياء وتصميم الخلايا الشمسية (Photovoltaics) مجاناً.',
    url: 'https://www.pveducation.org',
    category: 'renewable_energy',
    paid: false,
    language: 'en',
    tags: ['طاقة شمسية', 'PV', 'مجاني'],
    iconName: 'Sun'
  },
  {
    id: 'irena-learning',
    name: 'IRENA Learning Hub',
    description: 'تقارير ودورات المنظمة الدولية للطاقة المتجددة حول طاقة الرياح والهيدروجين الأخضر.',
    url: 'https://www.irena.org',
    category: 'renewable_energy',
    paid: false,
    language: 'en',
    tags: ['رياح', 'طاقة نظيفة', 'دولية'],
    iconName: 'Zap'
  },

  // 7. تكنولوجيا المعلومات والبرمجة (IT)
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    description: 'مخيم برمجيات مجاني لتعلم تصميم المواقع، قواعد البيانات، وبناء المشاريع من الصفر.',
    url: 'https://freecodecamp.org',
    category: 'it_programming',
    paid: false,
    language: 'en',
    tags: ['Web', 'Python', 'مشاريع'],
    iconName: 'Code2'
  },
  {
    id: 'cisco-netacad',
    name: 'Cisco Networking Academy',
    description: 'أهم أكاديمية للتدريب على شبكات الحاسوب، الأمن السيبراني، وأنظمة Linux.',
    url: 'https://www.netacad.com',
    category: 'it_programming',
    paid: false,
    language: 'both',
    tags: ['شبكات', 'Cisco', 'Cybersecurity'],
    iconName: 'Network'
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    description: 'مرجع سريع وتفاعلي للغات البرمجة وتطوير المهارات البرمجية لكل المبتدئين.',
    url: 'https://www.w3schools.com',
    category: 'it_programming',
    paid: false,
    language: 'en',
    tags: ['أساسيات', 'Web', 'C++'],
    iconName: 'FileCode'
  },

  // 8. تعلم اللغة الإنجليزية
  {
    id: 'british-council',
    name: 'British Council LearnEnglish',
    description: 'دروس وقواعد واختبارات مجانية لتطوير اللغة الإنجليزية للطلاب والمهندسين.',
    url: 'https://learnenglish.britishcouncil.org',
    category: 'english_language',
    paid: false,
    language: 'en',
    tags: ['إنجليزي', 'Grammar', 'Speaking'],
    iconName: 'Languages'
  },
  {
    id: 'bbc-learning-english',
    name: 'BBC Learning English',
    description: 'محتوى يومي قصير لتحسين نطق ومفردات اللغة الإنجليزية والاستماع.',
    url: 'https://www.bbc.co.uk/learningenglish',
    category: 'english_language',
    paid: false,
    language: 'en',
    tags: ['استماع', 'مفردات', 'مجاني'],
    iconName: 'Mic'
  },

  // 9. مهارات شخصية ومهنية
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    description: 'مسارات احترافية لإدارة المشاريع الهندسيّة، كتابة السيرة الذاتية، والتواصل العملي.',
    url: 'https://www.linkedin.com/learning',
    category: 'soft_skills',
    paid: true,
    language: 'en',
    tags: ['قيادة', 'إدارة مشاريع', 'CV'],
    iconName: 'Briefcase'
  },
  {
    id: 'google-digital-skills',
    name: 'مهارات من Google',
    description: 'برنامج تدريبي مجاني لتطوير المهارات الرقمية، العروض التقديمية، وإدارة الوقت.',
    url: 'https://skillshop.exceedlms.com',
    category: 'soft_skills',
    paid: false,
    language: 'both',
    tags: ['Google', 'مجاني', 'مهارات'],
    iconName: 'Sparkles'
  }
];