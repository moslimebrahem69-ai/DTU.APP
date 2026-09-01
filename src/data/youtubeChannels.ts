export interface YouTubeChannel {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  subcategory?: string;
  language: 'ar' | 'en' | 'both';
  tags: string[];
  iconName?: string;
}

export const youtubeCategories = {
  mechatronics: {
    name: 'تكنولوجيا الميكاترونيكس والروبوتات',
    iconName: 'Cpu'
  },
  hvac: {
    name: 'تكنولوجيا التبريد والتكييف (HVAC)',
    iconName: 'Snowflake'
  },
  molds_cnc: {
    name: 'تصنيع الاسطمبات والـ CNC والـ CAD/CAM',
    iconName: 'Wrench'
  },
  autotronics: {
    name: 'تكنولوجيا الأوتوترونيكس والسيارات',
    iconName: 'Car'
  },
  renewable_energy: {
    name: 'تكنولوجيا الطاقة المتجددة والشمسية',
    iconName: 'Sun'
  },
  it_networking: {
    name: 'تكنولوجيا المعلومات والشبكات والسيبراني',
    iconName: 'Server'
  },
  academic_math_physics: {
    name: 'الرياضيات والفيزياء والتأسيس الهندسي',
    iconName: 'Calculator'
  },
  programming: {
    name: 'البرمجة وتطوير البرمجيات',
    iconName: 'Code'
  },
  design_cad: {
    name: 'التصميم الهندسي والـ 3D Modeling',
    iconName: 'Layers'
  },
  study_productivity: {
    name: 'مهارات المذاكرة وتطوير الذات واللغات',
    iconName: 'GraduationCap'
  }
};

export const youtubeChannelsData: YouTubeChannel[] = [
  {
    id: '1',
    name: 'شرح ميكاترونيكس - Mechatronics Egypt',
    description: 'شرح عملي وتطبيقي لدورات الهيدروليك، النيوماتيك، وأساسيات التحكم الآلي.',
    url: 'https://www.youtube.com/@MechatronicsEgypt',
    category: 'mechatronics',
    language: 'ar',
    tags: ['mechatronics', 'hydraulics', 'pneumatics', 'automation'],
    iconName: 'Cpu'
  },
  {
    id: '2',
    name: 'GreatScott!',
    description: 'مشاريع إلكترونيات تخصصية، اختبار المكونات، وتصميم الدوائر الكهربائية عملياً.',
    url: 'https://www.youtube.com/@greatscottlab',
    category: 'mechatronics',
    language: 'en',
    tags: ['electronics', 'diy', 'hardware', 'circuits'],
    iconName: 'Zap'
  },
  {
    id: '3',
    name: 'شرح PLC بالعربي - Eng. Ahmed Elgammal',
    description: 'سلاسل كاملة لشرح برمجيات الـ PLC (Siemens, Delta) وشاشات HMI والإنفرترات.',
    url: 'https://www.youtube.com/@AhmedElgammalPLC',
    category: 'mechatronics',
    language: 'ar',
    tags: ['plc', 'siemens', 'automation', 'hmi'],
    iconName: 'Cpu'
  },
  {
    id: '4',
    name: 'How To Mechatronics',
    description: 'شرح تفاعلي ممتاز لآليات حركة الروبوتات، الأردوينو، الـ 3D Printing، والـ Stepper Motors.',
    url: 'https://www.youtube.com/@HowToMechatronics',
    category: 'mechatronics',
    language: 'en',
    tags: ['arduino', 'robotics', 'mechanisms', '3d-printing'],
    iconName: 'Bot'
  },
  {
    id: '5',
    name: 'ElectroBOOM',
    description: 'تبسيط الفيزياء والدوائر الكهربائية والأنظمة الإلكترونية بأسلوب كوميدي وتطبيقي.',
    url: 'https://www.youtube.com/@ElectroBOOM',
    category: 'mechatronics',
    language: 'en',
    tags: ['electronics', 'physics', 'circuits'],
    iconName: 'Zap'
  },
  {
    id: '6',
    name: 'العربي للهيدروليك والنيوماتيك',
    description: 'شرح قراءة المخططات الهيدروليكية وعناصر التحكم والمحابس والصمامات الصناعية.',
    url: 'https://www.youtube.com/@HydraulicArabic',
    category: 'mechatronics',
    language: 'ar',
    tags: ['hydraulics', 'valves', 'industrial'],
    iconName: 'Wrench'
  },
  {
    id: '7',
    name: 'HVAC School',
    description: 'أفضل مرجع عالمي لشرح أساسيات ومشاكل دورات التبريد والتكييف وصيانة الضواغط.',
    url: 'https://www.youtube.com/@HVACSchool',
    category: 'hvac',
    language: 'en',
    tags: ['hvac', 'refrigeration', 'compressor', 'maintenance'],
    iconName: 'Snowflake'
  },
  {
    id: '8',
    name: 'Engineering Mindset',
    description: 'رسومات متحركة فائقة الجودة تشرح Chilled Water Systems وChillers ودورات التبريد.',
    url: 'https://www.youtube.com/@EngineeringMindset',
    category: 'hvac',
    language: 'en',
    tags: ['chillers', 'hvac', 'thermodynamics', 'pumps'],
    iconName: 'Snowflake'
  },
  {
    id: '9',
    name: 'تبريد وتكييف بالعربي - Eng. Mohamed Al-Ansi',
    description: 'شرح مادة التبريد والتكييف للطلاب وحساب أحمال التكييف والدورات المركبة.',
    url: 'https://www.youtube.com/@HVACArabicCourses',
    category: 'hvac',
    language: 'ar',
    tags: ['hvac', 'cooling-load', 'arabic', 'ducts'],
    iconName: 'Snowflake'
  },
  {
    id: '10',
    name: 'AC Service Tech LLC',
    description: 'فيديوهات تطبيقية لفحص وسائط التبريد (Freon)، الصمامات، والدوائر الكهربية للتكييف.',
    url: 'https://www.youtube.com/@acservicetechchannel',
    category: 'hvac',
    language: 'en',
    tags: ['ac', 'refrigerant', 'charging', 'electrical'],
    iconName: 'Snowflake'
  },
  {
    id: '11',
    name: 'Titans of CNC Instructional',
    description: 'أكبر قناة لتعليم تشغيل ماكينات الـ CNC، برمجة الـ G-Code، وتصنيع القوالب والاسطمبات.',
    url: 'https://www.youtube.com/@TITANSofCNCInstructional',
    category: 'molds_cnc',
    language: 'en',
    tags: ['cnc', 'gcode', 'milling', 'lathe', 'cad-cam'],
    iconName: 'Wrench'
  },
  {
    id: '12',
    name: 'اسطمبات الحقن والتصنيع - Mold Design Arabic',
    description: 'شرح تصميم اسطمبات حقن البلاستيك، الصاج (Stamping Dies)، وعناصر الـ Core & Cavity.',
    url: 'https://www.youtube.com/@MoldDesignArabic',
    category: 'molds_cnc',
    language: 'ar',
    tags: ['molds', 'plastic', 'dies', 'injection'],
    iconName: 'Wrench'
  },
  {
    id: '13',
    name: 'NYC CNC',
    description: 'تعليم برنامج Fusion 360، الـ CAM Milling، واستراتيجيات التشغيل الميكانيكي.',
    url: 'https://www.youtube.com/@nyccnc',
    category: 'molds_cnc',
    language: 'en',
    tags: ['fusion360', 'cam', 'machining', 'cnc'],
    iconName: 'Wrench'
  },
  {
    id: '14',
    name: 'تكنولوجيا التشغيل وCNC - د. محمد صابر',
    description: 'دروس أكاديمية وعملية لعمليات القطع، المخارط، الفرايز، وكتابة أسطر البرمجة.',
    url: 'https://www.youtube.com/@CNCMachiningArabic',
    category: 'molds_cnc',
    language: 'ar',
    tags: ['machining', 'cnc', 'lathe', 'gcode'],
    iconName: 'Wrench'
  },
  {
    id: '15',
    name: 'ScannerDanner',
    description: 'المرجع الأول في تشخيص أعطال كهرباء السيارات وتتبع إشارات الحساسات بـ Oscilloscope.',
    url: 'https://www.youtube.com/@ScannerDanner',
    category: 'autotronics',
    language: 'en',
    tags: ['diagnostics', 'sensors', 'obd2', 'oscilloscope'],
    iconName: 'Car'
  },
  {
    id: '16',
    name: 'تكنولوجيا السيارات والأوتوترونيكس - Eng. Mohamed Masoud',
    description: 'شرح منظومات السيارات الحديثة، الحساسات، المحركات، وحساسات الـ ECU.',
    url: 'https://www.youtube.com/@AutotronicsArabic',
    category: 'autotronics',
    language: 'ar',
    tags: ['ecu', 'sensors', 'autotronics', 'car-repair'],
    iconName: 'Car'
  },
  {
    id: '17',
    name: 'WeberAuto',
    description: 'شرح تفصيلي ومفكك لأجزاء السيارات الكهربائية الهجينة (EV/Hybrid) وبنوك البطاريات.',
    url: 'https://www.youtube.com/@WeberAuto',
    category: 'autotronics',
    language: 'en',
    tags: ['ev', 'hybrid', 'inverter', 'electric-cars'],
    iconName: 'Zap'
  },
  {
    id: '18',
    name: 'South Main Auto Repair LLC',
    description: 'خطوات عمل تشخيصية واقعية لأعطال الضفائر الكهربية والكنترولات في ورشة عمل.',
    url: 'https://www.youtube.com/@SouthMainAuto',
    category: 'autotronics',
    language: 'en',
    tags: ['wiring', 'mechanic', 'troubleshooting'],
    iconName: 'Car'
  },
  {
    id: '19',
    name: 'Solar Energy International (SEI)',
    description: 'دروس معتمدة لشرح طاقة الخلايا الشمسية (PV Systems)، الإنفرترات، والربط بالشبكة.',
    url: 'https://www.youtube.com/@SolarEnergyIntl',
    category: 'renewable_energy',
    language: 'en',
    tags: ['solar', 'pv', 'inverters', 'renewable'],
    iconName: 'Sun'
  },
  {
    id: '20',
    name: 'طاقة متجددة بالعربي - Eng. Tamer Gameel',
    description: 'تصميم محطات الطاقة الشمسية، حساب أعداد الألواح والبطاريات، وتقييم الإشعاع.',
    url: 'https://www.youtube.com/@SolarArabicCourses',
    category: 'renewable_energy',
    language: 'ar',
    tags: ['solar', 'pvsyst', 'batteries', 'arabic'],
    iconName: 'Sun'
  },
  {
    id: '21',
    name: 'Wind Energy Institute',
    description: 'شرح مبادئ توربينات الرياح، المحولات، وديناميكا الهواء لتوليد الطاقة الكهربائية.',
    url: 'https://www.youtube.com/@WindEnergyTech',
    category: 'renewable_energy',
    language: 'en',
    tags: ['wind', 'turbine', 'green-energy'],
    iconName: 'Sun'
  },
  {
    id: '22',
    name: 'NetworkChuck',
    description: 'طريقة ممتعة وتطبيقية لتعلم الشبكات (CCNA)، اللينكس (Linux)، والسيبراني.',
    url: 'https://www.youtube.com/@NetworkChuck',
    category: 'it_networking',
    language: 'en',
    tags: ['ccna', 'networking', 'linux', 'python'],
    iconName: 'Server'
  },
  {
    id: '23',
    name: 'Free4arab',
    description: 'أكبر مجمع كورسات عربية مجانية لشرح شهادات Cisco, Microsoft, RedHat, CompTIA.',
    url: 'https://www.youtube.com/@Free4arab',
    category: 'it_networking',
    language: 'ar',
    tags: ['cisco', 'mcsa', 'networking', 'ccna'],
    iconName: 'Server'
  },
  {
    id: '24',
    name: 'David Bombal',
    description: 'تطبيقات شبكات عملي، استخدام Packet Tracer, GNS3, وإتقان أوامر الشبكات.',
    url: 'https://www.youtube.com/@DavidBombal',
    category: 'it_networking',
    language: 'en',
    tags: ['gns3', 'cisco', 'python', 'security'],
    iconName: 'Server'
  },
  {
    id: '25',
    name: 'شغف IT - Eng. Ahmad Hassan',
    description: 'شرح مبسط للسيرفرات، الشبكات، والحوسبة السحابية لطلاب تكنولوجيا المعلومات.',
    url: 'https://www.youtube.com/@ShaghafIT',
    category: 'it_networking',
    language: 'ar',
    tags: ['it', 'servers', 'cloud', 'windows-server'],
    iconName: 'Server'
  },
  {
    id: '26',
    name: '3Blue1Brown',
    description: 'أفضل قناة لتخيل الجبر الخطي، التفاضل والتكامل، والرياضيات بمرئيات ثلاثية الأبعاد.',
    url: 'https://www.youtube.com/@3blue1brown',
    category: 'academic_math_physics',
    language: 'en',
    tags: ['calculus', 'linear-algebra', 'visual-math'],
    iconName: 'Calculator'
  },
  {
    id: '27',
    name: 'قناة الباشمهندس - رياضيات هندسية',
    description: 'شرح الميكانيكا، التفاضل والتكامل، والفيزياء الكهربية للكليات التكنولوجية والهندسية.',
    url: 'https://www.youtube.com/@ElBashmohandesMath',
    category: 'academic_math_physics',
    language: 'ar',
    tags: ['math', 'calculus', 'physics', 'engineering'],
    iconName: 'Calculator'
  },
  {
    id: '28',
    name: 'The Organic Chemistry Tutor',
    description: 'مساعد الامتحانات الأول في حل المسائل خطوة بخطوة للفيزياء، الرياضيات، والكيمياء.',
    url: 'https://www.youtube.com/@TheOrganicChemistryTutor',
    category: 'academic_math_physics',
    language: 'en',
    tags: ['physics', 'algebra', 'chemistry', 'step-by-step'],
    iconName: 'Calculator'
  },
  {
    id: '29',
    name: 'Physics Girl',
    description: 'تجارب ورسومات تفاعلية تشرح مفاهيم الكهرومغناطيسية والفيزياء التطبيقية.',
    url: 'https://www.youtube.com/@physicsgirl',
    category: 'academic_math_physics',
    language: 'en',
    tags: ['physics', 'experiments', 'science'],
    iconName: 'Calculator'
  },
  {
    id: '30',
    name: 'Elzero Web School',
    description: 'الأولى عربياً في تعليم البرمجة، تطوير المواقع، وتأسيس علوم الحاسب.',
    url: 'https://www.youtube.com/@ElzeroWebSchool',
    category: 'programming',
    language: 'ar',
    tags: ['programming', 'javascript', 'html', 'css', 'python'],
    iconName: 'Code'
  },
  {
    id: '31',
    name: 'freeCodeCamp.org',
    description: 'كورسات كاملة بالساعات لجميع لغات البرمجة والذكاء الاصطناعي مجاناً.',
    url: 'https://www.youtube.com/@freecodecamp',
    category: 'programming',
    language: 'en',
    tags: ['programming', 'free', 'courses', 'full-course'],
    iconName: 'Code'
  },
  {
    id: '32',
    name: 'Edu Box',
    description: 'قناة تعليمية شاملة لمهارات البرمجة، التكنولوجيا، ومشاريع الطلاب.',
    url: 'https://youtube.com/@edubox-education?si=4D-kchpjhIjf5H2Y',
    category: 'programming',
    language: 'ar',
    tags: ['programming', 'education', 'technology'],
    iconName: 'Code'
  },
  {
    id: '33',
    name: 'Traversy Media',
    description: 'شروحات واضحة لتطوير الـ Frontend وBackend وبناء المشاريع.',
    url: 'https://www.youtube.com/@TraversyMedia',
    category: 'programming',
    language: 'en',
    tags: ['web', 'fullstack', 'tutorials'],
    iconName: 'Code'
  },
  {
    id: '34',
    name: 'The Net Ninja',
    description: 'قوائم تشغيل مرتبة ومقسمة لتعلم اللغات والإطارات البرمجية الحديثة.',
    url: 'https://www.youtube.com/@NetNinja',
    category: 'programming',
    language: 'en',
    tags: ['web', 'javascript', 'tutorials'],
    iconName: 'Code'
  },
  {
    id: '35',
    name: 'Fireship',
    description: 'شرح التقنيات واللغات في 100 ثانية بأسلوب سريع وممتع جداً للمبرمجين.',
    url: 'https://www.youtube.com/@Fireship',
    category: 'programming',
    language: 'en',
    tags: ['code', 'quick', 'tech'],
    iconName: 'Code'
  },
  {
    id: '36',
    name: 'SolidWorks Tutorial Course',
    description: 'تعليم التجسيم ثلاثي الأبعاد وإخراج اللوحات الرسمية بالتفصيل لبرنامج SolidWorks.',
    url: 'https://www.youtube.com/@SolidWorksTutorialsArabic',
    category: 'design_cad',
    language: 'ar',
    tags: ['solidworks', '3d', 'cad', 'drawing'],
    iconName: 'Layers'
  },
  {
    id: '37',
    name: 'Autodesk AutoCAD Learning',
    description: 'دورة الرسم الهندسي والمعماري للـ 2D والـ 3D باستخدام AutoCAD.',
    url: 'https://www.youtube.com/@autocad',
    category: 'design_cad',
    language: 'en',
    tags: ['autocad', '2d', 'drawing', 'engineering'],
    iconName: 'Layers'
  },
  {
    id: '38',
    name: 'BlenderGuru',
    description: 'احتراف النمذجة وإخراج التصاميم ثلاثية الأبعاد والإضاءة.',
    url: 'https://www.youtube.com/@blenderguru',
    category: 'design_cad',
    language: 'en',
    tags: ['blender', '3d', 'render', 'design'],
    iconName: 'Layers'
  },
  {
    id: '39',
    name: 'Ali Abdaal',
    description: 'استراتيجيات مثبتة علمياً للمذاكرة الفعالة، تنظيم الوقت، والإنتاجية الدراسية.',
    url: 'https://www.youtube.com/@aliabdaal',
    category: 'study_productivity',
    language: 'en',
    tags: ['study', 'productivity', 'time-management'],
    iconName: 'GraduationCap'
  },
  {
    id: '40',
    name: 'دروس أونلاين - Ahmed Abou Zaid',
    description: 'نصائح مذاكرة، تعلم اللغة الإنجليزية، وإدارة وقتك خلال سنوات الكلية.',
    url: 'https://www.youtube.com/@DroosOnline4u',
    category: 'study_productivity',
    language: 'ar',
    tags: ['study', 'english', 'productivity'],
    iconName: 'GraduationCap'
  },
  {
    id: '41',
    name: 'Thomas Frank',
    description: 'نصائح تنظيم المذاكرة باستخدام Notion، تحسين التركيز، والتغلب على التسويف.',
    url: 'https://www.youtube.com/@Thomasfrank',
    category: 'study_productivity',
    language: 'en',
    tags: ['notion', 'study-habits', 'focus'],
    iconName: 'GraduationCap'
  },
  {
    id: '42',
    name: 'zAmericanEnglish',
    description: 'أشهر قناة لتعليم واستيعاب اللغة الإنجليزية للتقارير والأبحاث للطلاب.',
    url: 'https://www.youtube.com/@zAmericanEnglish',
    category: 'study_productivity',
    language: 'ar',
    tags: ['english', 'learning', 'speaking'],
    iconName: 'GraduationCap'
  }
];