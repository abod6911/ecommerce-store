"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Award,
  ChevronLeft,
  LayoutDashboard,
  ExternalLink,
  MessageCircle,
  User,
  LogOut
} from "lucide-react";
import { MOBILE_NAV_ITEMS, MobileNavItem } from "./NavItems";
import {
  backdropVariants,
  drawerVariants,
  menuItemVariants,
  footerVariants,
} from "./MotionVariants";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import { getAssetPath } from "@/lib/utils";
import { INSTRUCTOR_INFO } from "@/data/mockData";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { profile, isAdmin, isSuperAdmin, openAuthModal, signOut } = useSupabaseAuth();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  const handleWhatsApp = () => {
    onClose();
    const msg = "مرحباً المستشار أحمد الشوا، أود الاستفسار عن برامجك الاستشارية والتدريبية.";
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden font-ibm text-right select-none" dir="rtl">
          {/* 1. Frosted Glass Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
          />

          {/* 2. Drawer Surface (Right-to-Left Slide-in with Touch Swipe-to-Dismiss) */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={{ left: 0, right: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 70 || info.velocity.x > 250) {
                onClose();
              }
            }}
            className="absolute top-0 right-0 bottom-0 w-[86vw] max-w-[340px] h-[100dvh] bg-gradient-to-b from-brand-dark-950 via-brand-dark-900 to-brand-dark-950 border-l border-brand-emerald-500/30 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Corner Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6 space-y-5 relative z-10 overscroll-contain">
              {/* Drawer Top Bar: Brand & Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border-2 border-brand-amber-400/60 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
                    <img
                      src={getAssetPath("/images/logo.jpg")}
                      alt="أحمد الشوا"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-alexandria font-bold text-sm text-white">
                        أحمد الشوا
                      </h2>
                      <span className="w-2 h-2 rounded-full bg-brand-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-brand-emerald-300 font-medium">
                      مستشار ومدرب تسويق معتمد
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Account / Role Quick Card */}
              {profile ? (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-gold-glow">
                      {profile.fullName.slice(0, 1)}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white truncate max-w-[130px]">
                        {profile.fullName}
                      </p>
                      <p className="text-[10px] text-brand-emerald-400">
                        {isSuperAdmin ? "Super Admin" : isAdmin ? "مسؤول النظام" : "مشترك معتمد"}
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30 transition-colors"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openAuthModal("login");
                  }}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-alexandria font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-brand-amber-400" />
                  <span>تسجيل الدخول / إنشاء حساب</span>
                </button>
              )}

              {/* Admin Link if Logged in */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-brand-amber-500/20 to-brand-amber-600/20 border border-brand-amber-400 text-brand-amber-300 shadow-gold-glow"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-brand-amber-400" />
                    <span className="font-alexandria font-bold text-xs">
                      لوحة الإدارة والعمليات المركزية
                    </span>
                  </div>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              )}

              {/* Staggered Navigation Items */}
              <nav className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase px-2 block pb-1">
                  أقسام المنصة
                </span>

                {MOBILE_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <motion.div key={item.id} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-brand-emerald-950/90 border border-brand-amber-400/60 text-white shadow-sm"
                            : "hover:bg-white/5 text-slate-200 border border-transparent"
                        }`}
                      >
                        {/* Active Gold Indicator Bar on Right */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l-full bg-gradient-to-b from-brand-amber-300 to-brand-amber-500 shadow-gold-glow"
                          />
                        )}

                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-brand-amber-400 text-slate-950 shadow-gold-glow font-bold"
                              : "bg-white/5 text-brand-emerald-400 group-hover:bg-white/10 group-hover:text-brand-amber-300"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="text-right">
                            <span className="font-alexandria font-bold text-xs block text-white group-hover:text-brand-amber-300 transition-colors">
                              {item.label}
                            </span>
                            {item.subLabel && (
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {item.subLabel}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Badges / Arrow */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                              item.badgeColor === "gold"
                                ? "bg-brand-amber-400 text-slate-950 shadow-sm"
                                : item.badgeColor === "emerald"
                                ? "bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40"
                                : "bg-brand-amber-400/20 text-brand-amber-300 border border-brand-amber-400/40"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* 3. Drawer Sticky Footer: CTAs, WhatsApp, Socials & TVTC Badge */}
            <motion.div
              variants={footerVariants}
              className="p-4 border-t border-white/10 bg-brand-dark-950/98 backdrop-blur-xl space-y-2.5 relative z-10 shrink-0"
            >
              {/* Primary Glowing Gold CTA */}
              <Link
                href="/#booking"
                onClick={onClose}
                className="w-full py-3 px-3.5 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all text-center"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>احجز جلستك الاستشارية ⚡</span>
              </Link>

              {/* Quick WhatsApp Launcher with Live Pulse Green Dot */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-brand-emerald-950/80 border border-brand-emerald-500/40 text-brand-emerald-300 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald-500" />
                </span>
                <PhoneCall className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                <span>تواصل عبر الواتساب (0555583379)</span>
              </button>

              {/* TVTC Trust Badge */}
              <div className="pt-1.5 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                <span>اعتماد TVTC • وثيقة العمل الحر</span>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
