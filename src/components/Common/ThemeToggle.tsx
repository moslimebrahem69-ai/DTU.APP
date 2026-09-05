import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleDarkLight } = useTheme();

  return (
    <button
      onClick={toggleDarkLight}
      className="p-2 rounded-xl bg-card border border-border/80 text-foreground hover:bg-accent transition-all duration-200 shadow-2xs flex items-center justify-center shrink-0"
      title={theme === 'dark' ? 'التفعيل للوضع المضيء' : 'التفعيل للوضع المظلم'}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </button>
  );
}