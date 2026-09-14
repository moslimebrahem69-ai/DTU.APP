import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Trash2, Target, Calendar, CheckSquare, Tag, Clock, Sheet } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface StudyTask {
  id: string;
  title: string;
  completed: boolean;
  category: 'lecture' | 'section' | 'quiz' | 'sheetsolution' | 'urgent';
  dueDate: 'today' | 'tomorrow' | 'upcoming';
  dateStr: string;
}

const CATEGORY_CONFIG = {
  lecture: { label: 'محاضرة', bg: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  section: { label: 'سكشن', bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  quiz: { label: 'كويز', bg: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  sheetsolution: { label: 'حل شيت', bg: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
  urgent: { label: 'عاجل جداً', bg: 'bg-rose-500/10 text-rose-500 border-rose-500/30' },
};

const DUE_CONFIG = {
  today: { label: 'اليوم', color: 'text-primary' },
  tomorrow: { label: 'غداً', color: 'text-amber-500' },
  upcoming: { label: 'لاحقاً', color: 'text-muted-foreground' },
};

export function StudyPlanPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('dtu_study_tasks_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StudyTask['category']>('lecture');
  const [selectedDueDate, setSelectedDueDate] = useState<StudyTask['dueDate']>('today');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('dtu_study_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      category: selectedCategory,
      dueDate: selectedDueDate,
      dateStr: new Date().toLocaleDateString('ar-EG'),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-2 sm:px-4 py-4">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2 mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
       رتب نفسك و نظم مذاكرتك هنا 📋
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
       تظبيط الشغل اهم من الشغل 😎
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border/80 rounded-3xl p-4 sm:p-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">قائمة المهام اليومية </h2>
              <p className="text-xs text-muted-foreground">أضف مهامك الدراسية مع التصنيفات والمواعيد</p>
            </div>
          </div>
          
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary">
              {completedCount} / {tasks.length} خلصت
            </span>
            {completedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCompleted}
                className="text-xs h-8 rounded-xl text-destructive hover:bg-destructive/10 border-destructive/30 cursor-pointer"
              >
                حذف المنجز
              </Button>
            )}
          </div>
        </div>

        {/* Visual Progress Bar */}
        {tasks.length > 0 && (
          <div className="mb-6 bg-muted/40 p-3 rounded-2xl border border-border/60 space-y-2">
            <div className="flex justify-between text-xs font-bold text-muted-foreground">
              <span>نسبة الإنجاز الإجمالية</span>
              <span className="text-primary font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Form with Categories & Due Dates */}
        <form onSubmit={handleAddTask} className="space-y-3 mb-6 bg-muted/30 p-3.5 sm:p-4 rounded-2xl border border-border/60">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="اكتب هدفك أو محاضرتك (مثلاً: مذاكرة مادة الميكاترونكس)..."
              className="flex-1 bg-background border border-border rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
            />
            <Button type="submit" size="sm" className="h-11 px-5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 shadow-md cursor-pointer">
              <Plus className="h-4 w-4 ml-1.5 rtl:mr-1.5" />
              إضافة مهمة
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            {/* Category Select */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Tag className="h-3 w-3" /> التصنيف:
              </span>
              {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                    selectedCategory === cat 
                      ? `${CATEGORY_CONFIG[cat].bg} shadow-sm ring-1 ring-primary/30` 
                      : 'bg-background text-muted-foreground border-border hover:border-border/80'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                </button>
              ))}
            </div>

            {/* Due Date Select */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> الموعد:
              </span>
              {(['today', 'tomorrow', 'upcoming'] as const).map((due) => (
                <button
                  key={due}
                  type="button"
                  onClick={() => setSelectedDueDate(due)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                    selectedDueDate === due 
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                      : 'bg-background text-muted-foreground border-border hover:border-border/80'
                  }`}
                >
                  {DUE_CONFIG[due].label}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Filters Bar */}
        {tasks.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 bg-muted/30 p-1.5 rounded-xl border border-border/40 w-fit">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${filter === 'all' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              الكل ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${filter === 'active' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              لسه مخلصتش🥲({tasks.filter(t => !t.completed).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${filter === 'completed' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
            >
              خلصت✅({completedCount})
            </button>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs sm:text-sm flex flex-col items-center justify-center space-y-2">
              <CheckSquare className="h-10 w-10 text-muted-foreground/40 mb-1" />
              <span>لا توجد مهام في هذا التبويب حالياً. أضف مهمتك الجديدة وابدأ الإنجاز! 🚀</span>
            </div>
          ) : (
            <AnimatePresence>
              {filteredTasks.map((task) => {
                const catInfo = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.lecture;
                const dueInfo = DUE_CONFIG[task.dueDate] || DUE_CONFIG.today;

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between p-3.5 rounded-2xl border transition-all bg-background/60 border-border/60 hover:bg-accent/40 shadow-xs gap-2"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="text-primary hover:scale-110 transition-transform shrink-0 cursor-pointer"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${catInfo.bg}`}>
                            {catInfo.label}
                          </span>
                          <span className={`text-[10px] font-bold ${dueInfo.color}`}>
                            📅 {dueInfo.label}
                          </span>
                        </div>
                        <span 
                          className={`text-xs sm:text-sm font-medium block truncate ${
                            task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline-block px-2 py-0.5 rounded-md bg-muted">
                        {task.dateStr}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive rounded-xl transition-colors cursor-pointer hover:bg-destructive/10"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}
