import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { 
  Lock, LogOut, Plus, CheckCircle, AlertCircle, 
  BookOpen, FolderOpen, Tag, GraduationCap, Link as LinkIcon, FileText, Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("mos55@dtu.app");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // فورم الداتا الشامل
  const [formData, setFormData] = useState({
    title: "",
    category: "lecture",
    department: "mechatronics",
    academic_year: "year1",
    semester: "first",
    course_name: "",
    file_url: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage({ type: "error", text: "بيانات الدخول غير صحيحة!" });
    setLoading(false);
  };

  const handleLogout = async () => await supabase.auth.signOut();

  const handleSubmitMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.from("materials").insert([formData]);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "تم رفع الملف بنجاح! 🚀 جاهز للي بعده؟" });
      // تفريغ اسم الملف واللينك فقط لتسريع الرفع المتتالي لنفس المادة
      setFormData({ ...formData, title: "", file_url: "" }); 
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-card p-8 rounded-3xl shadow-2xl border border-border/50">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
              <Lock className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center mb-2">بوابة التحكم السرية</h2>
          <p className="text-center text-muted-foreground text-sm mb-8">خاص بمدير منصة DTU Hub فقط</p>
          
          {message && (
            <div className={`p-4 mb-6 rounded-xl text-sm flex items-center gap-2 font-medium ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
              <AlertCircle className="w-5 h-5" /> {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 rounded-xl bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 rounded-xl bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required dir="ltr" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 mt-2">
              {loading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-background pt-24 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black">إدارة المحتوى والماتريال</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">حساب الأدمن: <span className="font-mono text-primary">{session.user.email}</span></p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-bold text-sm">
            <LogOut className="w-4 h-4" /> تسجيل خروج
          </button>
        </div>

        {/* Upload Form Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-6 sm:p-8 rounded-3xl border border-border/50 shadow-xl shadow-black/5">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/50">
            <div className="p-2.5 bg-primary rounded-xl text-primary-foreground shadow-sm">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">رفع ملف جديد</h2>
          </div>

          {message && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 mb-8 rounded-2xl flex items-center gap-3 border ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
              {message.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              <span className="font-bold">{message.text}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmitMaterial} className="space-y-6">
            
            {/* الصف الأول: المادة واسم الملف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <BookOpen className="w-4 h-4 text-primary" /> اسم المادة
                </label>
                <input type="text" required value={formData.course_name} onChange={(e) => setFormData({...formData, course_name: e.target.value})} placeholder="مثال: Control Systems أو إلكترونيات" className="w-full p-3.5 rounded-xl bg-accent/30 border border-border focus:border-primary focus:bg-background outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <FileText className="w-4 h-4 text-primary" /> اسم الملف / الماتريال
                </label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="مثال: المحاضرة الأولى، شيت 1، ملخص الميدتيرم..." className="w-full p-3.5 rounded-xl bg-accent/30 border border-border focus:border-primary focus:bg-background outline-none transition-all" />
              </div>
            </div>

            {/* الصف الثاني: الفرقة والترم والقسم */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-accent/20 rounded-2xl border border-border/40">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <GraduationCap className="w-4 h-4 text-primary" /> الفرقة الدراسية
                </label>
                <select value={formData.academic_year} onChange={(e) => setFormData({...formData, academic_year: e.target.value})} className="w-full p-3.5 rounded-xl bg-background border border-border focus:border-primary outline-none cursor-pointer">
                  <option value="year1">الفرقة الأولى</option>
                  <option value="year2">الفرقة الثانية</option>
                  <option value="year3">الفرقة الثالثة</option>
                  <option value="year4">الفرقة الرابعة</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <Calendar className="w-4 h-4 text-primary" /> الترم
                </label>
                <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} className="w-full p-3.5 rounded-xl bg-background border border-border focus:border-primary outline-none cursor-pointer">
                  <option value="first">الترم الأول</option>
                  <option value="second">الترم الثاني</option>
                  <option value="summer">سمر كورس</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <FolderOpen className="w-4 h-4 text-primary" /> القسم
                </label>
                <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full p-3.5 rounded-xl bg-background border border-border focus:border-primary outline-none cursor-pointer">
                  <option value="mechatronics">ميكاترونكس</option>
                  <option value="energy">طاقة</option>
                  <option value="autotronics">أوتوترونكس</option>
                  <option value="it">تكنولوجيا المعلومات</option>
                </select>
              </div>
            </div>

            {/* الصف الثالث: نوع الملف والرابط */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <Tag className="w-4 h-4 text-primary" /> تصنيف الملف
                </label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3.5 rounded-xl bg-accent/30 border border-border focus:border-primary focus:bg-background outline-none cursor-pointer transition-all">
                  <option value="lecture">محاضرة</option>
                  <option value="section">سكشن</option>
                  <option value="sheet">شيت</option>
                  <option value="sheet_solution">حل شيت</option>
                  <option value="summary">ملخص</option>
                  <option value="revision">مراجعة</option>
                  <option value="exam">امتحان / ميدتيرم</option>
                  <option value="quiz">كويز</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                  <LinkIcon className="w-4 h-4 text-primary" /> رابط الملف (Google Drive, MediaFire, PDF...)
                </label>
                <input type="url" required value={formData.file_url} onChange={(e) => setFormData({...formData, file_url: e.target.value})} placeholder="https://drive.google.com/..." className="w-full p-3.5 rounded-xl bg-accent/30 border border-border focus:border-primary focus:bg-background outline-none transition-all text-left" dir="ltr" />
              </div>
            </div>

            {/* زر الرفع */}
            <div className="pt-4">
              <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex justify-center items-center gap-3 active:scale-[0.98]">
                {loading ? (
                  <span className="flex items-center gap-2">جاري الرفع لقاعدة البيانات... <span className="animate-spin text-xl">⏳</span></span>
                ) : (
                  <><Plus className="w-6 h-6" /> رفع الماتريال فوراً</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}