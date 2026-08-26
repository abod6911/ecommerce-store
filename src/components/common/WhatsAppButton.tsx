"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles, CheckCheck } from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const handleSendWhatsApp = (text?: string) => {
    const message = text || customMsg || "مرحباً، أود الاستفسار بخصوص البرامج التدريبية والاستشارات التسويقية مع المستشار أحمد الشوا.";
    const url = `https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-ibm" dir="rtl">
      {/* Expanded Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-brand-dark-900 border border-brand-emerald-500/40 shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-emerald-900 via-brand-emerald-800 to-brand-emerald-950 p-4 border-b border-brand-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-amber-400/20 border border-brand-amber-400/50 flex items-center justify-center font-alexandria font-black text-brand-amber-300 text-sm">
                  أ.ش
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-brand-dark-900" />
              </div>
              <div className="text-right">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  المستشار أحمد الشوا
                  <Sparkles className="w-3.5 h-3.5 text-brand-amber-400" />
                </h4>
                <p className="text-[11px] text-brand-emerald-300 flex items-center gap-1">
                  مدرب معتمد TVTC • رد فوري
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-brand-dark-950/90 text-xs text-right">
            <div className="bg-brand-dark-850 border border-white/10 p-3.5 rounded-xl text-slate-200 leading-relaxed shadow-sm">
              <p className="font-semibold text-brand-amber-300 mb-1">أهلاً بك! "التسويق أساس نجاح أي مشروع" 👋</p>
              <p>كيف يمكننا خدمتك اليوم؟ تواصل معنا مباشرة عبر الواتساب للرد الفوري على استفساراتك.</p>
              <span className="block text-[10px] text-slate-400 mt-2 text-left flex items-center justify-end gap-1">
                الآن <CheckCheck className="w-3.5 h-3.5 text-brand-emerald-400" />
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleSendWhatsApp("مرحباً، أود الاستفسار عن حجز جلسة استشارية حضورية في جدة مع المستشار أحمد الشوا.")}
                className="w-full text-right p-2.5 rounded-lg bg-white/5 hover:bg-brand-emerald-500/15 text-slate-300 hover:text-brand-emerald-200 border border-white/10 text-xs transition-colors"
              >
                📍 حجز جلسة استشارية حضورية في جدة
              </button>
              <button
                onClick={() => handleSendWhatsApp("مرحباً، أود الاستفسار عن حجز جلسة استشارية أونلاين عبر Zoom.")}
                className="w-full text-right p-2.5 rounded-lg bg-white/5 hover:bg-brand-emerald-500/15 text-slate-300 hover:text-brand-emerald-200 border border-white/10 text-xs transition-colors"
              >
                💻 حجز استشارة استراتيجية أونلاين عن بُعد
              </button>
              <button
                onClick={() => handleSendWhatsApp("مرحباً، أود طلب نسخة من كتاب استراتيجيات التسويق الرقمي مع التوصيل لجدة.")}
                className="w-full text-right p-2.5 rounded-lg bg-white/5 hover:bg-brand-emerald-500/15 text-slate-300 hover:text-brand-emerald-200 border border-white/10 text-xs transition-colors"
              >
                📚 طلب كتاب استراتيجيات التسويق الرقمي
              </button>
            </div>

            {/* Input & Send */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
                placeholder="اكتب استفسارك المباشر هنا..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-brand-dark-850 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-emerald-400"
              />
              <button
                onClick={() => handleSendWhatsApp()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-brand-emerald-500 to-brand-emerald-600 text-brand-dark-950 font-bold hover:brightness-110 active:scale-95 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="تواصل عبر الواتساب"
        className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-2xl hover:shadow-emerald-glow active:scale-95 transition-all duration-300 border border-emerald-300/30"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-70 blur animate-pulse" />
        <MessageCircle className="w-6 h-6 shrink-0 relative z-10" />
        <span className="hidden sm:inline font-bold text-xs relative z-10">
          واتساب المستشار (+966555583379)
        </span>
      </button>
    </div>
  );
}
