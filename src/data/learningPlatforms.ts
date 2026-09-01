export interface LearningPlatform {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  paid: boolean;
  language: 'ar' | 'en' | 'both';
  tags: string[];
}

export const learningPlatformsData: LearningPlatform[] = [
  // Arabic Platforms
  {
    id: '1',
    name: 'رواق',
    description: 'منصة تعليمية عربية للتعلم الإلكتروني',
    url: 'https://rwaq.org',
    category: 'arabic',
    paid: false,
    language: 'ar',
    tags: ['arabic', 'mooc', 'education']
  },
  {
    id: '2',
    name: 'إدراك',
    description: 'منصة تعليمية عربية من مؤسسة الملكة رانيا',
    url: 'https://edraak.org',
    category: 'arabic',
    paid: false,
    language: 'ar', 
    tags: ['arabic', 'mooc', 'education']
  },
  {
    id: '3',
    name: 'نفهم',
    description: 'منصة تعليمية عربية تفاعلية',
    url: 'https://nafham.com',
    category: 'arabic',
    paid: false,
    language: 'ar',
    tags: ['arabic', 'interactive', 'k12']
  },
  // International Platforms
  {
    id: '4',
    name: 'Coursera',
    description: 'Online courses from top universities',
    url: 'https://coursera.org',
    category: 'international',
    paid: true,
    language: 'en',
    tags: ['university', 'certificates', 'mooc']
  },
  {
    id: '5',
    name: 'edX',
    description: 'Free online courses from Harvard, MIT, and more',
    url: 'https://edx.org',
    category: 'international',
    paid: false,
    language: 'en',
    tags: ['university', 'free', 'certificates']
  },
  {
    id: '6',
    name: 'Udemy',
    description: 'Online learning marketplace with practical courses',
    url: 'https://udemy.com',
    category: 'international',
    paid: true,
    language: 'both',
    tags: ['practical', 'skills', 'marketplace']
  },
  // Kids Platforms
  {
    id: '7',
    name: 'Scratch',
    description: 'Visual programming language for children',
    url: 'https://scratch.mit.edu',
    category: 'kids',
    paid: false,
    language: 'both',
    tags: ['kids', 'programming', 'visual']
  },
  // Programming & Tech Platforms
  {
    id: '8',
    name: 'freeCodeCamp',
    description: 'Free coding bootcamp with certifications',
    url: 'https://freecodecamp.org',
    category: 'programming',
    paid: false,
    language: 'en',
    tags: ['programming', 'free', 'bootcamp']
  },
  {
    id: '9',
    name: 'Codecademy',
    description: 'Interactive programming courses and projects',
    url: 'https://codecademy.com',
    category: 'programming',
    paid: true,
    language: 'en',
    tags: ['programming', 'interactive', 'projects']
  }
];

export const learningPlatformCategories = {
  arabic: 'منصات عربية',
  international: 'منصات دولية',
  kids: 'منصات للأطفال', 
  programming: 'منصات البرمجة والمهارات التقنية'
};