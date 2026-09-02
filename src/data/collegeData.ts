export interface CourseMaterial {
  name: string;
  url: string;
  type: 'lectures' | 'sheets' | 'exams' | 'notes';
}

export interface Course {
  id: string;
  name: string;
  nameKey: string;
  materials: CourseMaterial[];
}

export interface Department {
  id: string;
  name: string;
  nameKey: string;
  enabled: boolean;
}

export interface Year {
  id: string;
  name: string;
  nameKey: string;
  departments: Department[];
  enabled: boolean;
}

export const collegeData: Year[] = [
  {
    id: 'year1',
    name: 'الفرقة الأولى',
    nameKey: 'year1',
    enabled: true,
    departments: [
      { id: 'mechatronics', name: 'ميكاترونكس', nameKey: 'mechatronics', enabled: true },
      { id: 'it', name: 'تكنولوجيا المعلومات', nameKey: 'it', enabled: false },
      { id: 'refrigeration', name: 'تبريد وتكييف', nameKey: 'refrigeration', enabled: false },
      { id: 'stamping', name: 'اسطمبات', nameKey: 'stamping', enabled: false },
      { id: 'autotronics', name: 'أوتوترونكس', nameKey: 'autotronics', enabled: false },
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: false },
      { id: 'water-treatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
    ]
  },
  {
    id: 'year2',
    name: 'الفرقة الثانية',
    nameKey: 'year2',
    enabled: false,
    departments: [
      { id: 'mechatronics', name: 'ميكاترونكس', nameKey: 'mechatronics', enabled: false },
      { id: 'it', name: 'تكنولوجيا المعلومات', nameKey: 'it', enabled: false },
      { id: 'refrigeration', name: 'تبريد وتكييف', nameKey: 'refrigeration', enabled: false },
      { id: 'stamping', name: 'اسطمبات', nameKey: 'stamping', enabled: false },
      { id: 'autotronics', name: 'أوتوترونكس', nameKey: 'autotronics', enabled: false },
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: false },
      { id: 'water-treatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
    ]
  },
  {
    id: 'year3',
    name: 'الفرقة الثالثة',
    nameKey: 'year3',
    enabled: true,
    departments: [
      { id: 'mechatronics', name: 'ميكاترونكس', nameKey: 'mechatronics', enabled: true },
      { id: 'it', name: 'تكنولوجيا المعلومات', nameKey: 'it', enabled: false },
      { id: 'refrigeration', name: 'تبريد وتكييف', nameKey: 'refrigeration', enabled: false },
      { id: 'stamping', name: 'اسطمبات', nameKey: 'stamping', enabled: false },
      { id: 'autotronics', name: 'أوتوترونكس', nameKey: 'autotronics', enabled: false },
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: false },
      { id: 'water-treatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
    ]
  },
  {
    id: 'year4',
    name: 'الفرقة الرابعة', 
    nameKey: 'year4',
    enabled: false,
    departments: [
      { id: 'mechatronics', name: 'ميكاترونكس', nameKey: 'mechatronics', enabled: false },
      { id: 'it', name: 'تكنولوجيا المعلومات', nameKey: 'it', enabled: false },
      { id: 'refrigeration', name: 'تبريد وتكييف', nameKey: 'refrigeration', enabled: false },
      { id: 'stamping', name: 'اسطمبات', nameKey: 'stamping', enabled: false },
      { id: 'autotronics', name: 'أوتوترونكس', nameKey: 'autotronics', enabled: false },
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: false },
      { id: 'water-treatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
    ]
  }
];

export const year1MechatronicsCourses: Record<string, Course[]> = {
  semester1: [
    {
      id: 'applied-science-math',
      name: 'تطبيقات العلوم والرياضة',
      nameKey: 'appliedScienceMath',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1noCag9prqYdrH_G88y4qzqhL8hC2S3vS', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1mFXLPQkBpNK7sTsI49jUEBGZ9m3wMpOR', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/16OjGx-RMd6_gTWLLmBDP1n6TWXzaFb5l', type: 'exams' }
      ]
    },
    {
      id: 'mathematics-1',
      name: 'الرياضيات',
      nameKey: 'mathematics1',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1JW3SldG1_fP9OIyRLl9nurBTy8kQMfd-', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1jlN8gDPDsGQubPCGvNQMRjDZHISTmI6o', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1xTWn5HFdiEdCMyprpVToK48ZRsR2TAYl', type: 'exams' }
      ]
    },
    {
      id: 'safety',
      name: 'السفتي',
      nameKey: 'safety',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1GGR-0iXjA4j49Qz4ku04XP3Jr38Wp42d', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1QGcWckmn72b-E1UUSb11Gn2MTTFNhEeb', type: 'sheets' }
      ]
    },
    {
      id: 'physics',
      name: 'الفيزياء',
      nameKey: 'physics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1_cbhEehuCbB13EwEOAlaYst68b9LDFT6', type: 'lectures' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1eLtUCAOJnXBV1lPEB_p6opTKe49A-kTb', type: 'exams' }
      ]
    },
    {
      id: 'english-1',
      name: 'انجليزي 1',
      nameKey: 'english1',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1k5GCZh8Y6WIr7MBw-Qy8UaOGJ-2WC6aU', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1oLCb3OCqJcgIUbP-nexAxu4HOBGGI4Pl', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1ku-8KomkF_tlzsY6u3s-8ump8f2XRm8A', type: 'exams' }
      ]
    },
    {
      id: 'communication-skills',
      name: 'مهارات التواصل',
      nameKey: 'communicationSkills',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1PfAt5nFmKpEs3acXmvaSLaYBb-JnimEZ', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1RZk5kOu8wGfd-YkQ2b0pr7_kp6u_b9Rh', type: 'sheets' },
        { name: 'ملخصات', url: 'https://drive.google.com/drive/folders/1x8FXsl0EjzSq6ge9oez8V7XcUIouBcH9', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1KEGNTcihDp9k7hzAPZ6fLHeSxteTqTPJ', type: 'exams' }
      ]
    }
  ],
  semester2: [
    {
      id: 'computer-kinematics',
      name: 'الحركية بالحاسب',
      nameKey: 'computerKinematics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Hg7v7gzdja6ieLvwOIFQv_JCHIS8gSF_?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1jPQ_KFJYUhN24PIrtVzwLxYjeZ0lcTAB?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1sSoc2s3ZHPlYpJAzMsyxaKDh4ScMZ4ev?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'english-2',
      name: 'انجليزي 2',
      nameKey: 'english2',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1rBLHzcwTTLYEWWLXXUQpWfUtfjUpA2Ah?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1Ko9CWtRezoQ7wXwgCd0sIRFEWpwBCOms?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1zV08TF_N3bPPJGdzPf9LhwC9jw02KhXk?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'engineering-design',
      name: 'تصميم هندسي',
      nameKey: 'engineeringDesign',
      materials: [
        { name: 'كتاب المادة', url: 'https://drive.google.com/', type: 'notes' },
        { name: 'تمارين سوليد', url: 'https://drive.google.com/', type: 'sheets' },
        { name: 'تمارين كاد', url: 'https://drive.google.com/', type: 'sheets' }
      ]
    },
    {
      id: 'computer-technology',
      name: 'تكنولوجيا الحاسب',
      nameKey: 'computerTechnology',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1mllTDHif7_VwBpI-S1l9xwNkjfPWSv_j?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1jMrCpgPXXI9wY3GFvDNhLy0MmEWiydy1?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1eBN00zktUi-uN2It2iFke2wsnYl2JgbX?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1HftGgdLL7xlWPA2E_JFo40JxuL8d6SCM?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'environmental-studies',
      name: 'دراسات بيئية',
      nameKey: 'environmentalStudies',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/15c8tnDb_ulNz0aNv6XFD09Tctsm0dhhz?usp=drive_link', type: 'lectures' },
        { name: 'ملخصات', url: 'https://drive.google.com/drive/folders/1t0eJt-p9U7R-xQ-KlDeeDTXtRntCYbd_?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'electric-circuits',
      name: 'دوائر كهربائية',
      nameKey: 'electricCircuits',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1atMUOsiNMCnJXYrci9JwLUwnJv6uQS-H?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1sxZQra4o1VEU9yzgKn7OP4SwzUEVksLH?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1Tns1j9YK1iu0SG9APaP_m1tpa1LwoCid?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1y44hE0aOnOsOZSbMtRoDqy2ELAQslVmY?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'mechatronics-workshops',
      name: 'مبادئ ورش الميكاترونيكس',
      nameKey: 'mechatronicsWorkshops',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1rU1lNC9E6bAETA8dguZr4K3D5Ztmsu93?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1vEb_Fo2xk4xuKq9mfXaK_qqX9KoeEvti?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1ug8H-sFlG35YALl9iQh8uTXvrBM2eNJB?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1rhB-NYrVClyDKDEtdqYdCVg7UCc-OLWb?usp=drive_link', type: 'exams' }
      ]
    }
  ]
};

export const year3MechatronicsCourses: Record<string, Course[]> = {
  semester1: [
    {
      id: '3d-cad',
      name: '3D CAD',
      nameKey: '3dCad',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1P0HXpJRdNjvzYc1udkFyXte3QhrEEh92?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1Jt8YBSrRxQamBdD05PnCcLyMKvWXrao-?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1ebvvhu_703eW2mgPVcmVjwyrbVObJqGL?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/1Ol3EBQjoPQhV_W2Xh7izbEzFJYsAgxMP?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      nameKey: 'mathematics',
      materials: [
        { name: 'محاضرات التفاضل', url: 'https://drive.google.com/drive/folders/1mp9st8Rv-QYDvb5oy7gglgTROM5P1lhn?usp=drive_link', type: 'lectures' },
        { name: 'محاضرات التكامل', url: 'https://drive.google.com/drive/folders/1S_dYWb8auj-6WH0UZqRuJdN33vF7EnNy?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1cL82QivlBdKUlXJgNhvRB3Q0n3zxY6oH?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1XGdmwprk2HePuOIcArUqnKhGqeD-JHoe?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/176Jr35qEF5Emof1g0twefdXwTWSd0G7S?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'robotics',
      name: 'Robotics',
      nameKey: 'robotics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Mp7zeDvtxyp7XVswNvYngsfybVw0l4Vt?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1zsY0x8OaID2Slr6gOikavNTHpj-HuRXb?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1U0r1h6Ikgd82liSs0TIXQY8a7wajyjYi?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/15ttRMtIg7V6BtcJ-3jHCAurd9d2TJjeC?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'sensors',
      name: 'Sensors',
      nameKey: 'sensors',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Ih4sZqw3MR0Y_lPxK3Noqc6QxaYRQdh9?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/14wixnIsWpViQrkPGgffGsglXrGKFn3In?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1DEYr5oFFhWIPsGIFij4WENLbv95VNhS4?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/19nURZM7im0iFRAptOtBQz-M4v9ILjXQe?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'automatic-control',
      name: 'تحكم آلي',
      nameKey: 'automaticControl',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1mMsFb62zDhiwJVAosaePiGwq3VVikAHE?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1N8Rfc0IkNE4Ji0Yvr978GQBBtzK2XdcO?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1DGZ4ZsjEJyUesabVBp4mC4u9Dt2VeakL?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/1KMMI9S7AdWuC18iNR0HTcxlMyoAvZ324?usp=drive_link', type: 'notes' }
      ]
    }
  ],
  semester2: [
    {
      id: 'cnc-technology',
      name: 'C N C Technology',
      nameKey: 'cncTechnology',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Oc6nyWqWYF5DzLzG4zS6vNLEVgpMQo6d?usp=drive_link', type: 'lectures' },
        { name: 'الشيتات', url: 'https://drive.google.com/drive/folders/1jFh1VZeGb0SP2olvAWvTuFfTLzWueNV1?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1MHjY6uNxKdcFd6EMhYB-LXCgMn_dSZVc?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/1vOdu5rh9OxV9x7D8MAVEhdlAXp1RDpVI?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'mechanism-design',
      name: 'Mechanism Design',
      nameKey: 'mechanismDesign',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/13GM2Dds5I4sJ-s2SYlqamKSbEjcnlQLD?usp=drive_link', type: 'lectures' },
        { name: 'الشيتات', url: 'https://drive.google.com/drive/folders/15talokoALOXRS5279YHwmZg9cKSSYI14?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1gUe21kDmPskcTfWXRlGHnrYWlai7zek_?usp=drive_link', type: 'exams' },
        { name: 'ملاحظات', url: 'https://drive.google.com/drive/folders/1oBR4thQPosBF0iMysPTkwPeaWCOOXgW7?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'microprocessor',
      name: 'Microprocessor',
      nameKey: 'microprocessor',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1tddJln7fWGtVz9mxwDHvRk5Dyxp7dJCo?usp=drive_link', type: 'lectures' },
        { name: 'الشيتات', url: 'https://drive.google.com/drive/folders/1dHhYkDjha8_ZE0BYRScuw-5b6hCRH2b7?usp=drive_link', type: 'sheets' },
        { name: 'الامتحانات', url: 'https://drive.google.com/drive/folders/1Rt24IaeJy-guQ8sGTp72pMqKVAllGqwi?usp=drive_link', type: 'exams' },
        { name: 'الملاحظات', url: 'https://drive.google.com/drive/folders/1qGQW0MKDA_sTk8MFQecg_b3VgYLaUlYt?usp=drive_link', type: 'notes' }
      ]
    },
    {
      id: 'power-electronics',
      name: 'Power Electronics',
      nameKey: 'powerElectronics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1PZpsrXwUwhYNk4N8pgGhCskGvqTux0-h?usp=drive_link', type: 'lectures' },
        { name: 'الشيتات', url: 'https://drive.google.com/drive/folders/1GTRL53k0KuYJLQBojBJRIja6Tfbny_sk?usp=drive_link', type: 'sheets' },
        { name: 'الملاحظات', url: 'https://drive.google.com/drive/folders/15Kco8Zsi1LgB-403kGbHgmALKz-7w67d?usp=drive_link', type: 'notes' },
        { name: 'الامتحانات السابقة', url: 'https://drive.google.com/drive/folders/1F5DFnKsQRPKxXSXb2LC1LEo1u2qqBD8f?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'production-planning',
      name: 'Production and Planning',
      nameKey: 'productionPlanning',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/14K8pksEdoC5n1BuwbqZSVXgpU8uQ4GDf?usp=drive_link', type: 'lectures' },
        { name: 'الشيتات', url: 'https://drive.google.com/drive/folders/1SFL9PRuvTi3OpRXgUEi8PuLdAtpBiG5G?usp=drive_link', type: 'sheets' },
        { name: 'الملاحظات', url: 'https://drive.google.com/drive/folders/1DJxTKb_F8E92_jpHw9kNApSu10kIhgcm?usp=drive_link', type: 'notes' },
        { name: 'الامتحانات', url: 'https://drive.google.com/drive/folders/1F_4y2YuFtrqEcjoVvoa94dRdCS51lxQE?usp=drive_link', type: 'exams' }
      ]
    }
  ]
};