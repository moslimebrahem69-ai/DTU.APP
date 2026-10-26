import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { FileText, Download, ExternalLink, Loader2, AlertCircle, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

interface DynamicMaterialsProps {
  academicYear: string;
  department: string;
  semester: string;
  courseName: string;
}

interface MaterialItem {
  id: string;
  title: string;
  category: string;
  file_url: string;
  created_at: string;
}

export function DynamicMaterials({ academicYear, department, semester, courseName }: DynamicMaterialsProps) {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDynamicMaterials() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("materials")
          .select("*")
          .eq("academic_year", academicYear)
          .eq("department", department)
          .eq("semester", semester)
          .eq("course_name", courseName)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMaterials(data || []);
      } catch (error) {
      const err = error as Error;
      setError(err.message || "حدث خطأ أثناء جلب الملفات.");
    } finally {
        setLoading(false);
      }
    }

    if (courseName) {
      fetchDynamicMaterials();
    }
  }, [academicYear, department, semester, courseName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-text-primary text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  if (materials.length === 0) {
    return null; // لو مفيش ملفات مرفوعة للمادة دي، مش نعرض حاجة عشان ما نشوشرش على اللينكات القديمة
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/40">
        <FolderOpen className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">ملفات وماتريال إضافية (مرفوعة مباشرة)</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm truncate">{item.title}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-muted-foreground inline-block mt-1">
                  {item.category}
                </span>
              </div>
            </div>

            <a
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              {item.file_url.includes('supabase') ? (
                <>تحميل <Download className="w-3.5 h-3.5" /></>
              ) : (
                <>فتح <ExternalLink className="w-3.5 h-3.5" /></>
              )}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}