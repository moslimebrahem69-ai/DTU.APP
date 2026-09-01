export interface YouTubeChannel {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: 'ar' | 'en' | 'both';
  tags: string[];
}

export const youtubeChannelsData: YouTubeChannel[] = [
  {
    id: '1',
    name: 'Edu Box',
    description: 'قناة تعليمية شاملة للبرمجة والتكنولوجيا',
    url: 'https://youtube.com/@edubox-education?si=4D-kchpjhIjf5H2Y',
    category: 'programming',
    language: 'ar',
    tags: ['programming', 'education', 'technology']
  },
  {
    id: '2', 
    name: 'freeCodeCamp.org',
    description: 'Free programming courses and tutorials',
    url: 'https://www.youtube.com/@freecodecamp',
    category: 'programming',
    language: 'en',
    tags: ['programming', 'free', 'courses']
  },
  {
    id: '3',
    name: 'The Net Ninja',
    description: 'Web development tutorials and courses',
    url: 'https://www.youtube.com/@NetNinja',
    category: 'programming',
    language: 'en', 
    tags: ['web', 'javascript', 'tutorials']
  },
  {
    id: '4',
    name: 'Traversy Media',
    description: 'Web development and programming tutorials',
    url: 'https://www.youtube.com/@TraversyMedia',
    category: 'programming',
    language: 'en',
    tags: ['web', 'fullstack', 'tutorials']
  },
  // Add design channels
  {
    id: '5',
    name: 'The Futur',
    description: 'Design, business and creativity education',
    url: 'https://www.youtube.com/@thefutur',
    category: 'design',
    language: 'en',
    tags: ['design', 'business', 'creativity']
  }
];

export const youtubeCategories = {
  programming: 'البرمجة والتكنولوجيا',
  design: 'التصميم والجرافيك', 
  business: 'الإدارة والأعمال',
  education: 'التعليم واللغات',
  science: 'العلوم والمعرفة',
  productivity: 'الإنتاجية وتطوير الذات'
};