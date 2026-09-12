import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { StudyTimer } from '../components/Timer/StudyTimer';
import { useTheme } from '../contexts/ThemeContext';
import { Plus, CheckCircle2, Circle, Trash2, Calendar, Target } from 'lucide-react';
import { Button } from '../components/ui/button';

interface StudyTask {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export function TimerPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  // جلب المهام المخزنة محلياً أو مصفوفة فارغة
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('dtu_study_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // فلترة مهام اليوم فقط أو الاحتفاظ بها حسب رغبة الطالب
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeTask, setActiveTask] = useState<string | null>(() => {
    return localStorage.getItem('dtu_active_study_task') || null;
  });

  // حفظ المهام في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem('dtu_study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // حفظ المهمة النشطة الحالية
  useEffect(() => {
    if (activeTask) {
      localStorage.setItem('dtu_active_study_task', activeTask);
    } else {
      localStorage.removeItem('dtu_active_study_task');
    }
  }, [activeTask]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      date: new Date().toLocaleDateString('ar-EG'),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedStatus = !task.completed;
        // لو المهمة خلصت وكانت هي النشطة، نلغي النشاط عنها
        if (updatedStatus && activeTask === task.title) {
          setActiveTask(null);
        }
        return { ...task, completed: updatedStatus };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string, title: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTask === title) {
      setActiveTask(null);
    }
  };

  const handleSelectActiveTask = (title: string) => {
    if (activeTask === title) {
      setActiveTask(null); // إلغاء التحديد لو ضغط عليها تاني
    } else {
      setActiveTask(title);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2 sm:px-4 py-2">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          {t('studyTimer') || 'مؤقت المذاكرة والخطط اليومية'}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          نظم مهامك اليومية، حدد هدفك، وتابع تركيزك بنظام البومودورو الاحترافي
        </p>
      </motion.div>

      {/* قسم خطة المذاكرة اليومية (Tasks & Daily Goal) */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">خطة المذاكرة اليومية</h2>
              <p className="text-xs text-muted-foreground">اكتب المحاضرات أو الشيتات المستهدفة وابدأ التركيز عليها</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {tasks.filter(t => t.completed).length} / {tasks.length} منجزة
          </span>
        </div>

        {/* نموذج إضافة مهمة جديدة */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="اكتب هدفك اليومي (مثلاً: مذاكرة محاضرة الميكاترونكس الأولى)..."
            className="flex-1 bg-background border border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Button type="submit" size="sm" className="h-9 px-4 rounded-xl text-xs font-semibold shrink-0">
            <Plus className="h-4 w-4 mr-1 rtl:ml-1" />
            إضافة مهمة
          </Button>
        </form>

        {/* قائمة المهام */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-xs">
              ليس لديك أي مهام مسجلة اليوم. أضف مهمتك الأولى وابدأ الإنجاز! 🚀
            </div>
          ) : (
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    activeTask === task.title 
                      ? 'bg-primary/10 border-primary/40 shadow-sm' 
                      : 'bg-background/50 border-border/60 hover:bg-accent/40'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="text-primary hover:scale-110 transition-transform shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <span 
                      className={`text-xs sm:text-sm font-medium truncate ${
                        task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* زر تعيين كمهمة نشطة للتايمر */}
                    {!task.completed && (
                      <button
                        type="button"
                        onClick={() => handleSelectActiveTask(task.title)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                          activeTask === task.title
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted/80 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {activeTask === task.title ? 'المهمة الحالية ⚡' : 'ركز عليها'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id, task.title)}
                      className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* عرض المهمة النشطة حالياً لو موجودة */}
        {activeTask && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>جاري التركيز على: <strong className="text-primary">{activeTask}</strong></span>
            </div>
            <button 
              onClick={() => setActiveTask(null)}
              className="text-muted-foreground hover:text-foreground font-semibold underline"
            >
              إلغاء التحديد
            </button>
          </div>
        )}
      </motion.div>

      {/* قسم المؤقت الاحترافي */}
      <div className="pt-2">
        <StudyTimer />
      </div>
    </div>
  );
}