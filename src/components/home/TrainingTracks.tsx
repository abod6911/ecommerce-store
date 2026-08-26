"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Handshake,
  Compass,
  Rocket,
  CheckCircle2,
  Users,
  Award,
  ArrowUpLeft,
  Sparkles
} from "lucide-react";
import { TRAINING_TRACKS_DATA } from "@/data/mockData";
import Link from "next/link";

export default function TrainingTracks() {
  const [activeTrackId, setActiveTrackId] = useState(TRAINING_TRACKS_DATA[0].id);

  const currentTrack = TRAINING_TRACKS_DATA.find((t) => t.id === activeTrackId) || TRAINING_TRACKS_DATA[0];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case "Megaphone":
        return <Megaphone className="w-5 h-5 text-brand-amber-400" />;
      case "Handshake":
        return <Handshake className="w-5 h-5 text-brand-emerald-400" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-brand-amber-400" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-brand-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-brand-amber-400" />;
    }
  };

  return (
    <section id="tracks" className="py-24 bg-brand-dark-950 relative overflow-hidden font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-brand-emerald-300 text-xs sm:text-sm font-bold">
            <Award className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>برامج ومسارات تدريبية وتطويرية معتمدة</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            مجالات التدريب وبناء <span className="gold-text-gradient">القدرات المؤسسية والفردية</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            برامج تطبيقية مخصصة للشركات، المتاجر الإلكترونية، وفرق العمل تهدف لتحقيق قفزة نوعية في المبيعات، التسويق، والقيادة.
          </p>
        </div>

        {/* Tracks Tabs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {TRAINING_TRACKS_DATA.map((track) => {
              const isSelected = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`w-full p-5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-gradient-to-r from-brand-emerald-950 to-brand-dark-850 border-brand-amber-400 shadow-gold-glow"
                      : "bg-brand-dark-850/60 border-white/10 hover:border-white/20 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-dark-900 border border-white/10 flex items-center justify-center shrink-0">
                      {getTrackIcon(track.icon)}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-bold leading-snug pb-0.5 ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate max-w-[220px] sm:max-w-xs mt-0.5 leading-relaxed">
                        {track.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowUpLeft className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-brand-amber-400 -translate-x-1" : "text-slate-500"}`} />
                </button>
              );
            })}
          </div>

          {/* Active Track Detailed View (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 p-7 sm:p-9 shadow-2xl backdrop-blur-xl space-y-6 text-right">
            <div className="space-y-3 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-amber-300">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{currentTrack.tagline}</span>
              </div>
              <h3 className="font-alexandria font-bold text-xl sm:text-2xl text-white leading-[1.45] pb-1">
                {currentTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                {currentTrack.summary}
              </p>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-3.5">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                <span>أبرز المكتسبات والمخرجات التنفيذية:</span>
              </h4>
              <div className="space-y-3">
                {currentTrack.outcomes.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="p-4 rounded-2xl bg-brand-dark-900 border border-white/10 flex items-center gap-3 text-xs sm:text-sm leading-relaxed">
              <Users className="w-5 h-5 text-brand-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">الفئة المستهدفة للبرنامج:</span>
                <span className="text-slate-300">{currentTrack.targetAudience}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/#booking"
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 transition-all whitespace-nowrap"
              >
                <span>طلب تدريب مخصص أو استشارة</span>
              </Link>
              <Link
                href="/#courses"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-brand-emerald-950/80 hover:bg-brand-emerald-900 text-brand-emerald-300 border border-brand-emerald-500/30 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap"
              >
                <span>استعراض البرامج المتاحة فوراً</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
