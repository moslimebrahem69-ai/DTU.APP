export interface CourseMaterial {
  name: string;
  url: string;
  type: 'lectures' | 'sheets' | 'exams' | 'notes' | 'other';
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

export interface SearchResultItem {
  yearName: string;
  deptName: string;
  semesterName: string;
  courseName: string;
  materialName: string;
  materialUrl: string;
  materialType: 'lectures' | 'sheets' | 'exams' | 'notes' | 'other' | 'drive';
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
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: true },
      { id: 'waterTreatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
    ]
  },
  {
    id: 'year2',
    name: 'الفرقة الثانية',
    nameKey: 'year2',
    enabled: true,
    departments: [
      { id: 'mechatronics', name: 'ميكاترونكس', nameKey: 'mechatronics', enabled: true },
      { id: 'it', name: 'تكنولوجيا المعلومات', nameKey: 'it', enabled: false },
      { id: 'refrigeration', name: 'تبريد وتكييف', nameKey: 'refrigeration', enabled: false },
      { id: 'stamping', name: 'اسطمبات', nameKey: 'stamping', enabled: false },
      { id: 'autotronics', name: 'أوتوترونكس', nameKey: 'autotronics', enabled: false },
      { id: 'renewable', name: 'طاقة متجددة', nameKey: 'renewableEnergy', enabled: false },
      { id: 'waterTreatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
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
      { id: 'waterTreatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
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
      { id: 'waterTreatment', name: 'تكنولوجيا معالجة وتحلية المياه', nameKey: 'waterTreatment', enabled: false }
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

export const year1RenewableCourses: Record<string, Course[]> = {
  semester1: [
    {
      id: 'engineering-design-renewable',
      name: 'التصميم الهندسي',
      nameKey: 'engineeringDesign',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1dNBeHjdNfn5pJvNmd3ouIY227l_aw_RR', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1P9LCFATMgbFMnGnn69SBnDX48BVJ8Zyx', type: 'sheets' },
        { name: 'مراجعات', url: 'https://drive.google.com/drive/folders/1ARVro3OSQmEE3wQyZ8WxKAEWd0tIycmj', type: 'notes' }
      ]
    },
    {
      id: 'math-1-renewable',
      name: 'رياضيات 1',
      nameKey: 'math1',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/182A-lD4I9qvor44QFKNihLkKNxPudGSX', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1W8hBjmCRQgR0ubKo1zPyOmETcciSPA3l', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1lspwgzlf8RvOfOOr-7qSDFtfKFsne7s6', type: 'sheets' },
        { name: 'تقارير', url: 'https://drive.google.com/drive/folders/1wqlpi92wDKFqHiv4yDKC5zSIZ07tn3pe', type: 'notes' },
        { name: 'مراجعات', url: 'https://drive.google.com/drive/folders/1dKIjPTUCzCYAJckcB4J63eYbQzqyyC_Y', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1HEa_X-RiAIqmAO748HW6wE0koSvNc3hC', type: 'exams' }
      ]
    },
    {
      id: 'english-1-renewable',
      name: 'انجليزي 1',
      nameKey: 'english1',
      materials: [
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1H4w5mXx1X3TbaF8kfrBGvAV3_ecwrQ_Y', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1B53D146kCjW3pEmucli8CVvnchzbQWGV', type: 'sheets' },
        { name: 'مراجعات', url: 'https://drive.google.com/drive/folders/1HVbxrga53_BAlq-Vym9YDx3TETY65oI9', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1W7tLJFVS2Q18lXzdC4dG_jlfI0a-PjVx', type: 'exams' }
      ]
    },
    {
      id: 'renewable-energy',
      name: 'طاقة متجددة',
      nameKey: 'renewableEnergyCourse',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1geXGjLO5SHSKl6Q5BbiIMsARKUcnvVdf', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1YwTJJmPvwrE_83iDBqaZwbBtZWOSqc25', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1VWz4Tp09gQtVmrDbsN2aGuSxkmGUvOgg', type: 'sheets' },
        { name: 'تجارب', url: 'https://drive.google.com/drive/folders/1LjgHg2jU-uL26uxkk6_BS5d57PksR2Bd', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1trBqbPJrR0HxQ_USPjhlUcoHjn9cHfJZ', type: 'exams' }
      ]
    },
    {
      id: 'matlab',
      name: 'ماتلاب',
      nameKey: 'matlab',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Mp1xZWMo4w2wbcos6mUcTyB6TFJj9gZN', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/18hrluETPEY-sXXskUeyY7yCE3EuYFB9K', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/19XePPf_x-gix0irxJ_Uz4b92w3EJUA0a', type: 'exams' }
      ]
    },
    {
      id: 'electrical-principles',
      name: 'مبادئ كهربائية',
      nameKey: 'electricalPrinciples',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1p3b8IG5R65i358FSdaOdb-L8dFiRfDGH', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1ZQA4l6y-gy1EqGYCchF-vxmS-gLGgivN', type: 'sheets' },
        { name: 'تجارب', url: 'https://drive.google.com/drive/folders/14w-lVAzn4tLP2Cjk1XsyUgixn5fk-NsB', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1GWniwyOll4P7ZqlA1Uaxd9pMxBX883Mg', type: 'exams' }
      ]
    }
  ],
  semester2: [
    {
      id: 'digital-electronics',
      name: 'الكترونات رقمية',
      nameKey: 'digitalElectronics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1EPp_pnTfcArNplyimX1_FNDmiyqMOIkh', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/19_muEH4_QkavHwlY9xpHf-n2zcUxyVgI', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1vFLcRWRXHNz0YKBIEQY80x1lm5oUurwg', type: 'sheets' },
        { name: 'شيتات بالحل', url: 'https://drive.google.com/drive/folders/123-XYOhT-dqBHPq59dUsf_btOSI-D6eT', type: 'sheets' },
        { name: 'تجارب', url: 'https://drive.google.com/drive/folders/1t3O7IjlvTQqdREb8dGF7bT0EFjOzB-o4', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1Np2vE4rVHznOkCJ2pm2XH4Axbbj45rGd', type: 'exams' }
      ]
    },
    {
      id: 'safety-renewable',
      name: 'السفتي',
      nameKey: 'safety',
      materials: [
        { name: 'شباتر', url: 'https://drive.google.com/drive/folders/1cHFOSna-rRrJuIqNBZtOa_S-CwmDsLdn', type: 'lectures' },
        { name: 'ملخصات', url: 'https://drive.google.com/drive/folders/1_7DGNCRmlySbHDlFQWczSV6NKo4oWWf-', type: 'notes' }
      ]
    },
    {
      id: 'english-2-renewable',
      name: 'انجليزي 2',
      nameKey: 'english2',
      materials: [
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1qYAhHQxAVrAxQ2lSVS29hlQWxxZsVLYq', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1w47gDkHojEbNBzl59AU20QOOOk-cxHEh', type: 'sheets' },
        { name: 'شيتات بالحل', url: 'https://drive.google.com/drive/folders/1Ah0ogND3Ppm3zNP39hqwkUyUZK9th1nx', type: 'sheets' },
        { name: 'مراجعات', url: 'https://drive.google.com/drive/folders/1JOkfupApAF7Jl1TS1vc2xZQXxzji_TN7', type: 'notes' },
        { name: 'اختبارات', url: 'https://drive.google.com/drive/folders/1ENq9I7B6O11TGR6VzsLKMWp1npceRnM0', type: 'exams' }
      ]
    },
    {
      id: 'human-rights',
      name: 'حقوق الانسان',
      nameKey: 'humanRights',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1M14uh1-cgFfImRAzUzvse7Gip6f3Z8dy', type: 'lectures' },
        { name: 'تقارير', url: 'https://drive.google.com/drive/folders/1mzD4oHsWmxLYLA_XNWX4QnWmnqdWJF6H', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/16nZi5aU51xnyibf2FAcp606XZH4Utuqm', type: 'exams' }
      ]
    },
    {
      id: 'math-2-renewable',
      name: 'رياضيات 2',
      nameKey: 'math2',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1KxE42bjj4cj_eUrPAtDTVuzIB4J6ddIb', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1so0KzQZs_IcLWHLem6TFfvj_WG27zzV3', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1jQikxwIvY2qlpC1ns8MLcrMpZfy-ujYt', type: 'sheets' },
        { name: 'تقارير', url: 'https://drive.google.com/drive/folders/17HrPB64CA8MUeJgUK824Cjebccxqi5LP', type: 'notes' },
        { name: 'مراجعات', url: 'https://drive.google.com/drive/folders/1fDtxQ7GWh_ajva9s4A5uHjqN4PURe3mG', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1DjMQrz8j5SbuQtzzf8JqLD1Yj91hdfs9', type: 'exams' }
      ]
    },
    {
      id: 'mechanics',
      name: 'ميكانيكا',
      nameKey: 'mechanics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1H823LSkWEYZhOVvUHLZYZr7ZQI44j4zV', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1pN8o64SZtcDAen_wk65hdeIgZSCWhSFw', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1j79KP_TpDMU6mYEXSFDcPsHNF1oJLkLc', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1LkDv4QRSjBWqcpZd-3LaRnpTrJJUvRV5', type: 'exams' }
      ]
    },
    {
      id: 'workshops',
      name: 'ورش عمل',
      nameKey: 'workshops',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1Pn-O8m7WCW_EKi5z4VJBIDbqsEZqoCt6', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1h8uhYL1QhkfR2tp4a0OY_05L1A1wwqio', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1QFa000h9PJAz7LUCRUyzFEtN8hYnOpuj', type: 'sheets' },
        { name: 'شيتات بالحل', url: 'https://drive.google.com/drive/folders/1c6Uv3TJ87yDcxEK4ZRJvC7BWEcyk0zq3', type: 'sheets' },
        { name: 'تقارير', url: 'https://drive.google.com/drive/folders/15moZjjgGnNRT56UwK1-tJ72aUhSufm5O', type: 'notes' },
        { name: 'كتاب الورش', url: 'https://drive.google.com/drive/folders/1DDmVfNN7o98ZUJZF8g5JWfJPsrfH_dqM', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/107rfFSxR4P8fiOuzTYhgDZ8k0r0L7LI_', type: 'exams' }
      ]
    }
  ]
};

export const year2MechatronicsCourses: Record<string, Course[]> = {
  semester1: [
    {
      id: 'pneumatics-hydraulics',
      name: 'تطبيقات النيوماتيك والهيدروليك',
      nameKey: 'pneumaticsHydraulics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1v6ffHnklflywdh_kVPwuqVoSPKWZF1co?usp=drive_link', type: 'lectures' },
        { name: 'شيتات & حل الشيتات', url: 'https://drive.google.com/drive/folders/108amHEh3Sj94haacjh-2nuvAdTr7SVuE?usp=drive_link', type: 'sheets' },
        { name: 'محاضرات مترجمه', url: 'https://drive.google.com/drive/folders/1bLVlA_f91vmWSxSp5zzLtJL8yhmJjMra?usp=drive_link', type: 'notes' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1tsI4DVVwj2XkMgT-xyG5YCRemgbbYK-3?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1SZq3gI9EjzsQlOcqDgvrvcPbwIc0QSEg?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'matlab-mechatronics',
      name: 'برمجة لتطبيقات الميكاترونيكس (Matlab)',
      nameKey: 'matlabMechatronics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1n0QzBrSHLiFM130b6X89UD8gHuy69qQH?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1kW_x4x55sLBnbq2Z19xU170rcj4ZyZ8O?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/109bUa07gg7Wy421QW2Y4R6EwxDFewAwb', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/14rk-FZOpccSR9z5a-RLvuFEsF0iuid0S?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1BBoKFt_ni2UOOtjamGUwFgDHsTcBzatE?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'material-selection',
      name: 'إختيار المواد',
      nameKey: 'materialSelection',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1SxIEMBVS0L2ktKEjr6-exWm0n7Ziv5mL?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1XDE-Ims5zFB9tEDKMjupBquLozNbpneb?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1GJ8yFzMO535UoPuOV-ZKRuy8M-HJVm6X?usp=drive_link', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1CCcwks2oEZj7e9lFj5TlycBK_UwsUomx?usp=drive_link', type: 'notes' },
        { name: 'اختيار المواد (قديم)', url: 'https://drive.google.com/drive/folders/1gNzGwEarVC5NQoe7DsHcn1sEyCvGNa4b?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1fWuu5fYg6RNpfZ8AEA-pVUaXHMmRJ0u8?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'pc-control-basics',
      name: 'أساسيات التحكم بالحاسبات (PC)',
      nameKey: 'pcControlBasics',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1c5ZX2TyjkYhMSmV1w_V7kRhQD8LGDA-3?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1QTBKPQ0ZDaQWdFlcqdrMQG20ingo-51u?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/13nIZJDmmnS-uZLl93bjeH1ot3mhLuyBX?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1qUjy1kBn5NeVsTAGUklFrEuynTCLhdzS?usp=drive_link', type: 'exams' },
        { name: 'PC (قديم)', url: 'https://drive.google.com/drive/folders/1XfBO61JMk3PIhz5Kdi_U-6TtGWl0rDOb?usp=drive_link', type: 'notes' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/16VSvIbloVuVuYnBWBX2AFfat8pLf3vqU?usp=drive_link', type: 'notes' },
        { name: 'مشاريع C++', url: 'https://drive.google.com/drive/folders/1lUvDDC2SksXgs23hMtUDJOBdazolHKPv?usp=drive_link', type: 'other' }
      ]
    },
    {
      id: 'plc',
      name: 'المتحكم المنطقي المبرمج (PLC)',
      nameKey: 'plc',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/12EcpSrJe80aNnX6SccYB-emD9brjr9Fd?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1swV_LZMBfmrGePaozkbrIeV-P5L_Rf95?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1ebrTuNgTJL-ivB7E2tmCf2LwnRrCALfw?usp=drive_link', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1_6NWqJvZG4cwRYkRXYFbZfR--H6lZTrh?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1YAgp9Yx1CACuIqZRFOZlCqFpNqw0Qxho?usp=drive_link', type: 'exams' },
        { name: 'مشاريع PLC', url: 'https://drive.google.com/drive/folders/1xg75Mbjr9wh8epYA3nKlkHmYh2zIP-rG?usp=drive_link', type: 'other' }
      ]
    }
  ],
  semester2: [
    {
      id: 'pcb-workshops',
      name: 'ورش كهربية و الكترونية (PCB)',
      nameKey: 'pcbWorkshops',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/13iV3yBJFXea2382_RUmHJOOaZBVP117P?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1Bez6d7nFZJCLEuw_e7UiDM5f4jr6caWD?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1JYMab9UDNLxYRyYsqerikRhw4Mm9fptI?usp=drive_link', type: 'sheets' },
        { name: 'ملخصات & مراجعات', url: 'https://drive.google.com/drive/folders/1ZUDcetcSB69TLjsdyECD3-bB5feGSrtx?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1xAenYT2hdOiyutcdqTLIb72mYBmbu_Bs?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'electromechanical-maintenance',
      name: 'صيانة الأنظمة الكهروميكانيكية',
      nameKey: 'electromechanicalMaintenance',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1VrDo3WHmQoIhVbnrRLdMfcNKP-p7P61N?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1eLkIrvS2SzTpHuzc0vSBYWAPXjQ_5KJH?usp=drive_link', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1BSPknNIFZp_ALzUHp60LHwEGpQ-_POpb?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/1lkfZ3IGYvRaMBwiqJ_4YbimmB-6NtZAT?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'capstone-design',
      name: 'تصميم كابستون (CD)',
      nameKey: 'capstoneDesign',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/13CAgJun4rQK1SWDwcYfNt3flZMy3Sz68?usp=drive_link', type: 'lectures' },
        { name: 'سكاشن', url: 'https://drive.google.com/drive/folders/1ssWr3PYMuhs-desmPpsWz9L1pOZCQX2m?usp=drive_link', type: 'sheets' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1eXKQ2RvJqqtYgPUQkmWnKOF6l0NH2NsS?usp=drive_link', type: 'sheets' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1sp8QZY24b5h30fzxrEYoRPMFGIEMc0M8?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'mechatronics-for-technicians',
      name: 'أنظمة الميكاترونيات للفنيين',
      nameKey: 'mechatronicsForTechnicians',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1HTuGeFDDENsSorITriEDb8AKoRUzM7g0?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1hXoCFxZJmtvaFeDn6LUGqVTamZ9FY7av?usp=drive_link', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1CzREkDpZqkZ8qlv4WDtroPnMW5rkUbyl?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1GMBdv6jPz_9X_Toc9Nidghx8JryS0udu?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'manufacturing-technology-elective',
      name: 'مقرر إختياري (تكنولوجيا التصنيع)',
      nameKey: 'manufacturingTechnology',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1RDO_3JSSg3SymP4y2qqH41FwNqoklTf1?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1A6SNwZLCzO-6s6S2ApnoIneJSdv-Qs71?usp=drive_link', type: 'sheets' },
        { name: 'ملخصات & مراجعات', url: 'https://drive.google.com/drive/folders/1n4Uyyv5s71ET4uZQq6gtxanr1lYsdSIb?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقة', url: 'https://drive.google.com/drive/folders/1aF58PuB3SNOKOgGLYwSmdwfndfSjEYMK?usp=drive_link', type: 'exams' }
      ]
    },
    {
      id: 'entrepreneurship-projects',
      name: 'المشاريع وريادة الاعمال',
      nameKey: 'entrepreneurshipProjects',
      materials: [
        { name: 'محاضرات', url: 'https://drive.google.com/drive/folders/1N0ry0opTxcYzK9AgSp8occyPIP8UMtsA?usp=drive_link', type: 'lectures' },
        { name: 'شيتات', url: 'https://drive.google.com/drive/folders/1MK4SZhCX2nt9KFLQaqT_QS7fK-yp8MlZ?usp=drive_link', type: 'sheets' },
        { name: 'مراجعات & ملخصات', url: 'https://drive.google.com/drive/folders/1hKzorJoUcoDj1iLqJDSxwTupydB8rMVG?usp=drive_link', type: 'notes' },
        { name: 'امتحانات سابقه', url: 'https://drive.google.com/drive/folders/12bNvloPd4QzZI7kbNMSKdw7PPbV8N3NF?usp=drive_link', type: 'exams' }
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

// Arabic string normalization helper to handle character variations and diacritics
const normalizeArabic = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
    .replace(/[أإآ]/g, 'ا') // Normalize Alef variations
    .replace(/ة/g, 'ه') // Normalize Teh Marbuta
    .replace(/ى/g, 'ي') // Normalize Alef Maksura
    .trim();
};

export const globalSearch = (query: string): SearchResultItem[] => {
  if (!query || query.trim() === '') return [];

  const cleanQuery = normalizeArabic(query);
  const results: SearchResultItem[] = [];

  const datasets = [
    { yearName: 'الفرقة الأولى', deptName: 'ميكاترونكس', data: year1MechatronicsCourses },
    { yearName: 'الفرقة الأولى', deptName: 'طاقة متجددة', data: year1RenewableCourses },
    { yearName: 'الفرقة الثانية', deptName: 'ميكاترونكس', data: year2MechatronicsCourses },
    { yearName: 'الفرقة الثالثة', deptName: 'ميكاترونكس', data: year3MechatronicsCourses }
  ];

  for (const group of datasets) {
    for (const semesterKey of Object.keys(group.data)) {
      const semesterName = semesterKey === 'semester1' ? 'الترم الأول' : 'الترم الثاني';
      const courses = group.data[semesterKey];

      for (const course of courses) {
        for (const material of course.materials) {
          const matchTarget = normalizeArabic(
            `${course.name} ${material.name} ${group.yearName} ${group.deptName}`
          );

          if (matchTarget.includes(cleanQuery)) {
            results.push({
              yearName: group.yearName,
              deptName: group.deptName,
              semesterName,
              courseName: course.name,
              materialName: material.name,
              materialUrl: material.url,
              materialType: material.type
            });
          }
        }
      }
    }
  }

  return results;
};