import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Send, User, Loader2, Code, BookOpen, Calendar, Cpu, Wrench, Trash2, Copy, Check 
} from 'lucide-react';
import { askDTUAssistant, type AiMode, type ChatMessage, type EngineeringSubject } from '../services/aiService';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  error?: boolean;
}

const TEMPLATE_PROMPTS = [
  { icon: BookOpen, title: 'Explain Topic', prompt: 'Explain PID controller from basics with a practical mechatronics example.' },
  { icon: Wrench, title: 'Solve Problem', prompt: 'Solve this hydraulic cylinder problem step by step: pressure = 100 bar, bore diameter = 50 mm. Find the extension force.' },
  { icon: Sparkles, title: 'Generate Quiz', prompt: 'اعمللي 10 أسئلة MCQ عن PLC مع الإجابات في النهاية.' },
  { icon: BookOpen, title: 'Create Flashcards', prompt: 'أنشئ Flashcards مختصرة لمراجعة أساسيات Pneumatics.' },
  {
    icon: Code,
    title: 'تصحيح وشرح كود C++ / Matlab',
    prompt: 'عندي مشكلة في كود التحكم، اشرح لي طريقة استخدام الأراي (Arrays) في C++ للتحكم في الحساسات بأسلوب بسيط.'
  },
  {
    icon: Cpu,
    title: 'تطبيقات PLC والـ Ladder Diagram',
    prompt: 'اشرح لي الفرق بين الـ Latch والـ Unlatch في برمجة الـ PLC مع مثال عملي لتشغيل محرك.'
  },
  {
    icon: Wrench,
    title: 'أساسيات النيوماتيك والهيدروليك',
    prompt: 'اشرح لي المكونات الأساسية لدائرة هيدروليكية بسيطة ووظيفة كل صمام (Valves).'
  },
  {
    icon: Calendar,
    title: 'توليد خطة مذاكرة للأسبوع',
    prompt: 'اقترح لي خطة مذاكرة متوازنة لمواد الفرقة الثانية ميكاترونكس (PLC، هيدروليك، تحكم بالحاسبات).'
  }
];

const SUBJECTS: EngineeringSubject[] = ['عام', 'PLC', 'Computer Control', 'MATLAB', 'Materials Selection', 'Pneumatics & Hydraulics', 'PCB', 'Electromechanical Maintenance', 'Mechatronics Systems', 'Capstone Design', 'Entrepreneurship', 'Manufacturing Technology'];
export function AITutorPage() {
  const { animationsEnabled } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'أهلاً بك في استوديو المساعد الذكي لطلاب DTU Hub! 🚀\nأنا هنا لمساعدتك في شرح المفاهيم الهندسة، حل ومراجعة الكود، وتوليد الاختبارات والخطط الدراسية. كيف يمكنني دعمك اليوم؟',
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState<EngineeringSubject>('عام');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string, mode: AiMode = 'mechatronics') => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: currentTime
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const history: ChatMessage[] = messages.map((message) => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.text,
    }));
    const result = await askDTUAssistant(query, history, mode, subject);
    const replyText = result.text;

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: replyText,
      error: !result.ok,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        text: 'تم إعادة ضبط المحادثة. كيف يمكنني مساعدتك في دراستك الآن؟ 🚀',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 space-y-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={animationsEnabled ? { y: 15, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between bg-card border border-border/80 p-4 sm:p-6 rounded-3xl shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative p-3 rounded-2xl bg-primary/10 text-primary">
            <Bot className="h-7 w-7" />
            <Sparkles className="h-3 w-3 text-amber-500 absolute top-1 right-1 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-foreground">
              حنكش 🤖
            </h1>
            <p className="text-xs text-muted-foreground">
              مساعد مذاكرة ميكاترونكس للفرقة التانية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select value={subject} onChange={(event) => setSubject(event.target.value as EngineeringSubject)} aria-label="اختار المادة" className="rounded-xl border border-border bg-background px-2 py-2 text-xs text-foreground"><option value="عام">اختار المادة</option>{SUBJECTS.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}</select>
          {messages.length > 1 && <button onClick={handleClearChat} className="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer" title="مسح المحادثة"><Trash2 className="h-4 w-4" /><span className="hidden sm:inline">مسح المحادثة</span></button>}
        </div>
      </motion.div>

      {/* Main Chat Workspace */}
      <motion.div
        initial={animationsEnabled ? { y: 20, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border/80 rounded-3xl shadow-2xl flex flex-col h-[650px] overflow-hidden"
      >
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-primary/15 text-primary border border-primary/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl space-y-1 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none font-medium shadow-md'
                    : msg.error ? 'bg-destructive/10 text-destructive border border-destructive/30 rounded-tl-none shadow-xs' : 'bg-muted/60 text-foreground border border-border/60 rounded-tl-none shadow-xs'
                }`}
              >
                <div>{msg.text}</div>

                <div className="flex items-center justify-between gap-4 pt-1 text-[10px] opacity-70">
                  <span className="font-mono">{msg.time}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopyText(msg.text, msg.id)}
                      className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                      title="نسخ النص"
                    >
                      {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === msg.id ? 'تم النسخ' : 'نسخ'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/40 w-fit text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>جاري المعالجة وتوليد الإجابة الهندسية...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Templates Prompt Bar */}
        {messages.length < 3 && (
          <div className="p-3 bg-muted/20 border-t border-border/40 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {TEMPLATE_PROMPTS.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(tp.prompt, tp.title === 'Generate Quiz' ? 'quiz' : tp.title === 'Create Flashcards' ? 'flashcards' : tp.title === 'Solve Problem' ? 'solve' : 'explain')}
                    className="flex items-center gap-2 p-2.5 rounded-2xl bg-background border border-border/60 hover:border-primary text-right text-xs transition-all shrink-0 cursor-pointer hover:shadow-md max-w-[240px]"
                  >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-foreground truncate">{tp.title}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{tp.prompt}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-card border-t border-border/60 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={4000}
            className="flex-1 bg-background border border-border rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="h-11 px-5 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>إرسال</span>
            <Send className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
