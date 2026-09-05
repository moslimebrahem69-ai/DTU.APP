import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Search, 
  Download, 
  BookOpen, 
  Filter,
  Grid,
  Box, 
  Layers, 
  Activity, 
  CircuitBoard, 
  Cpu, 
  Droplet 
} from 'lucide-react';

import { engineeringSoftwareData, softwareCategories, SoftwareItem, SoftwareCategory } from '../data/engineeringSoftware';
import { Button } from '../components/ui/button';

// Icon mapping dictionary
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

  // Filter software data based on search term and category
  const filteredSoftware = engineeringSoftwareData.filter((item: SoftwareItem) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 pb-8">
      {/* Clean Minimal Header (Matches AI Page) */}
      <div className="text-right space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          أدوات والبرامج الهندسية
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          اكتشف أفضل البرامج والبرمجيات الهندسية المطلوبة للتخصصات المختلفة
        </p>
      </div>

      {/* Controls Section: Search Bar & Dropdown Filter */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث في جميع المحتويات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-card/80 backdrop-blur-md border border-border/70 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-2xs"
          />
        </div>

        {/* Filter Label */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium pr-0.5">
          <Filter className="h-3.5 w-3.5" />
          <span>الفلاتر:</span>
        </div>

        {/* Single Full-Width Main Category Dropdown */}
        <div className="relative w-full">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none bg-card border border-border/80 rounded-xl px-9 py-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer shadow-2xs"
          >
            <option value="all">جميع الفئات ({engineeringSoftwareData.length})</option>
            {Object.entries(softwareCategories).map(([key, cat]: [string, SoftwareCategory]) => (
              <option key={key} value={key}>
                {cat.name}
              </option>
            ))}
          </select>
          <Grid className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-[10px]">
            ▼
          </div>
        </div>
      </div>

      {/* Software Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {filteredSoftware.map((item: SoftwareItem) => {
          const ItemIcon = iconMap[item.iconName] || Wrench;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-card border border-border/70 rounded-xl p-3.5 flex flex-col justify-between hover:border-primary/40 transition-all duration-200 relative shadow-2xs"
            >
              <div>
                {/* Header: Icon, Name & Version */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                      <ItemIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                        {item.name}
                      </h3>
                      {item.version && (
                        <span className="text-[10px] font-medium text-muted-foreground block">
                          {item.version}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-[11px] leading-relaxed mb-2.5 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-secondary/60 text-secondary-foreground px-1.5 py-0.5 rounded font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pt-2.5 border-t border-border/40">
                {item.downloadUrl && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 h-7 text-[11px] gap-1 rounded-md font-semibold"
                    onClick={() => window.open(item.downloadUrl, '_blank')}
                  >
                    <Download className="h-3 w-3" />
                    <span>تحميل / الموقع</span>
                  </Button>
                )}
                {item.guideUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-7 text-[11px] gap-1 rounded-md font-semibold"
                    onClick={() => window.open(item.guideUrl, '_blank')}
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>الشرح</span>
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty Search State */}
      {filteredSoftware.length === 0 && (
        <div className="text-center py-10 text-xs text-muted-foreground">
      لا مفيش 
        </div>
      )}
    </div>
  );
}