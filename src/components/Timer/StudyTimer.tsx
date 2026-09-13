import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, Clock, Volume2, Target, Maximize2, Timer as TimerIcon, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTimer } from '../../hooks/useTimer';
import { useTheme } from '../../contexts/ThemeContext';

export function StudyTimer() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [mode, setMode] = useState<'timer' | 'clock'>('timer');
  const [currentTime, setCurrentTime] = useState(new Date());

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

  useEffect(() => {
    const event = new CustomEvent('dtu_timer_fullscreen', { detail: { isFullscreen } });
    window.dispatchEvent(event);
  }, [isFullscreen]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && mode === 'timer' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        if (isRunning) pauseTimer();
        else startTimer();
      } else if (e.key.toLowerCase() === 'r' && mode === 'timer' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        resetTimer();
      } else if (e.key.toLowerCase() === 'f') {
        setIsFullscreen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, startTimer, pauseTimer, resetTimer, mode]);

  const getTimerDigits = () => {
    const validSeconds = Math.max(0, timeLeft || 0);
    const hours = Math.floor(validSeconds / 3600);
    const minutes = Math.floor((validSeconds % 3600) / 60);
    const secs = validSeconds % 60;

    if (hours > 0) {
      return {
        part1: hours.toString().padStart(2, '0'),
        part2: minutes.toString().padStart(2, '0'),
        part3: secs.toString().padStart(2, '0'),
        hasHours: true
      };
    }
    return {
      part1: minutes.toString().padStart(2, '0'),
      part2: secs.toString().padStart(2, '0'),
      part3: '00',
      hasHours: false
    };
  };

  const getClockDigits = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes,
      seconds,
      ampm
    };
  };

  const updateSettings = (key: string, value: any) => {
    saveSettings({ ...settings, [key]: value });
  };

  const calculateProgress = () => {
    const total = settings.pomodoroMode 
      ? (currentSession === 'work' ? settings.workDuration : settings.breakDuration) * 60 
      : settings.hours * 3600 + settings.minutes * 60 + settings.seconds;
    if (total <= 0) return 0;
    return Math.min(100, Math.max(0, ((total - timeLeft) / total) * 100));
  };

  const timerDigits = getTimerDigits();
  const clockDigits = getClockDigits(currentTime);

  return (
    <>
      {/* Fullscreen Flip Clock Ambient Mode */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden"
            dir="ltr"
          >
            {/* Top Floating Header with Back Button & Mode Switcher */}
            <div className="w-full flex items-center justify-between max-w-7xl px-4 py-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>الوضع العادي</span>
              </button>

              <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-inner">
                <button
                  onClick={() => setMode('timer')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'timer' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  التايمر
                </button>
                <button
                  onClick={() => setMode('clock')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'clock' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  الساعة
                </button>
              </div>
            </div>

            {/* Flip Clock Center Grid */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 my-auto w-full">
              {mode === 'clock' ? (
                <>
                  <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[28vw] sm:w-[22vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                    <div className="absolute top-2 left-3 text-[10px] sm:text-xs font-mono text-zinc-500 font-bold">{clockDigits.ampm}</div>
                    <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{clockDigits.hours}</span>
                    <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                  </div>
                  <span className="text-3xl sm:text-6xl font-bold text-zinc-700">:</span>
                  <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[28vw] sm:w-[22vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                    <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{clockDigits.minutes}</span>
                    <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                  </div>
                  <span className="text-3xl sm:text-6xl font-bold text-zinc-700">:</span>
                  <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[28vw] sm:w-[22vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                    <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{clockDigits.seconds}</span>
                    <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                  </div>
                </>
              ) : (
                <>
                  {timerDigits.hasHours && (
                    <>
                      <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[28vw] sm:w-[22vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                        <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{timerDigits.part1}</span>
                        <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                      </div>
                      <span className="text-3xl sm:text-6xl font-bold text-zinc-700">:</span>
                    </>
                  )}
                  <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[38vw] sm:w-[30vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                    <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{timerDigits.hasHours ? timerDigits.part2 : timerDigits.part1}</span>
                    <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                  </div>
                  <span className="text-3xl sm:text-6xl font-bold text-zinc-700">:</span>
                  <div className="relative bg-[#161616] border border-zinc-800/80 rounded-2xl sm:rounded-3xl w-[38vw] sm:w-[30vw] aspect-[4/3] flex items-center justify-center shadow-2xl overflow-hidden">
                    <span className="text-[20vw] sm:text-[14vw] font-black font-mono text-zinc-100 tracking-tighter leading-none">{timerDigits.hasHours ? timerDigits.part3 : timerDigits.part2}</span>
                    <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/90 shadow-[0_1px_2px_rgba(255,255,255,0.05)]" />
                  </div>
                </>
              )}
            </div>

            {/* Bottom Controls inside Fullscreen */}
            <div className="w-full max-w-md flex flex-col space-y-2.5 pb-2">
              {mode === 'timer' && (
                <>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-zinc-500 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={isRunning ? pauseTimer : startTimer}
                      size="sm"
                      className="flex-1 py-4 text-xs sm:text-sm rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold border border-zinc-700 cursor-pointer"
                    >
                      {isRunning ? <Pause className="h-4 w-4 ml-1.5" /> : <Play className="h-4 w-4 ml-1.5" />}
                      {isRunning ? 'إيقاف مؤقت' : (isPaused ? 'استكمال' : 'ابدأ التركيز')}
                    </Button>
                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      size="sm"
                      className="flex-1 py-4 text-xs sm:text-sm rounded-xl bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 font-bold cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4 ml-1.5" /> إعادة ضبط
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Standard View */}
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <motion.div
          initial={animationsEnabled ? { scale: 0.95, opacity: 0, y: 20 } : {}}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top Quick Mode Toggle & Fullscreen Button */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6 relative z-10 bg-muted/40 p-2 rounded-2xl border border-border">
            <div className="flex items-center justify-center sm:justify-start space-x-1 rtl:space-x-reverse">
              <Button
                variant={mode === 'timer' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('timer')}
                className="flex-1 sm:flex-none rounded-xl font-bold text-xs cursor-pointer"
              >
                <TimerIcon className="h-3.5 w-3.5 ml-1.5" /> تايمر الدراسة
              </Button>
              <Button
                variant={mode === 'clock' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('clock')}
                className="flex-1 sm:flex-none rounded-xl font-bold text-xs cursor-pointer"
              >
                <Clock className="h-3.5 w-3.5 ml-1.5" /> الساعة الرقمية
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="flex items-center justify-center space-x-1.5 rounded-xl shadow-sm hover:shadow-md transition-all border-primary/30 hover:bg-primary/10 text-primary font-bold text-xs py-2.5 sm:py-2 cursor-pointer"
            >
              <Maximize2 className="h-4 w-4 ml-1" />
              <span>شاشة كاملة</span>
            </Button>
          </div>

          {/* Main Display (Standard Mode Preview) */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <div
              dir="ltr"
              className="text-5xl sm:text-7xl md:text-8xl font-mono font-black text-primary mb-4 relative inline-block tracking-widest cursor-pointer group hover:scale-105 transition-transform"
              onClick={() => setIsFullscreen(true)}
              title="اضغط للدخول في وضع الشاشة الكاملة"
            >
              {mode === 'clock' 
                ? `${clockDigits.hours}:${clockDigits.minutes}:${clockDigits.seconds}`
                : (timerDigits.hasHours ? `${timerDigits.part1}:${timerDigits.part2}:${timerDigits.part3}` : `${timerDigits.part1}:${timerDigits.part2}`)
              }
            </div>
            
            {mode === 'timer' && settings.pomodoroMode && (
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4 flex-wrap gap-y-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <span className="text-base sm:text-lg font-bold">
                  {t(currentSession === 'work' ? 'workSession' : 'breakSession')}
                </span>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
                  <Target className="inline h-3.5 w-3.5 ml-1" />
                  {sessionCount} {t('sessions')}
                </span>
              </div>
            )}
            
            {mode === 'clock' && (
              <div className="text-xs sm:text-sm font-bold text-muted-foreground">
                قوم ذااكر ي صحبي و ملكش دعوه بالساعة 😒
              </div>
            )}
          </div>

          {/* Control Buttons (Only in Timer Mode) */}
          {mode === 'timer' && (
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 rtl:space-x-reverse mb-6 sm:mb-8 relative z-10">
              <Button
                onClick={isRunning ? pauseTimer : startTimer}
                size="lg"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl sm:rounded-2xl cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 ml-2" /> {t('pause')}
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 ml-2" /> {isPaused ? t('resume') : t('start')}
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl sm:rounded-2xl border-border cursor-pointer"
              >
                <RotateCcw className="h-5 w-5 ml-2" /> {t('reset')}
              </Button>
            </div>
          )}

          {/* Time Settings (Only in Timer Mode) */}
          {mode === 'timer' && !isRunning && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 relative z-10 bg-muted/30 p-3 sm:p-4 rounded-2xl border border-border">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold mb-1.5 text-muted-foreground">{t('hours')}</label>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={settings.hours}
                  onChange={(e) => updateSettings('hours', parseInt(e.target.value) || 0)}
                  className="text-center font-bold text-base sm:text-lg rounded-xl h-10 sm:h-11 px-1"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-bold mb-1.5 text-muted-foreground">{t('minutes')}</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={settings.minutes}
                  onChange={(e) => updateSettings('minutes', parseInt(e.target.value) || 0)}
                  className="text-center font-bold text-base sm:text-lg rounded-xl h-10 sm:h-11 px-1"
                />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-bold mb-1.5 text-muted-foreground">{t('seconds')}</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={settings.seconds}
                  onChange={(e) => updateSettings('seconds', parseInt(e.target.value) || 0)}
                  className="text-center font-bold text-base sm:text-lg rounded-xl h-10 sm:h-11 px-1"
                />
              </div>
            </div>
          )}

          {/* Pomodoro Settings */}
          {mode === 'timer' && (
            <div className="border-t border-border pt-6 relative z-10">
              <div className="flex items-center justify-between mb-4 bg-muted/30 p-3 rounded-2xl border border-border">
                <label className="text-xs sm:text-sm font-bold">{t('pomodoroMode')}</label>
                <Switch
                  checked={settings.pomodoroMode}
                  onCheckedChange={(checked) => updateSettings('pomodoroMode', checked)}
                />
              </div>

              {settings.pomodoroMode && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold mb-1.5 text-muted-foreground">{t('workTime')} ({t('minutes')})</label>
                    <Input
                      type="number"
                      min="1"
                      max="120"
                      value={settings.workDuration}
                      onChange={(e) => updateSettings('workDuration', parseInt(e.target.value) || 25)}
                      className="text-center font-bold rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold mb-1.5 text-muted-foreground">{t('breakTime')} ({t('minutes')})</label>
                    <Input
                      type="number"
                      min="1" 
                      max="60"
                      value={settings.breakDuration}
                      onChange={(e) => updateSettings('breakDuration', parseInt(e.target.value) || 5)}
                      className="text-center font-bold rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Sound Selection */}
              <div className="space-y-3 bg-muted/30 p-3 sm:p-4 rounded-2xl border border-border">
                <label className="text-xs sm:text-sm font-bold flex items-center">
                  <Volume2 className="h-4 w-4 ml-2" />
                  {t('soundLibrary')}
                </label>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Select value={settings.soundType} onValueChange={(value) => updateSettings('soundType', value)}>
                    <SelectTrigger className="flex-1 font-bold rounded-xl">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playSound}
                    className="px-3 sm:px-4 font-bold rounded-xl shrink-0 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4 ml-1.5" />
                    {t('preview')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}