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
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Fetch Error:', data);
      
      // تجربة الموديل الاحتياطي gemini-2.0-flash فوراً في حالة فشل 2.5
      const fallbackResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
            contents: [{ parts: [{ text: userPrompt }] }],
          }),
        }
      );
      const fallbackData = await fallbackResponse.json();
      return fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text || 'حدث خطأ في جلب الإجابة.';
    }

    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return replyText || 'أهلاً بك يا هندسة، كيف يمكنني مساعدتك اليوم؟';
  } catch (error: any) {
    console.error('Fetch Network Error:', error);
    return 'حدث خطأ في الاتصال بالسيرفر. تأكد من اتصال الإنترنت ورستر السيرفر.';
  }
}