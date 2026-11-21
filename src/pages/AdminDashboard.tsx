import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../lib/supabase";
import {
  Lock,
  LogOut,
  Upload,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  FolderOpen,
  Tag,
  GraduationCap,
  Link as LinkIcon,
  FileText,
  Calendar,
  Cpu,
  CloudUpload,
  Trash2,
  Edit3,
  Search,
  Filter,
  Video,
  Image as ImageIcon,
  Eye,
  X,
  PlusCircle,
  Database,
  ExternalLink,
  RefreshCw,
  Check,
  FileCheck2,
  Code2,
  Clock,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import {
  collegeData,
  year1MechatronicsCourses,
  year2MechatronicsCourses,
  year3MechatronicsCourses,
  year1RenewableCourses,
  Course,
} from "../data/collegeData";

interface MaterialRecord {
  id: string;
  title: string;
  category: string;
  department: string;
  academic_year: string;
  semester: string;
  course_name: string;
  file_url: string;
  created_at: string;
}

interface ExamRecord {
  id: string;
  academic_year: string;
  department: string;
  semester: string;
  course_id: string;
  course_name: string;
  title: string;
  description: string | null;
  exam_type: "lecture" | "midterm" | "final" | "quiz";
  lecture_number: number | null;
  question_count: number | null;
  duration_minutes: number | null;
  source_type: "html" | "link";
  html_code: string | null;
  exam_url: string | null;
  is_ai_generated: boolean;
  created_at: string;
}

type MediaKind = "video" | "image" | "document" | "link";
type UploadMode = "file" | "video" | "image" | "link";
type ExamSourceMode = "html_paste" | "html_file" | "link";
type ActiveTab = "manage_materials" | "upload_material" | "manage_exams";

const CATEGORY_LABELS: Record<string, string> = {
  lecture: "محاضرة",
  section: "سكشن",
  sheet: "شيت",
  sheet_solution: "حل شيت",
  summary: "ملخص / مراجعة",
  exam: "امتحان سابق",
  quiz: "كويز",
  video: "فيديو شرح",
  image: "صور / سبورة",
};

const EXAM_TYPE_LABELS: Record<string, string> = {
  lecture: "اختبار محاضرة",
  midterm: "اختبار ميدترم",
  final: "اختبار فاينل",
  quiz: "كويز سريع",
};

const YEAR_LABELS: Record<string, string> = {
  year1: "الفرقة الأولى",
  year2: "الفرقة الثانية",
  year3: "الفرقة الثالثة",
  year4: "الفرقة الرابعة",
};

const DEPT_LABELS: Record<string, string> = {
  mechatronics: "ميكاترونكس",
  renewable: "طاقة متجددة",
};

const SEMESTER_LABELS: Record<string, string> = {
  first: "الترم الأول",
  second: "الترم الثاني",
};

function getCoursesForSelection(yearId: string, deptId: string, semester: string): Course[] {
  const semKey = semester === "first" ? "semester1" : "semester2";
  if (deptId === "mechatronics") {
    if (yearId === "year1") return year1MechatronicsCourses[semKey] || [];
    if (yearId === "year2") return year2MechatronicsCourses[semKey] || [];
    if (yearId === "year3") return year3MechatronicsCourses[semKey] || [];
  } else if (deptId === "renewable") {
    if (yearId === "year1") return year1RenewableCourses[semKey] || [];
  }
  return [];
}

function detectMediaKind(url: string, category?: string): MediaKind {
  const lower = url.toLowerCase();
  if (
    category === "video" ||
    /\.(mp4|webm|mov|mkv|avi)(\?.*)?$/.test(lower) ||
    lower.includes("youtube.com") ||
    lower.includes("youtu.be")
  ) {
    return "video";
  }
  if (category === "image" || /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/.test(lower)) {
    return "image";
  }
  if (lower.includes("supabase.co/storage")) {
    return "document";
  }
  return "link";
}

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/storage/v1/object/public/materials/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(publicUrl.slice(idx + marker.length));
}

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("mos55@dtu.app");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>("manage_materials");

  // بيانات الماتريال
  const [materials, setMaterials] = useState<MaterialRecord[]>([]);
  const [fetchingMaterials, setFetchingMaterials] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // بيانات الاختبارات
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [fetchingExams, setFetchingExams] = useState(false);

  // فلاتر البحث
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterDept, setFilterDept] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // حالة رفع الماتريال
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "lecture",
    department: "mechatronics",
    academic_year: "year2",
    semester: "first",
    course_name: "",
    file_url: "",
  });

  // حالة إضافة امتحان جديد
  const [showExamForm, setShowExamForm] = useState(false);
  const [examSourceMode, setExamSourceMode] = useState<ExamSourceMode>("html_paste");
  const [examForm, setExamForm] = useState({
    academic_year: "year2",
    department: "mechatronics",
    semester: "first",
    course_id: "",
    course_name: "",
    title: "",
    description: "",
    exam_type: "lecture" as "lecture" | "midterm" | "final" | "quiz",
    lecture_number: "",
    question_count: "",
    duration_minutes: "",
    html_code: "",
    exam_url: "",
    is_ai_generated: true,
  });

  // نوافذ التعديل والمعاينة
  const [editingItem, setEditingItem] = useState<MaterialRecord | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [previewItem, setPreviewItem] = useState<MaterialRecord | null>(null);
  const [previewExam, setPreviewExam] = useState<ExamRecord | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      setFetchingMaterials(true);
      setFetchingExams(true);

      const [matRes, examRes] = await Promise.all([
        supabase.from("materials").select("*").order("created_at", { ascending: false }),
        supabase.from("exams").select("*").order("created_at", { ascending: false }),
      ]);

      if (matRes.error) throw matRes.error;
      setMaterials((matRes.data as MaterialRecord[]) || []);

      if (!examRes.error) {
        setExams((examRes.data as ExamRecord[]) || []);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "فشل تحميل البيانات.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setFetchingMaterials(false);
      setFetchingExams(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchAllData();
    }
  }, [session, fetchAllData]);

  useEffect(() => {
    if (!selectedFile) {
      setFilePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setFilePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // الأقسام والمواد لفورم الماتريال
  const availableDepartments = useMemo(() => {
    const yearObj = collegeData.find((y) => y.id === formData.academic_year);
    return yearObj ? yearObj.departments.filter((d) => d.enabled) : [];
  }, [formData.academic_year]);

  useEffect(() => {
    if (
      availableDepartments.length > 0 &&
      !availableDepartments.some((d) => d.id === formData.department)
    ) {
      setFormData((prev) => ({ ...prev, department: availableDepartments[0].id }));
    }
  }, [availableDepartments, formData.department]);

  const availableCourses = useMemo(() => {
    return getCoursesForSelection(
      formData.academic_year,
      formData.department,
      formData.semester
    );
  }, [formData.academic_year, formData.department, formData.semester]);

  useEffect(() => {
    if (
      availableCourses.length > 0 &&
      !availableCourses.some((c) => c.name === formData.course_name)
    ) {
      setFormData((prev) => ({ ...prev, course_name: availableCourses[0].name }));
    } else if (availableCourses.length === 0 && formData.course_name !== "") {
      setFormData((prev) => ({ ...prev, course_name: "" }));
    }
  }, [availableCourses, formData.course_name]);

  // الأقسام والمواد لفورم الاختبارات
  const examAvailableDepartments = useMemo(() => {
    const yearObj = collegeData.find((y) => y.id === examForm.academic_year);
    return yearObj ? yearObj.departments.filter((d) => d.enabled) : [];
  }, [examForm.academic_year]);

  useEffect(() => {
    if (
      examAvailableDepartments.length > 0 &&
      !examAvailableDepartments.some((d) => d.id === examForm.department)
    ) {
      setExamForm((prev) => ({ ...prev, department: examAvailableDepartments[0].id }));
    }
  }, [examAvailableDepartments, examForm.department]);

  const examAvailableCourses = useMemo(() => {
    return getCoursesForSelection(
      examForm.academic_year,
      examForm.department,
      examForm.semester
    );
  }, [examForm.academic_year, examForm.department, examForm.semester]);

  useEffect(() => {
    if (examAvailableCourses.length > 0) {
      const exists = examAvailableCourses.some((c) => c.id === examForm.course_id);
      if (!exists) {
        setExamForm((prev) => ({
          ...prev,
          course_id: examAvailableCourses[0].id,
          course_name: examAvailableCourses[0].name,
        }));
      }
    } else if (examForm.course_id !== "") {
      setExamForm((prev) => ({ ...prev, course_id: "", course_name: "" }));
    }
  }, [examAvailableCourses, examForm.course_id]);

  const editAvailableCourses = useMemo(() => {
    if (!editingItem) return [];
    return getCoursesForSelection(
      editingItem.academic_year,
      editingItem.department,
      editingItem.semester
    );
  }, [editingItem]);

  // إحصائيات الـ ERP
  const stats = useMemo(() => {
    let videos = 0;
    let images = 0;
    let docs = 0;
    for (const item of materials) {
      const kind = detectMediaKind(item.file_url, item.category);
      if (kind === "video") videos++;
      else if (kind === "image") images++;
      else docs++;
    }
    return {
      totalMaterials: materials.length,
      totalExams: exams.length,
      videos,
      images,
      docs,
    };
  }, [materials, exams]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      if (filterYear !== "all" && item.academic_year !== filterYear) return false;
      if (filterDept !== "all" && item.department !== filterDept) return false;
      if (filterSemester !== "all" && item.semester !== filterSemester) return false;
      if (filterCategory !== "all" && item.category !== filterCategory) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.course_name.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [materials, filterYear, filterDept, filterSemester, filterCategory, searchQuery]);

  const filteredExams = useMemo(() => {
    return exams.filter((item) => {
      if (filterYear !== "all" && item.academic_year !== filterYear) return false;
      if (filterDept !== "all" && item.department !== filterDept) return false;
      if (filterSemester !== "all" && item.semester !== filterSemester) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.course_name.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [exams, filterYear, filterDept, filterSemester, searchQuery]);

  const showNotification = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showNotification("error", "بيانات الدخول غير صحيحة!");
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleModeChange = (mode: UploadMode) => {
    setUploadMode(mode);
    setSelectedFile(null);
    if (mode === "video") {
      setFormData((prev) => ({ ...prev, category: "video" }));
    } else if (mode === "image") {
      setFormData((prev) => ({ ...prev, category: "image" }));
    } else if (formData.category === "video" || formData.category === "image") {
      setFormData((prev) => ({ ...prev, category: "lecture" }));
    }
  };

  const handleSubmitMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course_name) {
      showNotification("error", "يرجى اختيار مادة قبل الرفع.");
      return;
    }

    const isFileUpload = uploadMode === "file" || uploadMode === "video" || uploadMode === "image";

    if (uploadMode === "link" && !formData.file_url.trim()) {
      showNotification("error", "يرجى إدخال الرابط الخارجي.");
      return;
    }

    if (isFileUpload && !selectedFile) {
      showNotification("error", "يرجى اختيار الملف المراد رفعه من جهازك.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      let finalUrl = formData.file_url.trim();

      if (isFileUpload && selectedFile) {
        const fileExt = selectedFile.name.split(".").pop() || "bin";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${formData.academic_year}/${formData.department}/${formData.semester}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("materials")
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("materials").getPublicUrl(filePath);

        finalUrl = publicUrl;
      }

      const { data: insertedData, error: dbError } = await supabase
        .from("materials")
        .insert([
          {
            title: formData.title.trim(),
            category: formData.category,
            department: formData.department,
            academic_year: formData.academic_year,
            semester: formData.semester,
            course_name: formData.course_name,
            file_url: finalUrl,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      if (insertedData) {
        setMaterials((prev) => [insertedData as MaterialRecord, ...prev]);
      } else {
        await fetchAllData();
      }

      showNotification("success", "تم رفع الماتريال وإضافتها للأرشيف بنجاح!");
      setFormData((prev) => ({ ...prev, title: "", file_url: "" }));
      setSelectedFile(null);
      setActiveTab("manage_materials");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ أثناء الرفع.";
      showNotification("error", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // قراءة ملف .html عند اختياره من الجهاز
  const handleHtmlFileUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      const extractedTitle = titleMatch ? titleMatch[1].trim() : file.name.replace(/\.html?$/i, "");
      setExamForm((prev) => ({
        ...prev,
        html_code: text,
        title: prev.title.trim() ? prev.title : extractedTitle,
      }));
      showNotification("success", `تم تحميل كود ملف (${file.name}) بنجاح!`);
    } catch {
      showNotification("error", "تعذر قراءة ملف الـ HTML.");
    }
  };

  // حفظ امتحان جديد (HTML أو رابط)
  const handleSubmitExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examForm.course_id || !examForm.course_name) {
      showNotification("error", "يرجى اختيار المادة أولاً.");
      return;
    }

    const isHtml = examSourceMode === "html_paste" || examSourceMode === "html_file";

    if (isHtml && !examForm.html_code.trim()) {
      showNotification("error", "يرجى لصق كود الـ HTML أو رفع ملف .html للامتحان.");
      return;
    }

    if (!isHtml && !examForm.exam_url.trim()) {
      showNotification("error", "يرجى إدخال رابط الامتحان (مثل رابط Vercel).");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        academic_year: examForm.academic_year,
        department: examForm.department,
        semester: examForm.semester,
        course_id: examForm.course_id,
        course_name: examForm.course_name,
        title: examForm.title.trim(),
        description: examForm.description.trim() || null,
        exam_type: examForm.exam_type,
        lecture_number: examForm.lecture_number ? Number(examForm.lecture_number) : null,
        question_count: examForm.question_count ? Number(examForm.question_count) : null,
        duration_minutes: examForm.duration_minutes ? Number(examForm.duration_minutes) : null,
        source_type: isHtml ? "html" : "link",
        html_code: isHtml ? examForm.html_code : null,
        exam_url: !isHtml ? examForm.exam_url.trim() : null,
        is_ai_generated: examForm.is_ai_generated,
      };

      const { data: insertedExam, error } = await supabase
        .from("exams")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      if (insertedExam) {
        setExams((prev) => [insertedExam as ExamRecord, ...prev]);
      } else {
        await fetchAllData();
      }

      showNotification("success", "تم نشر الاختبار بنجاح وسيظهر فوراً في صفحة الاختبارات!");
      setExamForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        lecture_number: "",
        question_count: "",
        duration_minutes: "",
        html_code: "",
        exam_url: "",
      }));
      setShowExamForm(false);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ أثناء نشر الاختبار.";
      showNotification("error", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async (exam: ExamRecord) => {
    const confirmed = window.confirm(`هل أنت متأكد من حذف اختبار "${exam.title}" نهائياً؟`);
    if (!confirmed) return;

    try {
      setDeletingId(exam.id);
      const { error } = await supabase.from("exams").delete().eq("id", exam.id);
      if (error) throw error;

      setExams((prev) => prev.filter((ex) => ex.id !== exam.id));
      showNotification("success", "تم حذف الاختبار بنجاح.");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ أثناء حذف الاختبار.";
      showNotification("error", errorMsg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteMaterial = async (item: MaterialRecord) => {
    const confirmed = window.confirm(`هل أنت متأكد من حذف "${item.title}" نهائياً؟`);
    if (!confirmed) return;

    try {
      setDeletingId(item.id);
      const storagePath = extractStoragePath(item.file_url);
      if (storagePath) {
        await supabase.storage.from("materials").remove([storagePath]);
      }

      const { error } = await supabase.from("materials").delete().eq("id", item.id);
      if (error) throw error;

      setMaterials((prev) => prev.filter((m) => m.id !== item.id));
      showNotification("success", "تم حذف الماتريال نهائياً من النظام.");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ أثناء الحذف.";
      showNotification("error", errorMsg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setSavingEdit(true);
      const { error } = await supabase
        .from("materials")
        .update({
          title: editingItem.title.trim(),
          category: editingItem.category,
          academic_year: editingItem.academic_year,
          department: editingItem.department,
          semester: editingItem.semester,
          course_name: editingItem.course_name,
          file_url: editingItem.file_url.trim(),
        })
        .eq("id", editingItem.id);

      if (error) throw error;

      setMaterials((prev) =>
        prev.map((m) => (m.id === editingItem.id ? editingItem : m))
      );
      setEditingItem(null);
      showNotification("success", "تم حفظ التعديلات بنجاح.");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "فشل حفظ التعديلات.";
      showNotification("error", errorMsg);
    } finally {
      setSavingEdit(false);
    }
  };

  const getAcceptAttribute = (): string => {
    if (uploadMode === "video") return "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.mkv";
    if (uploadMode === "image") return "image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp";
    return ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar";
  };

  const inputClasses =
    "w-full bg-accent/20 border border-border/50 text-foreground text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50";
  const labelClasses =
    "flex items-center gap-1.5 text-xs font-bold text-muted-foreground mb-1.5 px-1";

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card p-8 rounded-3xl shadow-2xl border border-border/50"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
              <Lock className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center mb-2">نظام إدارة المنصة ERP</h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            تسجيل دخول مدير منصة DTU Hub
          </p>

          {message && (
            <div
              className={`p-4 mb-6 rounded-xl text-sm flex items-center gap-2 font-medium ${
                message.type === "error"
                  ? "bg-red-500/10 text-red-500 border border-red-500/20"
                  : "bg-green-500/10 text-green-500 border border-green-500/20"
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0" /> {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 mt-2"
            >
              {loading ? "جاري التحقق..." : "دخول للنظام"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-background pt-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top ERP Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-card p-5 rounded-3xl border border-border/50 shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black">نظام إدارة المنصة المتكامل (DTU ERP)</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                الأدمن: <span className="font-mono text-primary">{session.user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchAllData}
              disabled={fetchingMaterials || fetchingExams}
              className="p-3 bg-accent/50 text-foreground rounded-xl hover:bg-accent transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw
                className={`w-4 h-4 ${fetchingMaterials || fetchingExams ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-bold text-sm flex-1 sm:flex-initial justify-center"
            >
              <LogOut className="w-4 h-4" /> تسجيل خروج
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">إجمالي الماتريال</p>
              <p className="text-xl font-black">{stats.totalMaterials}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">الاختبارات المرفوعة</p>
              <p className="text-xl font-black">{stats.totalExams}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">ملفات وروابط</p>
              <p className="text-xl font-black">{stats.docs}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">فيديوهات شرح</p>
              <p className="text-xl font-black">{stats.videos}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3 col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">صور وسبورات</p>
              <p className="text-xl font-black">{stats.images}</p>
            </div>
          </div>
        </div>

        {/* Global Alert Banner */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-2xl flex items-center gap-3 border ${
                message.type === "error"
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-green-500/10 text-green-500 border-green-500/20"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span className="font-bold text-sm">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 p-1.5 bg-card rounded-2xl border border-border/50 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("manage_materials")}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "manage_materials"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <Database className="w-4 h-4" /> أرشيف الماتريال ({materials.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("manage_exams")}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "manage_exams"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> الاختبارات الإلكترونية ({exams.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("upload_material")}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "upload_material"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            <PlusCircle className="w-4 h-4" /> رفع ماتريال جديد
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MANAGE MATERIALS ARCHIVE */}
        {/* ========================================================= */}
        {activeTab === "manage_materials" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border/50 p-5 sm:p-6 space-y-5 shadow-sm"
          >
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم الملف أو اسم المادة..."
                  className="w-full bg-accent/20 border border-border/50 rounded-xl pr-11 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 bg-accent/20 border border-border/40 rounded-xl px-3 py-2">
                  <Filter className="w-3.5 h-3.5 text-primary shrink-0" />
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold focus:outline-none"
                  >
                    <option value="all">كل الفرق</option>
                    <option value="year1">الفرقة الأولى</option>
                    <option value="year2">الفرقة الثانية</option>
                    <option value="year3">الفرقة الثالثة</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-accent/20 border border-border/40 rounded-xl px-3 py-2">
                  <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold focus:outline-none"
                  >
                    <option value="all">كل الأقسام</option>
                    <option value="mechatronics">ميكاترونكس</option>
                    <option value="renewable">طاقة متجددة</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-accent/20 border border-border/40 rounded-xl px-3 py-2">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  <select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold focus:outline-none"
                  >
                    <option value="all">كل الترمات</option>
                    <option value="first">الترم الأول</option>
                    <option value="second">الترم الثاني</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-accent/20 border border-border/40 rounded-xl px-3 py-2">
                  <Tag className="w-3.5 h-3.5 text-primary shrink-0" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold focus:outline-none"
                  >
                    <option value="all">كل التصنيفات</option>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {fetchingMaterials ? (
              <div className="py-16 text-center text-muted-foreground text-sm">
                جاري تحميل سجلات الماتريال...
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <FolderOpen className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <p className="text-muted-foreground text-sm font-medium">
                  لا توجد ماتريال مطابقة للبحث أو الفلتر الحالي.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload_material")}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold"
                >
                  إضافة أول ماتريال
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMaterials.map((item) => {
                  const kind = detectMediaKind(item.file_url, item.category);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-accent/15 border border-border/50 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 overflow-hidden">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            kind === "video"
                              ? "bg-rose-500/10 text-rose-500"
                              : kind === "image"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {kind === "video" ? (
                            <Video className="w-5 h-5" />
                          ) : kind === "image" ? (
                            <ImageIcon className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>

                        <div className="overflow-hidden space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-sm sm:text-base truncate">
                              {item.title}
                            </h3>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                              {CATEGORY_LABELS[item.category] || item.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                            <span className="font-bold text-foreground/80">
                              {item.course_name}
                            </span>
                            <span>•</span>
                            <span>{YEAR_LABELS[item.academic_year] || item.academic_year}</span>
                            <span>•</span>
                            <span>{DEPT_LABELS[item.department] || item.department}</span>
                            <span>•</span>
                            <span>{SEMESTER_LABELS[item.semester] || item.semester}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => setPreviewItem(item)}
                          className="px-3 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingItem(item)}
                          className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> تعديل
                        </button>

                        <button
                          type="button"
                          disabled={deletingId === item.id}
                          onClick={() => handleDeleteMaterial(item)}
                          className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {deletingId === item.id ? "جاري الحذف..." : "حذف"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MANAGE & ADD EXAMS (HTML / VERCEL LINKS) */}
        {/* ========================================================= */}
        {activeTab === "manage_exams" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Header & Toggle Add Exam Form */}
            <div className="bg-card rounded-3xl border border-border/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-primary" /> إدارة الاختبارات الإلكترونية
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  ارفع امتحان بكود HTML كامل أو أضف رابط خارجي (Vercel / Forms) ليظهر فوراً للطلاب.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExamForm((prev) => !prev)}
                className="px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                {showExamForm ? (
                  <>
                    <X className="w-4 h-4" /> إغلاق نموذج الإضافة
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" /> إضافة اختبار جديد
                  </>
                )}
              </button>
            </div>

            {/* Add Exam Form */}
            <AnimatePresence>
              {showExamForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <form
                    onSubmit={handleSubmitExam}
                    className="bg-card rounded-3xl border border-primary/30 p-6 space-y-5 shadow-md"
                  >
                    <h3 className="font-black text-base border-b border-border/40 pb-3">
                      بيانات الاختبار الجديد
                    </h3>

                    {/* Year / Dept / Semester */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/15 rounded-2xl border border-border/30">
                      <div>
                        <label className={labelClasses}>
                          <GraduationCap className="w-4 h-4 text-primary" /> الفرقة الدراسية
                        </label>
                        <select
                          value={examForm.academic_year}
                          onChange={(e) =>
                            setExamForm({ ...examForm, academic_year: e.target.value })
                          }
                          className={inputClasses}
                        >
                          {collegeData
                            .filter((y) => y.enabled)
                            .map((y) => (
                              <option key={y.id} value={y.id}>
                                {y.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>
                          <Cpu className="w-4 h-4 text-primary" /> القسم
                        </label>
                        <select
                          value={examForm.department}
                          onChange={(e) =>
                            setExamForm({ ...examForm, department: e.target.value })
                          }
                          className={inputClasses}
                        >
                          {examAvailableDepartments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>
                          <Calendar className="w-4 h-4 text-primary" /> الترم
                        </label>
                        <select
                          value={examForm.semester}
                          onChange={(e) =>
                            setExamForm({ ...examForm, semester: e.target.value })
                          }
                          className={inputClasses}
                        >
                          <option value="first">الترم الأول</option>
                          <option value="second">الترم الثاني</option>
                        </select>
                      </div>
                    </div>

                    {/* Course & Exam Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>
                          <BookOpen className="w-4 h-4 text-primary" /> المادة
                        </label>
                        <select
                          value={examForm.course_id}
                          onChange={(e) => {
                            const selected = examAvailableCourses.find(
                              (c) => c.id === e.target.value
                            );
                            setExamForm({
                              ...examForm,
                              course_id: e.target.value,
                              course_name: selected ? selected.name : "",
                            });
                          }}
                          className={`${inputClasses} font-bold text-primary`}
                          required
                        >
                          {examAvailableCourses.length === 0 ? (
                            <option value="" disabled>
                              لا توجد مواد مسجلة
                            </option>
                          ) : (
                            examAvailableCourses.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>
                          <Tag className="w-4 h-4 text-primary" /> نوع الاختبار
                        </label>
                        <select
                          value={examForm.exam_type}
                          onChange={(e) =>
                            setExamForm({
                              ...examForm,
                              exam_type: e.target.value as
                                | "lecture"
                                | "midterm"
                                | "final"
                                | "quiz",
                            })
                          }
                          className={inputClasses}
                        >
                          <option value="lecture">اختبار محاضرة</option>
                          <option value="midterm">اختبار ميدترم (Midterm)</option>
                          <option value="final">اختبار فاينل (Final)</option>
                          <option value="quiz">كويز سريع (Quiz)</option>
                        </select>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>
                          <FileText className="w-4 h-4 text-primary" /> عنوان الاختبار
                        </label>
                        <input
                          type="text"
                          required
                          value={examForm.title}
                          onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                          placeholder="مثال: اختبار المحاضرة 1: تطبيقات النيوماتيك"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>وصف مختصر (اختياري)</label>
                        <input
                          type="text"
                          value={examForm.description}
                          onChange={(e) =>
                            setExamForm({ ...examForm, description: e.target.value })
                          }
                          placeholder="مثال: اختبار تفاعلي شامل مع التقييم الفوري"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Optional Metadata: Lecture #, Questions Count, Duration */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelClasses}>رقم المحاضرة (اختياري)</label>
                        <input
                          type="number"
                          min="1"
                          value={examForm.lecture_number}
                          onChange={(e) =>
                            setExamForm({ ...examForm, lecture_number: e.target.value })
                          }
                          placeholder="1"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>
                          <HelpCircle className="w-3.5 h-3.5 text-primary" /> عدد الأسئلة
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={examForm.question_count}
                          onChange={(e) =>
                            setExamForm({ ...examForm, question_count: e.target.value })
                          }
                          placeholder="50"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>
                          <Clock className="w-3.5 h-3.5 text-primary" /> المدة (دقيقة)
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={examForm.duration_minutes}
                          onChange={(e) =>
                            setExamForm({ ...examForm, duration_minutes: e.target.value })
                          }
                          placeholder="30"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Source Mode: HTML Paste / HTML File / Vercel Link */}
                    <div className="space-y-3">
                      <label className={labelClasses}>
                        <Code2 className="w-4 h-4 text-primary" /> مصدر الاختبار (كود HTML أو رابط Vercel)
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-accent/25 rounded-2xl border border-border/40">
                        <button
                          type="button"
                          onClick={() => setExamSourceMode("html_paste")}
                          className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                            examSourceMode === "html_paste"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Code2 className="w-4 h-4" /> لصق كود HTML مباشر
                        </button>

                        <button
                          type="button"
                          onClick={() => setExamSourceMode("html_file")}
                          className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                            examSourceMode === "html_file"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <CloudUpload className="w-4 h-4" /> رفع ملف .html
                        </button>

                        <button
                          type="button"
                          onClick={() => setExamSourceMode("link")}
                          className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                            examSourceMode === "link"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <LinkIcon className="w-4 h-4" /> رابط خارجي (Vercel)
                        </button>
                      </div>

                      {examSourceMode === "link" ? (
                        <input
                          type="url"
                          required
                          value={examForm.exam_url}
                          onChange={(e) =>
                            setExamForm({ ...examForm, exam_url: e.target.value })
                          }
                          placeholder="https://lec-1-plc.vercel.app/"
                          className={inputClasses}
                          dir="ltr"
                        />
                      ) : (
                        <div className="space-y-3">
                          {examSourceMode === "html_file" && (
                            <input
                              type="file"
                              accept=".html,.htm,text/html"
                              onChange={(e) =>
                                handleHtmlFileUpload(e.target.files?.[0] || null)
                              }
                              className="w-full bg-accent/20 border border-border/50 text-foreground text-sm rounded-xl px-4 py-3 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground cursor-pointer"
                            />
                          )}

                          <textarea
                            rows={8}
                            value={examForm.html_code}
                            onChange={(e) =>
                              setExamForm({ ...examForm, html_code: e.target.value })
                            }
                            placeholder="<!DOCTYPE html><html>... الصق كود صفحة الامتحان الكامل هنا ...</html>"
                            className={`${inputClasses} font-mono text-xs leading-relaxed`}
                            dir="ltr"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || examAvailableCourses.length === 0}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-60"
                    >
                      <Upload className="w-5 h-5" />
                      {loading ? "جاري النشر..." : "نشر الاختبار في صفحة الامتحانات فوراً"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exams Archive List */}
            <div className="bg-card rounded-3xl border border-border/50 p-5 sm:p-6 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الاختبارات المرفوعة..."
                  className="w-full bg-accent/20 border border-border/50 rounded-xl pr-11 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {filteredExams.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <FileCheck2 className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    لا توجد اختبارات مرفوعة من اللوحة حتى الآن.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-4 rounded-2xl bg-accent/15 border border-border/50 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                            {EXAM_TYPE_LABELS[exam.exam_type] || exam.exam_type}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              exam.source_type === "html"
                                ? "bg-indigo-500/10 text-indigo-500"
                                : "bg-emerald-500/10 text-emerald-500"
                            }`}
                          >
                            {exam.source_type === "html" ? "كود HTML مدمج" : "رابط خارجي"}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm sm:text-base truncate">{exam.title}</h3>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                          <span className="font-bold text-foreground/80">{exam.course_name}</span>
                          <span>•</span>
                          <span>{YEAR_LABELS[exam.academic_year] || exam.academic_year}</span>
                          <span>•</span>
                          <span>{SEMESTER_LABELS[exam.semester] || exam.semester}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => setPreviewExam(exam)}
                          className="px-3 py-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-bold flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> معاينة الاختبار
                        </button>

                        <button
                          type="button"
                          disabled={deletingId === exam.id}
                          onClick={() => handleDeleteExam(exam)}
                          className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: UPLOAD NEW MATERIAL */}
        {/* ========================================================= */}
        {activeTab === "upload_material" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 sm:p-8 rounded-3xl border border-border/50 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/40">
              <div className="w-11 h-11 bg-primary rounded-2xl text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">إضافة ماتريال جديدة للمنصة</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  اختر نوع المحتوى (ملفات PDF، فيديوهات شرح، صور سبورات، أو روابط خارجية)
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitMaterial} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/15 border border-border/30 rounded-2xl">
                <div>
                  <label className={labelClasses}>
                    <GraduationCap className="w-4 h-4 text-primary" /> الفرقة الدراسية
                  </label>
                  <select
                    value={formData.academic_year}
                    onChange={(e) =>
                      setFormData({ ...formData, academic_year: e.target.value })
                    }
                    className={inputClasses}
                  >
                    {collegeData
                      .filter((y) => y.enabled)
                      .map((y) => (
                        <option key={y.id} value={y.id}>
                          {y.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>
                    <Cpu className="w-4 h-4 text-primary" /> القسم
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className={inputClasses}
                  >
                    {availableDepartments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>
                    <Calendar className="w-4 h-4 text-primary" /> الترم
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    className={inputClasses}
                  >
                    <option value="first">الترم الأول</option>
                    <option value="second">الترم الثاني</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>
                    <BookOpen className="w-4 h-4 text-primary" /> اسم المادة
                  </label>
                  <select
                    value={formData.course_name}
                    onChange={(e) =>
                      setFormData({ ...formData, course_name: e.target.value })
                    }
                    className={`${inputClasses} font-bold text-primary`}
                    required
                  >
                    {availableCourses.length === 0 ? (
                      <option value="" disabled>
                        لا توجد مواد مسجلة لهذا القسم/الترم
                      </option>
                    ) : (
                      availableCourses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>
                    <Tag className="w-4 h-4 text-primary" /> تصنيف الماتريال
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={inputClasses}
                  >
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>
                    <FileText className="w-4 h-4 text-primary" /> عنوان الماتريال
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="مثال: المحاضرة الأولى، فيديو شرح دوائر التحكم، صور سبورة السكشن..."
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-3">
                  <label className={labelClasses}>
                    <CloudUpload className="w-4 h-4 text-primary" /> نوع الملف أو المصدر
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-accent/25 rounded-2xl border border-border/40">
                    <button
                      type="button"
                      onClick={() => handleModeChange("file")}
                      className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                        uploadMode === "file"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <FileText className="w-4 h-4" /> ملف / PDF
                    </button>

                    <button
                      type="button"
                      onClick={() => handleModeChange("video")}
                      className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                        uploadMode === "video"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Video className="w-4 h-4" /> فيديو
                    </button>

                    <button
                      type="button"
                      onClick={() => handleModeChange("image")}
                      className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                        uploadMode === "image"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" /> صورة
                    </button>

                    <button
                      type="button"
                      onClick={() => handleModeChange("link")}
                      className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                        uploadMode === "link"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" /> رابط خارجي / يوتيوب
                    </button>
                  </div>

                  {uploadMode === "link" ? (
                    <input
                      type="url"
                      required
                      value={formData.file_url}
                      onChange={(e) =>
                        setFormData({ ...formData, file_url: e.target.value })
                      }
                      placeholder="https://youtube.com/... أو https://drive.google.com/..."
                      className={inputClasses}
                      dir="ltr"
                    />
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="file"
                        required
                        accept={getAcceptAttribute()}
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full bg-accent/20 border border-border/50 text-foreground text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                      />

                      {selectedFile && filePreviewUrl && (
                        <div className="p-3 rounded-2xl bg-accent/20 border border-border/40 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 overflow-hidden">
                            {uploadMode === "image" ? (
                              <img
                                src={filePreviewUrl}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-xl border border-border"
                              />
                            ) : uploadMode === "video" ? (
                              <video
                                src={filePreviewUrl}
                                className="w-24 h-16 object-cover rounded-xl border border-border"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <FileText className="w-6 h-6" />
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold truncate">{selectedFile.name}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                الحجم: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || availableCourses.length === 0}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex justify-center items-center gap-3 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    جاري الرفع والنشر...
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : (
                  <>
                    <Upload className="w-5 h-5" /> رفع ونشر الماتريال فوراً
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* EDIT MATERIAL MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" /> تعديل بيانات الماتريال
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="p-1.5 rounded-lg hover:bg-accent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className={labelClasses}>العنوان</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClasses}>الفرقة</label>
                    <select
                      value={editingItem.academic_year}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          academic_year: e.target.value,
                        })
                      }
                      className={inputClasses}
                    >
                      <option value="year1">الفرقة الأولى</option>
                      <option value="year2">الفرقة الثانية</option>
                      <option value="year3">الفرقة الثالثة</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClasses}>القسم</label>
                    <select
                      value={editingItem.department}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          department: e.target.value,
                        })
                      }
                      className={inputClasses}
                    >
                      <option value="mechatronics">ميكاترونكس</option>
                      <option value="renewable">طاقة متجددة</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClasses}>الترم</label>
                    <select
                      value={editingItem.semester}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, semester: e.target.value })
                      }
                      className={inputClasses}
                    >
                      <option value="first">الترم الأول</option>
                      <option value="second">الترم الثاني</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClasses}>التصنيف</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, category: e.target.value })
                      }
                      className={inputClasses}
                    >
                      {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>المادة</label>
                  <select
                    value={editingItem.course_name}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        course_name: e.target.value,
                      })
                    }
                    className={inputClasses}
                  >
                    {editAvailableCourses.length > 0 ? (
                      editAvailableCourses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <option value={editingItem.course_name}>
                        {editingItem.course_name}
                      </option>
                    )}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>الرابط / مسار الملف</label>
                  <input
                    type="url"
                    required
                    value={editingItem.file_url}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, file_url: e.target.value })
                    }
                    className={inputClasses}
                    dir="ltr"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {savingEdit ? "جاري الحفظ..." : "حفظ التعديلات"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-5 py-3 bg-accent text-foreground rounded-xl font-bold text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREVIEW MATERIAL MODAL */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl max-w-3xl w-full p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="overflow-hidden">
                  <h3 className="font-bold text-base truncate">{previewItem.title}</h3>
                  <p className="text-xs text-muted-foreground">{previewItem.course_name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={previewItem.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    فتح في نافذة <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewItem(null)}
                    className="p-1.5 rounded-lg hover:bg-accent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-black/20 rounded-2xl p-2">
                {detectMediaKind(previewItem.file_url, previewItem.category) === "image" ? (
                  <img
                    src={previewItem.file_url}
                    alt={previewItem.title}
                    className="max-h-[65vh] w-auto rounded-xl object-contain"
                  />
                ) : detectMediaKind(previewItem.file_url, previewItem.category) === "video" &&
                  !previewItem.file_url.includes("youtu") ? (
                  <video
                    src={previewItem.file_url}
                    controls
                    className="max-h-[65vh] w-full rounded-xl"
                  />
                ) : (
                  <iframe
                    src={previewItem.file_url}
                    title={previewItem.title}
                    className="w-full h-[65vh] rounded-xl border-0 bg-white"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREVIEW EXAM MODAL (HTML / LINK) */}
      <AnimatePresence>
        {previewExam && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col">
            <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-4">
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm sm:text-base truncate">{previewExam.title}</h3>
                <p className="text-xs text-muted-foreground">{previewExam.course_name}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewExam(null)}
                className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <X className="w-4 h-4" /> إغلاق المعاينة
              </button>
            </div>
            <div className="flex-1 bg-white">
              {previewExam.source_type === "html" && previewExam.html_code ? (
                <iframe
                  srcDoc={previewExam.html_code}
                  title={previewExam.title}
                  sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
                  className="w-full h-full border-0"
                />
              ) : (
                <iframe
                  src={previewExam.exam_url || ""}
                  title={previewExam.title}
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}