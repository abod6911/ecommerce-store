"use client";

import React from "react";
import { Tv, Radio } from "lucide-react";
import { MEDIA_FEATURES_DATA } from "@/data/mockData";
import { getAssetPath } from "@/lib/utils";

export default function MediaFeatures() {
  return (
    <section id="media" className="py-14 sm:py-16 bg-brand-dark-950 border-t border-white/[0.06] font-ibm" dir="rtl">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
            <Tv className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>الظهور الإعلامي</span>
          </div>

          <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
            لقاءات واستضافات <span className="gold-text-gradient">تلفزيونية وإذاعية</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-[1.85]">
            مداخلات وحوارات متخصصة عبر قناة العربية وإذاعة بانوراما FM حول التسويق الرقمي وتطوير المشاريع.
          </p>
        </div>

        {/* Media Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEDIA_FEATURES_DATA.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] hover:border-brand-amber-500/30 p-5 flex flex-col justify-between transition-colors group text-right"
            >
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-dark-950 border border-white/[0.06]">
                  <img
                    src={getAssetPath(item.image)}
                    alt={item.outlet}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950/80 via-transparent to-transparent" />

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-[#F5F2EB]">
                    <span className="font-semibold flex items-center gap-1.5 bg-black/65 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {item.id.includes("alarabiya") ? (
                        <Tv className="w-3.5 h-3.5 text-brand-amber-400" />
                      ) : (
                        <Radio className="w-3.5 h-3.5 text-brand-emerald-400" />
                      )}
                      {item.outlet}
                    </span>
                    <span className="text-[11px] text-brand-amber-300 font-medium">{item.program}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-alexandria font-bold text-base text-[#F5F2EB] leading-[1.5]">
                    {item.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-[1.8]">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-stone-400">
                <span>{item.badge}</span>
                <span className="text-brand-amber-300 font-medium">أحمد الشوا</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
