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

export const aiToolsData: AITool[] = [
  // Programming - IDEs & Development Environments
  {
    id: '1',
    name: 'GitHub Copilot',
    description: 'AI pair programmer for code completion',
    url: 'https://github.com/features/copilot',
    category: 'programming',
    subcategory: 'ides',
    paid: true,
    language: 'en',
    tags: ['ide', 'autocomplete', 'vscode']
  },
  {
    id: '2', 
    name: 'Cursor',
    description: 'AI-powered code editor built for productivity',
    url: 'https://cursor.sh',
    category: 'programming',
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['ide', 'editor', 'ai']
  },
  {
    id: '3',
    name: 'Replit',
    description: 'Collaborative online IDE with AI assistance',
    url: 'https://replit.com',
    category: 'programming', 
    subcategory: 'ides',
    paid: false,
    language: 'en',
    tags: ['online', 'collaborative', 'ide']
  },
  {
    id: '4',
    name: 'v0.dev',
    description: 'Generate UI components from text descriptions',
    url: 'https://v0.dev',
    category: 'programming',
    subcategory: 'frontend',
    paid: false,
    language: 'en',
    tags: ['ui', 'react', 'generation']
  },
  // Add more AI tools as needed for demonstration
];

export const aiToolCategories = {
  programming: {
    name: 'programming',
    subcategories: {
      ides: 'IDEs & Development Environments',
      general: 'General Assistants',
      extensions: 'IDE Extensions', 
      completion: 'Code Completion',
      generators: 'Project Generators',
      frontend: 'Frontend',
      backend: 'Backend & APIs',
      databases: 'Databases & SQL',
      documentation: 'Documentation',
      testing: 'Testing & QA',
      review: 'Code Review & Static Analysis',
      security: 'Security & DevSecOps',
      cicd: 'CI/CD & Infrastructure',
      monitoring: 'Monitoring & Logs',
      debugging: 'Bug Tracking',
      search: 'Code Search',
      sdks: 'SDK Generation',
      shortcuts: 'Shortcuts & Git',
      cli: 'CLI & Shell Assistants',
      pr: 'PR Agents',
      devrel: 'DevRel',
      ml: 'Machine Learning & MLOps',
      knowledge: 'Developer Knowledge Engines',
      security_testing: 'Dynamic Testing & Penetration',
      educational: 'Educational & MVP Projects',
      misc: 'Miscellaneous Tools'
    }
  },
  marketing: {
    name: 'marketing',
    subcategories: {
      design: 'Visual Design & Video Creation',
      content: 'Content & Copy Writing',
      seo: 'SEO & Content Analysis', 
      social: 'Social Media Management',
      automation: 'Campaign Automation'
    }
  },
  business: {
    name: 'business',
    subcategories: {
      project: 'Project Management',
      meetings: 'Meetings & Documentation',
      finance: 'Accounting & Finance',
      hr: 'Human Resources', 
      automation: 'Process Automation',
      analytics: 'Business Intelligence & Analytics',
      planning: 'Business Planning',
      agents: 'Business Agents & Bots',
      strategy: 'Strategy & Decision Making'
    }
  },
  engineering: {
    name: 'engineering',
    subcategories: {
      mechatronics: 'Mechatronics & Multi-domain Systems',
      mechanical: 'Mechanical CAE',
      cad: 'CAD CAM',
      electrical: 'Electrical Control & Circuits',
      programming: 'Programming for Engineers',
      simulation: 'Integrated Simulation'
    }
  }
};