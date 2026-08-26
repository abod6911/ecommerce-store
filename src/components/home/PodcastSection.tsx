"use client";

import React from "react";
import { Headphones, Play, Pause, Radio, Sparkles, Volume2, Clock } from "lucide-react";
import { PODCAST_EPISODES, PodcastEpisode } from "@/data/mockData";
import { useAudio } from "@/context/AudioContext";
import { formatNumber } from "@/lib/utils";

export default function PodcastSection() {
  const { currentEpisode, isPlaying, playEpisode } = useAudio();

  return (
    <section id="podcast" className="py-24 bg-brand-dark-900 relative overflow-hidden font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
            <Radio className="w-4 h-4" />
            <span>الصوتيات والبودكاست التسويقي</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-snug">
            بودكاست <span className="gold-text-gradient">كيمياء المال والتسويق الرقمي</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            حلقات صوتية دورية يناقش فيها المستشار أحمد الشوا أسرار التسويق الرقمي، صناعة المحتوى الجذاب، وبناء المنظومات البيعية الناجحة في السوق السعودي. استمع الآن مجاناً.
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PODCAST_EPISODES.map((ep) => {
            const isThisPlaying = currentEpisode?.id === ep.id && isPlaying;
            return (
              <div
                key={ep.id}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group backdrop-blur-md ${
                  isThisPlaying
                    ? "bg-brand-dark-850 border-brand-amber-400 shadow-gold-glow"
                    : "bg-brand-dark-850/80 border-brand-emerald-500/20 hover:border-brand-amber-500/40 hover:-translate-y-1 shadow-xl"
                }`}
              >
                <div className="space-y-4">
                  {/* Episode Cover */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark-950 border border-white/10">
                    <img
                      src={ep.coverImage}
                      alt={ep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950/90 via-black/40 to-transparent" />

                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brand-amber-300">
                      الحلقة #{ep.episodeNumber}
                    </div>

                    <button
                      onClick={() => playEpisode(ep)}
                      className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isThisPlaying
                          ? "bg-brand-amber-400 text-slate-950 shadow-gold-glow scale-110"
                          : "bg-brand-amber-400/90 hover:bg-brand-amber-400 text-slate-950 shadow-gold-glow"
                      }`}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current mr-0.5" />
                      )}
                    </button>

                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-amber-400" />
                        {ep.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5 text-brand-emerald-400" />
                        {formatNumber(ep.listensCount)} استماع
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 text-right">
                    <h3 className="font-alexandria font-bold text-base text-white group-hover:text-brand-amber-300 transition-colors line-clamp-2 leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {ep.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    تاريخ النشر: {ep.publishDate}
                  </span>
                  <button
                    onClick={() => playEpisode(ep)}
                    className="text-xs font-bold text-brand-emerald-400 hover:text-brand-emerald-300 flex items-center gap-1"
                  >
                    {isThisPlaying ? "جاري الاستماع..." : "استمع للحلقة ⟵"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
