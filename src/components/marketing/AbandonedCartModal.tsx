"use client";

import React, { useState, useEffect } from "react";
import {
  Gift,
  X,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { INSTRUCTOR_INFO } from "@/data/mockData";

export default function AbandonedCartModal() {
  const { items, total, setIsCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Only trigger if user has items or visited checkout/booking
    const dismissed = sessionStorage.getItem("ahmed_abandoned_cart_dismissed");
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    // Set idle timer for 40 seconds
    const timer = setTimeout(() => {
      if (items.length > 0 && !hasDismissed) {
        setIsOpen(true);
      }
    }, 38000);

    // Mouse leave detection (intent to exit)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && items.length > 0 && !hasDismissed) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [items, hasDismissed]);

  const handleDismiss = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem("ahmed_abandoned_cart_dismissed", "true");
  };

  const handleResume = () => {
    handleDismiss();
    setIsCartOpen(true);
  };

  const handleWhatsAppRecovery = () => {
    handleDismiss();
    const msg = `مرحباً، أود استكمال طلبي المعلق والاستفادة من هدية (ملخص الخطة التسويقية الشاملة).`;
    window.open(`https://wa.me/${INSTRUCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-ibm" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/50 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-right space-y-5"
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gift Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-amber-400 to-brand-amber-600 text-slate-950 flex items-center justify-center shadow-gold-glow">
              <Gift className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-amber-400/20 text-brand-amber-300 text-[10px] font-bold border border-brand-amber-400/30 inline-block">
                هدية حصرية قبل مغادرتك 🎁
              </span>
              <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white leading-snug">
                لديك عناصر محفوظة في سلتك!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                أكمل طلب كتابك أو حجز استشارتك الآن واحصل مجاناً على <strong className="text-brand-amber-300">ملخص الخطة التسويقية الشاملة (PDF تفاعلي)</strong> موقعاً من المستشار أحمد الشوا.
              </p>
            </div>

            {/* Cart Preview Row */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">عدد المنتجات بالسلة:</span>
                <span className="font-bold text-white">{items.length} عنصر</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">القيمة الإجمالية:</span>
                <span className="font-alexandria font-black text-brand-amber-300 text-sm">
                  {total} ر.س
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleResume}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>إكمال الطلب واستلام الهدية المجانية</span>
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRecovery}
                className="w-full py-3 rounded-2xl bg-brand-emerald-950/80 hover:bg-brand-emerald-900 text-brand-emerald-300 border border-brand-emerald-500/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-emerald-400" />
                <span>المساعدة في إتمام الطلب عبر الواتساب</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
