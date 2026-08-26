"use client";

import React, { useState } from "react";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";
import { motion } from "framer-motion";

import { useSupabaseAuth } from "@/context/SupabaseAuthContext";

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, authenticateAdmin, adminPin } = useAdmin();
  const { isAdmin: isSupabaseAdmin, profile } = useSupabaseAuth();
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isUnlocked = isAdminAuthenticated || isSupabaseAdmin;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authenticateAdmin(pinInput);
    if (!success) {
      setErrorMsg("رمز الحماية غير صحيح. الرمز التجريبي هو: 8899 أو 2026");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-brand-dark-950 flex items-center justify-center p-4 font-ibm text-right" dir="rtl">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/50 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black border-2 border-brand-amber-400/50 p-0.5 shadow-gold-glow mx-auto flex items-center justify-center">
              <img
                src="/images/logo.jpg"
                alt="أحمد الشوا"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-alexandria font-bold text-lg text-white">
                بوابة الإدارة والعمليات المركزية
              </h2>
              <p className="text-xs text-brand-emerald-400 mt-0.5">
                منصة المستشار أحمد الشوا (لوحة التحكم المحمية)
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                أدخل رمز الحماية السري (Admin Security PIN)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="••••"
                  maxLength={6}
                  className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-center text-lg font-mono tracking-widest text-brand-amber-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all"
                />
              </div>
              <span className="text-[10px] text-slate-500 block text-center">
                الرمز الافتراضي المعتمد للوصول الفوري: <strong className="text-brand-amber-300 font-mono">8899</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
            >
              <Lock className="w-4 h-4 shrink-0 text-slate-950" />
              <span>فتح لوحة التحكم ⚡</span>
              <ArrowLeft className="w-4 h-4 shrink-0" />
            </button>
          </form>

          <div className="pt-3 border-t border-white/10 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-emerald-400" />
            <span>جلسة إدارة مشفرة ومحمية بنظام التحقق الداخلي</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark-950 flex font-ibm text-slate-100" dir="rtl">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </AdminProvider>
  );
}
