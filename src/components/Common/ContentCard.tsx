import React from 'react';
import { ExternalLink, Copy, Share2, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ContentCardProps {
  title: string;
  description: string;
  url: string;
  paid?: boolean;
  language?: string;
  category?: string;
  index?: number;
}

export function ContentCard({ 
  title, 
  description, 
  url, 
  paid, 
  language,
  index = 0 
}: ContentCardProps) {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const { elementRef, isIntersecting } = useIntersectionObserver();

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: animationsEnabled ? index * 0.05 : 0,
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      variants={animationsEnabled ? combinedVariants : undefined}
      initial={animationsEnabled ? "hidden" : "visible"}
      animate={isIntersecting ? "visible" : "hidden"}
      whileHover={animationsEnabled ? "hover" : undefined}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group card-enhanced glass-morphism"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={animationsEnabled ? {
          background: [
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)",
            "linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)",
            "linear-gradient(315deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)"
          ]
        } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles effect */}
      {animationsEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: '100%',
                opacity: 0,
                scale: 0
              }}
              animate={{
                y: '-20%',
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
          filter: "blur(20px)"
        }}
        animate={animationsEnabled ? {
          rotate: [0, 360]
        } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex justify-between items-start mb-3">
        <motion.h3 
          className="font-semibold text-foreground text-lg leading-tight relative z-10"
          whileHover={animationsEnabled ? { x: 4, scale: 1.02 } : undefined}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h3>
        <div className="flex space-x-1 rtl:space-x-reverse">
          {paid !== undefined && (
            <motion.span 
              whileHover={animationsEnabled ? { scale: 1.1, rotate: 2 } : undefined}
              transition={{ type: "spring", stiffness: 400 }}
              className={`px-3 py-1 rounded-full text-xs font-medium relative z-10 backdrop-blur-sm ${
              paid 
                ? 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                : 'bg-green-100/80 text-green-800 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800'
            }`}
            >
              {paid && (
                <motion.div
                  className="inline-block mr-1"
                  animate={animationsEnabled ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="h-3 w-3" />
                </motion.div>
              )}
              {paid ? t('paid') : t('free')}
            </motion.span>
          )}
          {language && (
            <motion.span 
              whileHover={animationsEnabled ? { scale: 1.1, rotate: -2 } : undefined}
              transition={{ type: "spring", stiffness: 400 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 relative z-10 backdrop-blur-sm border border-blue-200 dark:border-blue-800"
            >
              {language === 'ar' ? t('arabic') : language === 'en' ? t('english') : t('both')}
            </motion.span>
          )}
        </div>
      </div>
      
      <motion.p 
        className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10"
        whileHover={animationsEnabled ? { x: 2, color: "hsl(var(--foreground))" } : undefined}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse relative z-10">
        <motion.div 
          className="flex-1"
          whileHover={animationsEnabled ? { scale: 1.03, y: -2 } : undefined}
          whileTap={animationsEnabled ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="w-full inline-block">
            <Button size="sm" className="w-full btn-enhanced ripple-effect shadow-md hover:shadow-lg">
              <ExternalLink className="h-4 w-4 mr-1 rtl:ml-1" />
              زيارة
            </Button>
          </a>
        </motion.div>
        
        <motion.div
          whileHover={animationsEnabled ? { scale: 1.15, rotate: 10, y: -2 } : undefined}
          whileTap={animationsEnabled ? { scale: 0.85 } : undefined}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="px-3 btn-enhanced shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={animationsEnabled ? { scale: 1.15, rotate: -10, y: -2 } : undefined}
          whileTap={animationsEnabled ? { scale: 0.85 } : undefined}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Button
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="px-3 btn-enhanced shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}