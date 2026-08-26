"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  PieChart,
  HelpCircle
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import MagneticButton from "@/components/animations/MagneticButton";

const BUSINESS_MODELS = [
  { id: "ecommerce", label: "متجر إلكتروني", roasMultiplier: 4.8, cpcAvg: 0.85, convRate: 2.8 },
  { id: "services", label: "استشارات وخدمات VIP", roasMultiplier: 5.8, cpcAvg: 1.4, convRate: 4.5 },
  { id: "realestate", label: "عقارات ومشاريع كبرى", roasMultiplier: 6.2, cpcAvg: 2.2, convRate: 3.2 },
  { id: "medical", label: "عيادات ومراكز طبية", roasMultiplier: 4.2, cpcAvg: 1.1, convRate: 3.8 },
];

export default function RoiCalculator() {
  const [budget, setBudget] = useState<number>(15000);
  const [selectedModel, setSelectedModel] = useState(BUSINESS_MODELS[0]);

  // Calculations based on Saudi market advertising metrics
  const estimatedReach = Math.round(budget * (18 + (100000 - budget) / 10000));
  const estimatedClicks = Math.round(budget / selectedModel.cpcAvg);
  const estimatedConversions = Math.round(estimatedClicks * (selectedModel.convRate / 100));
  const estimatedRevenue = Math.round(budget * selectedModel.roasMultiplier);
  const estimatedNetProfit = Math.round(estimatedRevenue - budget);
  const roasFormatted = `${selectedModel.roasMultiplier.toFixed(1)}x`;

  return (
    <section id="calculator" className="py-24 bg-brand-dark-950 relative overflow-hidden font-ibm" dir="rtl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>حاسبة العائد الإعلاني الذكية (Saudi Ad ROI Simulator)</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            احسب العائد المتوقع على <span className="gold-text-gradient">ميزانيتك الإعلانية</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            وفقاً لمنهجية المستشار أحمد الشوا وإحصائيات السوق السعودي؛ اختبر كيف تضاعف مبيعاتك وأرباحك عند تطبيق الاستهداف الصحيح وهندسة العروض.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Controls & Inputs (6 Cols) */}
            <div className="lg:col-span-6 space-y-8 text-right">
              {/* 1. Industry Selector */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-slate-200 block pb-1">
                  1. حدد مجال ونشاط مشروعك:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {BUSINESS_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                        selectedModel.id === model.id
                          ? "bg-brand-emerald-950/80 border-brand-amber-400 text-brand-amber-300 shadow-gold-glow"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <span>{model.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Budget Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-200">
                    2. الميزانية الشهرية المقترحة للحملات:
                  </label>
                  <span className="font-alexandria font-black text-xl sm:text-2xl text-brand-amber-300">
                    {formatSAR(budget)}
                  </span>
                </div>

                <div className="relative py-2">
                  <input
                    type="range"
                    min="3000"
                    max="100000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-amber-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                    <span>3,000 ر.س (بداية)</span>
                    <span>50,000 ر.س (متوسط)</span>
                    <span>100,000 ر.س+ (توسع)</span>
                  </div>
                </div>
              </div>

              {/* Quick Perks */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-brand-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>مخرجات التقدير مبنية على:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  تحسين الحملات على منصات سناب شات، تيك توك، جوجل، وإنستغرام باستخدام مسارات بيعية مؤتمتة وتفادي الهدر الإعلاني.
                </p>
              </div>
            </div>

            {/* Right Column: Results & Projected Returns (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-brand-dark-900 via-brand-emerald-950/60 to-brand-dark-950 border border-brand-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-emerald-glow text-right">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-amber-400" />
                  النتائج التقديرية للحملة:
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-amber-400/20 text-brand-amber-300 font-black text-xs border border-brand-amber-400/40">
                  ROAS المتوقع: {roasFormatted}
                </span>
              </div>

              {/* 3 Metric Output Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-emerald-400" />
                    الوصول المستهدف:
                  </span>
                  <div className="font-alexandria font-black text-lg sm:text-xl text-white">
                    +{estimatedReach.toLocaleString("en-US")}
                  </div>
                  <span className="text-[9px] text-slate-500">مستهلك سعودي مهتم</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-amber-400" />
                    الطلبات / التحويلات:
                  </span>
                  <div className="font-alexandria font-black text-lg sm:text-xl text-white">
                    +{estimatedConversions.toLocaleString("en-US")}
                  </div>
                  <span className="text-[9px] text-slate-500">عملية شراء / عميل محتمل</span>
                </div>
              </div>

              {/* Total Revenue & Net Profit Highlight */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-amber-400/15 via-brand-emerald-500/15 to-transparent border border-brand-amber-400/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-semibold">إجمالي المبيعات المقدرة:</span>
                  <span className="font-alexandria font-black text-xl sm:text-2xl text-brand-amber-300">
                    {formatSAR(estimatedRevenue)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-brand-emerald-400 font-bold">صافي الأرباح الإعلانية التقديرية:</span>
                  <span className="font-alexandria font-black text-lg sm:text-xl text-brand-emerald-300">
                    +{formatSAR(estimatedNetProfit)}
                  </span>
                </div>
              </div>

              {/* Action CTA with Magnetic Button */}
              <div className="pt-2">
                <MagneticButton
                  href="/#booking"
                  variant="primary"
                  className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>احجز جلستك لتطبيق هذه الخطة لمشروعك</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
