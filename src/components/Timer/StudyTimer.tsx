import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, Clock, Volume2, Zap, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTimer } from '../../hooks/useTimer';
import { useTheme } from '../../contexts/ThemeContext';

export function StudyTimer() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const {
    timeLeft,
    isRunning,
    isPaused,
    settings,
    currentSession,
    sessionCount,
    saveSettings,
    startTimer,
    pauseTimer,
    resetTimer,
    playSound,
  } = useTimer();

  const formatTime = (seconds: number) => {
    const validSeconds = Math.max(0, seconds || 0);
    const hours = Math.floor(validSeconds / 3600);
    const minutes = Math.floor((validSeconds % 3600) / 60);
    const secs = validSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSettings = (key: string, value: any) => {
    saveSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={animationsEnabled ? { scale: 0.8, opacity: 0, y: 50 } : {}}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-card border border-border rounded-3xl p-8 shadow-xl relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl"
          animate={animationsEnabled ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-xl"
          animate={animationsEnabled ? {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          } : {}}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        
        {/* Timer Display */}
        <div className="text-center mb-8 relative z-10">
          <motion.div
            animate={animationsEnabled && isRunning ? { 
              scale: [1, 1.02, 1],
              textShadow: [
                "0 0 0px rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 0px rgba(59, 130, 246, 0)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            dir="ltr"
            className="text-6xl md:text-8xl font-mono font-bold text-primary mb-4 relative inline-block tracking-widest"
          >
            {formatTime(timeLeft)}
            {isRunning && animationsEnabled && (
              <motion.div
                className="absolute -inset-4 border-2 border-primary/20 rounded-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {settings.pomodoroMode && (
            <motion.div 
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4"
              initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Clock className="h-5 w-5 text-muted-foreground" />
              <motion.span 
                className="text-lg font-medium"
                animate={animationsEnabled && currentSession === 'work' ? {
                  color: ["#3b82f6", "#10b981", "#3b82f6"]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {t(currentSession === 'work' ? 'workSession' : 'breakSession')}
              </motion.span>
              <motion.span 
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                whileHover={animationsEnabled ? { scale: 1.1 } : {}}
              >
                <Target className="inline h-3 w-3 mr-1" />
                {sessionCount} {t('sessions')}
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-8 relative z-10">
          <motion.div
            whileHover={animationsEnabled ? { scale: 1.05 } : {}}
            whileTap={animationsEnabled ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={isRunning ? pauseTimer : startTimer}
              size="lg"
              className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5 mr-2 rtl:ml-2" />
                  {t('pause')}
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2 rtl:ml-2" />
                  {isPaused ? t('resume') : t('start')}
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={animationsEnabled ? { scale: 1.05, rotate: 180 } : {}}
            whileTap={animationsEnabled ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <RotateCcw className="h-5 w-5 mr-2 rtl:ml-2" />
              {t('reset')}
            </Button>
          </motion.div>
        </div>

        {/* Time Settings */}
        {!isRunning && (
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 30, scale: 0.9 } : {}}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-6 relative z-10"
          >
            <div>
              <label className="block text-sm font-medium mb-2">{t('hours')}</label>
              <motion.div whileFocus={animationsEnabled ? { scale: 1.02 } : {}}>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={settings.hours}
                  onChange={(e) => updateSettings('hours', parseInt(e.target.value) || 0)}
                  className="text-center transition-all duration-200 focus:ring-4 focus:ring-primary/20"
                />
              </motion.div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('minutes')}</label>
              <motion.div whileFocus={animationsEnabled ? { scale: 1.02 } : {}}>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={settings.minutes}
                  onChange={(e) => updateSettings('minutes', parseInt(e.target.value) || 0)}
                  className="text-center transition-all duration-200 focus:ring-4 focus:ring-primary/20"
                />
              </motion.div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('seconds')}</label>
              <motion.div whileFocus={animationsEnabled ? { scale: 1.02 } : {}}>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={settings.seconds}
                  onChange={(e) => updateSettings('seconds', parseInt(e.target.value) || 0)}
                  className="text-center transition-all duration-200 focus:ring-4 focus:ring-primary/20"
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Pomodoro Settings */}
        <div className="border-t border-border pt-6 relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-4"
            whileHover={animationsEnabled ? { x: 2 } : {}}
          >
            <label className="text-sm font-medium">{t('pomodoroMode')}</label>
            <motion.div whileTap={animationsEnabled ? { scale: 0.95 } : {}}>
              <Switch
                checked={settings.pomodoroMode}
                onCheckedChange={(checked) => updateSettings('pomodoroMode', checked)}
              />
            </motion.div>
          </motion.div>

          {settings.pomodoroMode && (
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-4"
              initial={animationsEnabled ? { opacity: 0, height: 0 } : {}}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block text-sm font-medium mb-2">{t('workTime')} ({t('minutes')})</label>
                <motion.div whileFocus={animationsEnabled ? { scale: 1.02 } : {}}>
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={settings.workDuration}
                    onChange={(e) => updateSettings('workDuration', parseInt(e.target.value) || 25)}
                    className="text-center transition-all duration-200 focus:ring-4 focus:ring-primary/20"
                  />
                </motion.div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('breakTime')} ({t('minutes')})</label>
                <motion.div whileFocus={animationsEnabled ? { scale: 1.02 } : {}}>
                  <Input
                    type="number"
                    min="1" 
                    max="60"
                    value={settings.breakDuration}
                    onChange={(e) => updateSettings('breakDuration', parseInt(e.target.value) || 5)}
                    className="text-center transition-all duration-200 focus:ring-4 focus:ring-primary/20"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Sound Selection */}
          <div className="space-y-3">
            <motion.label 
              className="text-sm font-medium flex items-center"
              whileHover={animationsEnabled ? { x: 2 } : {}}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {t('soundLibrary')}
            </motion.label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <motion.div 
                className="flex-1"
                whileFocus={animationsEnabled ? { scale: 1.01 } : {}}
              >
                <Select value={settings.soundType} onValueChange={(value) => updateSettings('soundType', value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bell">{t('bell')}</SelectItem>
                    <SelectItem value="piano">{t('piano')}</SelectItem>
                    <SelectItem value="glockenspiel">{t('glockenspiel')}</SelectItem>
                    <SelectItem value="violin">{t('violin')}</SelectItem>
                    <SelectItem value="whistle">{t('whistle')}</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                whileHover={animationsEnabled ? { scale: 1.1, rotate: 10 } : {}}
                whileTap={animationsEnabled ? { scale: 0.9 } : {}}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playSound}
                  className="px-3 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Volume2 className="h-4 w-4" />
                  {t('preview')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Keyboard shortcuts info */}
        <motion.div 
          className="mt-6 text-xs text-muted-foreground text-center relative z-10 flex items-center justify-center space-x-4 rtl:space-x-reverse"
          initial={animationsEnabled ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded text-xs mr-1">Space</kbd>
            {t('start')}/{t('pause')}
          </span>
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded text-xs mr-1">R</kbd>
            {t('reset')}
          </span>
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded text-xs mr-1">P</kbd>
            {t('pomodoroMode')}
          </span>
        </motion.div>
      </motion.div>
      
      {/* Progress indicator */}
      {isRunning && (
        <motion.div
          className="mt-6 bg-card border border-border rounded-2xl p-4"
          initial={animationsEnabled ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">التقدم</span>
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${Math.min(100, Math.max(0, ((settings.pomodoroMode 
                  ? (currentSession === 'work' ? settings.workDuration : settings.breakDuration) * 60 
                  : settings.hours * 3600 + settings.minutes * 60 + settings.seconds) - timeLeft) / 
                  (settings.pomodoroMode 
                    ? (currentSession === 'work' ? settings.workDuration : settings.breakDuration) * 60 
                    : settings.hours * 3600 + settings.minutes * 60 + settings.seconds) * 100))}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}