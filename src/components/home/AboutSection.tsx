"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpLeft,
  Briefcase,
  GraduationCap,
  TrendingUp,
  MapPin
} from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";
import { getAssetPath } from "@/lib/utils";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-brand-dark-900 border-t border-white/10 relative overflow-hidden font-ibm" dir="rtl">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Badges (5 Cols) */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden bg-brand-dark-950 border-2 border-brand-amber-400/40 p-2.5 shadow-gold-glow">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={getAssetPath("/images/ahmed-alshawa-about.jpg")}
                  alt={INSTRUCTOR_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-transparent to-transparent opacity-75" />

                {/* Floating Accreditation Badge */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-brand-dark-900/95 border border-brand-emerald-500/30 backdrop-blur-md text-right space-y-1">
                  <div className="flex items-center gap-1.5 text-brand-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-brand-amber-400 shrink-0" />
                    <span>اعتماد رسمي معترف به</span>
                  </div>
                  <p className="text-[11px] text-white font-semibold leading-relaxed">
                    {INSTRUCTOR_INFO.accreditation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Values (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-brand-emerald-300 text-xs sm:text-sm font-bold">
                <GraduationCap className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <span>عن المستشار أحمد الشوا</span>
              </div>

              <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
                خبرة تمتد لأكثر من <span className="gold-text-gradient">20 عاماً</span> في تمكين المشاريع السعودية
              </h2>

              <p className="text-base text-brand-amber-300 font-bold italic leading-relaxed py-1">
                "{INSTRUCTOR_INFO.slogan}"
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-[1.9]">
                مستشار ومدرب تسويق رقمي معتمد من المؤسسة العامة للتدريب التقني والمهني (TVTC)، متخصص في بناء المنظومات التسويقية عالية الربحية، وتدريب قادة الفرق والمبيعات، ومساعدة أصحاب المتاجر والمشاريع الناشئة في المملكة على مضاعفة عوائدهم الإعلانية والوصول للاستدامة المالية.
              </p>
            </div>

            {/* Credibility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-brand-dark-850 border border-brand-emerald-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-brand-amber-400 font-bold text-xs">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>اعتماد التدريب المهني</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  برامج وشهادات تدريبية متوافقة مع معايير المؤسسة العامة للتدريب التقني والمهني (TVTC).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-dark-850 border border-brand-emerald-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-brand-emerald-400 font-bold text-xs">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>متاح حضورياً وعن بُعد</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  جلسات استشارية واستراتيجية مباشرة في مدينة جدة، بالإضافة للاستشارات الأونلاين لكافة مناطق المملكة.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/#booking"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 transition-all whitespace-nowrap"
              >
                <span>احجز جلسة استشارية مع أحمد الشوا</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/#media"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap"
              >
                <span>مشاهدة الظهور الإعلامي</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
