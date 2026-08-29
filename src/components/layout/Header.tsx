"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
  LogOut,
  ChevronDown,
  Package,
  Layers,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import { getAssetPath } from "@/lib/utils";
import MobileMenuTrigger from "@/components/navigation/MobileMenuTrigger";
import MobileNavDrawer from "@/components/navigation/MobileNavDrawer";

export default function Header() {
  const { itemCount, setIsCartOpen } = useCart();
  const { profile, isAdmin, openAuthModal, signOut } = useSupabaseAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark-950/90 backdrop-blur-2xl border-b border-brand-emerald-500/20 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Brand Logo & Title with Official Calligraphic Emblem */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-black border-2 border-brand-amber-400/50 shadow-gold-glow group-hover:scale-105 transition-transform flex items-center justify-center p-0.5">
                <img
                  src={getAssetPath("/images/logo.jpg")}
                  alt="أحمد الشوا - الشعار الرسمي"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-brand-emerald-500 border-2 border-brand-dark-950 flex items-center justify-center text-[8px] text-brand-dark-950 font-black" title="مدرب معتمد TVTC">
                ✓
              </span>
            </div>

            <div className="flex flex-col text-right">
              <div className="flex items-center gap-2">
                <span className="font-alexandria font-bold text-white text-base sm:text-lg group-hover:text-brand-amber-300 transition-colors whitespace-nowrap">
                  أحمد الشوا
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/30 whitespace-nowrap">
                  TVTC معتمد
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                مستشار ومدرب تسويق رقمي
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-slate-200 shrink-0">
            <Link
              href="/"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              الرئيسية
            </Link>
            <Link
              href="/#about"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              عن المستشار
            </Link>
            <Link
              href="/#books"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              المتجر والكتب
            </Link>
            <Link
              href="/#courses"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              الدورات المحمية
            </Link>
            <Link
              href="/#calculator"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              حاسبة العائد
            </Link>
            <Link
              href="/#booking"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              اللقاءات والاستشارات
            </Link>
            <Link
              href="/#media"
              className="hover:text-brand-amber-300 transition-colors py-1 whitespace-nowrap border-b-2 border-transparent hover:border-brand-amber-400"
            >
              الظهور الإعلامي
            </Link>
          </nav>

          {/* 3. Actions: Admin Link + Cart + User Profile / Auth Modal + Booking CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Direct Glowing Admin Badge if Logged In as Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-amber-500/20 to-brand-amber-600/20 border border-brand-amber-400 text-brand-amber-300 text-xs font-bold shadow-gold-glow animate-pulse hover:brightness-125 transition-all shrink-0"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>لوحة الإدارة ⚡</span>
              </Link>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="سلة الشراء"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors shrink-0"
            >
              <ShoppingBag className="w-5 h-5 text-brand-amber-400" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-emerald-500 text-brand-dark-950 text-xs font-black flex items-center justify-center animate-bounce shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Profile / Supabase Auth State Dropdown */}
            {profile ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center">
                    {profile.fullName.slice(0, 1)}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline-block">
                    {profile.fullName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-brand-dark-900 border border-brand-amber-400/40 p-2 shadow-2xl backdrop-blur-2xl z-50 text-right space-y-1">
                    <div className="p-3 border-b border-white/10 text-xs space-y-0.5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-white truncate">{profile.fullName}</p>
                        {isAdmin && (
                          <span className="px-1.5 py-0.5 rounded bg-brand-amber-400 text-slate-950 font-black text-[9px]">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono" dir="ltr">
                        {profile.email}
                      </p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-brand-amber-300 font-bold bg-brand-amber-400/10 hover:bg-brand-amber-400/20 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-amber-400" />
                        <span>بوابة العمليات المركزية</span>
                      </Link>
                    )}

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white font-bold bg-white/10 hover:bg-white/15 transition-colors"
                    >
                      <User className="w-4 h-4 text-brand-amber-400" />
                      <span>الملف الشخصي والأمان</span>
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-brand-emerald-400" />
                      <span>دوراتي والماستر كلاس</span>
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-brand-amber-400" />
                      <span>حجوزاتي واستشاراتي</span>
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Package className="w-4 h-4 text-brand-emerald-400" />
                      <span>كتبي وشحناتي والفواتير</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold whitespace-nowrap transition-colors shrink-0"
              >
                <User className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                <span>تسجيل الدخول / حساب جديد</span>
              </button>
            )}

            {/* Booking CTA Button */}
            <Link
              href="/#booking"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm whitespace-nowrap shadow-gold-glow hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>احجز جلستك الاستشارية</span>
            </Link>

            {/* Animated Morphing Mobile Menu Trigger Button */}
            <div className="lg:hidden shrink-0">
              <MobileMenuTrigger
                isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* High-End RTL Animated Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
