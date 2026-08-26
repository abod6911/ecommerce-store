"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserAuth } from "@/context/UserAuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useUserAuth();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("يرجى إدخال اسم المستخدم.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      setError("يرجى إدخال رقم جوال سعودي صحيح (مثال: 555583379).");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      login(username, phone, email);
      setIsLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-ibm" dir="rtl">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="fixed inset-0"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/40 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 text-right space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-brand-amber-400/50 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
                  <img
                    src="/images/logo.jpg"
                    alt="أحمد الشوا"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">
                    تسجيل الدخول السريع
                  </h3>
                  <p className="text-[11px] text-brand-emerald-400 font-medium">
                    لوحة المشترك ومتابعة الدورات والاستشارات
                  </p>
                </div>
              </div>

              <button
                onClick={closeAuthModal}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  اسم المشترك / المستخدم *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="مثال: م. فهد الشمري"
                    className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Saudi Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  رقم الجوال والواتساب *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute right-3.5 flex items-center gap-1.5 pointer-events-none text-slate-400 text-xs font-semibold">
                    <span className="text-sm">🇸🇦</span>
                    <span className="font-mono text-[11px] text-brand-amber-300">+966</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="555583379"
                    className="w-full pr-24 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-500 block">
                  يُستخدم الرقم لتسجيل الدخول الفوري وتأكيد الطلبات والاستشارات.
                </span>
              </div>

              {/* Optional Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-slate-950" />
                  <span>{isLoading ? "جاري تسجيل الدخول..." : "دخول إلى المنصة ⚡"}</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </form>

            {/* Trust Footer */}
            <div className="pt-3 border-t border-white/10 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
              <span>جلسة مشفرة وآمنة محفوظة على جهازك تلقائياً</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
