import React from 'react';
import { Youtube, ExternalLink, CheckCircle2, PlayCircle, Users } from 'lucide-react';
export interface YouTubeChannel {
  id: string;
  title: string;
  customUrl?: string;
  handle?: string;
  description?: string;
  thumbnail: string;
  subscriberCount?: string;
  videoCount?: string;
  categoryName?: string;
  channelUrl: string;
  isVerified?: boolean;
} // تعديل المسار إذا كانت أنواع البيانات في مكان آخر

interface YouTubeCardProps {
  channel: YouTubeChannel;
}

export const YouTubeCard: React.FC<YouTubeCardProps> = ({ channel }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
      <div className="p-5">
        {/* Header: Avatar & Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={channel.thumbnail}
              alt={channel.title}
              className="w-16 h-16 rounded-full object-cover border-2 border-red-100 group-hover:border-red-500 transition-colors duration-300"
              loading="lazy"
            />
            {channel.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-red-500 fill-red-100" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg leading-snug truncate group-hover:text-red-600 transition-colors">
              {channel.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-1.5">
              {channel.customUrl || channel.handle}
            </p>
            
            {/* Tag / Badge */}
            <span className="inline-block bg-red-50 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
              {channel.categoryName || 'قناة تعليمية'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
          {channel.description || 'لا يوجد وصف متاح لهذه القناة حالياً.'}
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3 mb-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-0.5">
              <Users className="w-3.5 h-3.5" />
              <span>المشتركون</span>
            </div>
            <span className="font-bold text-gray-800 text-sm">
              {channel.subscriberCount || 'غير محدد'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-r border-gray-200">
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-0.5">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>الفيديوهات</span>
            </div>
            <span className="font-bold text-gray-800 text-sm">
              {channel.videoCount || 'غير محدد'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button Footer */}
      <div className="px-5 pb-5 pt-0">
        <a
          href={channel.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-red-200"
        >
          <Youtube className="w-5 h-5" />
          <span>زيارة القناة</span>
          <ExternalLink className="w-4 h-4 opacity-75" />
        </a>
      </div>
    </div>
  );
};