import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { trackMaterialView } from "../lib/trackView";
import {
  FileText,
  Download,
  ExternalLink,
  Loader2,
  AlertCircle,
  FolderOpen,
  Video,
  Image as ImageIcon,
  Play,
  Eye,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  views_count?: number;
  unique_views_count?: number;
  created_at: string;
}

type MediaKind = "video" | "image" | "document" | "link";

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

function detectMediaKind(url: string, category: string): MediaKind {
  const lower = url.toLowerCase();
  if (
    category === "video" ||
    /\.(mp4|webm|mov|mkv|avi)(\?.*)?$/.test(lower) ||
    lower.includes("youtube.com") ||
    lower.includes("youtu.be")
  ) {
    return "video";
  }
  if (
    category === "image" ||
    /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/.test(lower)
  ) {
    return "image";
  }
  if (lower.includes("supabase.co/storage")) {
    return "document";
  }
  return "link";
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const vParam = parsed.searchParams.get("v");
      if (vParam) return `https://www.youtube.com/embed/${vParam}`;
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.replace("/shorts/", "");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function DynamicMaterials({
  academicYear,
  department,
  semester,
  courseName,
}: DynamicMaterialsProps) {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<MaterialItem | null>(null);

  useEffect(() => {
    async function fetchDynamicMaterials() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("materials")
          .select("*")
          .eq("academic_year", academicYear)
          .eq("department", department)
          .eq("semester", semester)
          .eq("course_name", courseName)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setMaterials((data as MaterialItem[]) || []);
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "حدث خطأ أثناء جلب الملفات.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }

    if (courseName) {
      fetchDynamicMaterials();
    }
  }, [academicYear, department, semester, courseName]);

  const trackView = (id: string) => {
    let isUnique = false;
    try {
      const raw = localStorage.getItem("dtu-viewed-materials");
      const viewedIds: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      isUnique = !viewedIds.includes(id);
    } catch {
      isUnique = false;
    }

    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              views_count: (m.views_count || 0) + 1,
              unique_views_count:
                (m.unique_views_count || 0) + (isUnique ? 1 : 0),
            }
          : m
      )
    );

    void trackMaterialView(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2 text-xs">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  if (materials.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-5 pt-4 border-t border-border/50 space-y-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-primary" />
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            ماتريال وفيديوهات مضافة حديثاً
          </h4>
        </div>

        <div className="space-y-2">
          {materials.map((item, index) => {
            const kind = detectMediaKind(item.file_url, item.category);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="p-2.5 rounded-xl bg-accent/25 border border-border/40 hover:border-primary/40 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      kind === "video"
                        ? "bg-rose-500/10 text-rose-500"
                        : kind === "image"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {kind === "video" ? (
                      <Video className="w-4 h-4" />
                    ) : kind === "image" ? (
                      <ImageIcon className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <p className="font-bold text-xs sm:text-sm truncate text-foreground">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{CATEGORY_LABELS[item.category] || item.category}</span>
                      {(item.views_count || 0) > 0 && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {item.views_count}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {kind === "video" || kind === "image" ? (
                  <button
                    type="button"
                    onClick={() => {
                      trackView(item.id);
                      setActiveMedia(item);
                    }}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {kind === "video" ? (
                      <>
                        مشاهدة <Play className="w-3 h-3 fill-current" />
                      </>
                    ) : (
                      <>
                        عرض <Eye className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackView(item.id)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
                  >
                    {item.file_url.includes("supabase") ? (
                      <>
                        تحميل <Download className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        فتح <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    )}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inline Student Media Modal */}
      <AnimatePresence>
        {activeMedia && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl max-w-3xl w-full p-4 sm:p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm sm:text-base truncate">
                    {activeMedia.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {CATEGORY_LABELS[activeMedia.category] || activeMedia.category}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeMedia.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-accent text-foreground rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    فتح خارجي <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveMedia(null)}
                    className="p-1.5 rounded-lg hover:bg-accent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-black/30 rounded-2xl p-2">
                {detectMediaKind(activeMedia.file_url, activeMedia.category) === "image" ? (
                  <img
                    src={activeMedia.file_url}
                    alt={activeMedia.title}
                    className="max-h-[68vh] w-auto rounded-xl object-contain"
                  />
                ) : getYouTubeEmbedUrl(activeMedia.file_url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(activeMedia.file_url) || ""}
                    title={activeMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video rounded-xl border-0"
                  />
                ) : (
                  <video
                    src={activeMedia.file_url}
                    controls
                    autoPlay
                    className="max-h-[68vh] w-full rounded-xl"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}