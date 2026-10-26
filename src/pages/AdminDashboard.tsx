import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { 
  Lock, LogOut, Upload, CheckCircle2, AlertCircle, 
  BookOpen, FolderOpen, Tag, GraduationCap, Link as LinkIcon, FileText, Calendar, Cpu, CloudUpload
} from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";

// 1. قاعدة البيانات المحلية للمواد
const COLLEGE_CURRICULUM: Record<string, Record<string, Record<string, string[]>>> = {
  "year1": {
    "mechatronics": { 
      "first": ["تطبيقات العلوم والرياضة", "الرياضيات", "السفتي", "الفيزياء", "انجليزي 1", "مهارات التواصل"],
      "second": ["الحركية بالحاسب", "انجليزي 2", "تصميم هندسي", "تكنولوجيا الحاسب", "دراسات بيئية", "دوائر كهربائية", "مبادئ ورش الميكاترونيكس"]
    },
    "renewable": {
      "first": ["التصميم الهندسي", "رياضيات 1", "انجليزي 1", "طاقة متجددة", "ماتلاب", "مبادئ كهربائية"],
      "second": ["الكترونات رقمية", "السفتي", "انجليزي 2", "حقوق الانسان", "رياضيات 2", "ميكانيكا", "ورش عمل"]
    }
  },
  "year2": {
    "mechatronics": {
      "first": ["تطبيقات النيوماتيك والهيدروليك", "برمجة لتطبيقات الميكاترونيكس (Matlab)", "إختيار المواد", "أساسيات التحكم بالحاسبات (PC)", "المتحكم المنطقي المبرمج (PLC)"],
      "second": ["ورش كهربية و الكترونية (PCB)", "صيانة الأنظمة الكهروميكانيكية", "تصميم كابستون (CD)", "أنظمة الميكاترونيات للفنيين", "مقرر إختياري (تكنولوجيا التصنيع)", "المشاريع وريادة الاعمال"]
    }
  },
  "year3": {
    "mechatronics": {
      "first": ["3D CAD", "Mathematics", "Robotics", "Sensors", "تحكم آلي"],
      "second": ["C N C Technology", "Mechanism Design", "Microprocessor", "Power Electronics", "Production and Planning"]
    }
  }
};

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("mos55@dtu.app");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // إعدادات الرفع الجديدة
  const [uploadMethod, setUploadMethod] = useState<'link' | 'file'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "lecture",
    department: "mechatronics",
    academic_year: "year2",
    semester: "first",
    course_name: "",
    file_url: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const availableCourses = useMemo(() => {
    try {
      return COLLEGE_CURRICULUM[formData.academic_year]?.[formData.department]?.[formData.semester] || [];
    } catch {
      return [];
    }
  }, [formData.academic_year, formData.department, formData.semester]);

  useEffect(() => {
    if (availableCourses.length > 0 && !availableCourses.includes(formData.course_name)) {
      setFormData(prev => ({ ...prev, course_name: availableCourses[0] }));
    } else if (availableCourses.length === 0 && formData.course_name !== "") {
      setFormData(prev => ({ ...prev, course_name: "" }));
    }
  }, [availableCourses, formData.course_name]);

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
    if (!formData.course_name) {
      setMessage({ type: "error", text: "يرجى اختيار مادة قبل الرفع." });
      return;
    }

    if (uploadMethod === 'link' && !formData.file_url) {
      setMessage({ type: "error", text: "يرجى إدخال رابط الملف الخارجي." });
      return;
    }

    if (uploadMethod === 'file' && !selectedFile) {
      setMessage({ type: "error", text: "يرجى اختيار ملف لرفعه من جهازك." });
      return;
    }
    
    setLoading(true);
    setMessage(null);

    try {
      let finalUrl = formData.file_url;

      // لو اليوزر اختار يرفع ملف من جهازه
      if (uploadMethod === 'file' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${formData.academic_year}/${formData.department}/${formData.semester}/${fileName}`;

        // رفع الملف لـ Supabase Storage (يجب أن يكون لديك Bucket باسم materials)
        const { error: uploadError } = await supabase.storage
          .from('materials')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        // الحصول على الرابط العام للملف بعد الرفع
        const { data: { publicUrl } } = supabase.storage
          .from('materials')
          .getPublicUrl(filePath);

        finalUrl = publicUrl;
      }

      // حفظ البيانات في جدول materials
      const { error: dbError } = await supabase.from("materials").insert([{
        title: formData.title,
        category: formData.category,
        department: formData.department,
        academic_year: formData.academic_year,
        semester: formData.semester,
        course_name: formData.course_name,
        file_url: finalUrl
      }]);

      if (dbError) throw dbError;

      setMessage({ type: "success", text: "تم رفع الملف ونشره بنجاح! 🚀" });
      
      // تصفير الخانات
      setFormData({ ...formData, title: "", file_url: "" }); 
      setSelectedFile(null);
      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      const err = error as Error;
      setMessage({ type: "error", text: err.message || "حدث خطأ أثناء الرفع." });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-accent/20 border border-border/50 text-foreground text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 appearance-none";
  const labelClasses = "flex items-center gap-1.5 text-xs font-bold text-muted-foreground mb-2 px-1";

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
              <AlertCircle className="w-5 h-5 shrink-0" /> {message.text}
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
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-card p-5 rounded-3xl border border-border/50 shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black">إدارة المحتوى والماتريال</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">حساب الأدمن: <span className="font-mono text-primary">{session.user.email}</span></p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-bold text-sm w-full sm:w-auto justify-center shrink-0">
            <LogOut className="w-4 h-4" /> تسجيل خروج
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-border/40 shadow-2xl shadow-black/5">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border/40">
            <div className="w-12 h-12 bg-primary rounded-2xl text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">رفع ماتريال جديد</h2>
              <p className="text-sm text-muted-foreground mt-1">أضف المحاضرات والملخصات لتظهر فوراً للطلاب.</p>
            </div>
          </div>

          {message && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 mb-8 rounded-2xl flex items-center gap-3 border ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
              <span className="font-bold text-sm">{message.text}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmitMaterial} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-accent/10 border border-border/30 rounded-2xl">
              <div>
                <label className={labelClasses}><GraduationCap className="w-4 h-4 text-primary" /> الفرقة الدراسية</label>
                <select value={formData.academic_year} onChange={(e) => setFormData({...formData, academic_year: e.target.value})} className={inputClasses}>
                  <option value="year1">الفرقة الأولى</option>
                  <option value="year2">الفرقة الثانية</option>
                  <option value="year3">الفرقة الثالثة</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}><Cpu className="w-4 h-4 text-primary" /> القسم</label>
                <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className={inputClasses}>
                  <option value="mechatronics">ميكاترونكس</option>
                  <option value="renewable">طاقة متجددة</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}><Calendar className="w-4 h-4 text-primary" /> الترم</label>
                <select value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} className={inputClasses}>
                  <option value="first">الترم الأول</option>
                  <option value="second">الترم الثاني</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}><BookOpen className="w-4 h-4 text-primary" /> اسم المادة (يتحدث تلقائياً)</label>
                <select 
                  value={formData.course_name} 
                  onChange={(e) => setFormData({...formData, course_name: e.target.value})} 
                  className={`${inputClasses} font-bold text-primary`}
                  required
                >
                  {availableCourses.length === 0 ? (
                    <option value="" disabled>لا توجد مواد مسجلة لهذا القسم/الترم</option>
                  ) : (
                    availableCourses.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className={labelClasses}><Tag className="w-4 h-4 text-primary" /> تصنيف الملف</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={inputClasses}>
                  <option value="lecture">محاضرة</option>
                  <option value="section">سكشن</option>
                  <option value="sheet">شيت</option>
                  <option value="sheet_solution">حل شيت</option>
                  <option value="summary">ملخص / مراجعة</option>
                  <option value="exam">امتحان سابق</option>
                  <option value="quiz">كويز</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}><FileText className="w-4 h-4 text-primary" /> عنوان الملف / الماتريال</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="مثال: المحاضرة الأولى، ملخص الميدتيرم..." 
                  className={inputClasses}
                />
              </div>

              <div className="space-y-3">
                <label className={labelClasses}><LinkIcon className="w-4 h-4 text-primary" /> تفاصيل الملف</label>
                
                {/* أزرار التبديل بين رفع ملف ورابط خارجي */}
                <div className="flex p-1 bg-accent/30 rounded-xl border border-border/40">
                  <button 
                    type="button" 
                    onClick={() => setUploadMethod('file')} 
                    className={`flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold rounded-lg transition-all ${uploadMethod === 'file' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <CloudUpload className="w-3.5 h-3.5" /> رفع PDF/ملف
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setUploadMethod('link')} 
                    className={`flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold rounded-lg transition-all ${uploadMethod === 'link' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> رابط خارجي
                  </button>
                </div>

                {/* الحقل المتغير حسب الاختيار */}
                {uploadMethod === 'link' ? (
                  <input 
                    type="url" 
                    required 
                    value={formData.file_url} 
                    onChange={(e) => setFormData({...formData, file_url: e.target.value})} 
                    placeholder="https://drive.google.com/..." 
                    className={inputClasses} 
                    dir="ltr" 
                  />
                ) : (
                  <input 
                    type="file" 
                    required 
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full bg-accent/20 border border-border/50 text-foreground text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading || availableCourses.length === 0} 
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/25 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    جاري الرفع... 
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  </span>
                ) : (
                  <><Upload className="w-5 h-5" /> رفع ونشر الماتريال فوراً</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}