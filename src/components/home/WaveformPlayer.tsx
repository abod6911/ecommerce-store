"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Headphones,
  Mic,
  Tv
} from "lucide-react";
import { motion } from "framer-motion";

const AUDIO_TRACKS = [
  {
    id: "track-panorama-1",
    title: "لقاء إذاعة بانوراما FM: استشارات نمو الشركات الناشئة في السعودية",
    outlet: "إذاعة بانوراما FM (برنامج هدى وهن)",
    durationStr: "18:40",
    durationSec: 1120,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    type: "RADIO",
  },
  {
    id: "track-alarabiya-1",
    title: "تحليل صباح العربية: أسرار الإنفاق الإعلاني وطرق خفض تكلفة الاستحواذ",
    outlet: "قناة العربية (برنامج صباح العربية)",
    durationStr: "14:25",
    durationSec: 865,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    type: "TV_AUDIO",
  },
  {
    id: "track-podcast-1",
    title: "بودكاست كيمياء المال: إدارة السيولة وتدفقات النقد التأسيسية",
    outlet: "بودكاست أحمد الشوا",
    durationStr: "24:10",
    durationSec: 1450,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    type: "PODCAST",
  },
];

export default function WaveformPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const activeTrack = AUDIO_TRACKS[currentTrackIndex];
  const totalBars = 32;

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= activeTrack.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack.durationSec]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setProgress((prev) => Math.max(0, Math.min(activeTrack.durationSec, prev + seconds)));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = (progress / activeTrack.durationSec) * 100;

  return (
    <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 text-right font-ibm">
      {/* Header & Track Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-brand-amber-400" />
            <span>{activeTrack.outlet}</span>
          </div>
          <h3 className="font-alexandria font-bold text-base sm:text-lg text-white leading-snug">
            {activeTrack.title}
          </h3>
        </div>

        {/* Track switch tabs */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          {AUDIO_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setProgress(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                currentTrackIndex === idx
                  ? "bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {track.type === "RADIO" ? "إذاعة بانوراما" : track.type === "TV_AUDIO" ? "صباح العربية" : "البودكاست"}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic 32-Bar Equalizer Waveform Visualizer */}
      <div className="relative py-4 px-2 sm:px-6 rounded-2xl bg-brand-dark-950/80 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between gap-1 sm:gap-1.5 h-20 sm:h-24">
          {Array.from({ length: totalBars }).map((_, barIdx) => {
            // Seed height algorithm for organic audio shape
            const normalizedPos = barIdx / totalBars;
            const isPlayed = (barIdx / totalBars) * 100 <= progressPercent;

            // Generate organic frequency wave shape
            const baseHeight = Math.sin(normalizedPos * Math.PI) * 55 + 20;

            return (
              <motion.div
                key={barIdx}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(15, baseHeight * 0.4)}%`,
                          `${Math.min(98, baseHeight * 1.35 + (barIdx % 4) * 8)}%`,
                          `${Math.max(20, baseHeight * 0.7)}%`,
                        ],
                      }
                    : {
                        height: `${baseHeight * 0.6}%`,
                      }
                }
                transition={
                  isPlaying
                    ? {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.4 + (barIdx % 5) * 0.12,
                        ease: "easeInOut",
                      }
                    : { duration: 0.4 }
                }
                className={`flex-1 rounded-full transition-colors ${
                  isPlayed
                    ? "bg-gradient-to-t from-brand-amber-400 to-brand-emerald-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "bg-white/15"
                }`}
              />
            );
          })}
        </div>

        {/* Hover scrub click layer */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(clickPos * activeTrack.durationSec);
          }}
          className="absolute inset-0 cursor-pointer"
          title="انقر للتنقل في التسجيل"
        />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Progress Display */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 w-full sm:w-auto justify-between sm:justify-start">
          <span className="w-12 text-left text-brand-amber-300 font-bold">{formatTime(progress)}</span>
          <span>/</span>
          <span className="w-12 text-right">{activeTrack.durationStr}</span>
        </div>

        {/* Main Audio Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSkip(-15)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="تراجع 15 ثانية"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 flex items-center justify-center shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current mr-0.5" />
            )}
          </button>

          <button
            onClick={() => handleSkip(15)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="تقديم 15 ثانية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 h-1.5 bg-white/15 rounded-lg accent-brand-amber-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
