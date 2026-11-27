"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import StatsCounter from "@/components/animations/StatsCounter";
import { getAssetPath } from "@/lib/utils";

export default function HeroSection() {
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-16 overflow-hidden bg-brand-dark-950 font-ibm" dir="rtl">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-luxury-radial pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          {/* Primary Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-brand-amber-300 border-b border-brand-amber-500/30 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber-400" />
              <span>{hero.accreditation}</span>
            </div>

            <h1 className="font-alexandria font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#F5F2EB] tracking-normal leading-[1.45] space-y-2">
              <span className="block">{hero.headlineLine1}</span>
              <span className="gold-text-gradient block pt-1">{hero.headlineLine2}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-stone-300 leading-[1.9] max-w-xl font-normal">
              {hero.subheadline}
            </p>

            {/* Disciplined CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/#booking"
                className="px-7 py-3.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>احجز استشارتك</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/#books"
                className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-[#F5F2EB] border border-white/15 hover:border-brand-amber-500/40 font-alexandria font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>الكتاب والدورات</span>
              </Link>
            </div>
          </div>

          {/* Museum-Grade Editorial Portrait */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md rounded-2xl bg-brand-dark-900 border border-white/[0.08] p-3">
              <div className="relative aspect-[4/4.6] rounded-xl overflow-hidden bg-brand-dark-950">
                <img
                  src={getAssetPath("/images/ahmed-alshawa-hero.jpg")}
                  alt="أحمد الشوا - مستشار ومدرب تسويق رقمي معتمد"
                  className="w-full h-full object-cover object-top"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950/75 via-transparent to-transparent" />
              </div>

              <div className="pt-3.5 pb-1 px-2 flex items-center justify-between gap-3 text-right">
                <div>
                  <p className="font-alexandria font-bold text-sm text-[#F5F2EB]">
                    أحمد محمد الشوا
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    مستشار ومدرب تسويق رقمي — جدة
                  </p>
                </div>
                <span className="text-[11px] font-medium text-brand-amber-300 border border-brand-amber-500/30 px-2.5 py-1 rounded-lg">
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
