"use client";

import React, { useState } from "react";
import {
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  X,
  Share2,
  Download
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { AdminConsultation } from "@/data/adminMockData";

export default function ConsultationsManager() {
  const { consultations, updateConsultationStatus, exportToCsv } = useAdmin();
  const [selectedConsultation, setSelectedConsultation] = useState<AdminConsultation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientPhone.includes(searchTerm) ||
      c.sessionType.includes(searchTerm);
    const matchesFilter = filterStatus === "ALL" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSendWhatsAppReminder = (c: AdminConsultation) => {
    const msg = `مرحباً ${c.clientName}، نذكرك بموعدك مع المستشار أحمد الشوا:\nالموعد: ${c.date} الساعة ${c.timeSlot}.\nنوع الجلسة: ${c.sessionType}.\nرابط القاعة: ${c.zoomMeetingUrl || "حضورياً بمقر جدة"}\n\nنتمنى لك جلسة استشارية مثمرة!`;
    window.open(`https://wa.me/966${c.clientPhone.replace(/^0/, "")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6 font-ibm text-right" dir="rtl">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-xl backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث باسم العميل أو رقم الجوال..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 justify-end flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
          >
            <option value="ALL">جميع المواعيد</option>
            <option value="UPCOMING">المواعيد القادمة</option>
            <option value="COMPLETED">الجلسات المكتملة</option>
          </select>

          <button
            type="button"
            onClick={() => exportToCsv("consultations")}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>تصدير المواعيد</span>
          </button>
        </div>
      </div>

      {/* Consultations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredConsultations.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-2xl backdrop-blur-xl space-y-5 flex flex-col justify-between hover:border-brand-amber-400/40 transition-all"
          >
            <div className="space-y-4">
              {/* Header Status & Price */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                  c.status === "UPCOMING"
                    ? "bg-brand-emerald-500/20 text-brand-emerald-400 border-brand-emerald-500/30"
                    : "bg-white/5 text-slate-400 border-white/10"
                }`}>
                  {c.status === "UPCOMING" ? "موعد قادم مؤكد ✓" : "جلسة مكتملة"}
                </span>
                <span className="font-alexandria font-black text-brand-amber-300 text-base">
                  {formatSAR(c.price)}
                </span>
              </div>

              {/* Client Info */}
              <div className="space-y-1">
                <h4 className="font-alexandria font-bold text-base text-white">{c.clientName}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-brand-amber-400" />
                  <span className="font-mono" dir="ltr">{c.clientPhone}</span>
                  <span>•</span>
                  <span>{c.clientEmail}</span>
                </div>
              </div>

              {/* Appointment Date & Time */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-1.5 text-brand-amber-300">
                  <Calendar className="w-4 h-4" />
                  {c.date}
                </span>
                <span className="font-bold flex items-center gap-1.5 text-white">
                  <Clock className="w-4 h-4 text-brand-emerald-400" />
                  الساعة {c.timeSlot}
                </span>
              </div>

              {/* Intake Snapshot */}
              {c.intakeAnswers && (
                <div className="p-3.5 rounded-2xl bg-brand-dark-950 border border-white/5 space-y-1.5 text-xs text-slate-300">
                  <span className="text-[11px] font-bold text-brand-emerald-400 block">
                    🏢 مجال النشاط: {c.intakeAnswers.businessField}
                  </span>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    <strong>التحدي:</strong> {c.intakeAnswers.marketingChallenge}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedConsultation(c)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-brand-amber-400" />
                <span>عرض ملف الاستمارة</span>
              </button>

              {c.delivery === "ONLINE_ZOOM" && (
                <a
                  href={c.zoomMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all whitespace-nowrap"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>بدء Zoom</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => handleSendWhatsAppReminder(c)}
                className="p-2.5 rounded-xl bg-brand-emerald-600/20 text-brand-emerald-400 border border-brand-emerald-500/30 hover:bg-brand-emerald-600/30 transition-colors"
                title="إرسال تذكير واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Intake Details Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-ibm" dir="rtl">
          <div className="relative w-full max-w-lg rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/50 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-2xl text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">
                  استمارة تحضير الاستشارة
                </h3>
                <p className="text-xs text-brand-amber-300 mt-0.5">
                  العميل: {selectedConsultation.clientName} ({selectedConsultation.sessionType})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConsultation(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[11px]">1. مجال المشروع:</span>
                <span className="font-bold text-white text-sm">{selectedConsultation.intakeAnswers?.businessField}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[11px]">2. رابط حساب المشروع:</span>
                <a
                  href={selectedConsultation.intakeAnswers?.socialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-brand-emerald-400 flex items-center gap-1 hover:underline"
                >
                  <span>{selectedConsultation.intakeAnswers?.socialLink}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[11px]">3. الميزانية الشهرية الحالية:</span>
                <span className="font-bold text-brand-amber-300">{selectedConsultation.intakeAnswers?.currentBudget}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[11px]">4. التحدي التسويقي المطلوب حله:</span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedConsultation.intakeAnswers?.marketingChallenge}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  updateConsultationStatus(selectedConsultation.id, "COMPLETED");
                  setSelectedConsultation(null);
                }}
                className="flex-1 py-3.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-emerald-glow transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تعيين الجلسة كـ "مكتملة"</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
