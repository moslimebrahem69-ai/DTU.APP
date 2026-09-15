const SYSTEM_INSTRUCTION = `
أنت المساعد الأكاديمي الذكي لمنصة DTU Learning Hub المخصصة لطلاب الهندسة وقسم الميكاترونكس.
جاوب على الأسئلة الهندسية والبرمجية بلغة عربية واضحة وبأسلوب مشجع ومبسط.
`;

export async function askDTUAssistant(userPrompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    return 'تنبيه: مفتاح VITE_GEMINI_API_KEY غير معرف. تأكد من إضافته في ملف .env وإعادة تشغيل السيرفر.';
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nسؤال الطالب: ${userPrompt}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      
      if (data?.error?.code === 404) {
        // تجربة مسار gemini-2.5-flash المباشر كخيار أساسي حديث
        const altResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nسؤال الطالب: ${userPrompt}` }] }],
            }),
          }
        );
        const altData = await altResponse.json();
        return altData?.candidates?.[0]?.content?.parts?.[0]?.text || `حدث خطأ 404: ${data?.error?.message}`;
      }

      return `حدث خطأ: ${data?.error?.message || response.statusText}`;
    }

    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return replyText || 'أهلاً بك يا هندسة، كيف يمكنني مساعدتك اليوم؟';
  } catch (error: any) {
    console.error('Fetch Network Error:', error);
    return 'حدث خطأ في الاتصال بالشبكة. تأكد من اتصال الإنترنت ورستر السيرفر.';
  }
}