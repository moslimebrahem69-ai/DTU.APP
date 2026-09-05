import React, { useState } from 'react';
import { ExternalLink, Copy, Share2, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { UniversalViewerModal } from './UniversalViewerModal';

interface ContentCardProps {
  title: string;
  description: string;
  url: string;
  paid?: boolean;
  language?: string;
  category?: string;
  index?: number;
  onOpen?: (url: string, title: string) => void;
}

export function ContentCard({ 
  title, 
  description, 
  url, 
  paid, 
  language,
  index = 0,
  onOpen
}: ContentCardProps) {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const { elementRef, isIntersecting } = useIntersectionObserver();
  const [showInternalModal, setShowInternalModal] = useState(false);

  const handleOpenLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpen) {
      onOpen(url, title);
    } else {
      setShowInternalModal(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log(t('linkCopied'));
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const combinedVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: animationsEnabled ? index * 0.03 : 0,
        duration: 0.3,
        type: "spring",
        stiffness: 120
      }
    },
    hover: {
      y: -4,
      scale: 1.01,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        variants={animationsEnabled ? combinedVariants : undefined}
        initial={animationsEnabled ? "hidden" : "visible"}
        animate={isIntersecting ? "visible" : "hidden"}
        whileHover={animationsEnabled ? "hover" : undefined}
        className="bg-card border border-border/80 rounded-xl p-3.5 sm:p-5 shadow-sm transition-all duration-200 relative overflow-hidden group glass-morphism"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={animationsEnabled ? {
            background: [
              "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)",
              "linear-gradient(225deg, rgba(16, 185, 129, 0.08) 0%, transparent 100%)",
              "linear-gradient(315deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)"
            ]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header Section: العنوان والبادجات */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <motion.h3 
            className="font-bold text-foreground text-sm sm:text-base leading-snug relative z-10"
            whileHover={animationsEnabled ? { x: 2 } : undefined}
          >
            {title}
          </motion.h3>

          <div className="flex items-center gap-1 shrink-0">
            {paid !== undefined && (
              <span 
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold relative z-10 backdrop-blur-sm flex items-center gap-0.5 ${
                paid 
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              }`}
              >
                {paid && <Star className="h-2.5 w-2.5" />}
                {paid ? t('paid') : t('free')}
              </span>
            )}

            {language && (
              <span 
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 relative z-10 backdrop-blur-sm border border-blue-500/20"
              >
                {language === 'ar' ? t('arabic') : language === 'en' ? t('english') : t('both')}
              </span>
            )}
          </div>
        </div>
        
        {/* Description Section */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed relative z-10">
          {description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 relative z-10">
          <Button 
            size="sm" 
            onClick={handleOpenLink}
            className="flex-1 h-8 sm:h-9 text-xs font-semibold rounded-lg shadow-sm"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1 rtl:ml-1" />
            زيارة
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg shrink-0"
            title={t('copyLink') || 'نسخ'}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg shrink-0"
            title={t('share') || 'مشاركة'}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.div>

      {/* المودال الاحتياطي */}
      {showInternalModal && (
        <UniversalViewerModal
          title={title}
          url={url}
          onClose={() => setShowInternalModal(false)}
        />
      )}
    </>
  );
}