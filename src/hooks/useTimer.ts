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
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('dtu-timer-settings');
    return saved ? JSON.parse(saved) : {
      hours: 0,
      minutes: 25,
      seconds: 0,
      soundType: 'bell',
      pomodoroMode: false,
      workDuration: 25,
      breakDuration: 5,
    };
  });
  
  const [currentSession, setCurrentSession] = useState<'work' | 'break'>('work');
  const [sessionCount, setSessionCount] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  const saveSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('dtu-timer-settings', JSON.stringify(newSettings));
  }, []);

  const playSound = useCallback(() => {
    // Create synthetic sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different sounds
    const frequencies: Record<string, number[]> = {
      bell: [800, 600, 400],
      piano: [523.25, 659.25, 783.99], // C, E, G
      glockenspiel: [1046.50, 1318.51, 1567.98],
      violin: [196.00, 293.66, 440.00],
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
  }, [settings.soundType]);

  const showNotification = useCallback((message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('DTU Study Timer', {
        body: message,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png'
      });
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timeLeft === 0) {
      const totalSeconds = settings.pomodoroMode 
        ? (currentSession === 'work' ? settings.workDuration : settings.breakDuration) * 60
        : settings.hours * 3600 + settings.minutes * 60 + settings.seconds;
      setTimeLeft(totalSeconds);
    }

    setIsRunning(true);
    setIsPaused(false);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Create worker for accurate timing
    if (!workerRef.current) {
      const workerBlob = new Blob([`
        let intervalId = null;
        let timeLeft = 0;

        self.onmessage = function(e) {
          const { type, time } = e.data;
          
          if (type === 'start') {
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
            clearInterval(intervalId);
          } else if (type === 'reset') {
            clearInterval(intervalId);
            timeLeft = 0;
          }
        };
      `], { type: 'application/javascript' });

      workerRef.current = new Worker(URL.createObjectURL(workerBlob));
      
      workerRef.current.onmessage = (e) => {
        const { type, timeLeft: newTimeLeft } = e.data;
        
        if (type === 'tick') {
          setTimeLeft(newTimeLeft);
        } else if (type === 'finished') {
          setIsRunning(false);
          playSound();
          
          if (settings.pomodoroMode) {
            const nextSession = currentSession === 'work' ? 'break' : 'work';
            setCurrentSession(nextSession);
            if (nextSession === 'work') {
              setSessionCount(prev => prev + 1);
            }
            showNotification(`${nextSession === 'work' ? 'Work' : 'Break'} session finished!`);
          } else {
            showNotification('Timer finished!');
          }
        }
      };
    }

    workerRef.current.postMessage({ type: 'start', time: timeLeft });
  }, [timeLeft, settings, currentSession, playSound, showNotification]);

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
    setTimeLeft(0);
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'reset' });
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
        setSettings(prev => ({ ...prev, pomodoroMode: !prev.pomodoroMode }));
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