"use client";

import React from "react";
import { Tv, Radio, Award, Building2, Sparkles, ShieldCheck } from "lucide-react";

const MARQUEE_ITEMS = [
  {
    id: "m-tvtc",
    title: "المؤسسة العامة للتدريب التقني والمهني (TVTC)",
    subtitle: "مدرب معتمد رسمياً",
    icon: Award,
  },
  {
    id: "m-alarabiya",
    title: "قناة العربية",
    subtitle: "برنامج صباح العربية",
    icon: Tv,
  },
  {
    id: "m-panorama",
    title: "إذاعة بانوراما FM",
    subtitle: "مجموعة MBC الإعلامية",
    icon: Radio,
  },
  {
    id: "m-chamber",
    title: "الغرفة التجارية بجدة",
    subtitle: "ملتقيات وورش العمل",
    icon: Building2,
  },
];

export default function MediaMarquee() {
  return (
    <div className="py-6 bg-brand-dark-950 border-y border-white/[0.06] relative overflow-hidden font-ibm" dir="rtl">
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-brand-dark-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-brand-dark-950 to-transparent z-20 pointer-events-none" />

      <div className="flex items-center">
        <div className="flex gap-5 animate-marquee shrink-0 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-dark-900 border border-white/[0.07] shrink-0 select-none"
              >
                <Icon className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <div className="text-right">
                  <h4 className="text-xs font-semibold text-[#F5F2EB] whitespace-nowrap">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 block whitespace-nowrap">
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
