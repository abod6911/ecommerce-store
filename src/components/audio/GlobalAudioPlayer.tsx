"use client";

import React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Radio,
  Sparkles,
  RotateCcw,
  RotateCw
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export default function GlobalAudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
    volume,
    setVolume,
    isAudioBarVisible,
    setIsAudioBarVisible,
  } = useAudio();

  if (!isAudioBarVisible || !currentEpisode) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-brand-dark-900/95 backdrop-blur-2xl border-t border-brand-amber-500/30 shadow-2xl p-3 sm:px-6 font-ibm transition-all duration-300"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track info */}
        <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-dark-800 shrink-0 border border-brand-amber-500/30">
            <img
              src={currentEpisode.coverImage}
              alt={currentEpisode.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-brand-amber-400 animate-ping" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand-amber-400/20 text-brand-amber-300">
                الحلقة {currentEpisode.episodeNumber}
              </span>
              <span className="text-[10px] text-brand-emerald-400 font-semibold flex items-center gap-0.5">
                <Radio className="w-2.5 h-2.5" />
                دروس وبودكاست أحمد الشوا
              </span>
            </div>
            <h4 className="text-xs font-bold text-white truncate mt-0.5">
              {currentEpisode.title}
            </h4>
          </div>
        </div>

        {/* Player Controls & Progress */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:w-1/2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => seek(Math.max(0, progress - 10))}
              className="text-slate-400 hover:text-white transition-colors"
              title="تراجع 10 ثوانٍ"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 flex items-center justify-center shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current mr-0.5" />}
            </button>

            <button
              onClick={() => seek(Math.min(duration, progress + 10))}
              className="text-slate-400 hover:text-white transition-colors"
              title="تقديم 10 ثوانٍ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2 text-[10px] text-slate-400 font-mono">
            <span className="w-8 text-left">{formatTime(progress)}</span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                seek(clickPos * duration);
              }}
              className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative"
            >
              <div
                className="h-full bg-gradient-to-r from-brand-amber-400 to-brand-emerald-400 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="w-8 text-right">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="hidden sm:flex items-center justify-end gap-3 w-1/4">
          <button
            onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
            className="text-slate-400 hover:text-white"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 accent-brand-amber-400 cursor-pointer bg-white/10"
          />
          <button
            onClick={() => setIsAudioBarVisible(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
