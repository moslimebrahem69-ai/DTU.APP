# DTU Learning Hub

مركز تعليمي شامل مع تايمر دراسة احترافي يدعم العربية والإنجليزية مع نظام ثيمات متطور.

## المميزات

- 🎯 **تايمر دراسة احترافي** مع وضع بومودورو والعمل في الخلفية
- 🎨 **5 ثيمات مختلفة** (فاتح، داكن، أزرق، أخضر، أصفر)
- 🌍 **دعم كامل للعربية والإنجليزية** مع RTL
- 📱 **PWA كامل** يعمل أوفلاين
- ⚡ **أداء عالي** مع Code Splitting و Lazy Loading
- 🔍 **بحث وفلترة متقدمة** عبر جميع المحتويات
- 🎵 **مكتبة نغمات** مع Web Audio API
- ♿ **إمكانية وصول كاملة** مع دعم لوحة المفاتيح

## التشغيل

```bash
npm install
npm run dev
```

## البناء للإنتاج

```bash
npm run build
npm run preview
```

## إضافة محتوى جديد

### أدوات الذكاء الاصطناعي

عدّل ملف `src/data/aiTools.ts` وأضف عنصر جديد:

```typescript
{
  id: 'unique-id',
  name: 'اسم الأداة',
  description: 'وصف مختصر',
  url: 'https://example.com',
  category: 'programming', // أو marketing أو business أو engineering
  subcategory: 'ides',
  paid: false, // أو true
  language: 'ar', // أو en أو both
  tags: ['برمجة', 'ذكي']
}
```

### قنوات اليوتيوب

عدّل ملف `src/data/youtubeChannels.ts`:

```typescript
{
  id: 'unique-id',
  name: 'اسم القناة',
  description: 'وصف القناة',
  url: 'https://youtube.com/@channel',
  category: 'programming', // أو design أو business إلخ
  language: 'ar', // أو en أو both
  tags: ['تعليمي', 'برمجة']
}
```

### منصات التعلم

عدّل ملف `src/data/learningPlatforms.ts`:

```typescript
{
  id: 'unique-id',
  name: 'اسم المنصة',
  description: 'وصف المنصة',
  url: 'https://platform.com',
  category: 'arabic', // أو international أو kids أو programming
  paid: false,
  language: 'ar',
  tags: ['تعليم', 'كورسات']
}
```

## إدارة الثيمات

الثيمات معرّفة في `src/index.css` باستخدام CSS Custom Properties. لإضافة ثيم جديد:

1. أضف الثيم في `[data-theme="new-theme"]`
2. عدّل `src/contexts/ThemeContext.tsx` لإضافة الخيار الجديد
3. أضف الترجمة في `src/lib/i18n.ts`

## إضافة نغمات صوت

النغمات حالياً مولدة عبر Web Audio API في `src/hooks/useTimer.ts`. لإضافة ملفات صوت حقيقية:

1. ضع الملفات في `public/sounds/`
2. عدّل دالة `playSound` لاستخدام HTML5 Audio API
3. أضف الخيارات الجديدة في مكون التايمر

## تغيير صورة المطور

استبدل الأيقونة في `src/components/Layout/SideDrawer.tsx` أو أضف صورة في `public/images/` واستخدمها.

## تحكم الأنيميشن

- استخدم `useTheme().animationsEnabled` للتحكم في الأنيميشن
- CSS class `motion-reduce` لإيقاف جميع الأنيميشن
- متغير CSS `data-animations="false"` لإيقاف الأنيميشن عالمياً

## الاختبارات

```bash
npm test
```

## الهيكل

```
src/
├── components/
│   ├── ui/           # مكونات shadcn/ui
│   ├── Layout/       # تخطيط عام
│   ├── Timer/        # مكونات التايمر
│   ├── Common/       # مكونات مشتركة
│   └── Animations/   # أنيميشن الخلفية
├── data/            # ملفات البيانات JSON
├── hooks/           # React Hooks مخصصة
├── contexts/        # React Contexts
├── pages/           # صفحات التطبيق
└── lib/             # مكتبات مساعدة
```

## المطور

محمد إبراهيم - [edu.box.media@gmail.com](mailto:edu.box.media@gmail.com)

الإصدار 2.0