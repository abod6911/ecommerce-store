"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  Video,
  Phone,
  ShieldCheck,
  User,
  Mail,
  Send,
  Check,
  CreditCard,
  Building,
  MapPin,
  Globe,
  Radio,
  CheckCircle,
  Zap,
  Lock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { INSTRUCTOR_INFO } from "@/data/mockData";
import { formatSAR } from "@/lib/utils";
import MagneticButton from "@/components/animations/MagneticButton";
import CalendarSync from "@/components/booking/CalendarSync";
import PostBookingIntake from "@/components/booking/PostBookingIntake";
import { useUserAuth, BookingRecord } from "@/context/UserAuthContext";
import { createConsultationBooking, logStoreActivity } from "@/app/actions/store-actions";

interface SessionType {
  id: string;
  title: string;
  typeBadge?: string;
  delivery: "IN_PERSON" | "ONLINE_ZOOM";
  deliveryLabel: string;
  durationMin: number;
  durationLabel: string;
  price: number;
  originalPrice: number;
  perks: string[];
  slots: string[];
}

const SESSION_TYPES: SessionType[] = [
  {
    id: "session-inperson-vip",
    title: "جلسة حضورية خاصة في جدة",
    typeBadge: "⭐ الأكثر طلباً - VIP",
    delivery: "IN_PERSON",
    deliveryLabel: "لقاء مباشر في المكتب (جدة)",
    durationMin: 60,
    durationLabel: "60 دقيقة",
    price: 950,
    originalPrice: 1500,
    perks: [
      "لقاء استراتيجي مباشر وجهاً لوجه بمكتب المستشار بجدة",
      "تشخيص وتحليل ميزانياتك الإعلانية وحساباتك الإعلانية",
      "خطة عمل وتوصيات تنفيذية مطبوعة وموقعة"
    ],
    slots: ["11:00 ص", "04:30 م", "06:00 م", "08:30 م"]
  },
  {
    id: "session-online-zoom",
    title: "استشارة تسويقية عن بُعد (Online)",
    typeBadge: "متاحة لكافة مدن المملكة",
    delivery: "ONLINE_ZOOM",
    deliveryLabel: "جلسة فيديو مباشرة عبر Zoom",
    durationMin: 45,
    durationLabel: "45 دقيقة",
    price: 650,
    originalPrice: 1100,
    perks: [
      "قاعة اجتماع افتراضية خاصة ومحمية عبر Zoom",
      "تسجيل كامل للجلسة بدقة عالية متاح لك للرجوع إليه",
      "متابعة أسئلة واستفسارات عبر الواتساب لمدة أسبوع"
    ],
    slots: ["10:30 ص", "03:00 م", "05:15 م", "07:30 م", "09:00 م"]
  }
];

const INITIAL_DAYS = [
  { dayName: "الخميس", dayNum: "27", monthName: "أغسطس", fullDate: "الخميس، 27 أغسطس 2026", isSoldOut: false },
  { dayName: "الجمعة", dayNum: "28", monthName: "أغسطس", fullDate: "الجمعة، 28 أغسطس 2026", isSoldOut: false },
  { dayName: "السبت", dayNum: "29", monthName: "أغسطس", fullDate: "السبت، 29 أغسطس 2026", isSoldOut: false },
  { dayName: "الأحد", dayNum: "30", monthName: "أغسطس", fullDate: "الأحد، 30 أغسطس 2026", isSoldOut: true },
  { dayName: "الإثنين", dayNum: "31", monthName: "أغسطس", fullDate: "الإثنين، 31 أغسطس 2026", isSoldOut: false },
  { dayName: "الثلاثاء", dayNum: "1", monthName: "سبتمبر", fullDate: "الثلاثاء، 1 سبتمبر 2026", isSoldOut: false },
  { dayName: "الأربعاء", dayNum: "2", monthName: "سبتمبر", fullDate: "الأربعاء، 2 سبتمبر 2026", isSoldOut: false },
  { dayName: "الخميس", dayNum: "3", monthName: "سبتمبر", fullDate: "الخميس، 3 سبتمبر 2026", isSoldOut: false },
];

export default function BookingWidget() {
  const { user, login, addBooking, updateBookingIntake } = useUserAuth();
  const [selectedSession, setSelectedSession] = useState<SessionType>(SESSION_TYPES[0]);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedSession.slots[0]);
  const [clientName, setClientName] = useState(user?.username || "");
  const [clientPhone, setClientPhone] = useState(user?.phone || "");
  const [clientEmail, setClientEmail] = useState(user?.email || "");
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("MADA");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>("");
  const [daysList, setDaysList] = useState(INITIAL_DAYS);

  // Sync with logged in user if changed
  useEffect(() => {
    if (user) {
      if (!clientName) setClientName(user.username);
      if (!clientPhone) setClientPhone(user.phone);
      if (!clientEmail && user.email) setClientEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const arabicMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const arabicDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

    const generated = Array.from({ length: 8 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      const dayName = arabicDays[d.getDay()];
      const dayNum = String(d.getDate());
      const monthName = arabicMonths[d.getMonth()];
      const fullDate = `${dayName}، ${d.getDate()} ${monthName} ${d.getFullYear()}`;
      const isSoldOut = i === 3;
      return { dayName, dayNum, monthName, fullDate, isSoldOut };
    });
    setDaysList(generated);
  }, []);

  const handleSessionChange = (session: SessionType) => {
    setSelectedSession(session);
    if (!session.slots.includes(selectedTimeSlot)) {
      setSelectedTimeSlot(session.slots[0]);
    }
  };

  const currentActiveDay = daysList[selectedDateIdx] || INITIAL_DAYS[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert("يرجى إدخال الاسم ورقم الجوال والواتساب لاستكمال الحجز.");
      return;
    }
    setIsSubmitting(true);

    const bookingId = `book-${Date.now()}`;
    const mappedDate = new Date().toISOString().split("T")[0];

    const res = await createConsultationBooking({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail?.trim() || null,
      sessionType: selectedSession.id,
      sessionDate: mappedDate,
      timeSlot: selectedTimeSlot,
      priceSar: selectedSession.price,
      paymentMethod: paymentMethod,
    });

    const zoomLink = res.zoomUrl || res.fallbackZoomUrl || `https://zoom.us/j/${Math.floor(10000000000 + Math.random() * 90000000000)}?pwd=VIP_SHAWA`;

    const newBooking: BookingRecord = {
      id: res.booking?.id || bookingId,
      sessionTitle: selectedSession.title,
      deliveryLabel: selectedSession.deliveryLabel,
      dateStr: currentActiveDay.fullDate,
      timeSlot: selectedTimeSlot,
      price: selectedSession.price,
      zoomLink: zoomLink,
      createdAt: new Date().toISOString(),
    };

    if (!user) {
      login(clientName, clientPhone, clientEmail);
    }
    addBooking(newBooking);
    setCreatedBookingId(res.booking?.id || bookingId);
    setIsSubmitting(false);
    setIsBooked(true);
  };

  const handleIntakeCompleted = (intakeData: { businessField: string; socialLink: string; marketingChallenge: string }) => {
    if (createdBookingId) {
      updateBookingIntake(createdBookingId, intakeData);
    }
  };

  const openWhatsAppConfirmation = () => {
    const msg = `مرحباً، أود تأكيد حجز ${selectedSession.title} ليوم ${currentActiveDay.fullDate} الساعة ${selectedTimeSlot}.\n\nالاسم: ${clientName}\nالجوال: +966 ${clientPhone}\nطريقة الدفع: ${paymentMethod}`;
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="booking" className="py-24 bg-brand-dark-950 relative overflow-hidden font-ibm" dir="rtl">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-brand-emerald-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
            <CalendarIcon className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>بوابة حجز الجلسات الاستشارية المباشرة (VIP Booking)</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            احجز استشارتك الاستراتيجية مع <span className="gold-text-gradient">المستشار أحمد الشوا</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            جلسات مباشرة مخصصة لرواد الأعمال وأصحاب المشاريع والشركات في السعودية لوضع خطط نمو دقيقة ومضاعفة أرباحك بأعلى درجات السرية والاحترافية.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Right (Step Flow) + Left (Sticky Summary Form) */}
        {!isBooked ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Right Panel (7 Cols): 3-Step Selection Flow */}
            <div className="lg:col-span-7 space-y-8 text-right">
              {/* STEP 1: Session Type Selection */}
              <div className="rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 p-6 sm:p-7 space-y-5 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-gold-glow">
                      1
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">
                      اختر نوع الجلسة الاستشارية
                    </h3>
                  </div>
                  <span className="text-xs text-brand-amber-300 font-semibold">خطوة 1 من 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SESSION_TYPES.map((session) => {
                    const isSelected = selectedSession.id === session.id;
                    return (
                      <div
                        key={session.id}
                        onClick={() => handleSessionChange(session)}
                        className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between relative group ${
                          isSelected
                            ? "bg-gradient-to-b from-brand-emerald-950/90 to-brand-dark-900 border-brand-amber-400 shadow-gold-glow scale-[1.02]"
                            : "bg-white/5 border-white/10 hover:border-brand-emerald-500/40 hover:bg-white/[0.07]"
                        }`}
                      >
                        {session.typeBadge && (
                          <span className={`absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-sm ${
                            isSelected
                              ? "bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950"
                              : "bg-brand-dark-900 text-brand-amber-300 border border-brand-amber-400/40"
                          }`}>
                            {session.typeBadge}
                          </span>
                        )}

                        <div className="space-y-3 pt-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-brand-emerald-400 font-semibold">
                              {session.delivery === "IN_PERSON" ? (
                                <MapPin className="w-3.5 h-3.5 text-brand-amber-400 shrink-0" />
                              ) : (
                                <Video className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                              )}
                              <span>{session.deliveryLabel}</span>
                            </div>

                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? "bg-brand-amber-400 border-brand-amber-400 text-slate-950" : "border-white/30"
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>

                          <h4 className="font-alexandria font-bold text-sm text-white group-hover:text-brand-amber-300 transition-colors leading-snug">
                            {session.title}
                          </h4>

                          <div className="flex items-baseline gap-2 pt-1 border-t border-white/10">
                            <span className="font-alexandria font-black text-xl text-brand-amber-300">
                              {formatSAR(session.price)}
                            </span>
                            <span className="text-xs text-slate-500 line-through">
                              {formatSAR(session.originalPrice)}
                            </span>
                            <span className="text-[10px] text-slate-400 mr-auto font-medium">
                              ({session.durationLabel})
                            </span>
                          </div>

                          {/* Perks */}
                          <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300">
                            {session.perks.map((p, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0 mt-0.5" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Date Picker Carousel */}
              <div className="rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 p-6 sm:p-7 space-y-5 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-gold-glow">
                      2
                    </span>
                    <div>
                      <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">
                        اختر اليوم المتاح
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Globe className="w-3.5 h-3.5 text-brand-emerald-400" />
                    <span>توقيت مكة المكرمة (GMT+3)</span>
                  </div>
                </div>

                {/* Horizontal Scrollable Date Carousel */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {daysList.map((day, idx) => {
                    const isSelected = selectedDateIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={day.isSoldOut}
                        onClick={() => setSelectedDateIdx(idx)}
                        className={`min-w-[84px] sm:min-w-[94px] p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col justify-between shrink-0 ${
                          day.isSoldOut
                            ? "opacity-40 bg-white/5 border-white/5 cursor-not-allowed"
                            : isSelected
                            ? "bg-gradient-to-b from-brand-amber-400 to-brand-amber-500 text-slate-950 border-brand-amber-400 font-bold shadow-gold-glow scale-105"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-brand-emerald-500/40"
                        }`}
                      >
                        <span className={`text-[11px] block font-semibold ${isSelected ? "text-slate-950" : "text-slate-400"}`} suppressHydrationWarning>
                          {day.dayName}
                        </span>
                        <span className={`font-alexandria font-black text-lg sm:text-xl my-1 block ${isSelected ? "text-slate-950" : "text-white"}`} suppressHydrationWarning>
                          {day.dayNum}
                        </span>
                        <span className={`text-[10px] block ${isSelected ? "text-slate-900 font-bold" : "text-slate-400"}`} suppressHydrationWarning>
                          {day.isSoldOut ? "مكتمل" : day.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Time Slot Grid */}
              <div className="rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 p-6 sm:p-7 space-y-5 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-gold-glow">
                      3
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">
                      اختر الوقت المناسب للجلسة
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald-400 animate-ping" />
                    <span>متاح للحجز الفوري</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedSession.slots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-gradient-to-r from-brand-emerald-600 to-teal-600 text-white border-brand-emerald-400 shadow-emerald-glow scale-105"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-brand-emerald-500/40"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span>{slot}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-amber-300 stroke-[3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Left Panel (5 Cols): Sticky Live Booking Summary & Checkout Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-3xl bg-brand-dark-900/95 border-2 border-brand-amber-400/40 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-2xl text-right">
                {/* Header with Selected Appointment Summary */}
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      تفاصيل الحجز المؤكد
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 font-bold text-[10px] border border-brand-emerald-500/30">
                      {selectedSession.deliveryLabel}
                    </span>
                  </div>

                  <h3 className="font-alexandria font-bold text-base text-white">
                    {selectedSession.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-brand-amber-300 font-semibold leading-relaxed" suppressHydrationWarning>
                    <CalendarIcon className="w-4 h-4 text-brand-amber-400 shrink-0" />
                    <span>{currentActiveDay.fullDate} • الساعة {selectedTimeSlot}</span>
                  </div>
                </div>

                {/* Form Input Fields */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      الاسم الكامل *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="مثال: م. فهد القرني"
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input with Saudi Prefix */}
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
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="555583379"
                        className="w-full pr-24 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full pr-10 pl-3 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Reminder Checkbox */}
                  <label className="flex items-center gap-2 pt-1 cursor-pointer select-none text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={whatsappReminder}
                      onChange={(e) => setWhatsappReminder(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-brand-dark-950 accent-brand-emerald-500 cursor-pointer"
                    />
                    <span>أرغب في استلام تذكير بالموعد وتفاصيل القاعة عبر الواتساب</span>
                  </label>

                  {/* Payment Methods 2x2 Selector */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="text-[11px] font-bold text-slate-300 block">
                      اختر طريقة الدفع:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "MADA", label: "مدى (Mada)", sub: "بطاقات الصراف السعودية" },
                        { id: "APPLE_PAY", label: " Apple Pay", sub: "دفع سريع وآمن" },
                        { id: "CREDIT_CARD", label: "فيزا / ماستركارد", sub: "Credit Cards" },
                        { id: "BANK_TRANSFER", label: "تحويل بنكي رسمي", sub: "حساب الشركة المعتمد" },
                      ].map((pm) => {
                        const isChosen = paymentMethod === pm.id;
                        return (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setPaymentMethod(pm.id)}
                            className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                              isChosen
                                ? "bg-brand-emerald-950/80 border-brand-emerald-400 text-white shadow-emerald-glow"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                            }`}
                          >
                            <div>
                              <span className="block text-xs font-bold text-white leading-tight">{pm.label}</span>
                              <span className="block text-[9px] text-slate-400 mt-0.5">{pm.sub}</span>
                            </div>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isChosen ? "border-brand-emerald-400 bg-brand-emerald-400" : "border-white/30"
                            }`}>
                              {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing Breakdown & CTA */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>قيمة الجلسة الاستشارية:</span>
                      <span className="font-alexandria font-bold text-sm text-white">{formatSAR(selectedSession.price)}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-brand-emerald-400 font-semibold">
                      <span>الضريبة:</span>
                      <span>شاملة ضريبة القيمة المضافة 15%</span>
                    </div>

                    <div className="pt-2">
                      <MagneticButton
                        onClick={handleBookingSubmit}
                        variant="primary"
                        className="w-full py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <Zap className="w-4 h-4 shrink-0 text-slate-950" />
                        <span>{isSubmitting ? "جاري المعالجة..." : "تأكيد وحجز الموعد الفوري ⚡"}</span>
                      </MagneticButton>
                    </div>
                  </div>
                </form>

                {/* Trust Footer */}
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-3 border-t border-white/5 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                  <span>🔒 حجز آمن ومحمي 100% • سرية تامة لبياناتك ومعلوماتك المالية</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Booked Confirmation Screen with Calendar Sync and Post-Booking Intake */
          <div className="max-w-3xl mx-auto rounded-3xl bg-brand-dark-850/95 border-2 border-brand-emerald-400/50 p-6 sm:p-10 text-center space-y-8 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300 font-ibm">
            <div className="w-20 h-20 rounded-full bg-brand-emerald-500/20 text-brand-emerald-400 mx-auto flex items-center justify-center border-2 border-brand-emerald-400 shadow-emerald-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-brand-amber-400/20 text-brand-amber-300 font-bold text-xs border border-brand-amber-400/40 inline-block">
                تم تأكيد موعدك ودفع القيمة بنجاح!
              </span>
              <h3 className="font-alexandria font-bold text-2xl sm:text-3xl text-white leading-[1.4] pb-1">
                شكراً لك يا {clientName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto" suppressHydrationWarning>
                تم تسجيل موعدك في <strong className="text-white">{selectedSession.title}</strong> يوم <strong className="text-brand-amber-300">{currentActiveDay.fullDate}</strong> الساعة <strong className="text-brand-amber-300">{selectedTimeSlot}</strong>.
              </p>
            </div>

            {/* Calendar & Meeting Sync Component */}
            <CalendarSync
              sessionTitle={selectedSession.title}
              deliveryType={selectedSession.delivery}
              deliveryLabel={selectedSession.deliveryLabel}
              dateStr={currentActiveDay.fullDate}
              timeSlot={selectedTimeSlot}
              clientName={clientName}
            />

            {/* Post-Booking Intake Form */}
            <PostBookingIntake onComplete={handleIntakeCompleted} />

            {/* WhatsApp Direct Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={openWhatsAppConfirmation}
                className="w-full sm:flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-emerald-glow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>فتح المحادثة لتأكيد الموعد عبر الواتساب</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 text-white font-semibold text-xs border border-white/15 hover:bg-white/20 transition-all whitespace-nowrap"
              >
                حجز موعد آخر
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
