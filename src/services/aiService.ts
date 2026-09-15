import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
أنت المساعد الأكاديمي الذكي لمنصة DTU Learning Hub المخصصة لطلاب الهندسة وقسم الميكاترونكس.
جاوب على الأسئلة الهندسية والبرمجية بلغة عربية واضحة وبأسلوب مشجع ومبسط.
`;

export async function askDTUAssistant(userPrompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.error('Gemini Error: VITE_GEMINI_API_KEY is undefined');
    return 'تنبيه: مفتاح VITE_GEMINI_API_KEY غير معرف. تأكد من إضافته في ملف .env وإعادة تشغيل السيرفر.';
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // تجربة الموديلات الأساسية المستقرة بالترتيب
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro'];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const text = response.text();
      
      if (text) {
        return text;
      }
    } catch (error: any) {
      console.warn(`Model ${modelName} failed:`, error);
      
      // لو الخطأ مفتاح غير صالح أو Rate Limit
      if (error?.message?.includes('API key not valid')) {
        return 'مفتاح VITE_GEMINI_API_KEY غير صالح. يرجى التأكد من إنشاء مفتاح جديد من Google AI Studio.';
      }
    }
  }

  return 'حدث خطأ أثناء التواصل مع الذكاء الاصطناعي. يرجى التأكد من إنشاء API Key جديد وإعادة السيرفر.';
}