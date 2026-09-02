export interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  category: 'cad_design' | 'simulation' | 'programming' | 'automation_plc' | 'water_hvac';
  departments: string[]; // معرفات الأقسام المستفيدة (mechatronics, autotronics, water-treatment, etc.)
  downloadUrl?: string;
  guideUrl?: string;
  version?: string;
  isFree: boolean;
  tags: string[];
  iconName: string;
}

export const softwareCategories = {
  cad_design: { name: 'الرسم والتصميم الهندسي (CAD/CAM)', icon: 'Compass' },
  simulation: { name: 'المحاكاة والتحليل الهندسي', icon: 'Cpu' },
  automation_plc: { name: 'الأتمتة والـ PLC / SCADA', icon: 'Binary' },
  programming: { name: 'البرمجة والبيئات المدمجة', icon: 'Code' },
  water_hvac: { name: 'برامج التبريد وتحلية المياه', icon: 'Droplets' }
};

export const engineeringSoftwareData: SoftwareItem[] = [
  {
    id: 'solidworks',
    name: 'SolidWorks',
    description: 'البرنامج الأساسي للتصميم ثلاثي الأبعاد والنمذجة الميكانيكية وتجميع أجزاء الروبوتات والآلات.',
    category: 'cad_design',
    departments: ['mechatronics', 'autotronics', 'stamping', 'refrigeration'],
    downloadUrl: 'https://www.solidworks.com',
    guideUrl: '',
    version: '2023 / 2024',
    isFree: false,
    tags: ['3D CAD', 'Mechanical', 'Design'],
    iconName: 'Box'
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'إنشاء المخططات الهندسية ثنائية الأبعاد، والرسومات التنفيذية لشبكات المياه والدائرات الكهربائية.',
    category: 'cad_design',
    departments: ['mechatronics', 'water-treatment', 'refrigeration', 'renewable'],
    downloadUrl: 'https://www.autodesk.com',
    isFree: false,
    tags: ['2D Drafting', 'Layouts', 'Schematics'],
    iconName: 'Layers'
  },
  {
    id: 'matlab',
    name: 'MATLAB & Simulink',
    description: 'بيئة المحاكاة والتحليل الرياضي الأولى للتحكم الآلي، معالجة الإشارات، ودراسة الأنظمة الديناميكية.',
    category: 'simulation',
    departments: ['mechatronics', 'renewable', 'autotronics', 'water-treatment'],
    downloadUrl: 'https://www.mathworks.com',
    isFree: false,
    tags: ['Control', 'Simulink', 'Math'],
    iconName: 'Activity'
  },
  {
    id: 'proteus',
    name: 'Proteus ISIS / ARES',
    description: 'محاكاة الدوائر الإلكترونية والكهربائية وتصميم لوحات المطبوعة (PCB) واختبار كود المتحكمات.',
    category: 'simulation',
    departments: ['mechatronics', 'autotronics', 'renewable'],
    isFree: false,
    tags: ['Electronics', 'PCB', 'Simulation'],
    iconName: 'CircuitBoard'
  },
  {
    id: 'tia-portal',
    name: 'SIEMENS TIA Portal',
    description: 'البرنامج المتكامل لبرمجة أجهزة الـ PLC والشاشات الصناعية (HMI) ونظم الـ SCADA.',
    category: 'automation_plc',
    departments: ['mechatronics', 'water-treatment', 'refrigeration'],
    isFree: false,
    tags: ['PLC', 'Siemens', 'Automation'],
    iconName: 'Cpu'
  },
  {
    id: 'watercad',
    name: 'Bentley WaterCAD / SewerCAD',
    description: 'تحليل وتصميم شبكات توزيع المياه ومحطات المعالجة والضغط الهيدروليكي.',
    category: 'water_hvac',
    departments: ['water-treatment'],
    isFree: false,
    tags: ['Water', 'Hydraulics', 'Pipes'],
    iconName: 'Droplet'
  }
];