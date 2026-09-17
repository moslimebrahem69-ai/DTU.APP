import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Send, User, Loader2, Code, BookOpen, Calendar, HelpCircle } from 'lucide-react';
import { askDTUAssistant, type ChatMessage } from '../../services/aiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  error?: boolean;
}

const QUICK_PROMPTS = [
  { label: 'شرح مفهوم PLC', icon: BookOpen, prompt: 'اشرح لي مفهوم الـ PLC الأساسي بأسلوب مبسط' },
  { label: 'مراجعة كود', icon: Code, prompt: 'كيف يمكنني مراجعة واكتشاف الأخطاء في كود C++ أو Matlab؟' },
  { label: 'خطة مذاكرة اليوم', icon: Calendar, prompt: 'اقترح علي خطة مذاكرة يومية لفرقة ميكاترونكس ثانية' },
];

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'أهلاً يا صاحبي، أنا حنكش 🤖. قولي إيه اللي واقف معاك في الميكاترونكس؟',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const history: ChatMessage[] = messages.map((message) => ({ role: message.sender === 'user' ? 'user' : 'assistant', content: message.text }));
    const result = await askDTUAssistant(query, history, 'chat');
    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: result.text, error: !result.ok };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none" dir="rtl">
      {/* Dynamic Floating Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 cursor-pointer"
      >
        <Bot className="h-7 w-7 animate-pulse" />
        <Sparkles className="h-3.5 w-3.5 text-amber-300 absolute top-2 right-2 animate-spin" style={{ animationDuration: '4s' }} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 left-0 w-[90vw] max-w-[380px] h-[520px] bg-card border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-foreground">حنكش 🤖</h3>
                  <p className="text-[10px] text-muted-foreground">متصل ومستعد للمساعدة ⚡</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-1.5 rounded-xl shrink-0 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                    {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground font-medium rounded-tr-none'
                        : msg.error ? 'bg-destructive/10 text-destructive border border-destructive/30 rounded-tl-none' : 'bg-muted/70 text-foreground border border-border/50 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs p-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>المساعد الذكي يفكر ويكتب الإجابة...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="p-2 border-t border-border/30 bg-muted/20 flex gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(qp.prompt)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-background border border-border/60 text-[10px] font-bold text-muted-foreground hover:text-primary transition-all shrink-0 cursor-pointer"
                  >
                    <qp.icon className="h-3 w-3" />
                    <span>{qp.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <div className="p-3 border-t border-border/40 bg-card flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل عن مادة، كود، أو مفهوم..."
                className="flex-1 bg-background border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
