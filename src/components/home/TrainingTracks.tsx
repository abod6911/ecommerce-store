"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Share2,
  BookOpen,
  Stethoscope,
  CheckCircle2,
  Users,
  Award,
  ArrowUpLeft
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import Link from "next/link";

export default function TrainingTracks() {
  const { content } = useSiteContent();
  const servicesList = content.services;
  const [activeTrackId, setActiveTrackId] = useState(servicesList[0]?.id || "");

  const currentTrack = servicesList.find((t) => t.id === activeTrackId) || servicesList[0];

  if (!currentTrack) return null;

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case "Share2":
        return <Share2 className="w-4 h-4 text-brand-amber-400" />;
      case "Megaphone":
        return <Megaphone className="w-4 h-4 text-brand-amber-400" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4 text-brand-amber-400" />;
      case "Stethoscope":
        return <Stethoscope className="w-4 h-4 text-brand-amber-400" />;
      default:
        return <Award className="w-4 h-4 text-brand-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-16 bg-brand-dark-900 border-t border-white/[0.06] font-ibm" dir="rtl">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
            <Award className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>الخدمات التسويقية التنفيذية</span>
          </div>

          <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
            خدمات متخصصة <span className="gold-text-gradient">لإدارة ونمو مشاريعك</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-[1.85]">
            إدارة حسابات التواصل الاجتماعي، تخطيط الحملات الإعلانية، تسويق كتب المؤلفين، وتسويق العيادات.
          </p>
        </div>

        {/* Architectural 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {servicesList.map((track) => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-right transition-colors flex items-center justify-between ${
                    isSelected
                      ? "bg-brand-dark-850 border-brand-amber-500/45"
                      : "bg-brand-dark-950/60 border-white/[0.07] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-brand-amber-500/15 border-brand-amber-500/40"
                        : "bg-brand-dark-900 border-white/[0.08]"
                    }`}>
                      {getTrackIcon(track.icon)}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-alexandria text-sm font-bold leading-snug ${isSelected ? "text-[#F5F2EB]" : "text-stone-300"}`}>
                        {track.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate max-w-[220px] sm:max-w-xs mt-0.5">
                        {track.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowUpLeft className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-brand-amber-400 -translate-x-0.5" : "text-stone-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Active Service Details */}
          <div className="lg:col-span-7 rounded-2xl bg-brand-dark-850 border border-white/[0.08] p-6 sm:p-8 space-y-6 text-right">
            <div className="space-y-2.5 pb-5 border-b border-white/[0.07]">
              <span className="text-xs font-medium text-brand-amber-300 block">
                {currentTrack.tagline}
              </span>
              <h3 className="font-alexandria font-bold text-xl sm:text-2xl text-[#F5F2EB]">
                {currentTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-[1.85]">
                {currentTrack.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-[#F5F2EB]">
                نطاق العمل والمخرجات:
              </h4>
              <div className="space-y-2.5">
                {currentTrack.outcomes.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-dark-900 border border-white/[0.05] text-xs sm:text-sm text-stone-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald-400 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-dark-900 border border-white/[0.06] flex items-center gap-3 text-xs sm:text-sm">
              <Users className="w-4 h-4 text-brand-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-[#F5F2EB] ml-1.5">الفئة المستهدفة:</span>
                <span className="text-stone-400">{currentTrack.targetAudience}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/#booking"
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>طلب الخدمة أو حجز استشارة</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/#courses"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] text-stone-200 border border-white/15 text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
              >
                <span>استعراض الدورات</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
