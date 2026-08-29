"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  Share2,
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  Building2,
  Calendar,
  Truck,
  CreditCard,
  QrCode
} from "lucide-react";
import { formatSAR, getAssetPath } from "@/lib/utils";
import { INSTRUCTOR_INFO } from "@/data/mockData";

export interface InvoiceData {
  orderNumber: string;
  invoiceNumber: string;
  dateStr: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  city: string;
  items: {
    title: string;
    type: "BOOK" | "COURSE" | "CONSULTATION";
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  vatAmount: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "PAID" | "PENDING";
  trackingCode?: string;
}

interface DigitalInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
}

export default function DigitalInvoiceModal({
  isOpen,
  onClose,
  invoice,
}: DigitalInvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `فاتورة ضريبية رسمية للمنصة - أحمد الشوا\nرقم الفاتورة: ${invoice.invoiceNumber}\nرقم الطلب: ${invoice.orderNumber}\nالعميل: ${invoice.customerName}\nالإجمالي: ${formatSAR(invoice.total)}\nحالة السداد: مدفوع بالكامل ✅`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Generate cryptographic-looking QR Verification Code data
  const qrVerificationUrl = `https://ecommerce-store-ashy-gamma.vercel.app/verify?inv=${invoice.invoiceNumber}&amt=${invoice.total}`;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-ibm text-right overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[94vh] flex flex-col rounded-3xl bg-slate-900 border-2 border-brand-amber-400/50 shadow-2xl overflow-hidden"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-brand-dark-950 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-brand-amber-400" />
              <h3 className="font-alexandria font-bold text-sm sm:text-base text-white">
                الفاتورة الضريبية الإلكترونية المعتمدة
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-brand-emerald-500/20 hover:bg-brand-emerald-500/30 text-brand-emerald-300 border border-brand-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">طباعة / PDF</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">مشاركة</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div
            ref={printRef}
            className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-900 text-slate-100 print:bg-white print:text-black print:p-0"
          >
            {/* Top Official Credentials */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black border-2 border-brand-amber-400 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
                  <img
                    src={getAssetPath("/images/logo.jpg")}
                    alt="أحمد الشوا"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-alexandria font-bold text-lg text-white print:text-black">
                    المستشار أحمد محمد الشوا
                  </h4>
                  <p className="text-xs text-brand-emerald-400 print:text-emerald-800 font-medium">
                    مدرب تسويق معتمد من المؤسسة العامة للتدريب التقني والمهني (TVTC)
                  </p>
                  <p className="text-[11px] text-slate-400 print:text-gray-600 font-mono">
                    وثيقة العمل الحر: FL-982145 • جدة، المملكة العربية السعودية
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-left shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40 text-xs font-black">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>فاتورة مسددة بالكامل</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  رقم الفاتورة: {invoice.invoiceNumber}
                </p>
              </div>
            </div>

            {/* Bill To & Order Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-brand-dark-950/80 border border-white/10 print:border-gray-300 text-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  بيانات العميل والمشتري:
                </span>
                <p className="font-bold text-sm text-white print:text-black">
                  {invoice.customerName}
                </p>
                <p className="text-slate-300 font-mono" dir="ltr">
                  +966 {invoice.customerPhone}
                </p>
                <p className="text-slate-400">
                  {invoice.city} — {invoice.shippingAddress}
                </p>
              </div>

              <div className="space-y-1.5 sm:text-left">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  تفاصيل الدفع والشحن:
                </span>
                <p className="text-slate-300">
                  <strong className="text-white">تاريخ المعاملة:</strong> {invoice.dateStr}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">طريقة الدفع:</strong> {invoice.paymentMethod}
                </p>
                <p className="text-slate-300 font-mono">
                  <strong className="text-white">بوليصة الشحن:</strong> {invoice.trackingCode || "SMSA-KSA-994821"}
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 print:border-gray-300">
              <table className="w-full text-right text-xs">
                <thead className="bg-brand-dark-950/90 text-slate-300 border-b border-white/10 font-bold">
                  <tr>
                    <th className="py-3 px-4">البند / المحتوى</th>
                    <th className="py-3 px-4 text-center">الكمية</th>
                    <th className="py-3 px-4 text-center">السعر الفردي</th>
                    <th className="py-3 px-4 text-left">الإجمالي (ر.س)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-3.5 px-4 font-medium text-white print:text-black">
                        {item.title}
                        <span className="block text-[10px] text-brand-amber-300 print:text-amber-700">
                          {item.type === "BOOK"
                            ? "نسخة مطبوعة مجلدة فاخرة"
                            : item.type === "COURSE"
                            ? "برنامج ماستر كلاس مشفر DRM"
                            : "استشارة تسويقية VIP"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">{item.quantity}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{formatSAR(item.price)}</td>
                      <td className="py-3.5 px-4 text-left font-black text-brand-emerald-400 print:text-black font-mono">
                        {formatSAR(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & QR Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2 items-center">
              {/* Cryptographic QR Verification Code */}
              <div className="sm:col-span-6 p-4 rounded-2xl bg-brand-dark-950 border border-white/10 flex items-center gap-4">
                {/* SVG QR Code Replica */}
                <div className="w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />

                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    <rect x="35" y="10" width="10" height="10" />
                    <rect x="50" y="20" width="15" height="10" />
                    <rect x="35" y="35" width="30" height="10" />
                    <rect x="20" y="50" width="10" height="15" />
                    <rect x="40" y="50" width="20" height="20" />
                    <rect x="70" y="50" width="20" height="10" />
                    <rect x="70" y="70" width="10" height="20" />
                    <rect x="85" y="75" width="10" height="15" />
                  </svg>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] font-bold text-brand-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    رمز التحقق الرقمي ZATCA
                  </span>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    فاتورة إلكترونية موثقة ومطابقة لاشتراطات التجارة الإلكترونية السعودية.
                  </p>
                </div>
              </div>

              {/* Total SAR Calculation Breakdown */}
              <div className="sm:col-span-6 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono text-white font-bold">{formatSAR(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-mono text-white font-bold">{formatSAR(invoice.vatAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>تكلفة الشحن والتوصيل:</span>
                  <span className="font-mono text-brand-emerald-400 font-bold">
                    {invoice.shippingCost === 0 ? "مجاني (0 ر.س)" : formatSAR(invoice.shippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm sm:text-base font-black text-brand-amber-300">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="font-mono font-black text-lg text-brand-amber-400">
                    {formatSAR(invoice.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Terms */}
            <div className="pt-4 border-t border-white/10 text-center text-[10px] text-slate-400 print:text-gray-500">
              <p>
                شكراً لتعاملكم مع المنصة الرسمية للمستشار أحمد الشوا • للدعم والاستفسارات: 0555583379
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
