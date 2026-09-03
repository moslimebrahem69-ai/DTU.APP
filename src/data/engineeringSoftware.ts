export interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  category: 'cad_design' | 'simulation' | 'programming' | 'automation_plc' | 'water_hvac';
  departments: string[]; // معرفات الأقسام المستفيدة
  downloadUrl?: string;
  guideUrl?: string;
  version?: string;
  isFree: boolean;
  tags: string[];
  iconName: string;
}
export type SoftwareCategory = {
  name: string;
  icon: string;
};
export const softwareCategories = {
  cad_design: { name: 'الرسم والتصميم الهندسي (CAD/CAM)', icon: 'Compass' },
  simulation: { name: 'المحاكاة والتحليل الهندسي', icon: 'Cpu' },
  automation_plc: { name: 'الأتمتة والـ PLC / SCADA', icon: 'Binary' },
  programming: { name: 'البرمجة والبيئات المدمجة', icon: 'Code' },
  water_hvac: { name: 'برامج التبريد وتحلية المياه', icon: 'Droplets' }
};

export const engineeringSoftwareData: SoftwareItem[] = [
  // 1. قسم الرسم والتصميم الهندسي (CAD/CAM)
  {
    id: 'solidworks',
    name: 'SolidWorks',
    description: 'البرنامج الأساسي للتصميم ثلاثي الأبعاد والنمذجة الميكانيكية وتجميع أجزاء الروبوتات والآلات.',
    category: 'cad_design',
    departments: ['mechatronics', 'autotronics', 'stamping', 'refrigeration', 'mechanical'],
    downloadUrl: 'https://www.solidworks.com',
    version: '2023 / 2024',
    isFree: false,
    tags: ['3D CAD', 'Mechanical', 'Design', 'Assembly'],
    iconName: 'Box'
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'إنشاء المخططات الهندسية ثنائية الأبعاد، والرسومات التنفيذية لشبكات المياه والدوائر الكهربائية.',
    category: 'cad_design',
    departments: ['mechatronics', 'water-treatment', 'refrigeration', 'renewable', 'civil'],
    downloadUrl: 'https://www.autodesk.com',
    version: '2024',
    isFree: false,
    tags: ['2D Drafting', 'Layouts', 'Schematics', 'CAD'],
    iconName: 'Layers'
  },
  {
    id: 'inventor',
    name: 'Autodesk Inventor',
    description: 'برنامج متقدم للنمذجة الميكانيكية ثلاثية الأبعاد وتصميم الأسطح وتحليل الإجهادات للآلات.',
    category: 'cad_design',
    departments: ['mechatronics', 'mechanical'],
    downloadUrl: 'https://www.autodesk.com/products/inventor',
    version: '2024',
    isFree: false,
    tags: ['3D CAD', 'Simulation', 'Prototyping'],
    iconName: 'Box'
  },

  // 2. قسم المحاكاة والتحليل الهندسي
  {
    id: 'matlab',
    name: 'MATLAB & Simulink',
    description: 'بيئة المحاكاة والتحليل الرياضي الأولى للتحكم الآلي، معالجة الإشارات، ودراسة الأنظمة الديناميكية.',
    category: 'simulation',
    departments: ['mechatronics', 'renewable', 'autotronics', 'water-treatment', 'electrical'],
    downloadUrl: 'https://www.mathworks.com',
    version: 'R23b / R24a',
    isFree: false,
    tags: ['Control', 'Simulink', 'Math', 'Algorithms'],
    iconName: 'Activity'
  },
  {
    id: 'proteus',
    name: 'Proteus ISIS / ARES',
    description: 'محاكاة الدوائر الإلكترونية والكهربائية وتصميم لوحات المطبوعة (PCB) واختبار كود المتحكمات.',
    category: 'simulation',
    departments: ['mechatronics', 'autotronics', 'renewable', 'electronics'],
    downloadUrl: 'https://www.labcenter.com',
    version: '8.15 / 8.16',
    isFree: false,
    tags: ['Electronics', 'PCB', 'Simulation', 'Microcontrollers'],
    iconName: 'CircuitBoard'
  },
  {
    id: 'ansys',
    name: 'ANSYS Workbench',
    description: 'برنامج التحليل الهندسي الهائل بدقة العناصر المحدودة (FEA) وديناميكا الموائع الحسابية (CFD).',
    category: 'simulation',
    departments: ['mechatronics', 'mechanical', 'renewable'],
    downloadUrl: 'https://www.ansys.com',
    version: '2023 R2',
    isFree: false,
    tags: ['FEA', 'CFD', 'Stress Analysis', 'Simulation'],
    iconName: 'Cpu'
  },
  {
    id: 'altium',
    name: 'Altium Designer',
    description: 'البرنامج الاحترافي الأقوى عالمياً لتصميم الدوائر الإلكترونية المعقدة ولوحات الـ PCB متعددة الطبقات.',
    category: 'simulation',
    departments: ['mechatronics', 'electronics', 'communications'],
    downloadUrl: 'https://www.altium.com',
    version: '24.0',
    isFree: false,
    tags: ['PCB Design', 'Schematic', 'Hardware'],
    iconName: 'CircuitBoard'
  },

  // 3. الأتمتة والـ PLC / SCADA
  {
    id: 'tia-portal',
    name: 'SIEMENS TIA Portal',
    description: 'البرنامج المتكامل لبرمجة أجهزة الـ PLC (مثل S7-1200/1500) وشاشات الـ HMI ونظم الـ SCADA.',
    category: 'automation_plc',
    departments: ['mechatronics', 'water-treatment', 'refrigeration', 'electrical'],
    downloadUrl: 'https://www.siemens.com',
    version: 'V18 / V19',
    isFree: false,
    tags: ['PLC', 'Siemens', 'Automation', 'HMI'],
    iconName: 'Cpu'
  },
  {
    id: 'step7',
    name: 'Siemens STEP 7 / Simatic Manager',
    description: 'البرنامج الكلاسيكي لبرمجة متحكمات سيمينز القديمة مثل S7-300 و S7-400 المستخدمة في المصانع.',
    category: 'automation_plc',
    departments: ['mechatronics', 'electrical'],
    downloadUrl: 'https://www.siemens.com',
    isFree: false,
    tags: ['PLC', 'S7-300', 'Industrial Automation'],
    iconName: 'Cpu'
  },
  {
    id: 'codesys',
    name: 'CODESYS Development System',
    description: 'منصة برمجة الأتمتة الصناعية الرائدة المتوافقة مع معيار IEC 61131-3 لمختلف أنواع المتحكمات.',
    category: 'automation_plc',
    departments: ['mechatronics', 'electrical'],
    downloadUrl: 'https://www.codesys.com',
    isFree: true,
    tags: ['PLC', 'IEC 61131-3', 'Industrial'],
    iconName: 'Cpu'
  },

  // 4. البرمجة والبيئات المدمجة (Programming & Embedded Systems)
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'محرر الكود البرمجي الأفضل عالمياً لتطوير الويب، بايثون، وكاتبة أكواد الأنظمة المدمجة مع إضافات قوية.',
    category: 'programming',
    departments: ['mechatronics', 'computers', 'communications'],
    downloadUrl: 'https://code.visualstudio.com',
    version: 'Latest',
    isFree: true,
    tags: ['Editor', 'Python', 'C++', 'Web Development'],
    iconName: 'Cpu'
  },
  {
    id: 'codeblocks',
    name: 'Code::Blocks',
    description: 'بيئة تطوير متكاملة خفيفة ومستقرة لبرمجة وتجميع لغة C و C++ ودراسة الخوارزميات الأساسية.',
    category: 'programming',
    departments: ['mechatronics', 'computers', 'preparatory'],
    downloadUrl: 'https://www.codeblocks.org',
    version: '20.03',
    isFree: true,
    tags: ['C++', 'C', 'Compiler', 'Programming'],
    iconName: 'Cpu'
  },
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    description: 'البيئة البرمجية الرسمية لبرمجة لوحات الأردوينو والمتحكمات الدقيقة وتجربة الحساسات والمحركات.',
    category: 'programming',
    departments: ['mechatronics', 'autotronics', 'renewable'],
    downloadUrl: 'https://www.arduino.cc',
    version: '2.3.2',
    isFree: true,
    tags: ['Arduino', 'Embedded', 'C++', 'Hardware'],
    iconName: 'Cpu'
  },
  {
    id: 'keil-uvision',
    name: 'Keil µVision (MDK)',
    description: 'بيئة التطوير المتكاملة المتقدمة لبرمجة متحكمات ARM Cortex-M و STM32 باحترافية عالية.',
    category: 'programming',
    departments: ['mechatronics', 'computers'],
    downloadUrl: 'https://www.keil.com',
    version: 'V5',
    isFree: false,
    tags: ['ARM', 'STM32', 'Embedded C', 'Microcontrollers'],
    iconName: 'Cpu'
  },

  // 5. برامج التبريد وتحلية المياه والبيئة (Water & HVAC)
  {
    id: 'watercad',
    name: 'Bentley WaterCAD / SewerCAD',
    description: 'تحليل وتصميم شبكات توزيع المياه ومحطات المعالجة والضغط الهيدروليكي وشبكات الصرف.',
    category: 'water_hvac',
    departments: ['water-treatment', 'civil'],
    downloadUrl: 'https://www.bentley.com',
    version: '2023',
    isFree: false,
    tags: ['Water', 'Hydraulics', 'Pipes', 'Network Analysis'],
    iconName: 'Droplet'
  },
  {
    id: 'hapis',
    name: 'Carrier HAP (Hour Analysis Program)',
    description: 'البرنامج الهندسي العالمي لحساب الأحمال الحرارية لأنظمة تكييف الهواء وتصميم المجاري الهوائية (Ducts).',
    category: 'water_hvac',
    departments: ['refrigeration', 'mechanical'],
    downloadUrl: 'https://www.carrier.com',
    version: 'v5.11',
    isFree: false,
    tags: ['HVAC', 'Thermal Load', 'Air Conditioning'],
    iconName: 'Droplet'
  }
];