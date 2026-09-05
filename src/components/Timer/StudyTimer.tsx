import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, Clock, Volume2, Target, Maximize2, Minimize2, Sparkles, Image as ImageIcon, Timer as TimerIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTimer } from '../../hooks/useTimer';
import { useTheme } from '../../contexts/ThemeContext';

// 10 Epic Background presets for Fullscreen Mode
const BACKGROUNDS = [
  { id: 'obsidian', name: 'Obsidian Void', class: 'bg-slate-950', glow: 'from-primary/30 to-blue-600/20' },
  { id: 'midnight', name: 'Midnight Cyber', class: 'bg-[#030712]', glow: 'from-indigo-600/30 to-violet-600/20' },
  { id: 'emerald', name: 'Matrix Emerald', class: 'bg-[#022c22]', glow: 'from-emerald-500/30 to-teal-600/20' },
  { id: 'sunset', name: 'Deep Sunset', class: 'bg-[#180514]', glow: 'from-rose-600/30 to-amber-600/20' },
  { id: 'royal', name: 'Royal Amethyst', class: 'bg-[#0f0728]', glow: 'from-purple-600/30 to-fuchsia-600/20' },
  { id: 'ocean', name: 'Deep Abyss', class: 'bg-[#082f49]', glow: 'from-sky-500/30 to-cyan-600/20' },
  { id: 'crimson', name: 'Blood Ruby', class: 'bg-[#2b0a0a]', glow: 'from-red-600/30 to-orange-600/20' },
  { id: 'aurora', name: 'Aurora Borealis', class: 'bg-[#02231f]', glow: 'from-teal-400/30 to-emerald-500/20' },
  { id: 'carbon', name: 'Carbon Fiber', class: 'bg-[#111827]', glow: 'from-gray-500/30 to-slate-700/20' },
  { id: 'golden', name: 'Golden Hour', class: 'bg-[#1c1404]', glow: 'from-amber-500/30 to-yellow-600/20' },
];

export function StudyTimer() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // States: Clock Mode vs Timer Mode, and Background Selector
  const [mode, setMode] = useState<'timer' | 'clock'>('timer');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeBg, setActiveBg] = useState(BACKGROUNDS[0]);

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

  // Real-time clock ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
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

  const formatTime = (seconds: number) => {
    const validSeconds = Math.max(0, seconds || 0);
    const hours = Math.floor(validSeconds / 3600);
    const minutes = Math.floor((validSeconds % 3600) / 60);
    const secs = validSeconds % 60;
    return `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatClock = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
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

  return (
    <>
      {/* Fullscreen Immersive Ambient Mode */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-50 ${activeBg.class} text-white flex flex-col items-center justify-between p-4 md:p-12 select-none overflow-hidden transition-colors duration-700`}
            dir="ltr"
          >
            {/* Dynamic Background Glow Effects */}
            <div className={`absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br ${activeBg.glow} rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-pulse`} />
            <div className={`absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tl ${activeBg.glow} rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-pulse`} style={{ animationDelay: '2s' }} />

            {/* Top Bar inside Fullscreen */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 z-10 max-w-7xl bg-white/5 border border-white/10 p-3 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-2xl">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-white/10">
                  <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-primary"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                    {mode === 'clock' ? 'LIVE CLOCK' : (settings.pomodoroMode ? (currentSession === 'work' ? 'WORK SESSION' : 'BREAK TIME') : 'FOCUSED TIMER')}
                  </span>
                </div>

                {/* Mode Switcher inside Fullscreen */}
                <div className="hidden sm:flex items-center bg-black/40 p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setMode('timer')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === 'timer' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    التايمر (Timer)
                  </button>
                  <button
                    onClick={() => setMode('clock')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === 'clock' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    الساعة الحية (Clock)
                  </button>
                </div>
              </div>

              {/* Background Selector & Exit Button */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 sm:space-x-1.5 p-1 bg-black/30 rounded-xl sm:rounded-2xl border border-white/10 max-w-[180px] sm:max-w-md overflow-x-auto">
                  <ImageIcon className="h-4 w-4 text-slate-400 ml-1 shrink-0 hidden sm:block" />
                  <div className="flex space-x-1 sm:space-x-1.5">
                    {BACKGROUNDS.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setActiveBg(bg)}
                        title={bg.name}
                        className={`w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl transition-all border-2 shrink-0 ${bg.class} ${activeBg.id === bg.id ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFullscreen(false)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl sm:rounded-2xl w-9 h-9 sm:w-12 sm:h-12 shadow-2xl backdrop-blur-md transition-all shrink-0"
                >
                  <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Huge Center Display (Clock or Timer) */}
            <div className="flex flex-col items-center justify-center z-10 my-auto w-full">
              {mode === 'clock' ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[14vw] sm:text-[12vw] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] leading-none py-4 text-center"
                >
                  {formatClock(currentTime)}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[16vw] sm:text-[13vw] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] leading-none py-4 text-center"
                >
                  {formatTime(timeLeft)}
                </motion.div>
              )}

              {/* Extra Info Badge */}
              {mode === 'timer' && settings.pomodoroMode && (
                <div className="flex items-center space-x-2 sm:space-x-3 mt-4 sm:mt-6 bg-white/10 border border-white/10 px-5 py-2 sm:px-8 sm:py-3 rounded-full backdrop-blur-xl shadow-2xl">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-slate-200 text-xs sm:text-base font-bold tracking-wide">السيشن المكتملة: <strong className="text-white text-sm sm:text-lg">{sessionCount}</strong></span>
                </div>
              )}
            </div>

            {/* Bottom Controls inside Fullscreen (Only for Timer mode) */}
            <div className="w-full max-w-xl flex flex-col space-y-4 sm:space-y-6 z-10">
              {mode === 'timer' && (
                <>
                  <div className="w-full bg-white/10 rounded-full h-2.5 sm:h-3 overflow-hidden p-0.5 border border-white/10 backdrop-blur-md">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                      style={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="flex items-center justify-center space-x-3 sm:space-x-6">
                    <Button
                      onClick={isRunning ? pauseTimer : startTimer}
                      size="lg"
                      className="flex-1 sm:flex-none px-6 sm:px-12 py-5 sm:py-7 text-base sm:text-xl rounded-xl sm:rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all font-bold"
                    >
                      {isRunning ? (
                        <>
                          <Pause className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3" /> إيقاف مؤقت
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3" /> {isPaused ? 'استكمال' : 'ابدأ التركيز'}
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      size="lg"
                      className="flex-1 sm:flex-none px-5 sm:px-10 py-5 sm:py-7 text-base sm:text-xl rounded-xl sm:rounded-2xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all font-bold"
                    >
                      <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3" /> إعادة ضبط
                    </Button>
                  </div>
                </>
              )}

              {mode === 'clock' && (
                <div className="text-center text-slate-400 text-xs sm:text-sm font-medium">
                  🌟 وضع الساعة الحية مفعل - استمتع بمظهر فخم وراقي للشاشة
                </div>
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
                className="flex-1 sm:flex-none rounded-xl font-bold text-xs"
              >
                <TimerIcon className="h-3.5 w-3.5 ml-1.5" /> تايمر الدراسة
              </Button>
              <Button
                variant={mode === 'clock' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('clock')}
                className="flex-1 sm:flex-none rounded-xl font-bold text-xs"
              >
                <Clock className="h-3.5 w-3.5 ml-1.5" /> الساعة الرقمية
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-xl shadow-sm hover:shadow-md transition-all border-primary/30 hover:bg-primary/10 text-primary font-bold text-xs py-2.5 sm:py-2"
            >
              <Maximize2 className="h-4 w-4 ml-1" />
              <span>عرض شاشة كاملة أسطوري</span>
            </Button>
          </div>

          {/* Main Display */}
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <div
              dir="ltr"
              className="text-5xl sm:text-7xl md:text-8xl font-mono font-black text-primary mb-4 relative inline-block tracking-widest cursor-pointer group hover:scale-105 transition-transform"
              onClick={() => setIsFullscreen(true)}
              title="اضغط للدخول في وضع الشاشة الكاملة الأسطوري"
            >
              {mode === 'clock' ? formatClock(currentTime) : formatTime(timeLeft)}
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
                الساعة الحالية متزامنة بدقة مع النظام ⏰
              </div>
            )}
          </div>

          {/* Control Buttons (Only in Timer Mode) */}
          {mode === 'timer' && (
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 rtl:space-x-reverse mb-6 sm:mb-8 relative z-10">
              <Button
                onClick={isRunning ? pauseTimer : startTimer}
                size="lg"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl sm:rounded-2xl"
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
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all font-bold rounded-xl sm:rounded-2xl border-border"
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
                    className="px-3 sm:px-4 font-bold rounded-xl shrink-0"
                  >
                    <Volume2 className="h-4 w-4 ml-1.5" />
                    {t('preview')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Keyboard shortcuts info */}
          <div className="mt-6 text-xs text-muted-foreground text-center flex items-center justify-center space-x-4 rtl:space-x-reverse flex-wrap gap-y-1">
            <span className="flex items-center"><kbd className="px-2 py-1 bg-muted rounded font-bold ml-1">Space</kbd> البدء/الإيقاف</span>
            <span className="flex items-center"><kbd className="px-2 py-1 bg-muted rounded font-bold ml-1">R</kbd> إعادة ضبط</span>
            <span className="flex items-center"><kbd className="px-2 py-1 bg-muted rounded font-bold ml-1">F</kbd> شاشة كاملة</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}