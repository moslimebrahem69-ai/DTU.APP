import React, { useState } from 'react';
import { globalSearch, SearchResultItem } from '../../data/collegeData';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<{
    name: string;
    embedUrl: string;
    originalUrl: string;
  } | null>(null);
  const [iframeError, setIframeError] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setResults(globalSearch(val));
  };

  // دالة ذكية لتحويل الروابط إلى روابط قابلة للتضمين داخل iframe
  const processUrlForEmbed = (url: string) => {
    if (!url) return { embedUrl: '', originalUrl: '' };

    // 1. Google Drive Folders
    if (url.includes('drive.google.com/drive/folders/')) {
      const folderId = url.split('/folders/')[1]?.split('?')[0];
      return {
        embedUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}#list`,
        originalUrl: url
      };
    }

    // 2. Google Drive Files (PDFs, Docs, etc.)
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.split('/file/d/')[1]?.split('/')[0];
      return {
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        originalUrl: url
      };
    }

    // 3. YouTube (Videos & Channels)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('embed/')) {
        return { embedUrl: url, originalUrl: url };
      }
      if (url.includes('watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return { embedUrl: `https://www.youtube.com/embed/${videoId}`, originalUrl: url };
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return { embedUrl: `https://www.youtube.com/embed/${videoId}`, originalUrl: url };
      }
    }

    // 4. أي روابط أخرى (أدوات AI، مواقف خارجية)
    return {
      embedUrl: url,
      originalUrl: url
    };
  };

  const handleOpenViewer = (item: SearchResultItem, e: React.MouseEvent) => {
    e.preventDefault();
    setIframeError(false);
    const processed = processUrlForEmbed(item.materialUrl);
    
    setSelectedMaterial({
      name: `${item.courseName} - ${item.materialName}`,
      embedUrl: processed.embedUrl,
      originalUrl: processed.originalUrl
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 px-4 dir-rtl">
      {/* شريط البحث */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="ابحث عن مادة، محاضرة، شيت، أو امتحان..."
          className="w-full py-3 pr-11 pl-4 text-sm md:text-base text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
        />
        <svg
          className="w-5 h-5 absolute right-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* قائمة النتائج السريعة */}
      {query.trim() !== '' && (
        <div className="absolute z-40 right-4 left-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto divide-y divide-gray-100">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                onClick={(e) => handleOpenViewer(item, e)}
                className="p-3 hover:bg-blue-50/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                    {item.courseName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {item.materialName}
                    </span>
                    <a
                      href={item.materialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="فتح في نافذة خارجية"
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>{item.yearName}</span>
                  <span>•</span>
                  <span>{item.deptName}</span>
                  <span>•</span>
                  <span>{item.semesterName}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              لا توجد نتائج تطابق بحثك "{query}"
            </div>
          )}
        </div>
      )}

      {/* In-App Viewer Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 md:p-6 dir-rtl">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-800 text-sm md:text-base truncate max-w-md">
                {selectedMaterial.name}
              </h3>

              <div className="flex items-center gap-2">
                <a
                  href={selectedMaterial.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span>فتح خارجي</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Frame */}
            <div className="flex-1 bg-gray-100 relative">
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-800">
                  <svg className="w-16 h-16 text-amber-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h4 className="text-lg font-bold mb-2">يتعذر عرض هذا الرابط المباشر هنا</h4>
                  <p className="text-sm text-gray-600 mb-6 max-w-md">
                    هذا الموقع أو الملف يفرض حماية تمنع تضمينه داخل المودال مباشرة.
                  </p>
                  <a
                    href={selectedMaterial.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
                  >
                    فتح في tab جديد
                  </a>
                </div>
              ) : (
                <iframe
                  src={selectedMaterial.embedUrl}
                  className="w-full h-full border-0"
                  title={selectedMaterial.name}
                  onError={() => setIframeError(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};