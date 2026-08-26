# Ahmed Alshawa E-Commerce & Executive Platform (متجر إلكتروني وبوابة المستشار أحمد الشوا)

<div align="center">

![Platform Banner](public/images/logo.jpg)

**المنصة الرقمية المتكاملة للمستشار ومدرب التسويق الرقمي المعتمد أحمد الشوا**  
*Integrated E-Commerce, DRM-Protected Masterclass, VIP Booking & Logistics Management Platform*

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 🌟 المميزات الرئيسية (Core Features)

- **100% Mobile Optimized & RTL Ready**: تصميم متجاوب فائق الجودة باللغة العربية (RTL) متوافق تماماً مع جميع مقاسات الهواتف والشاشات اللوحية وسطح المكتب.
- **متجر الكتب الورقية والمطبوعات الفاخرة (Book Store)**: تجربة شراء ميسرة لكتاب "استراتيجيات التسويق الرقمي" وسيكولوجية الإقناع مع دعم الشحن السريع في جدة وكافة مدن المملكة.
- **نظام تتبع الشحنات اللوجستي (Order Tracking)**: مسار شحن مباشر بـ 4 مراحل متصل مع سمسا (SMSA Express)، أرامكس، وريدبوكس.
- **محرك حجز الاستشارات VIP وجلسات Zoom (Booking Engine)**: تدفق حجز تفاعلي من 3 خطوات (لقاء حضوري بجدة 950 ر.س / استشارة Zoom عن بعد 650 ر.س)، مع استمارة التحضير المسبق ومزامنة تقاويم Google و Apple (`.ics`).
- **بوابة الدورات المشفرة والعلامة المائية الحية (Anti-Piracy DRM Hub)**: مشغل فيديو متقدم بعلامة مائية حية عائمة لمنع التصوير وحماية الملكية الفكرية.
- **بوابة الإدارة والعمليات المركزية (`/admin`)**: لوحة تحكم تنفيذية لمتابعة الإيرادات المباشرة، إدارة وتحديث مسار الشحنات، متابعة استشارات العملاء، وسجل إدارة العلاقات (CRM).
- **نظام المصادقة وحفظ الجلسات (Supabase Auth)**: تسجيل دخول فوري بالاسم ورقم الجوال السعودي والبريد الإلكتروني مع استمرارية الجلسة.
- **حاسبة العائد الإعلاني التفاعلية (ROI Calculator)**: أداة تفاعلية لتقدير العائد على الاستثمار الإعلاني في السوق السعودي.
- **مشغل المقاطع الإذاعية والبودكاست التفاعلي**: مشغل صوتي بأمواج تفاعلية لمداخلات قناة العربية وإذاعة بانوراما FM.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security RLS)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Emerald Slate `#061412` & Warm Gold `#F59E0B`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (60fps Spring Physics & Micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: IBM Plex Sans Arabic & Alexandria & Cairo

---

## 🚀 التشغيل المحلي (Getting Started)

1. **استنساخ المستودع (Clone Repository)**:
   ```bash
   git clone https://github.com/abed6911/ecommerce-store.git
   cd ecommerce-store
   ```

2. **تثبيت الحزم (Install Dependencies)**:
   ```bash
   npm install
   ```

3. **إنشاء ملف المتغيرات البيئية (Environment Variables)**:
   قم بإنشاء ملف `.env.local` وأضف مفاتيح Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **تشغيل خادم التطوير (Run Development Server)**:
   ```bash
   npm run dev
   ```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح لرؤية المنصة.

---

## 📱 التوافق مع الهواتف الذكية (Mobile Ergonomics)

- شريط سفلي عائم مثبت (`MobileActionBar`) يتيح التواصل السريع عبر الواتساب وسلة الشراء وحجز المواعيد.
- تصميم متجاوب لجميع البطاقات والجداول مع قابلية التمرير الأفقي السلس.
- خطوط وأزرار لمس مريحة (Touch Targets >= 44px) متوافقة مع إرشادات WCAG.

---

## ⚖️ التراخيص والاعتمادات (Accreditations)

- المنصة الرسمية للمستشار **أحمد محمد الشوا**.
- مدرب معتمد من **المؤسسة العامة للتدريب التقني والمهني (TVTC)**.
- وثيقة عمل حر معتمدة من وزارة الموارد البشرية والتنمية الاجتماعية بالمملكة العربية السعودية.
