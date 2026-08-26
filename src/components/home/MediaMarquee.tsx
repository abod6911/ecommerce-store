"use client";

import React from "react";
import { Tv, Radio, Award, Building2, Sparkles, ShieldCheck } from "lucide-react";

const MARQUEE_ITEMS = [
  {
    id: "m-tvtc",
    title: "المؤسسة العامة للتدريب التقني والمهني (TVTC)",
    subtitle: "مدرب معتمد رسمياً",
    icon: Award,
    color: "text-brand-emerald-400",
    bg: "bg-brand-emerald-500/10 border-brand-emerald-500/30",
  },
  {
    id: "m-alarabiya",
    title: "قناة العربية",
    subtitle: "برنامج صباح العربية - خبير تسويق",
    icon: Tv,
    color: "text-brand-amber-400",
    bg: "bg-brand-amber-400/10 border-brand-amber-400/30",
  },
  {
    id: "m-panorama",
    title: "إذاعة بانوراما FM (MBC Group)",
    subtitle: "استشارات مشاريع وريادة أعمال",
    icon: Radio,
    color: "text-brand-emerald-300",
    bg: "bg-brand-emerald-500/10 border-brand-emerald-500/30",
  },
  {
    id: "m-chamber",
    title: "الغرفة التجارية بجدة",
    subtitle: "ملتقيات وورش عمل التسويق الرقمي",
    icon: Building2,
    color: "text-brand-amber-300",
    bg: "bg-brand-amber-400/10 border-brand-amber-400/30",
  },
  {
    id: "m-ecommerce",
    title: "المؤتمر السعودي للتجارة الإلكترونية",
    subtitle: "متحدث وخبير استراتيجي",
    icon: Sparkles,
    color: "text-brand-emerald-400",
    bg: "bg-brand-emerald-500/10 border-brand-emerald-500/30",
  },
];

export default function MediaMarquee() {
  return (
    <div className="py-8 bg-brand-dark-950 border-y border-white/10 relative overflow-hidden font-ibm" dir="rtl">
      {/* Edge Fading Mask */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-brand-dark-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-brand-dark-950 to-transparent z-20 pointer-events-none" />

      <div className="flex items-center">
        {/* Continuous Marquee Ribbon */}
        <div className="flex gap-6 animate-marquee shrink-0 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border ${item.bg} backdrop-blur-md shrink-0 transition-transform hover:scale-105 select-none`}
              >
                <div className={`w-9 h-9 rounded-xl bg-brand-dark-900 border border-white/10 flex items-center justify-center ${item.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <h4 className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium block whitespace-nowrap">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
