"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpLeft,
  ShieldCheck,
  Award,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  Users,
  TrendingUp,
  Star,
  Quote
} from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";
import StatsCounter from "@/components/animations/StatsCounter";
import TiltCard from "@/components/animations/TiltCard";
import MagneticButton from "@/components/animations/MagneticButton";
import { getAssetPath } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-brand-dark-900 font-ibm" dir="rtl">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-[700px] h-[700px] bg-brand-emerald-900/15 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute -top-20 left-10 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Column 1: Primary Value Proposition & Action (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-right">
            {/* Pill Badge with TVTC Accreditation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark-850 border border-brand-amber-400/40 text-brand-amber-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-brand-amber-400 shrink-0" />
              <span>{INSTRUCTOR_INFO.accreditation}</span>
            </div>

            {/* Main Headline H1 - Generous Line-Height & Zero Text Overlap */}
            <h1 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] text-white tracking-normal leading-[1.65] space-y-3">
              <span className="block text-white leading-[1.65]">
                ابنِ ثروتك المستدامة
              </span>
              <span className="gold-text-gradient block leading-[1.65] pt-1">
                وضاعف أرباحك في السوق السعودي
              </span>
            </h1>

            {/* Sub-headline with Balanced Spacing */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-[1.85] max-w-xl">
              حلول واستشارات تسويقية مخصصة لتمكين رواد الأعمال وأصحاب المشاريع، بخبرة عملية تتجاوز 20 عاماً في السوق السعودي.
            </p>

            {/* Key Trust Tags Strip */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap">
                <Lock className="w-3.5 h-3.5 text-brand-amber-400" />
                <span>بث تعليمي مشفر DRM</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap">
                <Truck className="w-3.5 h-3.5 text-brand-emerald-400" />
                <span>شحن فوري في جدة والمملكة</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap">
                <CreditCard className="w-3.5 h-3.5 text-brand-amber-300" />
                <span>مدى | Apple Pay | دفع عند الاستلام</span>
              </span>
            </div>

            {/* Dual CTAs with Magnetic Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <MagneticButton
                href="/#books"
                variant="primary"
                className="px-7 py-4 rounded-2xl text-xs sm:text-sm whitespace-nowrap"
              >
                <span>استكشف الكتب والدورات</span>
                <ArrowUpLeft className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="/#booking"
                variant="secondary"
                className="px-7 py-4 rounded-2xl text-xs sm:text-sm whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-brand-emerald-400" />
                <span>احجز استشارتك الآن</span>
              </MagneticButton>
            </div>
          </div>

          {/* Column 2: Clean Featured Portrait Card with 3D Tilt (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <TiltCard maxTilt={10} glareOpacity={0.28}>
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden bg-brand-dark-850/80 border-2 border-brand-amber-400/40 p-2.5 shadow-2xl backdrop-blur-xl">
                {/* Image Frame */}
                <div className="relative aspect-[4/4.8] rounded-2xl overflow-hidden bg-brand-dark-950">
                  <img
                    src={getAssetPath("/images/ahmed-alshawa-hero.jpg")}
                    alt="أحمد الشوا - مستشار ومدرب تسويق رقمي معتمد"
                    className="w-full h-full object-cover object-top"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-brand-dark-950/15 to-transparent" />

                  {/* Bottom Slogan Quote Overlay */}
                  <div className="absolute bottom-3 right-3 left-3 p-4 rounded-xl bg-brand-dark-900/90 backdrop-blur-md border border-brand-emerald-500/30 text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <Quote className="w-4 h-4 text-brand-amber-400 shrink-0" />
                      <span className="text-xs font-bold text-brand-amber-300 leading-relaxed">
                        "{INSTRUCTOR_INFO.slogan}"
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      المستشار أحمد الشوا | مدرب معتمد TVTC
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* 4-Metric Scroll-Triggered Animated Counter */}
        <StatsCounter />
      </div>
    </section>
  );
}
