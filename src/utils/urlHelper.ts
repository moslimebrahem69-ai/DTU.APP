export type LinkType = 'drive_folder' | 'drive_file' | 'youtube' | 'external';

export interface ProcessedUrl {
  type: LinkType;
  embedUrl: string;
  originalUrl: string;
  isEmbeddable: boolean;
}

export const processUrlForEmbed = (url: string): ProcessedUrl => {
  if (!url) return { type: 'external', embedUrl: '', originalUrl: '', isEmbeddable: false };

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // 1. Google Drive Folders (تعديل الرابط بطريقة سليمة لتجنب 403)
    if (url.includes('drive.google.com/drive/folders/') || url.includes('drive.google.com/open?id=')) {
      let folderId = '';
      if (url.includes('/folders/')) {
        folderId = url.split('/folders/')[1]?.split('?')[0];
      } else {
        folderId = url.split('id=')[1]?.split('&')[0];
      }

      return {
        type: 'drive_folder',
        // استخدام رابط المعاينة المباشر للمجلدات أو تحويله للعرض العام
        embedUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`,
        originalUrl: url,
        isEmbeddable: true,
      };
    }

    // 2. Google Drive Files (PDFs, Docs)
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.split('/file/d/')[1]?.split('/')[0];
      return {
        type: 'drive_file',
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        originalUrl: url,
        isEmbeddable: true,
      };
    }

    // 3. YouTube Videos
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      if (url.includes('watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          originalUrl: url,
          isEmbeddable: true,
        };
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          originalUrl: url,
          isEmbeddable: true,
        };
      }
    }

    // المواقع الأخرى (مثل إدراك وChatPDF التي ترفض الـ iframe) نتركها لتفتح عبر زر الانتقال السريع
    return { type: 'external', embedUrl: url, originalUrl: url, isEmbeddable: false };
  } catch (e) {
    return { type: 'external', embedUrl: url, originalUrl: url, isEmbeddable: false };
  }
};