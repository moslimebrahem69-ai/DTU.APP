import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { aiToolsData, aiToolCategories } from '../data/aiTools';
import { useTheme } from '../contexts/ThemeContext';

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
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('aiTools')}</h1>
        <p className="text-muted-foreground">
          اكتشف أفضل أدوات الذكاء الاصطناعي للبرمجة والإنتاجية
        </p>
      </motion.div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={useMemo(() => {
          const labels: Record<string, string> = {};
          Object.entries(aiToolCategories).forEach(([key, cat]) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <ContentCard
            key={tool.id}
            title={tool.name}
            description={tool.description}
            url={tool.url}
            paid={tool.paid}
            language={tool.language}
            category={tool.category}
            index={index}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">لم يتم العثور على أدوات تطابق البحث</p>
        </motion.div>
      )}
    </div>
  );
}