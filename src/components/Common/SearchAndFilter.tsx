import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Grid, 
  BookOpen, 
  Cpu, 
  Wind, 
  Box, 
  Car, 
  Zap, 
  Network, 
  FileText, 
  Code2,
  Folder
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { useDebounce } from '../../hooks/useDebounce';

interface CategoryItem {
  name: string;
  iconName?: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  categories: Record<string, string | CategoryItem>;
  showLanguageFilter?: boolean;
  languageFilter?: string;
  onLanguageFilterChange?: (lang: string) => void;
  showPaidFilter?: boolean;
  paidFilter?: string;
  onPaidFilterChange?: (filter: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Grid,
  study_tools: BookOpen,
  mechatronics: Cpu,
  hvac: Wind,
  molds_dies: Box,
  autotronics: Car,
  renewable_energy: Zap,
  it_networking: Network,
  academic_reports: FileText,
  programming: Code2,
};

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  showLanguageFilter = false,
  languageFilter = 'both',
  onLanguageFilterChange,
  showPaidFilter = false,
  paidFilter = 'both',
  onPaidFilterChange
}: SearchAndFilterProps) {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const hasActiveFilters = category !== 'all' || 
    (showLanguageFilter && languageFilter !== 'both') ||
    (showPaidFilter && paidFilter !== 'both');

  const clearFilters = () => {
    onCategoryChange('all');
    if (onLanguageFilterChange) onLanguageFilterChange('both');
    if (onPaidFilterChange) onPaidFilterChange('both');
    onSearchChange('');
  };

  const getCategoryIcon = (key: string) => {
    const IconComponent = CATEGORY_ICONS[key] || Folder;
    return <IconComponent className="h-4 w-4 shrink-0 text-muted-foreground" />;
  };

  return (
    <motion.div 
      className="mb-8 space-y-6"
      initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Search Bar */}
      <motion.div 
        className="relative"
        whileFocus={animationsEnabled ? { scale: 1.01 } : {}}
      >
        <motion.div
          className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2"
          animate={animationsEnabled && searchTerm ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        <motion.div
          whileFocus={animationsEnabled ? { 
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
            borderColor: "rgba(59, 130, 246, 0.3)"
          } : {}}
        >
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rtl:pr-10 h-12 text-base transition-all duration-200"
          />
        </motion.div>
        
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => onSearchChange('')}
            className="absolute right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        )}
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <motion.div 
          className="flex items-center space-x-2 rtl:space-x-reverse"
          whileHover={animationsEnabled ? { x: 2 } : {}}
        >
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">الفلاتر:</span>
        </motion.div>
        
        <motion.div 
          className="flex-1 min-w-[140px]"
          whileFocus={animationsEnabled ? { scale: 1.02 } : {}}
        >
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  {getCategoryIcon('all')}
                  <span>{t('allCategories')}</span>
                </div>
              </SelectItem>
              {Object.entries(categories).map(([key, value]) => {
                const label = typeof value === 'string' ? value : value.name;
                return (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(key)}
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </motion.div>

        {showLanguageFilter && (
          <motion.div 
            className="flex-1 min-w-[120px]"
            whileFocus={animationsEnabled ? { scale: 1.02 } : {}}
          >
            <Select value={languageFilter} onValueChange={onLanguageFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">{t('both')}</SelectItem>
                <SelectItem value="ar">{t('arabic')}</SelectItem>
                <SelectItem value="en">{t('english')}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}

        {showPaidFilter && (
          <motion.div 
            className="flex-1 min-w-[120px]"
            whileFocus={animationsEnabled ? { scale: 1.02 } : {}}
          >
            <Select value={paidFilter} onValueChange={onPaidFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">{t('both')}</SelectItem>
                <SelectItem value="free">{t('free')}</SelectItem>
                <SelectItem value="paid">{t('paid')}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}
        
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
            whileTap={animationsEnabled ? { scale: 0.95 } : {}}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="px-3"
            >
              <X className="h-4 w-4 mr-1" />
              مسح الفلاتر
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}