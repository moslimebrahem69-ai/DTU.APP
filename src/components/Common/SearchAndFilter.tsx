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

// cSpell:disable
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
// cSpell:enable

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
    return <IconComponent className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />;
  };

  return (
    <motion.div 
      className="mb-4 space-y-3"
      initial={animationsEnabled ? { y: 10, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      {/* Search Bar - مضغوط للشاشات الصغيرة */}
      <motion.div 
        className="relative"
        whileFocus={animationsEnabled ? { scale: 1.005 } : {}}
      >
        <motion.div
          className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2"
          animate={animationsEnabled && searchTerm ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rtl:pr-9 h-10 sm:h-11 text-sm transition-all duration-200 rounded-xl"
        />
        
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => onSearchChange('')}
            className="absolute right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.button>
        )}
      </motion.div>

      {/* Filters Area - تصميم متناسق ومستجيب للشاشات الصغيرة */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <span>الفلاتر:</span>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1 rtl:ml-1" />
              مسح الكل
            </Button>
          )}
        </div>

        {/* شبكة القوائم المنسدلة بتوزيع متناسب */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* فلتر القسم */}
          <div className="col-span-2 sm:col-span-1">
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-9 text-xs sm:text-sm rounded-lg">
                <SelectValue placeholder={t('category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon('all')}
                    <span>{t('allCategories')}</span>
                  </div>
                </SelectItem>
                {Object.entries(categories).map(([key, value]) => {
                  const label = typeof value === 'string' ? value : value.name;
                  return (
                    <SelectItem key={key} value={key} className="text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(key)}
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* فلتر اللغة */}
          {showLanguageFilter && (
            <div>
              <Select value={languageFilter} onValueChange={onLanguageFilterChange}>
                <SelectTrigger className="h-9 text-xs sm:text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both" className="text-xs sm:text-sm">{t('both')}</SelectItem>
                  <SelectItem value="ar" className="text-xs sm:text-sm">{t('arabic')}</SelectItem>
                  <SelectItem value="en" className="text-xs sm:text-sm">{t('english')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* فلتر المدفوع/المجاني */}
          {showPaidFilter && (
            <div>
              <Select value={paidFilter} onValueChange={onPaidFilterChange}>
                <SelectTrigger className="h-9 text-xs sm:text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both" className="text-xs sm:text-sm">{t('both')}</SelectItem>
                  <SelectItem value="free" className="text-xs sm:text-sm">{t('free')}</SelectItem>
                  <SelectItem value="paid" className="text-xs sm:text-sm">{t('paid')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}