"use client";

import React from "react";
import { Search, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, ArrowLeft, Target, Cpu, Flame } from "lucide-react";
import { MARKETING_FRAMEWORK_DATA } from "@/data/mockData";

export default function MarketingFramework() {
  return (
    <section id="framework" className="py-24 bg-brand-dark-900 border-y border-white/10 relative overflow-hidden font-ibm" dir="rtl">
      {/* Background ambient radial gradients */}
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-brand-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-brand-emerald-300 text-xs sm:text-sm font-bold">
            <Target className="w-4 h-4 text-brand-emerald-400 shrink-0" />
            <span>منهجية معتمدة تم اختبارها لأكثر من 20 عاماً</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            قواعد <span className="gold-text-gradient">أحمد الشوا الثلاث</span> للنمو ومضاعفة الأرباح
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            "التسويق أساس نجاح أي مشروع" — منظومة عملية ثلاثية الأركان تضمن لك بناء حملات إعلانية مربحة وخفض تكلفة اكتساب العملاء في السوق السعودي.
          </p>
        </div>

        {/* 3-Card Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MARKETING_FRAMEWORK_DATA.map((card, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={card.stepNumber}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group text-right ${
                  isCenter
                    ? "bg-gradient-to-b from-brand-dark-850 to-brand-emerald-950/70 border-2 border-brand-amber-400/60 shadow-gold-glow md:-translate-y-3"
                    : "bg-brand-dark-850/80 border border-brand-emerald-500/20 hover:border-brand-emerald-500/40 shadow-xl"
                } backdrop-blur-xl`}
              >
                {/* Header of Card */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-alexandria font-black text-3xl text-white/20 group-hover:text-brand-amber-400/40 transition-colors">
                      {card.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-brand-dark-900 border border-white/10 flex items-center justify-center text-brand-amber-400 group-hover:scale-110 transition-transform shrink-0">
                      {idx === 0 && <Search className="w-6 h-6 text-brand-emerald-400" />}
                      {idx === 1 && <Sparkles className="w-6 h-6 text-brand-amber-400" />}
                      {idx === 2 && <TrendingUp className="w-6 h-6 text-brand-emerald-400" />}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-brand-emerald-400 block">
                      {card.subtitle}
                    </span>
                    <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white leading-snug pb-0.5">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                    {card.description}
                  </p>

                  {/* Bullet points */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {card.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Tag */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-brand-amber-300 font-bold whitespace-nowrap">ركيزة نجاح أساسية</span>
                  <span className="text-slate-400 text-[11px] whitespace-nowrap">معتمدة للمشاريع السعودية</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
