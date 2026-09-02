import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Search, 
  Download, 
  BookOpen, 
  Box, 
  Layers, 
  Activity, 
  CircuitBoard, 
  Cpu, 
  Droplet 
} from 'lucide-react';

import { engineeringSoftwareData, softwareCategories, SoftwareItem, SoftwareCategory } from '../data/engineeringSoftware';
import { Button } from '../components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  Box,
  Layers,
  Activity,
  CircuitBoard,
  Cpu,
  Droplet
};

export function EngineeringSoftware() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSoftware = engineeringSoftwareData.filter((item: SoftwareItem) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pt-6 pb-12">
      <div className="text-center py-10 bg-card border border-border rounded-3xl p-8 relative overflow-hidden shadow-sm">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
          <Wrench className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          دليل البرامج والبرمجيات الهندسية
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          تجميعة متكاملة لأهم البرامج والأدوات المطلوبة لجميع تخصصات الكلية مع روابط التحميل المباشرة والدلائل التعليمية.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث عن برنامج أو مجال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:bg-accent'
            }`}
          >
            الكل ({engineeringSoftwareData.length})
          </button>
          {Object.entries(softwareCategories).map(([key, cat]: [string, SoftwareCategory]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === key
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:bg-accent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSoftware.map((item: SoftwareItem) => {
          const ItemIcon = iconMap[item.iconName] || Wrench;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-105 transition-transform">
                    <ItemIcon className="h-6 w-6" />
                  </div>
                  {item.version && (
                    <span className="text-[10px] font-semibold bg-accent text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                      {item.version}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                {item.downloadUrl && (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full text-xs gap-2 rounded-xl"
                    onClick={() => window.open(item.downloadUrl, '_blank')}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>تحميل / الموقع</span>
                  </Button>
                )}
                {item.guideUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-2 rounded-xl"
                    onClick={() => window.open(item.guideUrl, '_blank')}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>الشرح</span>
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredSoftware.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          لا توجد نتائج تطابق بحثك حالياً.
        </div>
      )}
    </div>
  );
}