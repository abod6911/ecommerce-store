"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Play,
  Download,
  Truck,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  ExternalLink,
  ShieldCheck,
  User,
  Sparkles,
  ChevronLeft,
  MapPin,
  FileSpreadsheet
} from "lucide-react";
import { COURSES_DATA, BOOKS_DATA, INSTRUCTOR_INFO } from "@/data/mockData";
import { formatSAR } from "@/lib/utils";
import { useUserAuth } from "@/context/UserAuthContext";
import OrderTracking from "@/components/store/OrderTracking";
import CalendarSync from "@/components/booking/CalendarSync";

export default function DashboardPage() {
  const { user, activeBookings, shippingOrders } = useUserAuth();
  const [activeTab, setActiveTab] = useState<"courses" | "consultations" | "orders">("courses");

  const displayName = user?.username || "صالح العتيبي";
  const displayPhone = user?.phone || "555583379";

  return (
    <div className="min-h-screen bg-brand-dark-950 pt-32 pb-20 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Profile Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark-900 via-brand-dark-850 to-brand-emerald-950/40 border border-brand-emerald-500/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-right">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-amber-400 to-brand-emerald-500 p-[2px] shadow-gold-glow">
                <div className="w-full h-full rounded-[14px] bg-brand-dark-900 flex items-center justify-center font-alexandria font-bold text-white text-xl">
                  {displayName.slice(0, 1)}
                </div>
              </div>
              <span className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-brand-emerald-500 text-brand-dark-950 text-[10px] font-black flex items-center justify-center border-2 border-brand-dark-900">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-alexandria font-bold text-xl sm:text-2xl text-white leading-snug">
                  {displayName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-amber-400/20 text-brand-amber-300 border border-brand-amber-400/30 text-[10px] font-extrabold">
                  {user?.freelanceTier || "عضوية المشترك المعتمدة"}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono" dir="ltr">
                +966 {displayPhone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400">البرامج الفعالة</span>
              <span className="font-black text-brand-emerald-400 text-sm">2 دورات</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400">الاستشارات</span>
              <span className="font-black text-brand-amber-300 text-sm">{activeBookings.length} موعد</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-center">
              <span className="block text-[10px] text-slate-400">الشحنات</span>
              <span className="font-black text-white text-sm">{shippingOrders.length} طلب</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-brand-dark-900 border border-white/10 w-fit max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "courses"
                ? "bg-brand-emerald-600/30 text-brand-emerald-300 border border-brand-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>برامجي التعليمية المشفرة DRM (2)</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "consultations"
                ? "bg-brand-amber-500/20 text-brand-amber-300 border border-brand-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>مواعيدي واستشاراتي ({activeBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "orders"
                ? "bg-brand-emerald-600/30 text-brand-emerald-300 border border-brand-emerald-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>تتبع شحنات الكتب ({shippingOrders.length})</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES_DATA.map((c, idx) => {
                const progress = idx === 0 ? 65 : 20;
                return (
                  <div
                    key={c.id}
                    className="p-6 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-xl space-y-4 hover:border-brand-emerald-500/40 transition-all flex flex-col justify-between backdrop-blur-md text-right"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark-950 border border-white/10">
                        <img
                          src={c.thumbnail}
                          alt={c.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-transparent to-transparent" />
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-brand-emerald-500 text-brand-dark-950 text-[10px] font-black">
                          بث مشفر ومحمي DRM
                        </span>
                      </div>

                      <h3 className="font-alexandria font-bold text-base sm:text-lg text-white line-clamp-1 leading-snug">
                        {c.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>نسبة الإنجاز:</span>
                          <span className="text-brand-emerald-400 font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-amber-400 to-brand-emerald-400 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <Link
                        href={`/courses/${c.id}`}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-emerald-500 to-teal-600 text-brand-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-emerald-glow hover:brightness-110"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>متابعة المشاهدة المحمية</span>
                      </Link>

                      <button
                        onClick={() => alert("سيتم إصدار شهادتك المعتمدة فور إكمال المشاهدة بنسبة 100%.")}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                        title="تحميل الشهادة المعتمدة"
                      >
                        <Award className="w-4 h-4 text-brand-amber-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Consultations & Bookings */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            {activeBookings.length > 0 ? (
              activeBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 sm:p-8 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-2xl space-y-6 backdrop-blur-md text-right"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/30 text-[10px] font-bold">
                        موعد مؤكد ✓
                      </span>
                      <h3 className="font-alexandria font-bold text-lg text-white mt-2 leading-snug">
                        {b.sessionTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-amber-300 font-semibold mt-1">
                        {b.dateStr} - الساعة {b.timeSlot} ({b.deliveryLabel})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={b.zoomLink || "https://zoom.us"}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-110"
                      >
                        <Video className="w-4 h-4" />
                        <span>دخول قاعة الاجتماع</span>
                      </a>
                    </div>
                  </div>

                  {/* Calendar Sync Component */}
                  <CalendarSync
                    sessionTitle={b.sessionTitle}
                    deliveryType={b.deliveryLabel.includes("Zoom") ? "ONLINE_ZOOM" : "IN_PERSON"}
                    deliveryLabel={b.deliveryLabel}
                    dateStr={b.dateStr}
                    timeSlot={b.timeSlot}
                    zoomLink={b.zoomLink}
                    clientName={displayName}
                  />

                  {/* Intake Status */}
                  {b.intakeData && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-brand-emerald-400 font-bold">
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>بيانات المشروع المحفوظة للمستشار:</span>
                      </div>
                      <p className="text-slate-300"><strong>النشاط:</strong> {b.intakeData.businessField}</p>
                      <p className="text-slate-300"><strong>الحساب:</strong> {b.intakeData.socialLink}</p>
                      <p className="text-slate-400"><strong>التحدي:</strong> {b.intakeData.marketingChallenge}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs rounded-3xl bg-brand-dark-850 border border-white/10">
                لا توجد مواعيد استشارية حالية. يمكنك حجز جلستك الآن.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Order Tracking */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <OrderTracking />
          </div>
        )}
      </div>
    </div>
  );
}
