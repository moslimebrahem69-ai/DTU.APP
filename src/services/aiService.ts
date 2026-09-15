import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const SYSTEM_INSTRUCTION = `
أنت المساعد الأكاديمي الذكي لمنصة DTU Learning Hub المخصصة لطلاب الهندسة وقسم الميكاترونكس.
جاوب على الأسئلة الهندسية والبرمجية بلغة عربية واضحة وبأسلوب مشجع ومبسط.
`;

export async function askDTUAssistant(userPrompt: string): Promise<string> {
  try {
    if (!apiKey) {
      return 'تنبيه: مفتاح الـ API غير موجود في ملف .env، يرجى التأكد من إضافته وإعادة تشغيل السيرفر.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || 'أهلاً بك يا هندسة، كيف يمكنني مساعدتك اليوم؟';
  } catch (error: any) {
    console.error('Error details:', error);
    
    // محاولة احتياطية باستعمال gemini-1.5-flash-latest
    try {
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-1.5-flash-latest',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      return fallbackResponse.text || 'أهلاً بك يا هندسة!';
    } catch (fallbackError) {
      return 'حدث خطأ أثناء التواصل مع API. تأكد من صحة المفتاح VITE_GEMINI_API_KEY ورسترة السيرفر.';
    }
  }
}