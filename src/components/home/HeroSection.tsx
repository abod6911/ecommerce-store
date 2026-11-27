"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, Calendar, GraduationCap, Briefcase } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import StatsCounter from "@/components/animations/StatsCounter";
import { getAssetPath } from "@/lib/utils";

const HERO_OFFERINGS = [
  {
    title: "كتاب استراتيجيات التسويق",
    meta: "نسخة مطبوعة — 50 ر.س",
    href: "/#books",
    icon: BookOpen,
  },
  {
    title: "الاستشارات التنفيذية",
    meta: "ساعتين بـ 800 ر.س (+200/ساعة)",
    href: "/#booking",
    icon: Calendar,
  },
  {
    title: "الدورات التدريبية",
    meta: "5 برامج تدريبية متخصصة",
    href: "/#courses",
    icon: GraduationCap,
  },
  {
    title: "الخدمات التسويقية",
    meta: "سوشل ميديا، إعلانات، كتب، عيادات",
    href: "/#services",
    icon: Briefcase,
  },
];

export default function HeroSection() {
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-12 overflow-hidden bg-brand-dark-950 font-ibm" dir="rtl">
      <div className="absolute inset-x-0 top-0 h-[460px] bg-luxury-radial pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Primary Editorial Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-brand-amber-300 border-b border-brand-amber-500/30 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber-400" />
              <span>{hero.accreditation}</span>
            </div>

            <h1 className="font-alexandria font-bold text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] text-[#F5F2EB] tracking-normal leading-[1.35] space-y-2">
              <span className="block">{hero.headlineLine1}</span>
              <span className="gold-text-gradient block pt-1">{hero.headlineLine2}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-stone-300 leading-[1.85] max-w-2xl font-normal">
              {hero.subheadline}
            </p>

            {/* Primary CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/#booking"
                className="px-8 py-3.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>احجز استشارتك الآن</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/#books"
                className="px-8 py-3.5 rounded-xl bg-brand-dark-850 hover:bg-brand-dark-800 text-[#F5F2EB] border border-brand-emerald-500/25 hover:border-brand-amber-500/45 font-alexandria font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>طلب الكتاب (50 ر.س)</span>
              </Link>
            </div>

            {/* 2x2 Quick Offerings Matrix filling empty hero space purposefully */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HERO_OFFERINGS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group p-3.5 rounded-xl bg-brand-dark-900/90 hover:bg-brand-dark-850 border border-brand-emerald-500/15 hover:border-brand-amber-500/40 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-brand-emerald-950 border border-brand-emerald-500/25 flex items-center justify-center text-brand-amber-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-alexandria font-bold text-xs sm:text-sm text-[#F5F2EB] group-hover:text-brand-amber-300 transition-colors truncate">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">
                          {item.meta}
                        </p>
                      </div>
                    </div>
                    <ArrowUpLeft className="w-4 h-4 text-stone-500 group-hover:text-brand-amber-400 shrink-0 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Portrait Column (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-lg w-full rounded-2xl bg-brand-dark-900 border border-brand-emerald-500/20 p-3.5">
              <div className="relative aspect-[4/4.3] rounded-xl overflow-hidden bg-brand-dark-950">
                <img
                  src={getAssetPath("/images/ahmed-alshawa-hero.jpg")}
                  alt="أحمد الشوا - مستشار ومدرب تسويق رقمي معتمد"
                  className="w-full h-full object-cover object-top"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950/80 via-transparent to-transparent" />
              </div>

              <div className="pt-3.5 pb-1 px-2 flex items-center justify-between gap-3 text-right">
                <div>
                  <p className="font-alexandria font-bold text-sm sm:text-base text-[#F5F2EB]">
                    أحمد محمد الشوا
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    مستشار ومدرب تسويق رقمي — جدة (حضورياً وعن بُعد)
                  </p>
                </div>
                <span className="text-[11px] font-medium text-brand-amber-300 border border-brand-amber-500/30 bg-brand-dark-850 px-3 py-1 rounded-lg shrink-0">
                  TVTC معتمد
                </span>
              </div>
            </div>
          </div>
        </div>

        <StatsCounter />
      </div>
    </section>
  );
}
