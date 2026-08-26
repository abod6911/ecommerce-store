"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ConsultationsManager from "@/components/admin/ConsultationsManager";
import { Calendar, Video, MapPin, Sparkles } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminBookingsPage() {
  const { metrics } = useAdmin();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="إدارة مواعيد الاستشارات وجلسات VIP"
        subtitle="متابعة الجلسات الحضورية بجدة وقاعات Zoom والاطلاع على استمارات المشاريع"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">الجلسات القادمة:</span>
              <span className="font-alexandria font-bold text-lg text-brand-amber-300">
                {metrics.upcomingConsultationsCount} مواعيد مؤكدة
              </span>
            </div>
            <Calendar className="w-6 h-6 text-brand-amber-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">نوع اللقاءات:</span>
              <span className="font-bold text-xs text-white">مقر جدة (VIP) + قاعات Zoom</span>
            </div>
            <MapPin className="w-6 h-6 text-brand-emerald-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">ملفات الاستمارة المسبقة:</span>
              <span className="font-bold text-xs text-teal-300">مراجعة التحديات والميزانيات</span>
            </div>
            <Sparkles className="w-6 h-6 text-teal-400 opacity-80" />
          </div>
        </div>

        <ConsultationsManager />
      </main>
    </div>
  );
}
