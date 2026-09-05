import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { UniversalViewerModal } from '../components/Common/UniversalViewerModal';
import { aiToolsData, aiToolCategories } from '../data/aiTools';
import { useTheme } from '../contexts/ThemeContext';

// Variants للأنيميشن الاحترافي
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.12 },
  },
};

export function AIToolsPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('both');
  const [paidFilter, setPaidFilter] = useState('both');

  // حالة التحكم في فتح المودال داخل الصفحة
  const [activeViewer, setActiveViewer] = useState<{ title: string; url: string } | null>(null);

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
    <div className="px-2 sm:px-4 py-2 sm:py-6 max-w-7xl mx-auto">
      {/* رأس الصفحة بحجم مضغوط ومناسب للشاشات الصغيرة */}
      <motion.div
        initial={animationsEnabled ? { y: -10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="mb-3 sm:mb-6 text-right"
      >
        <h1 className="text-xl sm:text-3xl font-black text-foreground tracking-tight mb-1">
          {t('aiTools')}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
          اكتشف أفضل أدوات الذكاء الاصطناعي للبرمجة والإنتاجية
        </p>
      </motion.div>

      {/* قسم البحث والفلترة بتصميم مدمج */}
      <motion.div
        initial={animationsEnabled ? { y: 8, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        className="mb-4"
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

      {/* شبكة الكروت بمسافات بينية ملمومة جداً على الموبايل (gap-3) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
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
              whileHover={animationsEnabled ? { y: -2, transition: { duration: 0.15 } } : undefined}
            >
              <ContentCard
                title={tool.name}
                description={tool.description}
                url={tool.url}
                paid={tool.paid}
                language={tool.language}
                category={tool.category}
                index={index}
                onOpen={(url, title) => setActiveViewer({ url, title })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* رسالة عدم وجود نتائج */}
      <AnimatePresence>
        {filteredTools.length === 0 && (
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-center py-8 sm:py-12"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">لم يتم العثور على أدوات تطابق البحث</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* المودال الشامل لعرض الروابط */}
      {activeViewer && (
        <UniversalViewerModal
          title={activeViewer.title}
          url={activeViewer.url}
          onClose={() => setActiveViewer(null)}
        />
      )}
    </div>
  );
}