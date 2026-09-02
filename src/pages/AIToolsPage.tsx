import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { aiToolsData, aiToolCategories } from '../data/aiTools';
import { useTheme } from '../contexts/ThemeContext';

// Variants للأنيميشن الاحترافي
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export function AIToolsPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('both');
  const [paidFilter, setPaidFilter] = useState('both');

  const filteredTools = useMemo(() => {
    return aiToolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
      
      const matchesLanguage = languageFilter === 'both' || 
                              tool.language === languageFilter || 
                              tool.language === 'both';
      
      const matchesPaid = paidFilter === 'both' || 
                          (paidFilter === 'free' && !tool.paid) ||
                          (paidFilter === 'paid' && tool.paid);

      return matchesSearch && matchesCategory && matchesLanguage && matchesPaid;
    });
  }, [searchTerm, categoryFilter, languageFilter, paidFilter]);

  return (
    <div>
      {/* رأس الصفحة مع حركة دخول ناعمة */}
      <motion.div
        initial={animationsEnabled ? { y: -15, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('aiTools')}</h1>
        <p className="text-muted-foreground">
          اكتشف أفضل أدوات الذكاء الاصطناعي للبرمجة والإنتاجية
        </p>
      </motion.div>

      {/* قسم البحث والفلترة مع حركة خفيفة */}
      <motion.div
        initial={animationsEnabled ? { y: 10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
      >
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={useMemo(() => {
            const labels: Record<string, string> = {};
            Object.entries(aiToolCategories).forEach(([key]) => {
              labels[key] = t(key);
            });
            return labels;
          }, [t])}
          showLanguageFilter={true}
          languageFilter={languageFilter}
          onLanguageFilterChange={setLanguageFilter}
          showPaidFilter={true}
          paidFilter={paidFilter}
          onPaidFilterChange={setPaidFilter}
        />
      </motion.div>

      {/* شبكة الكروت مع أنيميشن متتابع وناعم */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={animationsEnabled ? containerVariants : undefined}
        initial={animationsEnabled ? 'hidden' : false}
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              layout={animationsEnabled}
              variants={animationsEnabled ? itemVariants : undefined}
              initial={animationsEnabled ? 'hidden' : false}
              animate="visible"
              exit={animationsEnabled ? 'exit' : undefined}
              whileHover={animationsEnabled ? { y: -4, transition: { duration: 0.2 } } : undefined}
            >
              <ContentCard
                title={tool.name}
                description={tool.description}
                url={tool.url}
                paid={tool.paid}
                language={tool.language}
                category={tool.category}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* رسالة عدم وجود نتائج مع أنيميشن سلس */}
      <AnimatePresence>
        {filteredTools.length === 0 && (
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">لم يتم العثور على أدوات تطابق البحث</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}