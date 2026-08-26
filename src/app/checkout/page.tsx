"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Check,
  Send,
  Building2,
  Navigation
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatSAR } from "@/lib/utils";
import { SAUDI_CITIES, JEDDAH_DISTRICTS, INSTRUCTOR_INFO } from "@/data/mockData";
import { createBookOrder, logStoreActivity } from "@/app/actions/store-actions";
import { PaymentMethod } from "@/lib/supabase/types";

export default function CheckoutPage() {
  const {
    items,
    clearCart,
    subtotal,
    vatAmount,
    shippingCost,
    total,
    selectedCity,
    setSelectedCity,
    paymentMethod,
    setPaymentMethod,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "صالح العتيبي",
    phone: "0501234567",
    email: "saleh@example.com",
    district: "حي الروضة",
    streetAddress: "طريق الملك عبدالعزيز، مبنى الأندلس، الدور 4",
    notes: "",
    pinCoordinates: "21.5433° N, 39.1728° E (جدة)",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "ALSHAWA10" || couponCode.toUpperCase() === "VIP10") {
      setDiscountPercent(0.10);
      setCouponSuccess("تم تطبيق خصم 10% بنجاح! ✨");
      setCouponError("");
    } else {
      setCouponError("كود الخصم غير صالح أو منتهي الصلاحية.");
      setCouponSuccess("");
    }
  };

  const discountAmount = subtotal * discountPercent;
  const finalTotal = Math.max(0, total - discountAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("سلة الشراء فارغة!");
      return;
    }
    setIsSubmitting(true);

    const primaryBookTitle = items.map((i) => `${i.title} (×${i.quantity})`).join(" + ");
    const mappedPaymentMethod: PaymentMethod = 
      paymentMethod === "MADA" ? "mada" :
      paymentMethod === "APPLE_PAY" ? "apple_pay" :
      paymentMethod === "CASH_ON_DELIVERY" ? "cod" : "credit_card";

    const res = await createBookOrder({
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      shippingCity: selectedCity,
      shippingAddress: `${formData.district} - ${formData.streetAddress}`,
      bookTitle: primaryBookTitle,
      quantity: items.reduce((acc, i) => acc + i.quantity, 0),
      amountSar: finalTotal,
      paymentMethod: mappedPaymentMethod,
      notes: formData.notes,
    });

    const ordNum = res.orderNumber || res.fallbackOrderNumber || `SHW-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedOrderNumber(ordNum);
    setOrderCompleted(true);
    setIsSubmitting(false);
    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-brand-dark-950 pt-32 pb-20 font-ibm" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-brand-emerald-500/20 text-brand-emerald-400 mx-auto flex items-center justify-center border border-brand-emerald-500/40 shadow-emerald-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-amber-400/20 text-brand-amber-300 text-xs font-bold border border-brand-amber-400/30">
              رقم الطلب: {completedOrderNumber}
            </span>
            <h1 className="font-alexandria font-bold text-3xl text-white leading-snug">
              تم استلام وتأكيد طلبك بنجاح!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              شكراً لثقتك يا <strong className="text-white">{formData.name}</strong>. تم تأكيد العملية وسيتم إرسال الفاتورة وتفاصيل الشحن والمحتوى فوراً إلى هاتفك وبريدك.
            </p>
          </div>

          {/* Details card */}
          <div className="p-6 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 text-right text-xs sm:text-sm space-y-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">طريقة الدفع المختارة:</span>
              <span className="text-brand-amber-300 font-bold">
                {paymentMethod === "MADA"
                  ? "بطاقة مدى (Mada)"
                  : paymentMethod === "APPLE_PAY"
                  ? " Apple Pay"
                  : paymentMethod === "CASH_ON_DELIVERY"
                  ? "الدفع نقداً عند الاستلام (COD)"
                  : "بطاقة ائتمانية"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">عنوان التوصيل المسجل:</span>
              <span className="text-white font-medium">
                {formData.district}، {selectedCity}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">الإجمالي المدفوع / المستحق:</span>
              <span className="text-base font-black text-brand-emerald-400">{formatSAR(finalTotal)}</span>
            </div>

            <div className="p-4 rounded-xl bg-brand-emerald-950/50 border border-brand-emerald-500/30 flex items-center gap-3">
              <Truck className="w-5 h-5 text-brand-emerald-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white text-xs sm:text-sm">
                  {selectedCity === "جدة"
                    ? "توصيل مندوب جدة السريع (خلال 3 إلى 6 ساعات)"
                    : "شحن سمسا إكسبريس (SMSA Express)"}
                </h5>
                <p className="text-xs text-brand-emerald-300 mt-0.5">
                  رقم بوليصة الشحن المبدئي: <span className="font-mono font-bold">SMSA-KSA-994821</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110"
            >
              <Sparkles className="w-4 h-4" />
              <span>الانتقال للوحة التحكم ومتابعة الطلب</span>
            </Link>

            <a
              href={`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن طلبي رقم ${completedOrderNumber}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>متابعة الشحنة بالواتساب</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark-900 pt-32 pb-24 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-right">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-amber-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>بوابة دفع آمنة ومشفرة 256-bit</span>
            </div>
            <h1 className="font-alexandria font-bold text-2xl sm:text-3xl text-white leading-snug">
              إتمام الطلب والدفع الآمن
            </h1>
          </div>

          <Link
            href="/#books"
            className="text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowRight className="w-4 h-4" />
            <span>متابعة التسوق وإضافة منتجات أخرى</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">سلة الشراء فارغة</h3>
            <p className="text-xs text-slate-400">
              لم تقم بإضافة أي كتب أو دورات حتى الآن.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-brand-amber-400 text-slate-950 font-bold text-xs shadow-gold-glow"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Cols: Address, Map Pin & Payment */}
            <div className="lg:col-span-7 space-y-8 text-right">
              {/* Section 1: Customer Details */}
              <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-alexandria font-bold text-white text-base">بيانات العميل والمستلم</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">الاسم الثلاثي *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="صالح العتيبي"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">رقم الجوال (السعودية) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0501234567"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-emerald-400"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-slate-300 font-semibold block">البريد الإلكتروني (لتفعيل الدورات والمحتوى) *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="saleh@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Address & Interactive Location Pin */}
              <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-alexandria font-bold text-white text-base">عنوان الشحن والتوصيل</h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">المدينة *</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        aria-label="اختر مدينة التوصيل للشحن"
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-amber-400"
                      >
                        {SAUDI_CITIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} {c.isLocal ? "(توصيل فوري مجاني)" : `(شحن ${c.shippingDays})`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold block">الحي *</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        aria-label="اختر الحي السكني"
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-amber-400"
                      >
                        {JEDDAH_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold block">الشارع وتفاصيل العنوان *</label>
                    <input
                      type="text"
                      required
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      placeholder="اسم الشارع، رقم المبنى، المعلم القريب"
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-white focus:outline-none focus:border-brand-amber-400"
                    />
                  </div>

                  {/* Interactive Simulated Map Pin Selector */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-bold flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-amber-400" />
                        تحديد الموقع الجغرافي الدقيق (GPS Pin):
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            pinCoordinates: "21.5892° N, 39.1411° E (أبحر الجنوبية - جدة)",
                          });
                          alert("تم تحديد موقعك الحالي عبر GPS بنجاح!");
                        }}
                        className="text-brand-emerald-400 hover:text-brand-emerald-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        استخدام موقعي الحالي
                      </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden bg-brand-dark-900 border border-white/15 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 animate-bounce" />
                        </div>
                        <div>
                          <span className="font-bold text-white block text-xs sm:text-sm">
                            {formData.district} - {selectedCity}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {formData.pinCoordinates}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-xs text-brand-emerald-300 font-bold">
                        تم التثبيت ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method Selector */}
              <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark-850/80 border border-brand-emerald-500/20 shadow-xl space-y-5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-brand-emerald-500/20 text-brand-emerald-400 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-alexandria font-bold text-white text-base">طريقة الدفع</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {/* Mada */}
                  <div
                    onClick={() => setPaymentMethod("MADA")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "MADA"
                        ? "bg-brand-emerald-950/70 border-brand-emerald-500 shadow-emerald-glow"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-brand-amber-400" />
                        <span className="font-bold text-white">بطاقة مدى (MADA)</span>
                      </div>
                      <p className="text-[11px] text-slate-300">دفع فوري بالبطاقة البنكية السعودية</p>
                    </div>
                    {paymentMethod === "MADA" && <Check className="w-4 h-4 text-brand-emerald-400" />}
                  </div>

                  {/* Apple Pay */}
                  <div
                    onClick={() => setPaymentMethod("APPLE_PAY")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "APPLE_PAY"
                        ? "bg-brand-emerald-950/70 border-brand-emerald-500 shadow-emerald-glow"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white"> Apple Pay</span>
                      </div>
                      <p className="text-[11px] text-slate-300">دفع سريع وآمن بلمسة واحدة</p>
                    </div>
                    {paymentMethod === "APPLE_PAY" && <Check className="w-4 h-4 text-brand-emerald-400" />}
                  </div>

                  {/* Visa / MasterCard */}
                  <div
                    onClick={() => setPaymentMethod("CREDIT_CARD")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "CREDIT_CARD"
                        ? "bg-brand-emerald-950/70 border-brand-emerald-500 shadow-emerald-glow"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-brand-emerald-400" />
                        <span className="font-bold text-white">فيزا / ماستركارد</span>
                      </div>
                      <p className="text-[11px] text-slate-300">بطاقات الائتمان الدولية والمحلية</p>
                    </div>
                    {paymentMethod === "CREDIT_CARD" && <Check className="w-4 h-4 text-brand-emerald-400" />}
                  </div>

                  {/* Cash on Delivery (COD) */}
                  <div
                    onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "CASH_ON_DELIVERY"
                        ? "bg-brand-amber-950/70 border-brand-amber-400 shadow-gold-glow"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-brand-amber-400" />
                        <span className="font-bold text-white">الدفع عند الاستلام (COD)</span>
                      </div>
                      <p className="text-[11px] text-slate-300">ادفع نقداً لمندوب التوصيل بجدة</p>
                    </div>
                    {paymentMethod === "CASH_ON_DELIVERY" && <Check className="w-4 h-4 text-brand-amber-400" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Order Summary Card */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="p-6 sm:p-7 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 shadow-2xl space-y-5 sticky top-28 backdrop-blur-xl">
                <h3 className="font-alexandria font-bold text-white text-base pb-3 border-b border-white/10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-amber-400" />
                  ملخص الطلب ({items.length} عناصر)
                </h3>

                {/* Items preview list */}
                <div className="divide-y divide-white/5 max-h-56 overflow-y-auto pr-1 space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between text-xs sm:text-sm">
                      <div className="min-w-0 flex-1 pl-2">
                        <h4 className="font-bold text-white truncate">{item.title}</h4>
                        <span className="text-xs text-slate-400">
                          الكمية: {item.quantity} × {formatSAR(item.price)}
                        </span>
                      </div>
                      <span className="font-bold text-brand-amber-300 shrink-0">
                        {formatSAR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="كود الخصم (جرب: ALSHAWA10)"
                        className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-brand-dark-900 border border-white/15 text-xs text-white uppercase focus:outline-none focus:border-brand-amber-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
                    >
                      تطبيق
                    </button>
                  </div>
                  {couponSuccess && <p className="text-xs text-brand-emerald-400 font-semibold">{couponSuccess}</p>}
                  {couponError && <p className="text-xs text-red-400 font-semibold">{couponError}</p>}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي:</span>
                    <span className="text-white font-medium">{formatSAR(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-brand-emerald-400 font-bold">
                      <span>خصم الكوبون (10%):</span>
                      <span>-{formatSAR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>ضريبة القيمة المضافة (15%):</span>
                    <span className="text-white font-medium">{formatSAR(vatAmount)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>تكلفة الشحن ({selectedCity}):</span>
                    <span className={shippingCost === 0 ? "text-brand-emerald-400 font-bold" : "text-white"}>
                      {shippingCost === 0 ? "مجاني" : formatSAR(shippingCost)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold text-white">
                    <span>الإجمالي النهائي:</span>
                    <span className="font-alexandria font-black text-xl text-brand-amber-300">
                      {formatSAR(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-black text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري معالجة الطلب المشفر...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>تأكيد الطلب والدفع ({formatSAR(finalTotal)})</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-slate-400 text-center space-y-1">
                  <p>بالضغط على تأكيد الطلب، فإنك توافق على الشروط وسياسة الخصوصية.</p>
                  <p className="text-brand-emerald-400 font-semibold">
                    ✓ ضمان استرجاع خلال 14 يوماً في حال عدم الرضا التام
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
