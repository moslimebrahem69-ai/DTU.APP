import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).VITE_GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
أنت المساعد الأكاديمي الذكي لمنصة DTU Learning Hub المخصصة لطلاب الهندسة وقسم الميكاترونكس.
جاوب على الأسئلة الهندسية والبرمجية بلغة عربية واضحة وبأسلوب مشجع ومبسط.
`;

export async function askDTUAssistant(userPrompt: string): Promise<string> {
  if (!apiKey) {
    return 'تنبيه: مفتاح الـ API غير معرف على هذا السيرفر. يرجى إضافة VITE_GEMINI_API_KEY في إعدادات Vercel.';
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || 'أهلاً بك يا هندسة، كيف يمكنني مساعدتك اليوم؟';
  } catch (error: any) {
    console.error('AI Error:', error);

    // إذا حدث خطأ بسبب تجاوز معدل الطلبات السريع (Rate Limit / 429)
    if (error?.status === 429 || error?.message?.includes('429')) {
      return 'تم إرسال عدة طلبات متتالية بسرعة! انتظر بضع ثوانٍ واطلب مجدداً يا هندسة ⏳';
    }

    return 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى بعد قليل.';
  }
}