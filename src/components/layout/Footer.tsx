"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  ArrowUpLeft,
  Lock,
  Clock,
  Award,
  Send,
  FileText,
  X,
  CheckCircle2
} from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";
import { getAssetPath } from "@/lib/utils";

export default function Footer() {
  const [activePolicyModal, setActivePolicyModal] = useState<"REFUND" | "TERMS" | null>(null);

  return (
    <footer id="contact" className="bg-brand-dark-950 border-t border-white/10 relative overflow-hidden pt-20 pb-28 lg:pb-12 font-ibm" dir="rtl">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-emerald-950/40 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-white/10 text-right">
          {/* Col 1: Brand, Slogan & Official Freelance License Badge */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-black border-2 border-brand-amber-400/50 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
                <img
                  src={getAssetPath("/images/logo.jpg")}
                  alt="أحمد الشوا - الشعار الرسمي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-alexandria font-bold text-white text-lg leading-snug">أحمد الشوا</h3>
                <p className="text-xs text-brand-emerald-400 font-medium">{INSTRUCTOR_INFO.title}</p>
              </div>
            </div>

            <p className="text-xs text-brand-amber-300 font-bold italic">
              "{INSTRUCTOR_INFO.slogan}"
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              منصة تعليمية واستشارية متخصصة في تمكين رواد الأعمال وأصحاب المتاجر في السوق السعودي من بناء استراتيجيات تسويقية مربحة ومستدامة.
            </p>

            {/* Saudi Freelance License & TVTC Badges */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-emerald-500/10 text-brand-emerald-300 border border-brand-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <span>وثيقة عمل حر معتمدة (وزارة الموارد البشرية والتنمية الاجتماعية)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-dark-900 text-brand-amber-300 border border-brand-amber-400/30">
                <Award className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <span>{INSTRUCTOR_INFO.accreditation}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-alexandria font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-amber-400" />
              أقسام المنصة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/#about" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  عن المستشار والخبرات
                </Link>
              </li>
              <li>
                <Link href="/#books" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  الكتب الحصرية المطبوعة
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  برامج الماستر كلاس المشفرة DRM
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  حاسبة العائد الإعلاني الذكية
                </Link>
              </li>
              <li>
                <Link href="/#media" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  الظهور الإعلامي (العربية وبانوراما FM)
                </Link>
              </li>
              <li>
                <Link href="/#booking" className="hover:text-brand-amber-300 transition-colors flex items-center gap-2">
                  <ArrowUpLeft className="w-3.5 h-3.5 text-slate-500" />
                  حجز جلسة استشارية (حضورية / Zoom)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info & Jeddah Location */}
          <div className="space-y-4">
            <h4 className="font-alexandria font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-emerald-400" />
              معلومات الاتصال والمقر
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-emerald-400 shrink-0 mt-1" />
                <span>{INSTRUCTOR_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <a href={`tel:${INSTRUCTOR_INFO.phoneRaw}`} dir="ltr" className="hover:text-white transition-colors font-medium">
                  {INSTRUCTOR_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                <a href={`mailto:${INSTRUCTOR_INFO.email}`} className="hover:text-white transition-colors font-medium">
                  {INSTRUCTOR_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-amber-400 shrink-0" />
                <span>متاح للمواعيد والاستشارات: السبت - الخميس</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Social Handles & Policies */}
          <div className="space-y-4">
            <h4 className="font-alexandria font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-amber-400" />
              الحسابات الرسمية والسياسات
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Instagram */}
              <a
                href={INSTRUCTOR_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-brand-emerald-500/20 text-slate-300 hover:text-brand-emerald-300 border border-white/10 flex items-center gap-1.5 transition-colors text-xs font-semibold"
              >
                <span>إنستغرام</span>
              </a>

              {/* Threads */}
              <a
                href={INSTRUCTOR_INFO.socials.threads}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-brand-emerald-500/20 text-slate-300 hover:text-brand-emerald-300 border border-white/10 flex items-center gap-1.5 transition-colors text-xs font-semibold"
              >
                <span>ثريدز</span>
              </a>

              {/* Snapchat */}
              <a
                href={INSTRUCTOR_INFO.socials.snapchat}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-1.5 transition-colors text-xs font-semibold"
              >
                <span>سناب شات</span>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={INSTRUCTOR_INFO.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full px-3 py-2 rounded-xl bg-brand-emerald-600/30 text-brand-emerald-400 border border-brand-emerald-500/40 flex items-center justify-center gap-2 hover:bg-brand-emerald-600/50 transition-colors text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>

            {/* Policy Buttons */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setActivePolicyModal("REFUND")}
                className="hover:text-brand-amber-300 underline transition-colors"
              >
                سياسة الإلغاء والاسترجاع
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setActivePolicyModal("TERMS")}
                className="hover:text-brand-amber-300 underline transition-colors"
              >
                الشروط والسرية
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Compliance Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-xs">
              مدى MADA
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-xs">
               Apple Pay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-xs">
              VISA / MasterCard
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/30 font-bold text-xs">
              الدفع عند الاستلام بجدة (COD)
            </span>
          </div>

          <p className="text-center sm:text-right text-xs">
            جميع الحقوق محفوظة © 2026 للمستشار أحمد محمد الشوا | وثيقة عمل حر معتمدة
          </p>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-ibm text-right" dir="rtl">
          <div className="relative w-full max-w-lg rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/40 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-alexandria font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-amber-400" />
                <span>
                  {activePolicyModal === "REFUND"
                    ? "سياسة الإلغاء والاسترجاع (Refund Policy)"
                    : "الشروط والأحكام وسرية المعلومات"}
                </span>
              </h3>
              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-80 overflow-y-auto pr-1">
              {activePolicyModal === "REFUND" ? (
                <>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-brand-amber-300 text-xs">1. الجلسات الاستشارية (حضورياً وعن بُعد):</h5>
                    <p className="text-xs text-slate-300">
                      يحق للعميل إلغاء أو إعادة جدولة موعد الجلسة مجاناً بالكامل حتى 24 ساعة قبل الموعد المحدد. في حال الإلغاء قبل أقل من 24 ساعة يتم خصم 30% من قيمة الحجز.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-brand-amber-300 text-xs">2. الكتب المطبوعة والمنتجات الملموسة:</h5>
                    <p className="text-xs text-slate-300">
                      يمكن استرجاع أو استبدال الكتب الورقية في حال وجود أي عيب في الطباعة أو التغليف خلال 7 أيام من تاريخ الاستلام مع تحملنا لكافة تكاليف الشحن.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-brand-amber-300 text-xs">3. البرامج التدريبية والدورات المرئية المشفرة (DRM):</h5>
                    <p className="text-xs text-slate-300">
                      نظراً للطبيعة الفورية والخاصة للمحتوى الرقمي المشفر والمحمي بحقوق الملكية، فإن الدورات غير قابلة للاسترجاع بعد تفعيل كود المشاهدة الخاص بالمشترك.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-brand-emerald-400 text-xs">1. سرية بيانات المشاريع (NDA):</h5>
                    <p className="text-xs text-slate-300">
                      يلتزم المستشار أحمد الشوا بالحفاظ على السرية التامة لكافة البيانات المالية والتسويقية وخطط العمل التي يشاركها العميل أثناء الجلسات الاستشارية.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-brand-emerald-400 text-xs">2. الاعتماد النظامي:</h5>
                    <p className="text-xs text-slate-300">
                      المنصة تعمل بموجب وثيقة عمل حر رسمية معتمدة من وزارة الموارد البشرية والتنمية الاجتماعية ومسجلة نظامياً بالمملكة العربية السعودية.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="w-full py-3 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs transition-colors"
              >
                فهمت وموافق
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
