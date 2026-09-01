import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Youtube, 
  MessageCircle, 
  Facebook, 
  Mail,
  Settings,
  Palette,
  Languages,
  Zap,
  User,
  Star,
  Sparkles,
  Heart,
  Code,
  Coffee
} from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../contexts/ThemeContext';

const socialLinks = [
  {
    name: 'youtube',
    url: 'https://youtube.com/@edubox-education?si=4D-kchpjhIjf5H2Y',
    icon: Youtube,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    hoverColor: 'hover:bg-red-100 dark:hover:bg-red-900/30'
  },
  {
    name: 'telegram', 
    url: 'https://t.me/eduboxeducation',
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/share/16ZRVqbrVC/',
    icon: Facebook,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
  },
  {
    name: 'email',
    url: 'mailto:edu.box.media@gmail.com',
    icon: Mail,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    hoverColor: 'hover:bg-gray-100 dark:hover:bg-gray-900/30'
  }
];

const floatingIcons = [Star, Sparkles, Heart, Code, Coffee];

export function SideDrawer() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, animationsEnabled, toggleAnimations } = useTheme();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('dtu-language', lang);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {animationsEnabled && floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute opacity-5"
            initial={{
              x: Math.random() * 300,
              y: Math.random() * 600,
              rotate: 0,
              scale: 0.5
            }}
            animate={{
              x: [
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300
              ],
              y: [
                Math.random() * 600,
                Math.random() * 600,
                Math.random() * 600
              ],
              rotate: [0, 180, 360],
              scale: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 2
            }}
          >
            <Icon className="h-6 w-6 text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Profile Section */}
      <motion.div 
        className="text-center py-8 border-b border-border/50 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated Profile Circle */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={animationsEnabled ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-1 rounded-full border border-primary/50"
            animate={animationsEnabled ? { 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner gradient circle */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg"
            animate={animationsEnabled ? {
              background: [
                "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
                "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
                "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
                "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)"
              ]
            } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={animationsEnabled ? { 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <User className="h-10 w-10 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
          
          {/* Floating sparkles around profile */}
          {animationsEnabled && [...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.sin(i * Math.PI / 2) * 30}%`,
                left: `${20 + Math.cos(i * Math.PI / 2) * 30}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Developer Name with Typing Animation */}
        <motion.h3 
          className="font-bold text-foreground text-lg mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('developer')}
        </motion.h3>

        {/* Facebook Link */}
        <motion.a
          href="https://www.facebook.com/share/16ZRVqbrVC/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sm text-blue-600 hover:text-blue-700 transition-colors mb-2"
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Facebook className="h-4 w-4" />
          <span>صفحة المطور</span>
        </motion.a>

        <motion.p 
          className="text-xs text-muted-foreground flex items-center justify-center space-x-1 rtl:space-x-reverse"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Star className="h-3 w-3 text-yellow-500" />
          <span>{t('version')}</span>
        </motion.p>
      </motion.div>

      {/* Enhanced Social Links */}
      <motion.div 
        className="py-6 border-b border-border/50 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.h4 
          className="text-sm font-semibold text-muted-foreground mb-4 px-1 flex items-center"
          whileHover={{ x: 4 }}
        >
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          {t('socialLinks')}
        </motion.h4>
        
        <div className="space-y-3">
          <AnimatePresence>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  x: 6,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-xl transition-all duration-300 ${link.bgColor} ${link.hoverColor} group relative overflow-hidden`}
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div
                  className={`w-10 h-10 rounded-lg ${link.bgColor} flex items-center justify-center relative z-10`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                </motion.div>
                
                <div className="flex-1 relative z-10">
                  <motion.span 
                    className="text-sm font-medium text-foreground group-hover:text-primary transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    {t(link.name)}
                  </motion.span>
                </div>
                
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 2 }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </motion.div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced Settings */}
      <motion.div 
        className="flex-1 py-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.h4 
          className="text-sm font-semibold text-muted-foreground mb-6 flex items-center px-1"
          whileHover={{ x: 4 }}
        >
          <Settings className="h-4 w-4 mr-2 rtl:ml-2 text-primary" />
          {t('settings')}
        </motion.h4>
        
        <div className="space-y-6">
          {/* Theme Selection */}
          <motion.div 
            className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <motion.div
                  animate={animationsEnabled ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Palette className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{t('theme')}</span>
              </div>
            </div>
            <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
              <SelectTrigger className="w-full bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('light')}</SelectItem>
                <SelectItem value="dark">{t('dark')}</SelectItem>
                <SelectItem value="blue">{t('blue')}</SelectItem>
                <SelectItem value="green">{t('green')}</SelectItem>
                <SelectItem value="yellow">{t('yellow')}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Language Selection */}
          <motion.div 
            className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <motion.div
                  animate={animationsEnabled ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Languages className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{t('language')}</span>
              </div>
            </div>
            <Select value={i18n.language} onValueChange={changeLanguage}>
              <SelectTrigger className="w-full bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">{t('arabic')}</SelectItem>
                <SelectItem value="en">{t('english')}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Animation Toggle */}
          <motion.div 
            className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <motion.div
                  animate={animationsEnabled ? { 
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{t('animations')}</span>
              </div>
              <motion.div 
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Switch 
                  checked={animationsEnabled} 
                  onCheckedChange={toggleAnimations}
                  className="data-[state=checked]:bg-primary"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer with animated elements */}
      <motion.div 
        className="py-4 border-t border-border/50 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs text-muted-foreground"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={animationsEnabled ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="h-3 w-3 text-red-500" />
          </motion.div>
          <span>صُنع بحب في مصر</span>
        </motion.div>
      </motion.div>
    </div>
  );
}