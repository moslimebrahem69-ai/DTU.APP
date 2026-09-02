export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  subcategory: string;
  paid: boolean;
  language: 'ar' | 'en' | 'both';
  tags: string[];
}

// Framer Motion animation configuration presets for smooth UI elements
export const aiToolsAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
  },
  card: {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 22,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.12 },
    },
  },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  tap: { scale: 0.98 },
};

export const aiToolCategories = {
  study_tools: {
    name: 'أدوات المذاكرة والتلخيص',
    subcategories: {
      pdf_summarizer: 'تلخيص الملفات والكتب',
      quiz_generator: 'توليد الأسئلة والاختبارات',
      video_summarizer: 'تلخيص الفيديوهات والمحاضرات',
      flashcards: 'بطاقات الاستذكار الفعالة',
      notes_ai: 'إدارة وتلخيص الملاحظات'
    }
  },
  mechatronics: {
    name: 'تكنولوجيا الميكاترونيكس',
    subcategories: {
      embedded_code: 'برمجة المتحكمات (Embedded/Arduino/ESP32)',
      plc_scada: 'التحكم الصناعي (PLC & SCADA)',
      circuit_design: 'تصميم ومحاكاة الدوائر الإلكترونية',
      robotics: 'أنظمة الروبوتات والتحكم'
    }
  },
  hvac: {
    name: 'تكنولوجيا التبريد والتكييف',
    subcategories: {
      thermal_calc: 'الحسابات الحرارية والأحمال',
      psychrometrics: 'تحليل الخواص الهواءية (Psychrometrics)',
      system_simulation: 'محاكاة دورات التبريد والمائع'
    }
  },
  molds_dies: {
    name: 'تصميم وتصنيع الاسطمبات',
    subcategories: {
      cad_cam: 'تصميم الاسطمبات ونمذجة 3D',
      cnc_gcode: 'توليد وتصحيح أكواد الـ CNC',
      mold_flow: 'محاكاة تدفق البلاستيك والمعدن'
    }
  },
  autotronics: {
    name: 'تكنولوجيا الأوتوترونيكس',
    subcategories: {
      obd_diagnostics: 'تحليل أكواد أعطال السيارات (OBD-II)',
      wiring_diagrams: 'مخططات الضفائر والأنظمة الكهربائية',
      ev_inverters: 'أنظمة السيارات الكهربائية والهجينة'
    }
  },
  renewable_energy: {
    name: 'تكنولوجيا الطاقة المتجددة',
    subcategories: {
      solar_pv: 'أنظمة الخلايا الشمسية (Solar PV)',
      wind_hydro: 'طاقة الرياح والهيدروليك',
      energy_efficiency: 'كفاءة وإدارة الطاقة'
    }
  },
  it_networking: {
    name: 'تكنولوجيا المعلومات والشبكات',
    subcategories: {
      networking: 'محاكاة وإدارة الشبكات',
      cybersecurity: 'الأمن السيبراني والتحليل',
      devops_cloud: 'الحوسبة السحابية والدعم الفني'
    }
  },
  academic_reports: {
    name: 'الأبحاث وتقارير التخرج',
    subcategories: {
      research_search: 'البحث الأكاديمي والمراجع',
      technical_writing: 'إعادة الصياغة والتدقيق الفني',
      presentations: 'العروض التقديمية لمشاريع التخرج',
      math_physics: 'حل المسائل الرياضية والفيزيائية'
    }
  },
  programming: {
    name: 'البرمجة والتطوير العام',
    subcategories: {
      ides: 'بيئات التطوير البرمجي',
      general: 'مساعدات البرمجة العامة',
      frontend: 'واجهات المستخدم',
      backend: 'الخلفية وقواعد البيانات'
    }
  }
};

export const aiToolsData: AITool[] = [
  // ==========================================
  // 1. أدوات المذاكرة والتلخيص وتوليد الأسئلة (لكل الفرق والكليات)
  // ==========================================
  {
    id: '1',
    name: 'Quizgecko',
    description: 'توليد امتحانات تفاعلية (MCQ، مقالي، صح وخطأ) تلقائياً من أي ملف PDF أو نص محاضرة.',
    url: 'https://quizgecko.com',
    category: 'study_tools',
    subcategory: 'quiz_generator',
    paid: false,
    language: 'both',
    tags: ['quiz', 'mcq', 'exam', 'pdf']
  },
  {
    id: '2',
    name: 'ChatPDF',
    description: 'رفع مذكرات المواد والكتب الفنية والتحدث معها لاستخراج التلخيصات وإجابات الأسئلة.',
    url: 'https://www.chatpdf.com',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'both',
    tags: ['pdf', 'summary', 'chat']
  },
  {
    id: '3',
    name: 'AnkiBrain (Anki AI)',
    description: 'إنشاء كروت مراجعة (Flashcards) بالذكاء الاصطناعي من الملازم للمراجعة السريعة قبل الامتحانات.',
    url: 'https://ankibrain.com',
    category: 'study_tools',
    subcategory: 'flashcards',
    paid: false,
    language: 'both',
    tags: ['flashcards', 'anki', 'revision']
  },
  {
    id: '4',
    name: 'Eightify',
    description: 'تلخيص الشروحات العلمية والفيديوهات الطويلة على يوتيوب إلى نقاط مركزة في ثوانٍ.',
    url: 'https://eightify.app',
    category: 'study_tools',
    subcategory: 'video_summarizer',
    paid: false,
    language: 'both',
    tags: ['youtube', 'video', 'summary']
  },
  {
    id: '5',
    name: 'Knowt',
    description: 'بديل مجاني لـ Quizlet يحول الملاحظات والمحاضرات إلى اختبارات وبطاقات استذكار تلقائياً.',
    url: 'https://knowt.com',
    category: 'study_tools',
    subcategory: 'quiz_generator',
    paid: false,
    language: 'en',
    tags: ['study', 'flashcards', 'quiz']
  },
  {
    id: '6',
    name: 'Humata AI',
    description: 'مساعد ذكي يقرأ أبحاث ومذكرات المواد الضخمة ويجيب عن الأسئلة الصعبة مع الإشارة للصفحة.',
    url: 'https://www.humata.ai',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'both',
    tags: ['pdf', 'research', 'analysis']
  },
  {
    id: '7',
    name: 'Mapify (Chatmind)',
    description: 'تحويل نصوص المحاضرات المعقدة إلى خرائط ذهنية (Mind Maps) منظمة تسهل الفهم.',
    url: 'https://mapify.so',
    category: 'study_tools',
    subcategory: 'notes_ai',
    paid: false,
    language: 'both',
    tags: ['mindmap', 'diagram', 'study']
  },
  {
    id: '8',
    name: 'Tubequicks',
    description: 'تلخيص القنوات التعليمية والسلاسل الشارحة للمواد العملية على يوتيوب واستخراج الملخص.',
    url: 'https://tubequicks.com',
    category: 'study_tools',
    subcategory: 'video_summarizer',
    paid: false,
    language: 'en',
    tags: ['youtube', 'summarizer']
  },
  {
    id: '9',
    name: 'PDFgear AI',
    description: 'أداة مجانية بالكامل لقراءة واستخراج الأسئلة وتلخيص ملفات PDF الفنية بدون حدود.',
    url: 'https://www.pdfgear.com',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'both',
    tags: ['pdf', 'free', 'summary']
  },
  {
    id: '10',
    name: 'Opus Clip',
    description: 'استقطاع الأجزاء الهامة الشارحة من فيديوهات المحاضرات الطويلة وتحويلها لمقاطع قصيرة.',
    url: 'https://www.opus.pro',
    category: 'study_tools',
    subcategory: 'video_summarizer',
    paid: false,
    language: 'en',
    tags: ['video', 'clips', 'learning']
  },
  {
    id: '11',
    name: 'KramZip',
    description: 'توليد أسئلة مراجعة ليلة الامتحان سريعة واختبارات القصيرة بناءً على السلايدز.',
    url: 'https://kramzip.com',
    category: 'study_tools',
    subcategory: 'quiz_generator',
    paid: false,
    language: 'en',
    tags: ['exam', 'prep', 'quiz']
  },

  // ==========================================
  // 2. تكنولوجيا الميكاترونيكس (Mechatronics)
  // ==========================================
  {
    id: '12',
    name: 'Wokwi AI Assistant',
    description: 'محاكاة دوائر الأردوينو وESP32 وتوليد وتصحيح أكواد Microcontrollers تفاعلياً.',
    url: 'https://wokwi.com',
    category: 'mechatronics',
    subcategory: 'embedded_code',
    paid: false,
    language: 'en',
    tags: ['arduino', 'esp32', 'simulation', 'embedded']
  },
  {
    id: '13',
    name: 'Tinkercad Circuits AI',
    description: 'تصميم ومحاكاة دوائر الإلكترونيات والحساسات مع مساعد ذكي لشرح أخطاء التوصيل.',
    url: 'https://www.tinkercad.com',
    category: 'mechatronics',
    subcategory: 'circuit_design',
    paid: false,
    language: 'both',
    tags: ['circuits', 'sensors', 'simulation']
  },
  {
    id: '14',
    name: 'ChatGPT for Microcontrollers',
    description: 'كتابة وتصحيح كود الـ C/C++ الخاص بأجهزة الـ AVR والـ STM32 والتحكم بالـ Stepper Motors.',
    url: 'https://chat.openai.com',
    category: 'mechatronics',
    subcategory: 'embedded_code',
    paid: false,
    language: 'both',
    tags: ['cpp', 'embedded', 'stm32', 'motors']
  },
  {
    id: '15',
    name: 'PLCopen AI Assistant',
    description: 'المساعدة في كتابة مخططات السلم (Ladder Logic) وأكواد الـ Structured Text لشبكات الـ PLC.',
    url: 'https://www.plcopen.org',
    category: 'mechatronics',
    subcategory: 'plc_scada',
    paid: false,
    language: 'en',
    tags: ['plc', 'ladder', 'automation', 'scada']
  },
  {
    id: '16',
    name: 'Flux.ai',
    description: 'تصميم اللوحات المطبوعة (PCB Design) في المتصفح بالذكاء الاصطناعي واكتشاف الأخطاء تلقائياً.',
    url: 'https://www.flux.ai',
    category: 'mechatronics',
    subcategory: 'circuit_design',
    paid: false,
    language: 'en',
    tags: ['pcb', 'hardware', 'electronics']
  },
  {
    id: '17',
    name: 'RoboDK AI Integration',
    description: 'برمجة ومحاكاة الذراع الآلي (Robotic Arms) والمسارات الصناعية بالذكاء الاصطناعي.',
    url: 'https://robodk.com',
    category: 'mechatronics',
    subcategory: 'robotics',
    paid: true,
    language: 'en',
    tags: ['robotics', 'kinematics', 'arm']
  },
  {
    id: '18',
    name: 'Falstad Circuit Simulator AI',
    description: 'محاكي دوائر إلكترونية تفاعلي خفيف يحلل الإشارات والترددات ويوضح حركة التيار.',
    url: 'https://www.falstad.com/circuit',
    category: 'mechatronics',
    subcategory: 'circuit_design',
    paid: false,
    language: 'en',
    tags: ['circuit', 'simulation', 'signals']
  },
  {
    id: '19',
    name: 'Copilot for MATLAB/Simulink',
    description: 'مساعد لكتابة سكربتات MATLAB وتصميم نماذج التحكم في Simulink لأنظمة الميكاترونيكس.',
    url: 'https://www.mathworks.com',
    category: 'mechatronics',
    subcategory: 'robotics',
    paid: true,
    language: 'en',
    tags: ['matlab', 'simulink', 'control']
  },
  {
    id: '20',
    name: 'EasyEDA Copilot',
    description: 'تصميم المخططات الإلكترونية وتوزيع العناصر على لوحات הـ PCB مع مقترحات توضيحية.',
    url: 'https://easyeda.com',
    category: 'mechatronics',
    subcategory: 'circuit_design',
    paid: false,
    language: 'en',
    tags: ['pcb', 'schematic', 'schematics']
  },
  {
    id: '21',
    name: 'ROS2 AI Helper',
    description: 'المساعدة في كتابة حزم نظام تشغيل الروبوتات (ROS2) وإعداد عقد التحكم والمستشعرات.',
    url: 'https://www.ros.org',
    category: 'mechatronics',
    subcategory: 'robotics',
    paid: false,
    language: 'en',
    tags: ['ros', 'robotics', 'python']
  },

  // ==========================================
  // 3. تكنولوجيا التبريد والتكييف (HVAC)
  // ==========================================
  {
    id: '22',
    name: 'CoolPack Thermal Copilot',
    description: 'حساب وتلخيص خصائص وسائط التبريد (Refrigerants) ودورات الانضغاط مع خطوات الحساب.',
    url: 'https://www.ase.dtu.dk',
    category: 'hvac',
    subcategory: 'system_simulation',
    paid: false,
    language: 'en',
    tags: ['refrigeration', 'thermodynamics', 'hvac']
  },
  {
    id: '23',
    name: 'Psychrometric Chart AI Calculator',
    description: 'حساب الخصائص الحرارية للهواء وتحديد نقاط التكييف (RSHF, ADP, Enthalpy) فورياً.',
    url: 'https://www.handsdownsoftware.com',
    category: 'hvac',
    subcategory: 'psychrometrics',
    paid: false,
    language: 'en',
    tags: ['psychrometrics', 'air', 'humidity']
  },
  {
    id: '24',
    name: 'HVAC Load Calc Copilot',
    description: 'مساعد حساب الأحمال الحرارية للمباني والمصانع واستخراج كتل التبريد المطلوبة بالـ TR.',
    url: 'https://www.loadcalc.net',
    category: 'hvac',
    subcategory: 'thermal_calc',
    paid: false,
    language: 'en',
    tags: ['cooling-load', 'hvac', 'calculation']
  },
  {
    id: '25',
    name: 'SimScale Thermal AI',
    description: 'محاكاة ديناميكا الموائل (CFD) وتوزيع الهواء والحرارة داخل مجاري التكييف (Ducts) سحابياً.',
    url: 'https://www.simscale.com',
    category: 'hvac',
    subcategory: 'system_simulation',
    paid: false,
    language: 'en',
    tags: ['cfd', 'simulation', 'ducts']
  },
  {
    id: '26',
    name: 'Ductulator AI',
    description: 'حساب أبعاد مجاري الهواء (Duct Sizing) وسرعة الهواء ومعدل هبوط الضغط.',
    url: 'https://www.freeductcalc.com',
    category: 'hvac',
    subcategory: 'thermal_calc',
    paid: false,
    language: 'en',
    tags: ['duct', 'sizing', 'airflow']
  },
  {
    id: '27',
    name: 'Danfoss RefTools AI',
    description: 'مساعد التبريد الميداني لتحديد أعطال الضاغط (Compressor) وصمامات التمدد والضغوط.',
    url: 'https://www.danfoss.com',
    category: 'hvac',
    subcategory: 'system_simulation',
    paid: false,
    language: 'both',
    tags: ['danfoss', 'troubleshooting', 'valves']
  },
  {
    id: '28',
    name: 'EnergyPlus AI Assistant',
    description: 'محاكاة استهلاك الطاقة في أنظمة التكييف المركزية والمبردات (Chillers).',
    url: 'https://energyplus.net',
    category: 'hvac',
    subcategory: 'thermal_calc',
    paid: false,
    language: 'en',
    tags: ['energy', 'chillers', 'building']
  },

  // ==========================================
  // 4. تصميم وتصنيع الاسطمبات (Dies & Molds)
  // ==========================================
  {
    id: '29',
    name: 'Fusion 360 AI Mold Design',
    description: 'تصميم أسطمبات الحقن والصاج ونمذجة تجاويف الـ Core & Cavity تلقائياً.',
    url: 'https://www.autodesk.com/products/fusion-360',
    category: 'molds_dies',
    subcategory: 'cad_cam',
    paid: true,
    language: 'en',
    tags: ['mold', 'cad', 'fusion360', 'cavity']
  },
  {
    id: '30',
    name: 'G-Code AI Generator & Corrector',
    description: 'توليد وتصحيح أكواد ماكينات الفرايز والمخارط الـ CNC قبل التشغيل لتفادي التصادم.',
    url: 'https://www.ncviewer.com',
    category: 'molds_dies',
    subcategory: 'cnc_gcode',
    paid: false,
    language: 'en',
    tags: ['cnc', 'gcode', 'milling', 'lathe']
  },
  {
    id: '31',
    name: 'Moldex3D Lite Assistant',
    description: 'محاكاة تدفق البلاستيك المنصهر داخل تجويف الاسطمبة واكتشاف العيوب (Air Traps, Weld Lines).',
    url: 'https://www.moldex3d.com',
    category: 'molds_dies',
    subcategory: 'mold_flow',
    paid: true,
    language: 'en',
    tags: ['plastic', 'injection', 'moldflow']
  },
  {
    id: '32',
    name: 'Onshape AI Assistant',
    description: 'برنامج CAD سحابي يعمل على المتصفح يساعد في تصميم أجزاء الماكينات والاسطمبات.',
    url: 'https://www.onshape.com',
    category: 'molds_dies',
    subcategory: 'cad_cam',
    paid: false,
    language: 'en',
    tags: ['cad', '3d', 'cloud']
  },
  {
    id: '33',
    name: 'CAMAssist by CloudNC',
    description: 'توليد استراتيجيات التشغيل البرمجي لماكينات CNC 3-Axis & 5-Axis تلقائياً.',
    url: 'https://www.cloudnc.com',
    category: 'molds_dies',
    subcategory: 'cnc_gcode',
    paid: true,
    language: 'en',
    tags: ['cam', 'cnc', 'machining']
  },
  {
    id: '34',
    name: 'SolidWorks AI Copilot',
    description: 'استخراج أبعاد وتصميم اسطمبات التشكيل والقطع واختبار إجهاد المعادن (FEA Analysis).',
    url: 'https://www.solidworks.com',
    category: 'molds_dies',
    subcategory: 'cad_cam',
    paid: true,
    language: 'en',
    tags: ['solidworks', 'cad', 'fea']
  },

  // ==========================================
  // 5. تكنولوجيا الأوتوترونيكس (Autotronics)
  // ==========================================
  {
    id: '35',
    name: 'OBD2 Trouble Code AI Interpreter',
    description: 'إدخال أكواد الأعطال (DTC) مثل P0300 واستخراج أسباب العطل والحساس المتسبب فيه فوراً.',
    url: 'https://www.obd-codes.com',
    category: 'autotronics',
    subcategory: 'obd_diagnostics',
    paid: false,
    language: 'both',
    tags: ['obd2', 'dtc', 'car-repair', 'sensors']
  },
  {
    id: '36',
    name: 'Car Electrical Diagrams AI Search',
    description: 'البحث عن واستخراج مخططات الضفائر الكهربائية وتوصيلات كمبيوتر السيارة (ECU Pinouts).',
    url: 'https://www.autosparky.com',
    category: 'autotronics',
    subcategory: 'wiring_diagrams',
    paid: false,
    language: 'en',
    tags: ['wiring', 'ecu', 'pinout', 'car']
  },
  {
    id: '37',
    name: 'EV Inverter & Battery Simulator',
    description: 'شرح ومحاكاة عمل إنفرترات السيارات الكهربائية وبنوك البطاريات ومحركات הـ PMSM.',
    url: 'https://www.pantechsolutions.net',
    category: 'autotronics',
    subcategory: 'ev_inverters',
    paid: false,
    language: 'en',
    tags: ['ev', 'battery', 'inverter', 'motor']
  },
  {
    id: '38',
    name: 'AutoSensors Diagnostic AI',
    description: 'شرح كيفية فحص أشار الحساسات (MAF, MAP, CKP, CMP) باستخدام جهاز الأوسلوسكوب.',
    url: 'https://www.picoauto.com',
    category: 'autotronics',
    subcategory: 'obd_diagnostics',
    paid: false,
    language: 'en',
    tags: ['oscilloscope', 'sensors', 'waveform']
  },
  {
    id: '39',
    name: 'CAN Bus Protocol Helper',
    description: 'شرح وتحليل إشارات شبكة الـ CAN Bus والـ LIN Bus في السيارات الحديثة وتتبع الأعطال.',
    url: 'https://www.vector.com',
    category: 'autotronics',
    subcategory: 'wiring_diagrams',
    paid: false,
    language: 'en',
    tags: ['canbus', 'networking', 'automotive']
  },

  // ==========================================
  // 6. تكنولوجيا الطاقة المتجددة (Renewable Energy)
  // ==========================================
  {
    id: '40',
    name: 'PVsyst AI Assistant',
    description: 'محاكاة وحساب إنتاجية المحطات الشمسية وإمالة الألواح ومواصفات الإنفرتر المناسب.',
    url: 'https://www.pvsyst.com',
    category: 'renewable_energy',
    subcategory: 'solar_pv',
    paid: true,
    language: 'en',
    tags: ['solar', 'pv', 'pvsyst', 'inverter']
  },
  {
    id: '41',
    name: 'Global Solar Atlas AI Calculator',
    description: 'حساب معدل الإشعاع الشمسي والقدرة الإنتاجية في أي منطقة جغرافية بمصر والوطن العربي.',
    url: 'https://globalsolaratlas.info',
    category: 'renewable_energy',
    subcategory: 'solar_pv',
    paid: false,
    language: 'both',
    tags: ['radiation', 'solar', 'gis']
  },
  {
    id: '42',
    name: 'HOMER Pro Energy AI',
    description: 'تصميم الأنظمة الهجينة (شديدة التعقيد) المكونة من طاقة شمسية ورِياح ومولدات ديزل.',
    url: 'https://www.homerenergy.com',
    category: 'renewable_energy',
    subcategory: 'energy_efficiency',
    paid: true,
    language: 'en',
    tags: ['homer', 'hybrid', 'microgrid']
  },
  {
    id: '43',
    name: 'Wind Atlas AI Calculator',
    description: 'حساب سرعات الرياح واختيار التوربينات الهوائية المناسبة بناءً على الارتفاع والموقع.',
    url: 'https://globalwindatlas.info',
    category: 'renewable_energy',
    subcategory: 'wind_hydro',
    paid: false,
    language: 'en',
    tags: ['wind', 'turbine', 'power']
  },
  {
    id: '44',
    name: 'System Advisor Model (SAM)',
    description: 'أداة مجانية ممتازة من NREL لحساب اقتصاديات وكفاءة مشاريع الطاقة المتجددة.',
    url: 'https://sam.nrel.gov',
    category: 'renewable_energy',
    subcategory: 'energy_efficiency',
    paid: false,
    language: 'en',
    tags: ['nrel', 'sam', 'economics']
  },

  // ==========================================
  // 7. تكنولوجيا المعلومات والشبكات (IT & Networking)
  // ==========================================
  {
    id: '45',
    name: 'Cisco Packet Tracer AI Companion',
    description: 'شرح أوامر الراوترات والسويتشات (IOS Commands) وتصميم شبكات الـ CCNA تفاعلياً.',
    url: 'https://www.netacad.com',
    category: 'it_networking',
    subcategory: 'networking',
    paid: false,
    language: 'both',
    tags: ['cisco', 'ccna', 'networking', 'router']
  },
  {
    id: '46',
    name: 'Subnetting AI Calculator',
    description: 'تقسيم الشبكات (Subnetting & VLSM) وحساب ماسك الشبكة والـ Broadcast في ثانية.',
    url: 'https://www.subnet-calculator.com',
    category: 'it_networking',
    subcategory: 'networking',
    paid: false,
    language: 'en',
    tags: ['subnetting', 'ip', 'vlsm']
  },
  {
    id: '47',
    name: 'Wireshark Packet Analyzer AI',
    description: 'تحليل حزم البيانات وتتبع ثغرات وتأخير الشبكة (Latency & Packet Loss) واكتشاف الأعطال.',
    url: 'https://www.wireshark.org',
    category: 'it_networking',
    subcategory: 'cybersecurity',
    paid: false,
    language: 'en',
    tags: ['wireshark', 'packets', 'security']
  },
  {
    id: '48',
    name: 'Linux Shell Command AI (ExplainShell)',
    description: 'شرح وتوليد أوامر ترمينال اللينكس (Ubuntu / Kali Linux) مع توضيح الفلاجات.',
    url: 'https://explainshell.com',
    category: 'it_networking',
    subcategory: 'devops_cloud',
    paid: false,
    language: 'en',
    tags: ['linux', 'terminal', 'bash']
  },
  {
    id: '49',
    name: 'PentestGPT',
    description: 'مساعد الذكاء الاصطناعي لاختبار الاختراق الأخلاقي وفحص الثغرات الأمنية في IT.',
    url: 'https://github.com/GreyDoff/PentestGPT',
    category: 'it_networking',
    subcategory: 'cybersecurity',
    paid: false,
    language: 'en',
    tags: ['security', 'pentest', 'cyber']
  },
  {
    id: '50',
    name: 'Docker & Kubernetes Helper',
    description: 'توليد ملفات Dockerfile وتكاوين Kubernetes لإدارة الخوادم والسيرفرات.',
    url: 'https://www.docker.com',
    category: 'it_networking',
    subcategory: 'devops_cloud',
    paid: false,
    language: 'en',
    tags: ['docker', 'k8s', 'cloud']
  },

  // ==========================================
  // 8. الأبحاث الأكاديمية ومشاريع التخرج (Academic & Reports)
  // ==========================================
  {
    id: '51',
    name: 'Consensus AI',
    description: 'محرك بحث علمي يجيب عن الأسئلة الأكاديمية بناءً على أوراق علمية موثوقة مع المراجع.',
    url: 'https://consensus.app',
    category: 'academic_reports',
    subcategory: 'research_search',
    paid: false,
    language: 'en',
    tags: ['research', 'papers', 'citations']
  },
  {
    id: '52',
    name: 'SciSpace (Typeset)',
    description: 'قراءة وفهم المجلات العلمية والأوراق الأكاديمية مع شرح المعالجات الرياضية المعقدة.',
    url: 'https://typeset.io',
    category: 'academic_reports',
    subcategory: 'research_search',
    paid: false,
    language: 'both',
    tags: ['research', 'pdf', 'academic']
  },
  {
    id: '53',
    name: 'Gamma App',
    description: 'إنشاء العروض التقديمية (PowerPoint / Slides) لمشاريع التخرج والسمنار بنقرة واحدة.',
    url: 'https://gamma.app',
    category: 'academic_reports',
    subcategory: 'presentations',
    paid: false,
    language: 'both',
    tags: ['slides', 'ppt', 'presentation']
  },
  {
    id: '54',
    name: 'QuillBot',
    description: 'إعادة صياغة التقارير الفنية باللغة الإنجليزية وتجنب الانتحال العلمي (Plagiarism Check).',
    url: 'https://quillbot.com',
    category: 'academic_reports',
    subcategory: 'technical_writing',
    paid: false,
    language: 'en',
    tags: ['paraphrase', 'grammar', 'reports']
  },
  {
    id: '55',
    name: 'WolframAlpha',
    description: 'حل كافة المعادلات الرياضية والتفاضل والتكامل والفيزياء الكهربية والميكانيكية بالخطوات.',
    url: 'https://www.wolframalpha.com',
    category: 'academic_reports',
    subcategory: 'math_physics',
    paid: false,
    language: 'en',
    tags: ['math', 'calculus', 'physics', 'step-by-step']
  },
  {
    id: '56',
    name: 'Elicit AI',
    description: 'مساعد بحث علمي يقوم بمسح ملايين الأوراق واستخراج النتائج الأساسية والمقارنات.',
    url: 'https://elicit.org',
    category: 'academic_reports',
    subcategory: 'research_search',
    paid: false,
    language: 'en',
    tags: ['research', 'literature-review']
  },
  {
    id: '57',
    name: 'Symbolab',
    description: 'حاسبة تفاعلية تحل مسائل الرياضيات والهندسة مع رسم المنحنيات خطوة بخطوة.',
    url: 'https://www.symbolab.com',
    category: 'academic_reports',
    subcategory: 'math_physics',
    paid: false,
    language: 'both',
    tags: ['math', 'equations', 'solver']
  },
  {
    id: '58',
    name: 'Grammarly AI',
    description: 'مصحح لغوي وإملائي ممتاز لضمان خلو تقارير المشاريع والأبحاث من الأخطاء.',
    url: 'https://www.grammarly.com',
    category: 'academic_reports',
    subcategory: 'technical_writing',
    paid: false,
    language: 'en',
    tags: ['grammar', 'writing', 'proofreading']
  },
  {
    id: '59',
    name: 'Tome AI',
    description: 'توليد عروض تقديمية تفاعلية وقصص مدعومة بالصور الشارحة للمشاريع العملية.',
    url: 'https://tome.app',
    category: 'academic_reports',
    subcategory: 'presentations',
    paid: false,
    language: 'en',
    tags: ['presentation', 'slides', 'ai']
  },

  // ==========================================
  // 9. البرمجة ومساعدات التطوير العامة
  // ==========================================
  {
    id: '60',
    name: 'GitHub Copilot',
    description: 'مساعد برمجي ذكي يكمل الأكواد ويساعد في بناء البرامج داخل VS Code.',
    url: 'https://github.com/features/copilot',
    category: 'programming',
    subcategory: 'ides',
    paid: true,
    language: 'en',
    tags: ['ide', 'autocomplete', 'vscode']
  },
  {
    id: '61',
    name: 'Cursor',
    description: 'محرر أكواد ذكي جداً يبني تطبيقات كاملة ويعدل على المشاريع بالذكاء الاصطناعي.',
    url: 'https://cursor.com',
    category: 'programming',
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['ide', 'editor', 'ai']
  },
  {
    id: '62',
    name: 'Replit AI',
    description: 'بيئة تطوير برمجية أونلاين تمكنك من كتابة وتجربة الكود مباشرة من المتصفح.',
    url: 'https://replit.com',
    category: 'programming',
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['online', 'collaborative', 'ide']
  },
  {
    id: '63',
    name: 'v0.dev',
    description: 'تحويل الأفكار والوصف النصي إلى واجهات وتطبيقات React وTailwind جاهزة في ثوانٍ.',
    url: 'https://v0.dev',
    category: 'programming',
    subcategory: 'frontend',
    paid: false,
    language: 'en',
    tags: ['ui', 'react', 'generation']
  },
  {
    id: '64',
    name: 'Blackbox AI',
    description: 'محرك بحث ومساعد برمجي ممتاز يستخرج الكود من الصور والفيديوهات.',
    url: 'https://www.blackbox.ai',
    category: 'programming',
    subcategory: 'general',
    paid: false,
    language: 'en',
    tags: ['code', 'extract', 'search']
  },
  {
    id: '65',
    name: 'Codeium',
    description: 'بديل مجاني ممتاز لـ GitHub Copilot للإكمال التلقائي للأكواد للطلاب.',
    url: 'https://codeium.com',
    category: 'programming',
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['free', 'copilot', 'extension']
  },
  {
    id: '66',
    name: 'Phind',
    description: 'محرك بحث متخصص للمبرمجين والمهندسين يحل المشاكل التقنية مع إعطاء الأكواد.',
    url: 'https://www.phind.com',
    category: 'programming',
    subcategory: 'general',
    paid: false,
    language: 'en',
    tags: ['search', 'developer', 'python']
  },
  {
    id: '67',
    name: 'Tabnine',
    description: 'إكمال تلقائي للأكواد يعتمد على الذكاء الاصطناعي مع الحفاظ على الخصوصية.',
    url: 'https://www.tabnine.com',
    category: 'programming',
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['ai', 'autocomplete', 'code']
  },
  {
    id: '68',
    name: 'Amazon Q Developer',
    description: 'مساعد برمجة واختبار أكواد وتأمين تطبيقات سحابية مقدم من أجهزة Amazon AWS.',
    url: 'https://aws.amazon.com/q/developer',
    category: 'programming',
    subcategory: 'backend',
    paid: false,
    language: 'en',
    tags: ['aws', 'cloud', 'backend']
  },

  // ==========================================
  // 10. أدوات إضافية لتغطية التخصصات التكنولوجية بكثافة
  // ==========================================
  {
    id: '69',
    name: 'Claude 3.5 Sonnet',
    description: 'أفضل نموج ذكاء اصطناعي لكتابة الأكواد وتلخيص المحاضرات الطويلة بدقة عالية جداً.',
    url: 'https://claude.ai',
    category: 'study_tools',
    subcategory: 'notes_ai',
    paid: false,
    language: 'both',
    tags: ['claude', 'coding', 'summary']
  },
  {
    id: '70',
    name: 'Perplexity AI',
    description: 'محرك بحث تفاعلي ممتازم يتيح لك الوصول للمعلومات الفنية مع الاستشهاد بالمصادر.',
    url: 'https://www.perplexity.ai',
    category: 'academic_reports',
    subcategory: 'research_search',
    paid: false,
    language: 'both',
    tags: ['search', 'citations', 'facts']
  },
  {
    id: '71',
    name: 'Notion AI',
    description: 'منظم وموثق دراسي يتيح لك عمل جدول مذاكرة وتلخيص محاضراتك في مكان واحد.',
    url: 'https://www.notion.so',
    category: 'study_tools',
    subcategory: 'notes_ai',
    paid: false,
    language: 'both',
    tags: ['notion', 'notes', 'study-plan']
  },
  {
    id: '72',
    name: 'Goblin.tools',
    description: 'أداة ممتازة لتقسيم المهام والأبحاث التكنولوجية الكبيرة إلى خطوات صغيرة قابلة للتحقيق.',
    url: 'https://goblin.tools',
    category: 'study_tools',
    subcategory: 'notes_ai',
    paid: false,
    language: 'both',
    tags: ['todo', 'productivity', 'breakdown']
  },
  {
    id: '73',
    name: 'Yippity',
    description: 'تحويل أي نص أو ملخص درس إلى مجموعة أسئلة خيارات متعددة (MCQ) فوراً.',
    url: 'https://yippity.io',
    category: 'study_tools',
    subcategory: 'quiz_generator',
    paid: false,
    language: 'en',
    tags: ['quiz', 'mcq', 'test']
  },
  {
    id: '74',
    name: 'Genei AI',
    description: 'استخراج النقاط الرئيسية من المقالات والأوراق الأكاديمية وتسريع أبحاث المواد.',
    url: 'https://www.genei.io',
    category: 'academic_reports',
    subcategory: 'research_search',
    paid: false,
    language: 'en',
    tags: ['research', 'summarizer']
  },
  {
    id: '75',
    name: 'ScribeSense',
    description: 'تصحيح الإجابات وتقييم الأداء في الامتحانات التجريبية للطلاب.',
    url: 'https://www.scribesense.com',
    category: 'study_tools',
    subcategory: 'quiz_generator',
    paid: false,
    language: 'en',
    tags: ['grading', 'eval', 'study']
  },
  {
    id: '76',
    name: 'Whimsical Diagrams AI',
    description: 'إنشاء الرسم التخطيطي للشبكات وخراط التدفق (Flowcharts) للمشاريع الميكانيكية والبرمجية.',
    url: 'https://whimsical.com',
    category: 'academic_reports',
    subcategory: 'presentations',
    paid: false,
    language: 'en',
    tags: ['flowchart', 'diagram', 'mindmap']
  },
  {
    id: '77',
    name: 'DeepL Translate AI',
    description: 'أدق أداة لترجمة النصوص والمصطلحات الهندسة والتكنولوجية دون تشويه المعنى.',
    url: 'https://www.deepl.com',
    category: 'academic_reports',
    subcategory: 'technical_writing',
    paid: false,
    language: 'both',
    tags: ['translation', 'german', 'english', 'arabic']
  },
  {
    id: '78',
    name: 'Otter.ai',
    description: 'تسجيل المحاضرات الصوتية وتحويلها إلى نصوص مكتوبة وتلخيص النقاط المهمة منها.',
    url: 'https://otter.ai',
    category: 'study_tools',
    subcategory: 'video_summarizer',
    paid: false,
    language: 'en',
    tags: ['voice', 'transcribe', 'lecture']
  },
  {
    id: '79',
    name: 'PDF2Audio AI',
    description: 'تحويل الكتب الدراسية والملفات إلى مقاطع صوتية يمكنك الاستماع إليها أثناء التنقل.',
    url: 'https://pdf2audio.com',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'both',
    tags: ['pdf', 'audio', 'listen']
  },
  {
    id: '80',
    name: 'Explainpaper',
    description: 'الضغط على أي فقرة صعبة في الملفات الفنية ليقوم الذكاء الاصطناعي بشرحها بأسلوب بسيط.',
    url: 'https://www.explainpaper.com',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'en',
    tags: ['explain', 'paper', 'simple']
  },
  {
    id: '81',
    name: 'Scholarcy',
    description: 'تلخيص الكتب والبحوث وتفكيكها إلى بطاقات ملخصة تحتوي على الجداول والحقائق الرئيسية.',
    url: 'https://www.scholarcy.com',
    category: 'study_tools',
    subcategory: 'pdf_summarizer',
    paid: false,
    language: 'en',
    tags: ['flashcards', 'summary', 'research']
  },
  {
    id: '82',
    name: 'Copy.ai for Technical Reports',
    description: 'كتابة مقدمات الأبحاث والتقارير الفنية ومقترحات المشاريع بسرعة عالية.',
    url: 'https://www.copy.ai',
    category: 'academic_reports',
    subcategory: 'technical_writing',
    paid: false,
    language: 'both',
    tags: ['writing', 'reports', 'proposal']
  },
  {
    id: '83',
    name: 'SlidesAI',
    description: 'إضافة لبرنامج Google Slides تقوم بتحويل النص المكتوب إلى شرائح بريزنتيشن جاهزة.',
    url: 'https://www.slidesai.io',
    category: 'academic_reports',
    subcategory: 'presentations',
    paid: false,
    language: 'both',
    tags: ['slides', 'google-slides', 'ppt']
  }
];