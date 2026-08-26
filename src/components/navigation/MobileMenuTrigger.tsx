"use client";

import React from "react";
import { motion } from "framer-motion";

interface MobileMenuTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export default function MobileMenuTrigger({
  isOpen,
  onClick,
  className = "",
}: MobileMenuTriggerProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={`relative w-11 h-11 rounded-2xl flex flex-col items-center justify-center gap-1.5 p-2 bg-white/5 hover:bg-white/10 border transition-all duration-300 z-50 ${
        isOpen
          ? "border-brand-amber-400/80 bg-brand-emerald-950/80 shadow-gold-glow"
          : "border-brand-emerald-500/30 hover:border-brand-amber-400/50 shadow-sm"
      } ${className}`}
      aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة الرئيسية"}
      aria-expanded={isOpen}
    >
      {/* Top Bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 7, backgroundColor: "#FBBF24" }
            : { rotate: 0, y: 0, backgroundColor: "#FFFFFF" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-5 h-[2.5px] rounded-full origin-center block"
      />

      {/* Middle Bar */}
      <motion.span
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1, backgroundColor: "#34D399" }
        }
        transition={{ duration: 0.18 }}
        className="w-5 h-[2.5px] rounded-full origin-center block"
      />

      {/* Bottom Bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -7, backgroundColor: "#FBBF24" }
            : { rotate: 0, y: 0, backgroundColor: "#FFFFFF" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-5 h-[2.5px] rounded-full origin-center block"
      />

      {/* Subtle Glow Pulse Ring */}
      <span className="absolute -inset-0.5 rounded-2xl bg-brand-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
}
