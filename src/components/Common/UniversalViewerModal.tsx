import React from 'react';
import { processUrlForEmbed } from '../../utils/urlHelper';

interface UniversalViewerModalProps {
  title: string;
  url: string;
  onClose: () => void;
}

export const UniversalViewerModal: React.FC<UniversalViewerModalProps> = ({ title, url, onClose }) => {
  const processed = processUrlForEmbed(url);
  const targetUrl = processed.originalUrl || url;

  // فتح الرابط في تبويب جديد لمن يرغب
  const handleOpenInNewTab = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 pt-20 md:pt-24 dir-rtl">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200 relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-800 text-sm md:text-lg truncate max-w-md">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            {/* زر الفتح في تبويب جديد */}
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
              title="فتح في تبويب جديد"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">فتح في تبويب جديد</span>
            </button>

            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-xl transition-colors"
              title="إغلاق"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport (iframe للعرض الداخلي الأساسي) */}
        <div className="flex-1 bg-gray-900 relative">
          <iframe
            src={processed.embedUrl || url}
            className="w-full h-full border-0 bg-white"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};