"use client";

import React, { useState } from "react";
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Phone,
  Copy,
  Check
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import { useUserAuth, ShippingOrderRecord } from "@/context/UserAuthContext";

const COURIER_INFO = {
  SMSA: { name: "سمسا إكسبريس (SMSA Express)", trackUrl: "https://www.smsaexpress.com/ar/tracking", color: "text-amber-400" },
  ARAMEX: { name: "أرامكس (Aramex)", trackUrl: "https://www.aramex.com/sa/ar/track/shipments", color: "text-red-400" },
  REDBOX: { name: "خزائن ريدبوكس الذكية (RedBox)", trackUrl: "https://redboxsa.com/track", color: "text-rose-400" },
};

export default function OrderTracking() {
  const { shippingOrders } = useUserAuth();
  const [searchCode, setSearchCode] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrderRecord | null>(shippingOrders[0] || null);
  const [copiedTrack, setCopiedTrack] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = shippingOrders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(searchCode.trim().toLowerCase()) ||
        o.trackingNumber.toLowerCase().includes(searchCode.trim().toLowerCase())
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      // Mock generate on search for demo
      const mockOrder: ShippingOrderRecord = {
        id: `ord-${Date.now()}`,
        orderNumber: searchCode.trim().toUpperCase(),
        items: ["كتاب إستراتيجيات التسويق الرقمي (نسخة مطبوعة)"],
        totalPrice: 165,
        courier: "SMSA",
        trackingNumber: `SMSA-SA-${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: "OUT_FOR_DELIVERY",
        recipientCity: "الرياض - حي الياسمين",
        estimatedDelivery: "غداً خلال ساعات العمل",
        createdAt: new Date().toISOString(),
      };
      setSelectedOrder(mockOrder);
    }
  };

  const handleCopyTracking = (trackNum: string) => {
    navigator.clipboard.writeText(trackNum);
    setCopiedTrack(true);
    setTimeout(() => setCopiedTrack(false), 2000);
  };

  const getStepIndex = (status: ShippingOrderRecord["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return 0;
      case "HANDED_TO_COURIER":
        return 1;
      case "OUT_FOR_DELIVERY":
        return 2;
      case "DELIVERED":
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = selectedOrder ? getStepIndex(selectedOrder.status) : 2;

  const STEPS = [
    { title: "تم تأكيد وتجهيز الشحنة", desc: "تغليف الكتاب والتوقيع" },
    { title: "تم التسليم لشركة الشحن", desc: "سمسا / أرامكس / ريدبوكس" },
    { title: "الشحنة قيد التوصيل", desc: "في طريقها لموقعك" },
    { title: "تم الاستلام بنجاح", desc: "شكراً لثقتكم" },
  ];

  return (
    <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl text-right font-ibm" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs font-bold">
            <Truck className="w-3.5 h-3.5 text-brand-amber-400" />
            <span>نظام تتبع شحنات الكتب الورقية المطبوعة</span>
          </div>
          <h3 className="font-alexandria font-bold text-lg text-white">
            تتبع مسار طلبك وموقع الشحنة المباشر
          </h3>
        </div>

        {/* Quick Search Form */}
        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="أدخل رقم الطلب أو التتبع..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all font-mono"
          />
          <button
            type="submit"
            className="absolute left-2.5 top-2.5 text-slate-400 hover:text-brand-amber-300 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {selectedOrder ? (
        <div className="space-y-6">
          {/* Order Details Header Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">رقم الطلب:</span>
              <span className="font-alexandria font-bold text-white font-mono">{selectedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">شركة الشحن:</span>
              <span className="font-bold text-brand-amber-300">{COURIER_INFO[selectedOrder.courier]?.name || selectedOrder.courier}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">مدينة المستلم:</span>
              <span className="font-medium text-slate-200">{selectedOrder.recipientCity}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">الموعد المتوقع:</span>
              <span className="font-bold text-brand-emerald-400">{selectedOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* 4-Stage Live Progress Bar */}
          <div className="py-4">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 right-6 left-6 h-1 bg-white/10 -z-0">
                <div
                  className="h-full bg-gradient-to-r from-brand-amber-400 to-brand-emerald-400 transition-all duration-700"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>

              {/* Steps Nodes */}
              <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                {STEPS.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div key={idx} className="space-y-2">
                      <div
                        className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          isDone
                            ? "bg-brand-emerald-600 border-brand-emerald-400 text-white shadow-emerald-glow"
                            : "bg-brand-dark-900 border-white/20 text-slate-500"
                        } ${isCurrent ? "scale-110 ring-4 ring-brand-amber-400/30" : ""}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`block text-xs font-bold ${isDone ? "text-white" : "text-slate-500"}`}>
                          {step.title}
                        </span>
                        <span className="block text-[10px] text-slate-400 hidden sm:block">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tracking Number & External Courier Actions */}
          <div className="p-4 rounded-2xl bg-brand-dark-950 border border-brand-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">رقم بوليصة الشحن:</span>
              <span className="font-mono font-bold text-brand-amber-300 text-sm bg-black/50 px-3 py-1 rounded-lg border border-white/10">
                {selectedOrder.trackingNumber}
              </span>
              <button
                type="button"
                onClick={() => handleCopyTracking(selectedOrder.trackingNumber)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="نسخ رقم التتبع"
              >
                {copiedTrack ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <a
              href={COURIER_INFO[selectedOrder.courier]?.trackUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:brightness-110 transition-all whitespace-nowrap"
            >
              <span>متابعة الشحنة في موقع الناقل</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-xs">
          لا توجد شحنات مسجلة بهذا الرقم حالياً.
        </div>
      )}
    </div>
  );
}
