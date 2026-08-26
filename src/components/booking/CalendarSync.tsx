"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Copy,
  Check,
  Download,
  ExternalLink,
  Video,
  Clock,
  MapPin,
  Sparkles,
  Bell
} from "lucide-react";

interface CalendarSyncProps {
  sessionTitle: string;
  deliveryType: "IN_PERSON" | "ONLINE_ZOOM";
  deliveryLabel: string;
  dateStr: string;
  timeSlot: string;
  zoomLink?: string;
  clientName: string;
}

export default function CalendarSync({
  sessionTitle,
  deliveryType,
  deliveryLabel,
  dateStr,
  timeSlot,
  zoomLink = "https://zoom.us/j/98421048892?pwd=VIP_SHAWA_MEETING",
  clientName,
}: CalendarSyncProps) {
  const [copiedZoom, setCopiedZoom] = useState(false);

  const handleCopyZoom = () => {
    navigator.clipboard.writeText(zoomLink);
    setCopiedZoom(true);
    setTimeout(() => setCopiedZoom(false), 2500);
  };

  // Generate Google Calendar Link
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`استشارة: ${sessionTitle} مع المستشار أحمد الشوا`);
    const details = encodeURIComponent(
      `جلسة استشارية خاصة مع المستشار ومدرب التسويق أحمد الشوا.\n\nالمستفيد: ${clientName}\nالنوع: ${deliveryLabel}\nالموعد: ${dateStr} - ${timeSlot}\nرابط اللقاء: ${zoomLink}`
    );
    const location = encodeURIComponent(deliveryType === "IN_PERSON" ? "مقر مكتب المستشار أحمد الشوا - جدة" : zoomLink);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download real .ics File
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ahmed Alshawa//Consultation Booking//AR
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:استشارة: ${sessionTitle} - أحمد الشوا
DESCRIPTION:جلسة استشارية خاصة مع المستشار أحمد الشوا للعميل ${clientName}. ${deliveryLabel}.
LOCATION:${deliveryType === "IN_PERSON" ? "مكتب المستشار أحمد الشوا - جدة" : zoomLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `consultation-ahmed-alshawa.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 rounded-2xl bg-brand-dark-900 border border-brand-emerald-500/30 p-5 sm:p-6 text-right">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-bold text-brand-emerald-300 flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-brand-amber-400" />
          مزامنة الموعد والقاعة الافتراضية
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-brand-amber-400/10 text-brand-amber-300 text-[10px] font-bold border border-brand-amber-400/30">
          تأكيد فوري
        </span>
      </div>

      {/* Meeting Link or In-Person Address Box */}
      {deliveryType === "ONLINE_ZOOM" ? (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <Video className="w-4 h-4 text-brand-emerald-400" />
              رابط قاعة Zoom المخصصة للجلسة:
            </span>
            <button
              type="button"
              onClick={handleCopyZoom}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-brand-amber-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              {copiedZoom ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedZoom ? "تم النسخ بنجاح" : "نسخ الرابط"}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-brand-emerald-300 truncate bg-brand-dark-950 p-2.5 rounded-lg border border-white/5 select-all">
            {zoomLink}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-brand-amber-300 font-bold">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>مقر اللقاء الحضوري (جدة):</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            طريق الملك عبدالعزيز، برج النخبة للأعمال، الطابق التاسع - مكتب الاستشارات التسويقية.
          </p>
        </div>
      )}

      {/* Calendar Buttons (Google Calendar & Apple/Outlook .ics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <a
          href={generateGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <CalendarIcon className="w-4 h-4 text-brand-amber-400 shrink-0" />
          <span>إضافة إلى تقويم Google</span>
          <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
        </a>

        <button
          type="button"
          onClick={handleDownloadICS}
          className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-brand-emerald-400 shrink-0" />
          <span>تحميل ملف Calendar (.ics)</span>
        </button>
      </div>

      {/* Automated WhatsApp Reminder Badge */}
      <div className="p-3 rounded-xl bg-brand-emerald-500/10 border border-brand-emerald-500/20 flex items-center gap-2 text-[11px] text-brand-emerald-300">
        <Bell className="w-4 h-4 text-brand-amber-400 shrink-0" />
        <span>
          🔔 سيتم إرسال تذكير تلقائي عبر الواتساب قبل الموعد بـ 24 ساعة وبساعتين على الرقم المسجل.
        </span>
      </div>
    </div>
  );
}
