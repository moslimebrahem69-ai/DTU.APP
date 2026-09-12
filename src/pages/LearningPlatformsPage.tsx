import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { UniversalViewerModal } from '../components/Common/UniversalViewerModal';
import { learningPlatformsData, learningPlatformCategories } from '../data/learningPlatforms';
import { useTheme } from '../contexts/ThemeContext';

export function LearningPlatformsPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('both');
  const [paidFilter, setPaidFilter] = useState('both');

  // حالة التحكم بالمعاينة داخل المودال
  const [selectedItem, setSelectedItem] = useState<{ url: string; title: string } | null>(null);

  const filteredPlatforms = useMemo(() => {
    return learningPlatformsData.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            platform.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            platform.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || platform.category === categoryFilter;
      
      const matchesLanguage = languageFilter === 'both' || 
                              platform.language === languageFilter || 
                              platform.language === 'both';
      
      const matchesPaid = paidFilter === 'both' || 
                          (paidFilter === 'free' && !platform.paid) ||
                          (paidFilter === 'paid' && platform.paid);

      return matchesSearch && matchesCategory && matchesLanguage && matchesPaid;
    });
  }, [searchTerm, categoryFilter, languageFilter, paidFilter]);

  const handleOpenViewer = (url: string, title: string) => {
    setSelectedItem({ url, title });
  };

  const handleCloseViewer = () => {
    setSelectedItem(null);
  };

  return (
    <div className="pb-12 px-3 sm:px-0">
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-right"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">{t('learningPlatforms')}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          منصات التعلم الإلكتروني المميزة محلياً وعالمياً
        </p>
      </motion.div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={learningPlatformCategories}
        showLanguageFilter={true}
        languageFilter={languageFilter}
        onLanguageFilterChange={setLanguageFilter}
        showPaidFilter={true}
        paidFilter={paidFilter}
        onPaidFilterChange={setPaidFilter}
      />

      {/* تم تعديل الـ Grid ليعرض كارت واحد في الموبايل (grid-cols-1) ليكون مريح وواضح تماماً، و3 أعمدة في الشاشات الكبيرة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPlatforms.map((platform, index) => (
          <ContentCard
            key={platform.id}
            title={platform.name}
            description={platform.description}
            url={platform.url}
            paid={platform.paid}
            language={platform.language}
            category={platform.category}
            index={index}
            onOpen={handleOpenViewer}
          />
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-sm text-muted-foreground">لم يتم العثور على منصات تطابق البحث</p>
        </motion.div>
      )}

      {/* المودال الشامل لمعاينة وعرض المنصة */}
      {selectedItem && (
        <UniversalViewerModal
          url={selectedItem.url}
          title={selectedItem.title}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}