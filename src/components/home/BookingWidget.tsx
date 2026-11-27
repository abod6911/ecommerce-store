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
import { useSiteContent } from "@/context/SiteContentContext";
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

const BASE_CONSULTATION_PRICE = 800;
const EXTRA_HOUR_PRICE = 200;

const SESSION_TYPES: SessionType[] = [
  {
    id: "session-inperson-vip",
    title: "جلسة استشارية حضورية — جدة",
    typeBadge: "حضوري في جدة",
    delivery: "IN_PERSON",
    deliveryLabel: "لقاء مباشر في المكتب (جدة)",
    durationMin: 120,
    durationLabel: "ساعتين (800 ر.س)",
    price: 800,
    originalPrice: 800,
    perks: [
      "مدة الجلسة الأساسية ساعتين مقابل 800 ر.س",
      "كل ساعة إضافية بعد الساعتين بـ 200 ر.س",
      "مراجعة المشروع ووضع خطة عمل تنفيذية"
    ],
    slots: ["11:00 ص", "04:30 م", "06:00 م", "08:30 م"]
  },
  {
    id: "session-online-zoom",
    title: "استشارة تسويقية عن بُعد — Zoom",
    typeBadge: "أونلاين عن بُعد",
    delivery: "ONLINE_ZOOM",
    deliveryLabel: "جلسة مرئية مباشرة عبر Zoom",
    durationMin: 120,
    durationLabel: "ساعتين (800 ر.س)",
    price: 800,
    originalPrice: 800,
    perks: [
      "مدة الجلسة الأساسية ساعتين مقابل 800 ر.س",
      "كل ساعة إضافية بعد الساعتين بـ 200 ر.س",
      "تناسب العملاء في كافة مدن المملكة والخليج"
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
  const { content } = useSiteContent();
  const basePrice = content.consultationPricing.basePrice || BASE_CONSULTATION_PRICE;
  const extraHourPrice = content.consultationPricing.extraHourPrice || EXTRA_HOUR_PRICE;
  const durationText = content.consultationPricing.baseDurationLabel || "ساعتين";
  const { user, login, addBooking, updateBookingIntake } = useUserAuth();
  const [selectedSession, setSelectedSession] = useState<SessionType>(SESSION_TYPES[0]);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedSession.slots[0]);
  const [clientName, setClientName] = useState(user?.username || "");
  const [clientPhone, setClientPhone] = useState(user?.phone || "");
  const [clientEmail, setClientEmail] = useState(user?.email || "");
  const [whatsappReminder, setWhatsappReminder] = useState(true);
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
  const totalPrice = basePrice;

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
      priceSar: totalPrice,
      paymentMethod: "MADA",
    });

    if (!res.success) {
      setIsSubmitting(false);
      alert(res.error || "يرجى التحقق من صحة البيانات المدخلة.");
      return;
    }

    const zoomLink = res.zoomUrl || `https://zoom.us/j/${Math.floor(10000000000 + Math.random() * 90000000000)}?pwd=VIP_SHAWA`;

    const newBooking: BookingRecord = {
      id: res.booking?.id || bookingId,
      sessionTitle: `${selectedSession.title} (${durationText})`,
      deliveryLabel: selectedSession.deliveryLabel,
      dateStr: currentActiveDay.fullDate,
      timeSlot: selectedTimeSlot,
      price: totalPrice,
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
    const msg = `مرحباً، أود تأكيد حجز ${selectedSession.title} ليوم ${currentActiveDay.fullDate} الساعة ${selectedTimeSlot}.\n\nالاسم: ${clientName}\nالجوال: +966 ${clientPhone}`;
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="booking" className="py-20 sm:py-24 bg-brand-dark-950 border-t border-white/[0.06] relative font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
            <CalendarIcon className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>حجز الجلسات الاستشارية</span>
          </div>

          <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
            احجز جلستك الاستشارية مع <span className="gold-text-gradient">أحمد الشوا</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-[1.85]">
            جلسات استشارية متخصصة لأصحاب المشاريع والشركات — حضورياً في جدة أو عن بُعد عبر Zoom.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        {!isBooked ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Right Panel (7 Cols): 3-Step Selection Flow */}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* STEP 1: Session Type Selection */}
              <div className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-brand-amber-500 text-[#070909] font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-base text-[#F5F2EB]">
                      اختر نوع الجلسة
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400">خطوة 1 من 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SESSION_TYPES.map((session) => {
                    const isSelected = selectedSession.id === session.id;
                    return (
                      <div
                        key={session.id}
                        onClick={() => handleSessionChange(session)}
                        className={`rounded-xl p-5 border cursor-pointer transition-colors flex flex-col justify-between relative ${
                          isSelected
                            ? "bg-brand-dark-900 border-brand-amber-500/60"
                            : "bg-brand-dark-900/50 border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-brand-emerald-300 font-medium">
                              {session.delivery === "IN_PERSON" ? (
                                <MapPin className="w-3.5 h-3.5 text-brand-amber-400 shrink-0" />
                              ) : (
                                <Video className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                              )}
                              <span>{session.deliveryLabel}</span>
                            </div>

                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? "bg-brand-amber-500 border-brand-amber-500 text-[#070909]" : "border-white/25"
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <h4 className="font-alexandria font-bold text-sm text-[#F5F2EB] leading-snug">
                            {session.title}
                          </h4>

                          <div className="flex items-baseline gap-2 pt-2 border-t border-white/[0.07]">
                            <span className="font-alexandria font-bold text-xl text-brand-amber-300">
                              {formatSAR(session.price)}
                            </span>
                            <span className="text-[11px] text-stone-400 mr-auto">
                              ({session.durationLabel})
                            </span>
                          </div>

                          <ul className="space-y-1.5 pt-2 text-[11px] text-stone-300">
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
              <div className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-brand-amber-500 text-[#070909] font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-base text-[#F5F2EB]">
                      اختر اليوم المتاح
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <Globe className="w-3.5 h-3.5 text-brand-emerald-400" />
                    <span>توقيت مكة المكرمة</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {daysList.map((day, idx) => {
                    const isSelected = selectedDateIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={day.isSoldOut}
                        onClick={() => setSelectedDateIdx(idx)}
                        className={`min-w-[82px] sm:min-w-[90px] p-3 rounded-xl border text-center transition-colors flex flex-col justify-between shrink-0 ${
                          day.isSoldOut
                            ? "opacity-40 bg-white/[0.02] border-white/[0.04] cursor-not-allowed"
                            : isSelected
                            ? "bg-brand-amber-500 text-[#070909] border-brand-amber-500 font-bold"
                            : "bg-brand-dark-900 border-white/[0.08] text-stone-300 hover:border-white/25"
                        }`}
                      >
                        <span className={`text-[11px] block font-medium ${isSelected ? "text-[#070909]" : "text-stone-400"}`} suppressHydrationWarning>
                          {day.dayName}
                        </span>
                        <span className={`font-alexandria font-bold text-lg my-1 block ${isSelected ? "text-[#070909]" : "text-[#F5F2EB]"}`} suppressHydrationWarning>
                          {day.dayNum}
                        </span>
                        <span className={`text-[10px] block ${isSelected ? "text-[#070909]/80 font-semibold" : "text-stone-500"}`} suppressHydrationWarning>
                          {day.isSoldOut ? "مكتمل" : day.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Time Slot Grid */}
              <div className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-brand-amber-500 text-[#070909] font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-alexandria font-bold text-sm sm:text-base text-[#F5F2EB]">
                      اختر التوقيت المناسب
                    </h3>
                  </div>
                  <span className="text-xs text-brand-emerald-300 font-medium">
                    المواعيد المتاحة
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedSession.slots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-brand-emerald-700 text-[#F5F2EB] border-brand-emerald-400"
                            : "bg-brand-dark-900 border-white/[0.08] text-stone-300 hover:border-white/25"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Left Panel (5 Cols): Sticky Live Booking Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl bg-brand-dark-850 border border-white/10 p-6 sm:p-7 space-y-5 text-right">
                <div className="space-y-2 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-brand-amber-300">
                      ملخص الموعد
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-emerald-950 text-brand-emerald-300 font-medium text-[11px] border border-brand-emerald-500/25">
                      {selectedSession.deliveryLabel}
                    </span>
                  </div>

                  <h3 className="font-alexandria font-bold text-base text-[#F5F2EB]">
                    {selectedSession.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-brand-dark-900 border border-white/[0.07] flex items-center gap-2 text-xs text-brand-amber-300 font-medium" suppressHydrationWarning>
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

                  {/* Pricing Breakdown & CTA */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>الاستشارة الأساسية ({durationText}):</span>
                      <span className="font-bold text-white">{formatSAR(basePrice)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-brand-emerald-300">
                      <span>ملاحظة:</span>
                      <span>كل ساعة إضافية بعد الساعتين بـ {extraHourPrice} ر.س</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-bold text-white pt-1 border-t border-white/10">
                      <span>الإجمالي ({durationText}):</span>
                      <span className="font-alexandria font-black text-lg text-brand-amber-300">{formatSAR(totalPrice)}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-brand-emerald-400 font-semibold">
                      <span>الضريبة:</span>
                      <span>شاملة ضريبة القيمة المضافة 15%</span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                      >
                        <span>{isSubmitting ? "جاري تأكيد الحجز..." : "تأكيد وحجز الموعد"}</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Trust Footer */}
                <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5 pt-3 border-t border-white/[0.06]">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                  <span>جميع بيانات المشروع والاجتماع محفوظة بسرية تامة</span>
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
