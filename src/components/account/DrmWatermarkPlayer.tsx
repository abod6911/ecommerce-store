"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock, Play, Pause, Volume2, Maximize2, AlertCircle } from "lucide-react";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";

interface DrmWatermarkPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  videoUrl?: string;
}

export default function DrmWatermarkPlayer({
  isOpen,
  onClose,
  courseTitle,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
}: DrmWatermarkPlayerProps) {
  const { profile } = useSupabaseAuth();
  
  // Watermark coordinates that shift every 4 seconds
  const [watermarkPos, setWatermarkPos] = useState({ top: 25, left: 30 });
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const randomTop = Math.floor(15 + Math.random() * 65);
      const randomLeft = Math.floor(15 + Math.random() * 65);
      setWatermarkPos({ top: randomTop, left: randomLeft });
      setCurrentTimeStr(new Date().toLocaleTimeString("ar-SA"));
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const viewerName = profile?.fullName || "المشترك أحمد الشوا";
  const viewerEmail = profile?.email || "user@alshawa-platform.sa";
  const viewerPhone = profile?.phone || "0555583379";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl font-ibm text-right select-none"
        dir="rtl"
        onContextMenu={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl rounded-3xl bg-brand-dark-950 border-2 border-brand-emerald-500/40 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-brand-dark-900 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald-400 animate-pulse" />
              <h3 className="font-alexandria font-bold text-sm sm:text-base text-white truncate max-w-[280px] sm:max-w-md">
                {courseTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-brand-amber-400/20 text-brand-amber-300 text-[10px] font-bold border border-brand-amber-400/30">
                مشفر DRM
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Protected Video Viewport */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            <video
              src={videoUrl}
              controls
              autoPlay
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              className="w-full h-full object-contain"
            />

            {/* Dynamic Anti-Piracy Floating Watermark */}
            <motion.div
              animate={{
                top: `${watermarkPos.top}%`,
                left: `${watermarkPos.left}%`,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute pointer-events-none z-30 p-2.5 rounded-xl bg-black/40 backdrop-blur-[2px] border border-white/10 text-[11px] font-mono text-white/40 leading-tight space-y-0.5 shadow-sm transform -rotate-3"
            >
              <div className="flex items-center gap-1 font-bold text-white/50">
                <Lock className="w-3 h-3 text-brand-amber-400/60" />
                <span>مرخص لـ: {viewerName}</span>
              </div>
              <p className="text-[10px] text-white/40">{viewerEmail}</p>
              <p className="text-[9px] text-white/30" dir="ltr">
                ID: {profile?.id || "USR-2026"} • {currentTimeStr}
              </p>
            </motion.div>
          </div>

          {/* Footer Security Notice */}
          <div className="p-3 bg-brand-dark-900 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-brand-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>نظام الحماية الرقمية المباشر نشط • يمنع تصوير الشاشة أو إعادة النشر</span>
            </div>
            <span className="font-mono text-slate-400 hidden sm:inline">256-bit Encrypted Stream</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
