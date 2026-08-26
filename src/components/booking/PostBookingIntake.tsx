"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Building,
  Share2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Send,
  HelpCircle
} from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";

interface PostBookingIntakeProps {
  onComplete: (data: { businessField: string; socialLink: string; marketingChallenge: string }) => void;
  initialField?: string;
}

const BUSINESS_FIELDS = [
  "متجر إلكتروني وتجارة رقمية",
  "عقارات وتطوير ومقاولات",
  "خدمات واستشارات مهنية VIP",
  "عيادات ومراكز طبية وتجميل",
  "مطاعم وكافيهات وضيافة",
  "تجزئة ومنتجات استهلاكية",
  "نشاط آخر / شركة ناشئة",
];

export default function PostBookingIntake({ onComplete, initialField = BUSINESS_FIELDS[0] }: PostBookingIntakeProps) {
  const [businessField, setBusinessField] = useState(initialField);
  const [socialLink, setSocialLink] = useState("");
  const [marketingChallenge, setMarketingChallenge] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketingChallenge.trim()) {
      alert("يرجى كتابة التحدي التسويقي أو الهدف من الجلسة لمساعدة المستشار في التحضير.");
      return;
    }
    setIsSaved(true);
    onComplete({
      businessField,
      socialLink,
      marketingChallenge,
    });
  };

  if (isSaved) {
    return (
      <div className="p-6 rounded-2xl bg-brand-emerald-950/80 border border-brand-emerald-500/40 text-right space-y-2 animate-in fade-in-50">
        <div className="flex items-center gap-2 text-brand-emerald-400 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 text-brand-amber-400" />
          <span>تم حفظ بيانات المشروع وتجهيز ملف الجلسة الاستشارية!</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          يقوم المستشار أحمد الشوا حالياً بمراجعة حساباتك وتحدي مشروعك لإعداد خطة العمل المخصصة قبل الموعد.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-brand-dark-900 border border-brand-amber-400/40 p-5 sm:p-6 text-right space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-brand-amber-400" />
          <h4 className="font-alexandria font-bold text-xs sm:text-sm text-white">
            استمارة التحضير المسبق للجلسة (Pre-Consultation Intake)
          </h4>
        </div>
        <span className="text-[10px] text-brand-amber-300 font-bold px-2 py-0.5 rounded-full bg-brand-amber-400/10">
          خطوة هامة لتعظيم الفائدة
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        يرجى تزويدنا بهذه المعلومات البسيطة ليقوم المستشار أحمد الشوا بفحص متجرك أو نشاطك قبل بدء الجلسة:
      </p>

      {/* Field 1: Business Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 block">
          1. مجال المشروع أو النشاط التجاري:
        </label>
        <select
          value={businessField}
          onChange={(e) => setBusinessField(e.target.value)}
          className="w-full px-3.5 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all cursor-pointer"
        >
          {BUSINESS_FIELDS.map((field) => (
            <option key={field} value={field} className="bg-brand-dark-900 text-white">
              {field}
            </option>
          ))}
        </select>
      </div>

      {/* Field 2: Social / Website Link */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 block">
          2. رابط المتجر أو حساب المشروع (انستغرام / تيك توك / إكس / سناب شات):
        </label>
        <div className="relative">
          <Share2 className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5 pointer-events-none" />
          <input
            type="text"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            placeholder="مثال: https://instagram.com/myproject أو @myproject"
            className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Field 3: Marketing Challenge & Budget */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 block">
          3. ما هو التحدي التسويقي الأكبر الذي تريد حله في هذه الجلسة؟ *
        </label>
        <textarea
          required
          rows={3}
          value={marketingChallenge}
          onChange={(e) => setMarketingChallenge(e.target.value)}
          placeholder="مثال: لدي متجر عطور وحملاتي على تيك توك تحقق مشاهدات دون مبيعات كافية، وميزانيتي 15,000 ر.س شهرياً..."
          className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all leading-relaxed resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-emerald-glow transition-all active:scale-95"
        >
          <Send className="w-4 h-4 shrink-0" />
          <span>إرسال وتثبيت بيانات المشروع للمستشار</span>
        </button>
      </div>
    </form>
  );
}
