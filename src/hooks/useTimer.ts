import { useState, useRef, useEffect, useCallback } from 'react';

export interface TimerSettings {
  hours: number;
  minutes: number;
  seconds: number;
  soundType: string;
  pomodoroMode: boolean;
  workDuration: number;
  breakDuration: number;
}

export function useTimer() {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('dtu-timer-settings');
    return saved
      ? JSON.parse(saved)
      : {
          hours: 0,
          minutes: 25,
          seconds: 0,
          soundType: 'bell',
          pomodoroMode: true,
          workDuration: 25,
          breakDuration: 5,
        };
  });

  const [currentSession, setCurrentSession] = useState<'work' | 'break'>('work');
  const [sessionCount, setSessionCount] = useState(0);

  // حساب الوقت الكلي بالثواني بناءً على وضع البومودورو أو العادي
  const calculateTotalSeconds = useCallback(
    (s: TimerSettings, session: 'work' | 'break') => {
      if (s.pomodoroMode) {
        const minutes = session === 'work' ? s.workDuration : s.breakDuration;
        return (minutes || 0) * 60;
      }
      return (s.hours || 0) * 3600 + (s.minutes || 0) * 60 + (s.seconds || 0);
    },
    []
  );

  const [timeLeft, setTimeLeft] = useState<number>(() => calculateTotalSeconds(settings, currentSession));
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  // تحديث الوقت المتبقي عند تغيير الإعدادات إذا لم يكن العداد يعمل
  useEffect(() => {
    if (!isRunning && !isPaused) {
      setTimeLeft(calculateTotalSeconds(settings, currentSession));
    }
  }, [settings, currentSession, isRunning, isPaused, calculateTotalSeconds]);

  const saveSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('dtu-timer-settings', JSON.stringify(newSettings));
  }, []);

  const playSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies: Record<string, number[]> = {
        bell: [800, 600, 400],
        piano: [523.25, 659.25, 783.99],
        glockenspiel: [1046.5, 1318.51, 1567.98],
        violin: [196.0, 293.66, 440.0],
        whistle: [2000, 1500, 1000],
      };

      const soundFreqs = frequencies[settings.soundType] || frequencies.bell;

      let noteIndex = 0;
      const playNote = () => {
        if (noteIndex < soundFreqs.length) {
          oscillator.frequency.value = soundFreqs[noteIndex];
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

          setTimeout(() => {
            noteIndex++;
            if (noteIndex < soundFreqs.length) {
              playNote();
            }
          }, 500);
        }
      };

      oscillator.start();
      playNote();

      setTimeout(() => {
        oscillator.stop();
      }, soundFreqs.length * 500);
    } catch (err) {
      console.log('Audio playback error:', err);
    }
  }, [settings.soundType]);

  const showNotification = useCallback((message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('DTU Study Timer', {
        body: message,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
      });
    }
  }, []);

  const startTimer = useCallback(() => {
    let targetTime = timeLeft;

    // إصلاح المشكلة الأساسية: إذا كان الوقت 0 يتم حسابه محلياً فوراً
    if (targetTime <= 0) {
      targetTime = calculateTotalSeconds(settings, currentSession);
      if (targetTime <= 0) return; // عدم البدء إذا كانت المدة صفرية
      setTimeLeft(targetTime);
    }

    setIsRunning(true);
    setIsPaused(false);

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    if (!workerRef.current) {
      const workerBlob = new Blob(
        [
          `
        let intervalId = null;
        let timeLeft = 0;

        self.onmessage = function(e) {
          const { type, time } = e.data;
          
          if (type === 'start') {
            if (intervalId) clearInterval(intervalId);
            timeLeft = time;
            intervalId = setInterval(() => {
              timeLeft--;
              self.postMessage({ type: 'tick', timeLeft });
              
              if (timeLeft <= 0) {
                clearInterval(intervalId);
                self.postMessage({ type: 'finished' });
              }
            }, 1000);
          } else if (type === 'pause') {
            if (intervalId) clearInterval(intervalId);
          } else if (type === 'reset') {
            if (intervalId) clearInterval(intervalId);
            timeLeft = 0;
          }
        };
      `,
        ],
        { type: 'application/javascript' }
      );

      workerRef.current = new Worker(URL.createObjectURL(workerBlob));

      workerRef.current.onmessage = (e) => {
        const { type, timeLeft: newTimeLeft } = e.data;

        if (type === 'tick') {
          setTimeLeft(newTimeLeft);
        } else if (type === 'finished') {
          setIsRunning(false);
          setIsPaused(false);
          playSound();

          if (settings.pomodoroMode) {
            setCurrentSession((prevSession) => {
              const nextSession = prevSession === 'work' ? 'break' : 'work';
              if (nextSession === 'work') {
                setSessionCount((prev) => prev + 1);
              }
              showNotification(`${nextSession === 'work' ? 'Work' : 'Break'} session finished!`);
              return nextSession;
            });
          } else {
            showNotification('Timer finished!');
          }
        }
      };
    }

    // إرسال targetTime المضمون بدلاً من timeLeft القديم
    workerRef.current.postMessage({ type: 'start', time: targetTime });
  }, [timeLeft, settings, currentSession, calculateTotalSeconds, playSound, showNotification]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'pause' });
    }
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    const total = calculateTotalSeconds(settings, currentSession);
    setTimeLeft(total);
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'reset' });
    }
  }, [calculateTotalSeconds, settings, currentSession]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // تجنب تداخل الاختصارات أثناء الكتابة في مدخلات الأرقام
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetTimer();
      } else if (e.code === 'KeyP') {
        e.preventDefault();
        setSettings((prev) => {
          const updated = { ...prev, pomodoroMode: !prev.pomodoroMode };
          localStorage.setItem('dtu-timer-settings', JSON.stringify(updated));
          return updated;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, startTimer, pauseTimer, resetTimer]);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return {
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
  };
}