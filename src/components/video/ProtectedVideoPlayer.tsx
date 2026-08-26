"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Shield,
  Lock,
  Settings,
  EyeOff,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { generateWatermarkData, setupDRMProtectionListeners } from "@/lib/drm-security";

import { useSupabaseAuth } from "@/context/SupabaseAuthContext";

interface ProtectedVideoPlayerProps {
  videoUrl: string;
  title: string;
  lessonNumber?: string;
  onEnded?: () => void;
  onProgress?: (progress: number) => void;
  posterImage?: string;
}

export default function ProtectedVideoPlayer({
  videoUrl,
  title,
  lessonNumber = "المحاضرة 1",
  onEnded,
  onProgress,
  posterImage,
}: ProtectedVideoPlayerProps) {
  const { profile } = useSupabaseAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState("1080p FHD (مشفر)");
  const [showSettings, setShowSettings] = useState(false);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  // Dynamic floating watermark position
  const [watermarkPos, setWatermarkPos] = useState({ top: 15, left: 20 });
  const [watermarkInfo, setWatermarkInfo] = useState({
    userId: profile?.id || "ALSHAWA-VIP-88491",
    userName: profile?.fullName || "مشترك معتمد",
    userPhone: profile?.phone ? `+966 ${profile.phone}` : "+966 55 558 3379",
    ipMasked: "188.54.***.***",
    timestamp: "12:00:00 م",
    sessionToken: "DRM-SESSION-ACTIVE",
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // DRM & Security listeners setup
  useEffect(() => {
    const base = generateWatermarkData();
    if (profile) {
      base.userName = profile.fullName;
      base.userId = profile.id;
      base.userPhone = `+966 ${profile.phone}`;
    }
    setWatermarkInfo(base);

    const cleanupDRM = setupDRMProtectionListeners((warning) => {
      setSecurityWarning(warning);
      setTimeout(() => setSecurityWarning(null), 5000);
    });

    const handleBlur = () => setIsWindowBlurred(true);
    const handleFocus = () => setIsWindowBlurred(false);

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Drifting watermark interval (updates coordinates every 7 seconds)
    const watermarkInterval = setInterval(() => {
      setWatermarkPos({
        top: Math.floor(Math.random() * 65) + 10,
        left: Math.floor(Math.random() * 65) + 10,
      });
      const updated = generateWatermarkData();
      if (profile) {
        updated.userName = profile.fullName;
        updated.userId = profile.id;
        updated.userPhone = `+966 ${profile.phone}`;
      }
      setWatermarkInfo(updated);
    }, 7000);

    return () => {
      cleanupDRM();
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      clearInterval(watermarkInterval);
    };
  }, [profile]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (onProgress && videoRef.current.duration) {
        onProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettings(false);
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
        setSecurityWarning("تم تفعيل نظام الحماية الرقمية DRM: النقر بالزر الأيمن معطل لحفظ الملكية الفكرية.");
        setTimeout(() => setSecurityWarning(null), 4000);
      }}
      className="relative w-full aspect-video bg-brand-dark-950 rounded-3xl overflow-hidden shadow-2xl border border-brand-emerald-500/30 group select-none font-ibm"
      dir="rtl"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterImage}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        onClick={togglePlay}
        playsInline
        className={`w-full h-full object-cover transition-filter duration-300 ${
          isWindowBlurred ? "filter blur-2xl grayscale" : ""
        }`}
      />

      {/* Screen Obscuring Guard on Focus Loss (Anti-Recording) */}
      {isWindowBlurred && (
        <div className="absolute inset-0 z-30 bg-brand-dark-950/90 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6 space-y-3">
          <EyeOff className="w-12 h-12 text-brand-amber-400 animate-bounce" />
          <h3 className="text-base font-bold text-white leading-snug">تم إيقاف العرض مؤقتاً لحماية المحتوى الرقمي</h3>
          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            انقر داخل نافذة المتصفح لاستئناف مشاهدة المحاضرة المشفرة.
          </p>
        </div>
      )}

      {/* Security Warning Toast */}
      {securityWarning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-amber-950/95 border border-amber-500 text-amber-200 px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{securityWarning}</span>
        </div>
      )}

      {/* DYNAMIC FLOATING WATERMARK */}
      <div
        style={{
          top: `${watermarkPos.top}%`,
          left: `${watermarkPos.left}%`,
          transition: "top 3s ease-in-out, left 3s ease-in-out",
        }}
        className="absolute z-20 pointer-events-none opacity-45 hover:opacity-70 bg-black/50 backdrop-blur-[2px] p-2.5 rounded-xl border border-white/10 text-[10px] text-white/90 font-mono flex flex-col gap-0.5"
      >
        <div className="flex items-center gap-1 font-bold text-brand-amber-300">
          <Shield className="w-3 h-3 text-brand-emerald-400" />
          <span>{watermarkInfo.userName}</span>
        </div>
        <span className="text-[9px] text-slate-300">ID: {watermarkInfo.userId}</span>
        <span className="text-[9px] text-slate-400">IP: {watermarkInfo.ipMasked} | {watermarkInfo.timestamp}</span>
        <span className="text-[8px] text-brand-emerald-400 font-bold">{watermarkInfo.sessionToken}</span>
      </div>

      {/* Static Corner DRM Token Badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark-950/80 border border-brand-emerald-500/40 backdrop-blur-md text-[10px] font-semibold text-brand-emerald-300">
        <Lock className="w-3.5 h-3.5 text-brand-amber-400" />
        <span>بث مشفر ومحمي برقمية DRM</span>
      </div>

      {/* Large Center Play Button when Paused */}
      {!isPlaying && !isWindowBlurred && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-gradient-to-tr from-brand-emerald-600 to-brand-amber-400 text-brand-dark-950 flex items-center justify-center shadow-gold-glow hover:scale-110 active:scale-95 transition-all z-20"
        >
          <Play className="w-8 h-8 fill-current mr-1" />
        </button>
      )}

      {/* Video Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-brand-dark-950 via-brand-dark-950/85 to-transparent p-4 transition-opacity duration-300 opacity-90 group-hover:opacity-100 space-y-2">
        {/* Scrubber / Progress Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            seek(pos * duration);
          }}
          className="relative w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all duration-150 overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-brand-amber-400 to-brand-emerald-400 rounded-full"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3 text-white text-xs">
          {/* Left Controls (Playback & Time) */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => seek(Math.max(0, currentTime - 10))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              title="رجوع 10 ثوانٍ"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => seek(Math.min(duration, currentTime + 10))}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              title="تقديم 10 ثوانٍ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (videoRef.current) {
                    videoRef.current.volume = val;
                    videoRef.current.muted = false;
                    setIsMuted(false);
                  }
                }}
                className="w-16 h-1 accent-brand-amber-400 cursor-pointer hidden sm:block"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-[11px] text-slate-300 font-mono">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls (Speed, Quality, Fullscreen) */}
          <div className="flex items-center gap-2">
            {/* Speed / Settings Selector */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold"
              >
                <Settings className="w-3.5 h-3.5 text-brand-amber-400" />
                <span>{playbackSpeed}x</span>
              </button>

              {showSettings && (
                <div className="absolute bottom-9 left-0 w-44 rounded-xl bg-brand-dark-900 border border-white/15 p-2 shadow-2xl space-y-2 z-50 text-xs animate-in fade-in">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">سرعة التشغيل:</span>
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSpeedChange(s)}
                          className={`py-1 rounded text-[10px] font-bold ${
                            playbackSpeed === s
                              ? "bg-brand-emerald-500 text-brand-dark-950"
                              : "bg-white/5 hover:bg-white/10 text-slate-300"
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1 border-t border-white/10">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">جودة البث المشفر:</span>
                    <div className="space-y-1">
                      {["1080p FHD (مشفر)", "720p HD", "480p SD"].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setSelectedQuality(q);
                            setShowSettings(false);
                          }}
                          className={`w-full text-right px-2 py-1 rounded text-[10px] flex items-center justify-between ${
                            selectedQuality === q
                              ? "bg-brand-emerald-500/20 text-brand-emerald-300 font-bold"
                              : "hover:bg-white/5 text-slate-400"
                          }`}
                        >
                          <span>{q}</span>
                          {selectedQuality === q && <CheckCircle2 className="w-3 h-3 text-brand-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
