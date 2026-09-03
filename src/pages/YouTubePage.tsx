import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SearchAndFilter } from '../components/Common/SearchAndFilter';
import { ContentCard } from '../components/Common/ContentCard';
import { UniversalViewerModal } from '../components/Common/UniversalViewerModal';
import { youtubeChannelsData, youtubeCategories } from '../data/youtubeChannels';
import { useTheme } from '../contexts/ThemeContext';

export function YouTubePage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('both');

  // حالة التحكم بالمعاينة داخل المودال
  const [selectedItem, setSelectedItem] = useState<{ url: string; title: string } | null>(null);

  const filteredChannels = useMemo(() => {
    return youtubeChannelsData.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            channel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            channel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || channel.category === categoryFilter;
      
      const matchesLanguage = languageFilter === 'both' || 
                              channel.language === languageFilter || 
                              channel.language === 'both';

      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [searchTerm, categoryFilter, languageFilter]);

  const handleOpenViewer = (url: string, title: string) => {
    setSelectedItem({ url, title });
  };

  const handleCloseViewer = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('youtubeChannels')}</h1>
        <p className="text-muted-foreground">
          قنوات يوتيوب تعليمية مميزة في مختلف التخصصات
        </p>
      </motion.div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={youtubeCategories}
        showLanguageFilter={true}
        languageFilter={languageFilter}
        onLanguageFilterChange={setLanguageFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel, index) => (
          <ContentCard
            key={channel.id}
            title={channel.name}
            description={channel.description}
            url={channel.url}
            language={channel.language}
            category={channel.category}
            index={index}
            onOpen={handleOpenViewer}
          />
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <motion.div
          initial={animationsEnabled ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">لم يتم العثور على قنوات تطابق البحث</p>
        </motion.div>
      )}

      {/* المودال الشامل لمعاينة وعرض القناة/الرابط */}
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