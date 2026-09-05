import React, { useState } from 'react';
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
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../contexts/ThemeContext';
import { UniversalViewerModal } from '../Common/UniversalViewerModal';

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

  // حالة التحكم بفتح المعاينة داخل التطبيق
  const [selectedItem, setSelectedItem] = useState<{ url: string; title: string } | null>(null);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('dtu-language', lang);
  };

  const handleOpenViewer = (e: React.MouseEvent, url: string, title: string) => {
    e.preventDefault();
    setSelectedItem({ url, title });
  };

  const handleCloseViewer = () => {
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden px-3 py-2">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {animationsEnabled && floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute opacity-5"
            initial={{
              x: Math.random() * 250,
              y: Math.random() * 500,
              rotate: 0,
              scale: 0.5
            }}
            animate={{
              x: [
                Math.random() * 250,
                Math.random() * 250,
                Math.random() * 250
              ],
              y: [
                Math.random() * 500,
                Math.random() * 500,
                Math.random() * 500
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
            <Icon className="h-5 w-5 text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Profile Section (Compact) */}
      <motion.div 
        className="text-center py-3 border-b border-border/50 relative z-10 shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Compact Profile Circle */}
        <motion.div
          className="relative w-14 h-14 mx-auto mb-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={animationsEnabled ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-0.5 rounded-full border border-primary/50"
            animate={animationsEnabled ? { 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner gradient circle */}
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-md"
          >
            <User className="h-6 w-6 text-white drop-shadow-sm" />
          </motion.div>
        </motion.div>

        {/* Developer Name */}
        <motion.h3 
          className="font-bold text-foreground text-sm leading-tight mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('developer')}
        </motion.h3>

        {/* Facebook Link & Version */}
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <motion.a
            href="https://www.facebook.com/share/16ZRVqbrVC/"
            onClick={(e) => handleOpenViewer(e, 'https://www.facebook.com/share/16ZRVqbrVC/', 'صفحة المطور')}
            className="inline-flex items-center space-x-1 rtl:space-x-reverse text-[11px] text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Facebook className="h-3 w-3" />
            <span>صفحة المطور</span>
          </motion.a>

          <span className="text-muted-foreground/40">•</span>

          <span className="flex items-center space-x-0.5 rtl:space-x-reverse text-[10px]">
            <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
            <span>{t('version')}</span>
          </span>
        </div>
      </motion.div>

      {/* Social Links (Compact) */}
      <motion.div 
        className="py-3 border-b border-border/50 relative z-10 shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-xs font-bold text-muted-foreground mb-2 px-1 flex items-center">
          <Sparkles className="h-3 w-3 mr-1.5 rtl:ml-1.5 text-primary" />
          {t('socialLinks')}
        </h4>
        
        <div className="grid grid-cols-2 gap-1.5">
          <AnimatePresence>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                onClick={(e) => handleOpenViewer(e, link.url, t(link.name))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 rtl:space-x-reverse p-1.5 rounded-lg transition-all ${link.bgColor} ${link.hoverColor} group cursor-pointer`}
              >
                <div className={`w-6 h-6 rounded-md ${link.bgColor} flex items-center justify-center shrink-0`}>
                  <link.icon className={`h-3.5 w-3.5 ${link.color}`} />
                </div>
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {t(link.name)}
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Settings (Compact) */}
      <motion.div 
        className="flex-1 py-3 relative z-10 overflow-y-auto space-y-2 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-xs font-bold text-muted-foreground mb-2 flex items-center px-1">
          <Settings className="h-3 w-3 mr-1.5 rtl:ml-1.5 text-primary" />
          {t('settings')}
        </h4>
        
        {/* Theme Selection */}
        <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-border/40 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <Palette className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-xs">{t('theme')}</span>
          </div>
          <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
            <SelectTrigger className="h-7 w-24 text-xs bg-background/50 border-border/40">
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
        </div>

        {/* Language Selection */}
        <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-border/40 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <Languages className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-xs">{t('language')}</span>
          </div>
          <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="h-7 w-24 text-xs bg-background/50 border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">{t('arabic')}</SelectItem>
              <SelectItem value="en">{t('english')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Animation Toggle */}
        <div className="bg-card/60 backdrop-blur-sm rounded-lg p-2 border border-border/40 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-xs">{t('animations')}</span>
          </div>
          <Switch 
            checked={animationsEnabled} 
            onCheckedChange={toggleAnimations}
            className="data-[state=checked]:bg-primary scale-75"
          />
        </div>
      </motion.div>

      {/* Footer */}
      <div className="py-2 border-t border-border/50 text-center relative z-10 shrink-0">
        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse text-[10px] text-muted-foreground">
          <Heart className="h-3 w-3 text-red-500 fill-red-500/20" />
          <span>صُنع بحب في مصر</span>
        </div>
      </div>

      {/* Universal Viewer Modal */}
      {selectedItem && (
        <UniversalViewerModal
          url={selectedItem.url}
          title={selectedItem.title}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}