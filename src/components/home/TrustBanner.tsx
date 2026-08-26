"use client";

import React from "react";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  Star,
  Quote,
  CheckCircle2,
  Lock
} from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/mockData";

export default function TrustBanner() {
  return (
    <section className="py-24 bg-brand-dark-900 border-y border-white/10 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-right">
          <div className="p-6 rounded-2xl bg-brand-dark-850/70 border border-brand-emerald-500/20 space-y-3 backdrop-blur-md shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm pb-0.5">توصيل فوري بجدة</h4>
            <p className="text-xs text-slate-300 leading-[1.8]">
              استلم نسختك الورقية خلال ساعات في جدة، وشحن سريع خلال 24-48 ساعة لجميع مدن المملكة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-dark-850/70 border border-brand-emerald-500/20 space-y-3 backdrop-blur-md shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm pb-0.5">طرق دفع محلية متعددة</h4>
            <p className="text-xs text-slate-300 leading-[1.8]">
              ندعم مدى، Apple Pay، البطاقات الائتمانية، بالإضافة لخيار الدفع نقداً عند الاستلام بجدة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-dark-850/70 border border-brand-emerald-500/20 space-y-3 backdrop-blur-md shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm pb-0.5">حماية رقمية مشددة DRM</h4>
            <p className="text-xs text-slate-300 leading-[1.8]">
              بث مشفر وعلامات مائية ديناميكية تضمن لك محتوى حصري غير مسرّب ومحدث باستمرار.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-dark-850/70 border border-brand-emerald-500/20 space-y-3 backdrop-blur-md shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm pb-0.5">اعتماد رسمي وموثوق</h4>
            <p className="text-xs text-slate-300 leading-[1.8]">
              سجل تجاري سعودي مع اعتماد التدريب التقني والمهني TVTC وضمان الرضا التام.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="font-alexandria font-extrabold text-2xl sm:text-3xl text-white leading-[1.45] pb-1">
              قصص نجاح وتجارب <span className="gold-text-gradient">المشتركين والمستثمرين</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              أكثر من 5,000 مستفيد عبر برامج وكتب واستشارات المستشار أحمد الشوا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 hover:border-brand-amber-400/40 transition-all space-y-5 relative flex flex-col justify-between backdrop-blur-md shadow-xl text-right"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-brand-amber-400">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current text-brand-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-white/10 shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-[1.9] italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-brand-amber-400/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                      {t.verifiedPurchase && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{t.role} - {t.city}</p>
                    <span className="text-[10px] text-brand-amber-300 font-semibold truncate block mt-0.5">
                      {t.productTitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
