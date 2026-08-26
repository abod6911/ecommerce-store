"use client";

import React, { useState } from "react";
import {
  Tv,
  Radio,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Headphones,
  ExternalLink,
  Flame,
  Award
} from "lucide-react";
import { MEDIA_FEATURES_DATA, PODCAST_EPISODES } from "@/data/mockData";
import { useAudio } from "@/context/AudioContext";
import MediaMarquee from "@/components/home/MediaMarquee";

export default function MediaFeatures() {
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = useAudio();
  const [activeMediaTab, setActiveMediaTab] = useState<"tv" | "radio">("tv");

  return (
    <section id="media" className="py-24 bg-brand-dark-950 relative overflow-hidden font-ibm" dir="rtl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
            <Tv className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>الظهور الإعلامي والمشاركات الرسمية</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            حوارات واستشارات المستشار <span className="gold-text-gradient">عبر كبرى القنوات والإذاعات</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            مشاركات إعلامية دورية في قناة العربية وإذاعة بانوراما FM لنقل أحدث الاتجاهات التسويقية وتوجيه رواد الأعمال نحو مضاعفة أرباحهم.
          </p>
        </div>

        {/* Media Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEDIA_FEATURES_DATA.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 hover:border-brand-amber-400/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl backdrop-blur-md group text-right"
            >
              <div className="space-y-4">
                {/* Media Image Box */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark-950 border border-white/10">
                  <img
                    src={item.image}
                    alt={item.outlet}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-transparent to-transparent opacity-80" />

                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brand-dark-950/80 backdrop-blur-md border border-brand-amber-400/40 text-[10px] font-bold text-brand-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-amber-400" />
                    {item.badge}
                  </span>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {item.id.includes("alarabiya") ? <Tv className="w-3.5 h-3.5 text-brand-amber-400" /> : <Radio className="w-3.5 h-3.5 text-brand-emerald-400" />}
                      {item.outlet}
                    </span>
                    <span className="text-[11px] text-brand-amber-300 font-semibold">{item.program}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-alexandria font-bold text-base sm:text-lg text-white group-hover:text-brand-amber-300 transition-colors leading-[1.4] pb-0.5">
                    {item.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-brand-emerald-400 font-semibold">
                <span>تغطية إعلامية وتحليل معتمد</span>
                <span className="flex items-center gap-1 text-brand-amber-300 text-[11px]">
                  <span>المستشار أحمد الشوا</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Radio & Podcast Waveform Audio Player */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark-900 via-brand-dark-850 to-brand-emerald-950/40 border border-brand-emerald-500/30 shadow-2xl backdrop-blur-xl space-y-6 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-amber-300">
                <Headphones className="w-4 h-4 text-brand-amber-400" />
                <span>التسجيلات الإذاعية والبودكاست الاستشاري</span>
              </div>
              <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white">
                استمع إلى أحدث المداخلات الحصرية للمستشار أحمد الشوا
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40 text-xs font-bold">
                <Radio className="w-3.5 h-3.5" />
                <span>بانوراما FM • العربية FM</span>
              </span>
            </div>
          </div>

          {/* Episode Selector & Interactive Waveform Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PODCAST_EPISODES.map((ep) => {
              const isCurrent = currentEpisode?.id === ep.id;
              const isCurrentPlaying = isCurrent && isPlaying;

              return (
                <div
                  key={ep.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-brand-emerald-950/80 border-brand-amber-400/50 shadow-gold-glow"
                      : "bg-white/5 border-white/10 hover:border-brand-emerald-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      onClick={() => playEpisode(ep)}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-amber-400 to-brand-amber-500 text-slate-950 flex items-center justify-center shadow-gold-glow hover:scale-105 active:scale-95 transition-all shrink-0"
                      aria-label={isCurrentPlaying ? "إيقاف مؤقت" : "تشغيل المقطع الإذاعي"}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current mr-0.5" />
                      )}
                    </button>

                    <div className="space-y-1 text-right">
                      <h4 className="font-alexandria font-bold text-sm text-white line-clamp-1">
                        {ep.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {ep.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated Waveform Bars */}
                  <div className="flex items-center gap-1 shrink-0 px-2">
                    {[12, 24, 16, 32, 20, 28, 14, 26].map((h, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all ${
                          isCurrentPlaying
                            ? "bg-brand-amber-400 animate-pulse"
                            : isCurrent
                            ? "bg-brand-emerald-400"
                            : "bg-white/20"
                        }`}
                        style={{
                          height: isCurrentPlaying ? `${Math.max(6, (h * (idx % 2 === 0 ? 1.2 : 0.8)))}px` : `${h * 0.6}px`,
                          animationDuration: `${0.4 + (idx * 0.15)}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Infinite Media Logo Marquee */}
        <div className="pt-4 space-y-4 text-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider">
            المؤسسات والقنوات الإعلامية التي استضافت المستشار
          </span>
          <MediaMarquee />
        </div>
      </div>
    </section>
  );
}
