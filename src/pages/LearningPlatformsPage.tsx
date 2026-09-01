import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { learningPlatformsData, learningPlatformCategories } from '../data/learningPlatforms';
import { useTheme } from '../contexts/ThemeContext';

export function LearningPlatformsPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('both');
  const [paidFilter, setPaidFilter] = useState('both');

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

  return (
    <div>
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('learningPlatforms')}</h1>
        <p className="text-muted-foreground">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          />
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">لم يتم العثور على منصات تطابق البحث</p>
        </motion.div>
      )}
    </div>
  );
}