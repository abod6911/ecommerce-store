"use client";

import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import { getAssetPath } from "@/lib/utils";

export default function RealAuthModal() {
  const { isAuthModalOpen, closeAuthModal, signIn, signUp, setAdminRole } = useSupabaseAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const res = await signIn(loginIdentifier, loginPassword || "password123");
    setIsLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "تعذر تسجيل الدخول. يرجى التحقق من البيانات.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formattedPhone = regPhone.startsWith("05") ? regPhone : `05${regPhone}`;
    const res = await signUp(regName, regEmail, formattedPhone, regPassword || "password123");
    setIsLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "تعذر إنشاء الحساب. يرجى التأكد من صحة البريد ورقم الجوال.");
    }
  };

  const handleAdminQuickLogin = () => {
    setAdminRole(true);
    closeAuthModal();
  };

  const handleVipQuickLogin = () => {
    setAdminRole(false);
    closeAuthModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-ibm text-right" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/50 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-5 sm:space-y-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black border border-brand-amber-400/40 p-0.5 shadow-gold-glow mx-auto flex items-center justify-center">
              <img
                src={getAssetPath("/images/logo.jpg")}
                alt="أحمد الشوا"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-alexandria font-bold text-lg text-white">
                {tab === "login" ? "تسجيل الدخول للمنصة" : "إنشاء حساب مشترك جديد"}
              </h3>
              <p className="text-xs text-slate-400">
                منصة المستشار أحمد الشوا للكتب والاستشارات والماستر كلاس
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-brand-dark-950 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setErrorMsg("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === "login"
                  ? "bg-brand-amber-400 text-slate-950 shadow-gold-glow font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("register");
                setErrorMsg("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === "register"
                  ? "bg-brand-emerald-500 text-brand-dark-950 shadow-emerald-glow font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              حساب جديد
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Content */}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  البريد الإلكتروني أو رقم الجوال السعودي:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="name@example.com أو 05xxxxxxxx"
                    className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-ibm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-300">كلمة المرور:</label>
                  <span className="text-[10px] text-brand-amber-300 cursor-pointer hover:underline">
                    نسيت كلمة المرور؟
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3.5 left-3.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{isLoading ? "جاري التحقق..." : "دخول مباشر للمنصة"}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">الاسم الكامل:</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="مثال: صالح العتيبي"
                    className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">البريد الإلكتروني:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@company.sa"
                    className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">رقم الجوال السعودي:</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[11px] font-mono font-bold text-brand-amber-400 pointer-events-none" dir="ltr">
                    +966 🇸🇦
                  </span>
                  <Phone className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="0555583379"
                    maxLength={10}
                    className="w-full pr-9 pl-20 py-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300 block">كلمة المرور:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="6 خانات على الأقل"
                    minLength={6}
                    className="w-full pr-9 pl-10 py-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 left-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-emerald-500 to-teal-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-emerald-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-2"
              >
                <span>{isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب المشترك وتفعيله"}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Credentials Footer */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] text-slate-400 block text-center">
              وصول تجريبي سريع بنقرة واحدة:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdminQuickLogin}
                className="py-2 px-2.5 rounded-xl bg-brand-amber-500/10 hover:bg-brand-amber-500/20 text-brand-amber-300 border border-brand-amber-400/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-amber-400" />
                <span>دخول كمدير المنصة ⚡</span>
              </button>

              <button
                type="button"
                onClick={handleVipQuickLogin}
                className="py-2 px-2.5 rounded-xl bg-brand-emerald-500/10 hover:bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-brand-emerald-400" />
                <span>دخول كمشترك VIP 👤</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
