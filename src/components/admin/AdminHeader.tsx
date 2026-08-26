"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Clock,
  MessageCircle,
  Menu,
  ShieldCheck,
  Sparkles,
  Globe
} from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";
import { useAdmin } from "@/context/AdminContext";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onToggleMobileSidebar?: () => void;
}

export default function AdminHeader({ title, subtitle, onToggleMobileSidebar }: AdminHeaderProps) {
  const { metrics } = useAdmin();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Riyadh",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppQuickSupport = () => {
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}`, "_blank");
  };

  return (
    <header className="p-4 sm:p-6 bg-brand-dark-950/80 border-b border-white/10 backdrop-blur-xl flex items-center justify-between gap-4 font-ibm text-right sticky top-0 z-30" dir="rtl">
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="font-alexandria font-bold text-lg sm:text-xl text-white leading-snug">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Makkah Time */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
          <Clock className="w-3.5 h-3.5 text-brand-emerald-400" />
          <span>مكة: {timeStr || "جاري..."}</span>
        </div>

        {/* WhatsApp Quick Launcher */}
        <button
          type="button"
          onClick={handleWhatsAppQuickSupport}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-emerald-600/20 hover:bg-brand-emerald-600/30 text-brand-emerald-300 border border-brand-emerald-500/30 text-xs font-bold transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-brand-emerald-400" />
          <span>واتساب المستشار</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="التنبيهات والطلبات الجديدة"
          >
            <Bell className="w-4 h-4" />
            {metrics.pendingDeliveryCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-gold-glow">
                {metrics.pendingDeliveryCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
