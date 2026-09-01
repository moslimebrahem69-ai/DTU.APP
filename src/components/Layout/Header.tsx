import React from 'react';
import { Menu, Bot, Sparkles, Home, Cpu, Youtube, GraduationCap, BookOpen, Timer, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { SideDrawer } from './SideDrawer';
import { useTheme } from '../../contexts/ThemeContext';

const navigationItems = [
  { id: 'home', path: '/', icon: Home, labelKey: 'home' },
  { id: 'ai-tools', path: '/ai-tools', icon: Cpu, labelKey: 'aiTools' },
  { id: 'youtube', path: '/youtube', icon: Youtube, labelKey: 'youtubeChannels' },
  { id: 'platforms', path: '/platforms', icon: GraduationCap, labelKey: 'learningPlatforms' },
  { id: 'college', path: '/college', icon: BookOpen, labelKey: 'collegeSubjects' },
  { id: 'timer', path: '/timer', icon: Timer, labelKey: 'studyTimer' }
];

export function Header() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.header
      initial={animationsEnabled ? { y: -100, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
            whileTap={animationsEnabled ? { scale: 0.98 } : {}}
          >
            <motion.div
              className="relative"
              animate={animationsEnabled ? { 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-lg"
                animate={animationsEnabled ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Bot className="h-8 w-8 text-primary relative z-10" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={animationsEnabled ? {
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <Sparkles className="h-3 w-3 text-yellow-500" />
              </motion.div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.h1 
                className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
                whileHover={animationsEnabled ? { 
                  backgroundPosition: ["0% 50%", "100% 50%"],
                  transition: { duration: 0.5 }
                } : {}}
                style={{ backgroundSize: "200% 100%" }}
              >
                DTU Learning Hub
              </motion.h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            <AnimatePresence>
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={animationsEnabled ? { opacity: 0, y: -20 } : {}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => navigate(item.path)}
                      className={`relative px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <motion.div
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                        whileHover={animationsEnabled ? { scale: 1.05 } : {}}
                        whileTap={animationsEnabled ? { scale: 0.95 } : {}}
                      >
                        <motion.div
                          animate={animationsEnabled && isActive ? { 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        <span className="text-sm font-medium hidden xl:inline">
                          {t(item.labelKey)}
                        </span>
                      </motion.div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Removed Here */}

        </div>
      </div>
      
      {/* Progress bar for page loading */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.header>
  );
}