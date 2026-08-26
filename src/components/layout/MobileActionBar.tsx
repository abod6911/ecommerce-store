"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  PhoneCall,
  ShoppingBag,
  User,
  Sparkles,
  LayoutDashboard
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import { INSTRUCTOR_INFO } from "@/data/mockData";

export default function MobileActionBar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { profile, isAdmin, openAuthModal } = useSupabaseAuth();

  const handleWhatsApp = () => {
    const msg = `مرحباً، أود الاستفسار عن استشارات ودورات المستشار أحمد الشوا.`;
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark-950/95 backdrop-blur-2xl border-t border-brand-emerald-500/25 px-3 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] font-ibm" dir="rtl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* WhatsApp Consultation Quick Launcher */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 py-2.5 px-2 rounded-xl bg-brand-emerald-950 border border-brand-emerald-500/40 text-brand-emerald-300 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-all whitespace-nowrap"
        >
          <PhoneCall className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
          <span>واتساب</span>
        </button>

        {/* Primary Booking CTA */}
        <Link
          href="/#booking"
          className="flex-[1.5] py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 flex items-center justify-center gap-1.5 text-xs font-bold shadow-gold-glow active:scale-95 transition-all whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>احجز جلستك</span>
        </Link>

        {/* Cart Quick Trigger */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 active:scale-95 transition-all flex items-center justify-center shrink-0"
          aria-label="سلة المشتريات"
        >
          <ShoppingBag className="w-4 h-4 text-brand-amber-300" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-brand-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-gold-glow">
              {itemCount}
            </span>
          )}
        </button>

        {/* User Profile / Admin / Login Trigger */}
        {isAdmin ? (
          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-brand-amber-400/20 border border-brand-amber-400/50 text-brand-amber-300 active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-gold-glow"
            aria-label="لوحة الإدارة"
          >
            <LayoutDashboard className="w-4 h-4" />
          </Link>
        ) : profile ? (
          <Link
            href="/dashboard"
            className="p-2.5 rounded-xl bg-brand-emerald-500/20 border border-brand-emerald-500/40 text-brand-emerald-300 active:scale-95 transition-all flex items-center justify-center shrink-0"
            aria-label="حساب المشترك"
          >
            <div className="w-4 h-4 rounded-full bg-brand-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
              {profile.fullName.slice(0, 1)}
            </div>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 active:scale-95 transition-all flex items-center justify-center shrink-0"
            aria-label="تسجيل الدخول"
          >
            <User className="w-4 h-4 text-slate-300" />
          </button>
        )}
      </div>
    </div>
  );
}
