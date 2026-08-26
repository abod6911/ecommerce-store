import React from "react";
import BooksSection from "@/components/home/BooksSection";
import CoursesSection from "@/components/home/CoursesSection";
import OrderTracking from "@/components/store/OrderTracking";
import TrustBanner from "@/components/home/TrustBanner";
import { BookOpen, Sparkles, Truck } from "lucide-react";

export default function StorePage() {
  return (
    <div className="min-h-screen bg-brand-dark-950 pt-28 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
          <Sparkles className="w-4 h-4 text-brand-amber-400" />
          <span>المتجر الرقمي والمطبوعات الفاخرة</span>
        </div>
        <h1 className="font-alexandria font-extrabold text-3xl sm:text-4xl text-white leading-snug">
          متجر الكتب الحصرية <span className="gold-text-gradient">والماستر كلاس المعتمد</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          اختر من بين مؤلفات المستشار أحمد الشوا المطبوعة الفاخرة أو برامجه التدريبية المشفرة بنظام الحماية DRM مع خيارات الشحن السريع والتتبع المباشر.
        </p>
      </div>

      <BooksSection />

      {/* Live Order Tracking Section */}
      <div id="tracking" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OrderTracking />
      </div>

      <CoursesSection />
      <TrustBanner />
    </div>
  );
}
