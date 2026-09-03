import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineNotifier() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setShowBackOnline(true);
      setTimeout(() => setShowBackOnline(false), 3000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500/90 text-slate-950 px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md font-bold text-sm flex items-center space-x-2 rtl:space-x-reverse border border-amber-400/50"
        >
          <WifiOff className="h-4 w-4 animate-bounce" />
          <span>أنت تعمل الآن في الوضع أوفلاين (تم حفظ البيانات)</span>
        </motion.div>
      )}

      {showBackOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md font-bold text-sm flex items-center space-x-2 rtl:space-x-reverse border border-emerald-400/50"
        >
          <Wifi className="h-4 w-4" />
          <span>تم إعادة الاتصال بالإنترنت بنجاح!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}