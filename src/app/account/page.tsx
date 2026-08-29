"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  ShieldCheck,
  Award,
  Play,
  Download,
  Truck,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  MapPin,
  FileSpreadsheet,
  KeyRound,
  Crown,
  Users,
  Settings,
  Lock,
  Phone,
  Mail,
  Building,
  RefreshCw,
  Eye,
  Check,
  AlertCircle
} from "lucide-react";
import { COURSES_DATA, BOOKS_DATA, INSTRUCTOR_INFO } from "@/data/mockData";
import { formatSAR, getAssetPath } from "@/lib/utils";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";
import { useUserAuth } from "@/context/UserAuthContext";
import DigitalInvoiceModal, { InvoiceData } from "@/components/account/DigitalInvoiceModal";
import DrmWatermarkPlayer from "@/components/account/DrmWatermarkPlayer";
import AdminDelegationModal from "@/components/account/AdminDelegationModal";
import { SkeletonCard, SkeletonRow } from "@/components/common/SkeletonLoader";
import { updateUserProfile } from "@/app/actions/admin-actions";
import { soundFx } from "@/lib/audio-feedback";

type AccountTab = "profile" | "courses" | "orders" | "consultations" | "delegation";

export default function AccountPage() {
  const { profile, isAdmin, isSuperAdmin, updateProfileLocal, setSuperAdminRole, setAdminRole } = useSupabaseAuth();
  const { activeBookings, shippingOrders } = useUserAuth();

  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [isLoadingUI, setIsLoadingUI] = useState(false);

  // Profile Edit State
  const [fullName, setFullName] = useState(profile?.fullName || "صالح العتيبي");
  const [phone, setPhone] = useState(profile?.phone || "0554819203");
  const [email, setEmail] = useState(profile?.email || "saleh.otaibi@gmail.com");
  const [city, setCity] = useState(profile?.city || "الرياض");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

  // Modals
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

  const [delegationModalOpen, setDelegationModalOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setPhone(profile.phone);
      setEmail(profile.email);
      setCity(profile.city || "جدة");
    }
  }, [profile]);

  const handleTabChange = (tab: AccountTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    soundFx.playClick();

    if (profile?.id) {
      await updateUserProfile(profile.id, {
        fullName,
        phone,
        city,
        email,
      });
    }

    updateProfileLocal({ fullName, phone, city, email });
    setIsSavingProfile(false);
    setProfileSuccessMsg("تم حفظ وتحديث بيانات الملف الشخصي بنجاح! ✨");
    soundFx.playSuccess();

    setTimeout(() => {
      setProfileSuccessMsg("");
    }, 4000);
  };

  const openInvoiceForOrder = (order: any) => {
    soundFx.playClick();
    const itemTitle = (order.items && order.items[0]) || order.bookTitle || "كتاب استراتيجيات التسويق الرقمي (النسخة المطبوعة المعتمدة)";
    const inv: InvoiceData = {
      orderNumber: order.orderNumber || "SHW-1082",
      invoiceNumber: `INV-${order.orderNumber || "SHW-1082"}`,
      dateStr: order.createdAt ? new Date(order.createdAt).toLocaleDateString("ar-SA") : new Date().toLocaleDateString("ar-SA"),
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      shippingAddress: order.address || "حي الروضة، طريق الملك عبد العزيز",
      city: order.recipientCity || order.city || city,
      items: [
        {
          title: itemTitle,
          type: "BOOK",
          price: order.totalPrice || 185,
          quantity: 1,
        },
      ],
      subtotal: order.totalPrice || 185,
      vatAmount: Math.round((order.totalPrice || 185) * 0.15 * 100) / 100,
      shippingCost: 0,
      total: Math.round(((order.totalPrice || 185) * 1.15) * 100) / 100,
      paymentMethod: "بطاقة مدى (Mada)",
      paymentStatus: "PAID",
      trackingCode: order.trackingNumber || order.trackingCode || "SMSA-KSA-994821",
    };
    setSelectedInvoice(inv);
    setInvoiceModalOpen(true);
  };

  const openPlayer = (title: string) => {
    soundFx.playClick();
    setSelectedCourseTitle(title);
    setPlayerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark-950 pt-32 pb-24 font-ibm text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Profile Summary Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark-900 via-brand-dark-850 to-brand-emerald-950/40 border-2 border-brand-amber-400/40 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-brand-amber-400 via-brand-emerald-500 to-brand-amber-300 p-[2px] shadow-gold-glow">
                <div className="w-full h-full rounded-[14px] bg-brand-dark-900 flex items-center justify-center font-alexandria font-black text-white text-2xl">
                  {fullName.slice(0, 1)}
                </div>
              </div>
              <span className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-brand-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-brand-dark-900 shadow-sm">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-alexandria font-bold text-xl sm:text-2xl text-white">
                  {fullName}
                </h1>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-black border flex items-center gap-1 ${
                    isSuperAdmin
                      ? "bg-brand-amber-400 text-slate-950 border-brand-amber-300 shadow-gold-glow"
                      : isAdmin
                      ? "bg-brand-emerald-500/20 text-brand-emerald-300 border-brand-emerald-500/40"
                      : "bg-white/10 text-brand-amber-300 border-brand-amber-400/30"
                  }`}
                >
                  {isSuperAdmin && <Crown className="w-3 h-3" />}
                  {isAdmin && !isSuperAdmin && <ShieldCheck className="w-3 h-3" />}
                  <span>
                    {isSuperAdmin
                      ? "مالك المنصة (Super Admin)"
                      : isAdmin
                      ? "مسؤول معتمد (Admin)"
                      : "مشترك معتمد (VIP Member)"}
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono" dir="ltr">
                {email} • +966 {phone}
              </p>
            </div>
          </div>

          {/* Quick Role Tester / Switcher */}
          <div className="flex items-center gap-2 flex-wrap sm:justify-end">
            <span className="text-[11px] text-slate-400 block w-full sm:w-auto pb-1 sm:pb-0">
              تبديل سريع للاختبار:
            </span>
            <button
              type="button"
              onClick={() => {
                setSuperAdminRole(true);
                soundFx.playSuccess();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                isSuperAdmin
                  ? "bg-brand-amber-400 text-slate-950 border-brand-amber-400 shadow-gold-glow"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminRole(true);
                soundFx.playSuccess();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                isAdmin && !isSuperAdmin
                  ? "bg-brand-emerald-500 text-slate-950 border-brand-emerald-400 shadow-emerald-glow"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminRole(false);
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                !isAdmin
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-brand-dark-900 border border-white/10 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => handleTabChange("profile")}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "profile"
                ? "bg-brand-emerald-950 border border-brand-amber-400 text-white shadow-gold-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4 text-brand-amber-400" />
            <span>الملف الشخصي والأمان</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("courses")}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "courses"
                ? "bg-brand-emerald-950 border border-brand-amber-400 text-white shadow-gold-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-emerald-400" />
            <span>دوراتي والماستر كلاس (2)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("orders")}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "orders"
                ? "bg-brand-emerald-950 border border-brand-amber-400 text-white shadow-gold-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Truck className="w-4 h-4 text-blue-400" />
            <span>كتبي وشحناتي ({shippingOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("consultations")}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "consultations"
                ? "bg-brand-emerald-950 border border-brand-amber-400 text-white shadow-gold-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4 text-brand-amber-400" />
            <span>مواعيدي والاستشارات ({activeBookings.length})</span>
          </button>

          {/* Tab 5: Admin Role Delegation (Visible ONLY to Super Admin) */}
          {isSuperAdmin && (
            <button
              type="button"
              onClick={() => handleTabChange("delegation")}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 border border-brand-amber-400/50 ${
                activeTab === "delegation"
                  ? "bg-gradient-to-r from-brand-amber-500/20 to-brand-amber-600/20 text-brand-amber-300 shadow-gold-glow"
                  : "text-brand-amber-400/90 hover:text-brand-amber-300 bg-brand-amber-400/5"
              }`}
            >
              <Crown className="w-4 h-4 text-brand-amber-400" />
              <span>إدارة الصلاحيات والمسؤولين ⚡</span>
            </button>
          )}
        </div>

        {/* TAB 1: Profile & Security */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Personal Information Form (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-brand-dark-900 border border-brand-emerald-500/20 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <User className="w-5 h-5 text-brand-amber-400" />
                  <h3 className="font-alexandria font-bold text-base text-white">
                    تعديل البيانات الشخصية
                  </h3>
                </div>
                <span className="text-xs text-brand-emerald-400 font-semibold">مزامنة سحابية فورية</span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      الاسم الكامل *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      رقم الجوال *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      البريد الإلكتروني *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      المدينة الحالية *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {profileSuccessMsg && (
                  <div className="p-3.5 rounded-2xl bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-xs text-brand-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                    <span>{profileSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSavingProfile ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>حفظ التعديلات في السحابة</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Session & Security Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark-900 border border-white/10 space-y-5">
                <div className="flex items-center gap-2 text-brand-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-brand-amber-400" />
                  <span>حالة الأمان والجلسة النشطة</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">حالة التوثيق:</span>
                    <span className="text-brand-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-brand-emerald-400 animate-pulse" />
                      موثق برمز OTP السحابي
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">آخر تسجيل دخول:</span>
                    <span className="text-slate-200 font-mono">اليوم، 04:15 ص</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">نوع الجهاز المتصل:</span>
                    <span className="text-slate-200">Apple Safari / Chrome (KSA)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400">بروتوكول التشفير:</span>
                    <span className="text-brand-amber-300 font-mono font-bold">TLS 1.3 • AES-256</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">صوت التفاعل (Haptic Audio):</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.toggleMute();
                      soundFx.playClick();
                    }}
                    className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-[11px] font-bold"
                  >
                    🔊 تبديل الصوت
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DRM Protected Courses */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-alexandria font-bold text-lg text-white">
                  الدورات والبرامج المشفرة المفعلة
                </h3>
                <p className="text-xs text-slate-400">
                  جميع المحاضرات محمية بنظام العلامة المائية الرقمية الديناميكية لمكافحة التسريب
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES_DATA.map((course, idx) => (
                <div
                  key={course.id}
                  className="rounded-3xl bg-brand-dark-900 border border-brand-emerald-500/20 p-6 space-y-5 hover:border-brand-amber-400/40 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark-950 border border-white/10 group cursor-pointer" onClick={() => openPlayer(course.title)}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-brand-amber-400 text-slate-950 flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current mr-0.5" />
                        </div>
                      </div>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-dark-950/80 backdrop-blur-md border border-brand-emerald-400/40 text-[10px] font-bold text-brand-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-brand-emerald-400" />
                        DRM نشط
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-alexandria font-bold text-base text-white hover:text-brand-amber-300 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {course.subtitle}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">نسبة الإنجاز:</span>
                        <span className="font-bold text-brand-emerald-400 font-mono">
                          {idx === 0 ? "78% (12 من 16 ساعة)" : "45% (5 من 12 ساعة)"}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-brand-dark-950 overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-brand-emerald-500 to-brand-amber-400 rounded-full"
                          style={{ width: idx === 0 ? "78%" : "45%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => openPlayer(course.title)}
                      className="px-5 py-2.5 rounded-xl bg-brand-emerald-500/20 hover:bg-brand-emerald-500/30 text-brand-emerald-300 border border-brand-emerald-500/40 text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>متابعة المشاهدة</span>
                    </button>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        soundFx.playClick();
                        alert("جاري تحميل الحقيبة التدريبية ونماذج العمل المعتمدة...");
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>الملفات المرفقة</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: My Book Orders & Live Tracking */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-alexandria font-bold text-lg text-white">
                  طلبات الكتب المطبوعة والشحنات
                </h3>
                <p className="text-xs text-slate-400">
                  تتبع مباشر لمسار التوصيل مع سمسا إكسبريس وتحميل الفواتير الضريبية
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {shippingOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl bg-brand-dark-900 border border-brand-emerald-500/20 p-6 sm:p-7 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-brand-amber-400/20 text-brand-amber-300 font-mono font-bold text-xs border border-brand-amber-400/30">
                          {order.orderNumber}
                        </span>
                        <h4 className="font-alexandria font-bold text-base text-white">
                          {(order.items && order.items[0]) || "كتاب استراتيجيات التسويق الرقمي"}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        تاريخ الطلب: {order.createdAt ? new Date(order.createdAt).toLocaleDateString("ar-SA") : "اليوم"} • الناقل: {order.courier || "SMSA"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openInvoiceForOrder(order)}
                        className="px-3.5 py-2 rounded-xl bg-brand-amber-400/15 hover:bg-brand-amber-400/25 text-brand-amber-300 border border-brand-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>الفاتورة و QR</span>
                      </button>

                      <a
                        href={`https://smsaexpress.com/ar/tracking?tracking_number=${order.trackingNumber || "SMSA-KSA-994821"}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>تتبع سمسا</span>
                      </a>
                    </div>
                  </div>

                  {/* 4-Step Visual Progress Timeline */}
                  <div className="py-2">
                    <div className="grid grid-cols-4 gap-2 text-center relative">
                      {/* Connecting line */}
                      <div className="absolute top-4 right-1/8 left-1/8 h-1 bg-brand-emerald-500/30 -z-0" />

                      <div className="space-y-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-brand-emerald-500 text-slate-950 font-bold mx-auto flex items-center justify-center text-xs shadow-emerald-glow">
                          ✓
                        </div>
                        <p className="text-xs font-bold text-white">تم استلام الطلب</p>
                        <span className="text-[10px] text-slate-400 font-mono">10:00 ص</span>
                      </div>

                      <div className="space-y-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-brand-emerald-500 text-slate-950 font-bold mx-auto flex items-center justify-center text-xs shadow-emerald-glow">
                          ✓
                        </div>
                        <p className="text-xs font-bold text-white">قيد التجهيز والتغليف</p>
                        <span className="text-[10px] text-slate-400 font-mono">11:30 ص</span>
                      </div>

                      <div className="space-y-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-brand-amber-400 text-slate-950 font-bold mx-auto flex items-center justify-center text-xs shadow-gold-glow animate-pulse">
                          🚚
                        </div>
                        <p className="text-xs font-bold text-brand-amber-300">مسلم لشركة الشحن</p>
                        <span className="text-[10px] text-brand-amber-400 font-mono">
                          {order.trackingNumber || "SMSA-KSA-994821"}
                        </span>
                      </div>

                      <div className="space-y-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-white/10 text-slate-500 font-bold mx-auto flex items-center justify-center text-xs">
                          4
                        </div>
                        <p className="text-xs font-bold text-slate-500">تم التوصيل</p>
                        <span className="text-[10px] text-slate-500">متوقع خلال ساعات</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: My Consultations */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-alexandria font-bold text-lg text-white">
                  جلساتي الاستشارية المحجوزة
                </h3>
                <p className="text-xs text-slate-400">
                  تفاصيل المواعيد، روابط غرف Zoom المباشرة، ونماذج التشخيص التسويقي
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeBookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-3xl bg-brand-dark-900 border border-brand-emerald-500/30 p-6 sm:p-7 space-y-5 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 text-xs font-black border border-brand-emerald-500/40">
                          {b.deliveryLabel}
                        </span>
                        <h4 className="font-alexandria font-bold text-base text-white">
                          {b.sessionTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-brand-amber-300 font-semibold">
                        الموعد: {b.dateStr} • الساعة: {b.timeSlot}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={b.zoomLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-gold-glow hover:brightness-110 transition-all"
                      >
                        <Video className="w-4 h-4" />
                        <span>انضمام عبر Zoom</span>
                      </a>

                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(b.sessionTitle)}&dates=20260901T150000Z/20260901T160000Z&details=${encodeURIComponent(`جلسة استشارية خاصة مع المستشار أحمد الشوا\nرابط الزوم: ${b.zoomLink}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>تقويم Google</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-dark-950 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-emerald-400" />
                      <span>تم استلام استبيان التشخيص التسويقي ومراجعته من المستشار أحمد الشوا</span>
                    </span>
                    <span className="font-mono text-brand-emerald-400 font-bold">{formatSAR(b.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Admin Role Delegation (Super Admin View) */}
        {activeTab === "delegation" && isSuperAdmin && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark-900 via-brand-dark-850 to-brand-amber-950/30 border-2 border-brand-amber-400 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-2 text-brand-amber-300 font-bold text-xs">
                  <Crown className="w-4 h-4 text-brand-amber-400" />
                  <span>مركز التحكم وتفويض الصلاحيات (Super Admin Access)</span>
                </div>
                <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white">
                  إدارة المسؤولين والمشرفين مع سجل التدقيق المشفر
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  يمكنك منح وسحب صلاحيات إدارة المتجر والطلبات للموظفين والمساعدين بعد إدخال رمز الحماية الرئيسي (Master Passkey).
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setDelegationModalOpen(true);
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <KeyRound className="w-4 h-4" />
                <span>فتح بوابة التفويض الأمني ⚡</span>
              </button>
            </div>

            {/* Active Admins Registry */}
            <div className="p-6 rounded-3xl bg-brand-dark-900 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="font-alexandria font-bold text-sm text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-emerald-400" />
                  <span>المسؤولون النشطون في النظام:</span>
                </h4>
                <span className="text-xs text-brand-amber-400 font-mono font-bold">2 مسؤولي عمليات</span>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-amber-400 text-slate-950 font-black flex items-center justify-center">
                      أ
                    </div>
                    <div>
                      <p className="font-bold text-white">أحمد محمد الشوا (مالك المنصة)</p>
                      <p className="text-slate-400 font-mono">admin@ahmedalshawa.com</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-brand-amber-400 text-slate-950 font-black text-[10px]">
                    Super Admin
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-emerald-500 text-slate-950 font-black flex items-center justify-center">
                      ف
                    </div>
                    <div>
                      <p className="font-bold text-white">م. فهد السلمي (إدارة العمليات)</p>
                      <p className="text-slate-400 font-mono">manager@alshawa.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40 font-bold text-[10px]">
                      Admin
                    </span>
                    <button
                      type="button"
                      onClick={() => setDelegationModalOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30 transition-colors"
                    >
                      تعديل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {selectedInvoice && (
        <DigitalInvoiceModal
          isOpen={invoiceModalOpen}
          onClose={() => setInvoiceModalOpen(false)}
          invoice={selectedInvoice}
        />
      )}

      <DrmWatermarkPlayer
        isOpen={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        courseTitle={selectedCourseTitle}
      />

      <AdminDelegationModal
        isOpen={delegationModalOpen}
        onClose={() => setDelegationModalOpen(false)}
      />
    </div>
  );
}
