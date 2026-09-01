import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { StudyTimer } from '../components/Timer/StudyTimer';
import { useTheme } from '../contexts/ThemeContext';

export function TimerPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  return (
    <div>
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('studyTimer')}</h1>
        <p className="text-muted-foreground">
          تايمر دراسة احترافي مع وضع بومودورو ومكتبة نغمات
        </p>
      </motion.div>

      <StudyTimer />
    </div>
  );
}