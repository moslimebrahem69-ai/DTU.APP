import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Trash2, Target, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface StudyTask {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export function StudyPlanPage() {
  const { t } = useTranslation();
  const { animationsEnabled } = useTheme();

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('dtu_study_tasks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('dtu_study_tasks', JSON.stringify(tasks));
  }, [tasks]);

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
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-2 sm:px-4 py-4">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2 mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          خطط المذاكرة والمهام اليومية 📋
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          نظم محاضراتك، شيتاتك، وأهدافك اليومية بدقة وتابع إنجازك أول بأول
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border/80 rounded-3xl p-4 sm:p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">قائمة المهام اليومية</h2>
              <p className="text-xs text-muted-foreground">أضف مهامك الدراسية وركز على إنجازها</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary">
            {tasks.filter(t => t.completed).length} / {tasks.length} منجزة
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="اكتب هدفك أو محاضرتك اليومية (مثلاً: مذاكرة مادة الميكاترونكس)..."
            className="flex-1 bg-background border border-border rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
          />
          <Button type="submit" size="sm" className="h-11 px-5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 shadow-md">
            <Plus className="h-4 w-4 ml-1.5 rtl:mr-1.5" />
            إضافة مهمة
          </Button>
        </form>

        {/* Tasks List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xs sm:text-sm flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-10 w-10 text-muted-foreground/40 mb-1" />
              <span>ليس لديك أي مهام مسجلة اليوم. أضف مهمتك الأولى وابدأ الإنجاز! 🚀</span>
            </div>
          ) : (
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all bg-background/50 border-border/60 hover:bg-accent/40 shadow-xs`}
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
                    <span 
                      className={`text-xs sm:text-sm font-medium truncate ${
                        task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline-block px-2 py-0.5 rounded-md bg-muted">
                      {task.date}
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
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}