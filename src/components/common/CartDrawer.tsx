"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatSAR } from "@/lib/utils";
import { SAUDI_CITIES } from "@/data/mockData";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    vatAmount,
    shippingCost,
    total,
    selectedCity,
    setSelectedCity,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-ibm" dir="rtl">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-dark-900 border-r border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-brand-dark-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center border border-brand-amber-400/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-alexandria font-bold text-white text-base">سلة المشتريات</h3>
                <p className="text-xs text-slate-400">
                  {items.length === 0 ? "السلة فارغة حالياً" : `${items.length} منتجات في السلة`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-500 border border-white/10">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">سلتك لا تزال خالية</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    استكشف الكتب الحصرية أو برامج الماستر كلاس لتبدأ رحلتك التسويقية وتنمية مشروعك.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-brand-emerald-600/30 text-brand-emerald-300 border border-brand-emerald-500/40 text-xs font-bold hover:bg-brand-emerald-600/50 transition-all"
                >
                  تصفح المنتجات والكتب الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-center hover:border-brand-amber-400/30 transition-colors"
                >
                  {item.coverImage && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-dark-800 shrink-0 border border-white/10">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-amber-400/20 text-brand-amber-300">
                      {item.type === "PHYSICAL_BOOK"
                        ? "كتاب ورقي فاخر"
                        : item.type === "COURSE"
                        ? "ماستر كلاس مشفر DRM"
                        : "استشارة VIP"}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <div className="text-xs font-black text-brand-amber-300">
                      {formatSAR(item.price)}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {item.type === "PHYSICAL_BOOK" && (
                      <div className="flex items-center gap-2 bg-brand-dark-950 px-2 py-1 rounded-lg border border-white/10 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* City Selection for Shipping */}
            {items.some((i) => i.type === "PHYSICAL_BOOK") && (
              <div className="p-4 rounded-2xl bg-brand-emerald-950/40 border border-brand-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-emerald-400" />
                    مدينة التوصيل:
                  </span>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="اختر مدينة التوصيل"
                    className="bg-brand-dark-900 text-white text-xs border border-brand-emerald-500/40 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    {SAUDI_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} {city.isLocal ? "(توصيل فوري مجاني)" : `(+${city.cost} ر.س)`}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-brand-emerald-300 leading-relaxed">
                  {selectedCity === "جدة"
                    ? "✨ توصيل فوري خلال 3-6 ساعات داخل مدينة جدة مجاناً!"
                    : "🚚 شحن سريع عبر سمسا أو أرامكس مع تتبع مباشر."}
                </p>
              </div>
            )}
          </div>

          {/* Footer & Checkout button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-brand-dark-950 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>المجموع الفرعي:</span>
                  <span className="text-white font-medium">{formatSAR(subtotal)}</span>
                </div>
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
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-brand-amber-300 font-black text-base">{formatSAR(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>متابعة إتمام الطلب والدفع</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald-400" />
                <span>دفع آمن 100% | مدى | Apple Pay | الدفع عند الاستلام بجدة</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
