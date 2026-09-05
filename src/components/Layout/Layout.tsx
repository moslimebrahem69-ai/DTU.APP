import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { BackgroundAnimation } from '../Animations/BackgroundAnimation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const isHomePage = location.pathname === '/';
  const isRtl = i18n.language === 'ar' || document.documentElement.dir === 'rtl';

  return (
    <div className="min-h-screen bg-background">
      <BackgroundAnimation />
      <Header />
      <main className="pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* زر الرجوع للرئيسية - يظهر فقط في الصفحات الفرعية */}
          <AnimatePresence>
            {!isHomePage && (
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 10 : -10 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.03, x: isRtl ? 2 : -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card hover:border-primary/40 shadow-sm transition-all duration-200 group cursor-pointer"
                >
                  {isRtl ? (
                    <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
                  ) : (
                    <ArrowLeft className="h-3.5 w-3.5 text-primary group-hover:-translate-x-0.5 transition-transform" />
                  )}
                  <span>الرئيسية</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {children}
        </div>
      </main>
    </div>
  );
}