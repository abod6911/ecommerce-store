"use client";

import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, ArrowUpLeft, GraduationCap, MapPin } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { getAssetPath } from "@/lib/utils";

export default function AboutSection() {
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section id="about" className="py-20 sm:py-24 bg-brand-dark-900 border-t border-white/[0.06] font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md rounded-2xl bg-brand-dark-950 border border-white/[0.08] p-3">
              <div className="relative aspect-[4/4.8] rounded-xl overflow-hidden">
                <img
                  src={getAssetPath("/images/ahmed-alshawa-about.jpg")}
                  alt="أحمد محمد الشوا"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070909]/65 via-transparent to-transparent" />
              </div>

              <div className="pt-3.5 pb-1 px-2 flex items-start gap-2.5 text-right">
                <ShieldCheck className="w-4 h-4 text-brand-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-300 leading-relaxed">
                  {hero.accreditation}
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Bio Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
                <GraduationCap className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <span>نبذة عن المستشار</span>
              </div>

              <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
                خبرة تتجاوز <span className="gold-text-gradient">عشرين عاماً</span> في التسويق والتدريب
              </h2>

              <p className="text-base text-brand-amber-300 font-semibold pt-1">
                &quot;{hero.slogan}&quot;
              </p>

              <p className="text-sm sm:text-base text-stone-300 leading-[1.9]">
                {hero.aboutBio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-brand-dark-850 border border-white/[0.07] space-y-2">
                <div className="flex items-center gap-2 text-brand-amber-300 font-semibold text-xs">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>التأهيل والاعتماد المهني</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  برامج تدريبية معتمدة ومتوافقة مع معايير المؤسسة العامة للتدريب التقني والمهني.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-dark-850 border border-white/[0.07] space-y-2">
                <div className="flex items-center gap-2 text-brand-emerald-300 font-semibold text-xs">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>حضورياً في جدة وعن بُعد</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  استشارات مباشرة في مدينة جدة واستشارات مرئية عن بُعد لجميع مناطق المملكة والخليج.
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/#booking"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>حجز استشارة</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/#media"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] text-stone-200 border border-white/15 text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
              >
                <span>اللقاءات الإعلامية</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
