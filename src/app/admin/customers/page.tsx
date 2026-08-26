"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import CustomersCrm from "@/components/admin/CustomersCrm";
import { Users, DollarSign, Award, Sparkles } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminCustomersPage() {
  const { metrics } = useAdmin();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="سجل العملاء وإدارة علاقات المشتركين (CRM)"
        subtitle="متابعة القيمة الدائمة (LTV)، واشتراكات الدورات، وسجلات مشتريات الكتب والاستشارات"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Customer Base Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">إجمالي قاعدة العملاء:</span>
              <span className="font-alexandria font-bold text-lg text-white">
                +{metrics.totalCustomersCount.toLocaleString("en-US")} مشترك
              </span>
            </div>
            <Users className="w-6 h-6 text-brand-emerald-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">تصنيف العملاء:</span>
              <span className="font-bold text-xs text-brand-amber-300">
                VIP استشارات • مشترين كتب • طلاب دورات
              </span>
            </div>
            <Award className="w-6 h-6 text-brand-amber-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">قنوات التواصل المباشر:</span>
              <span className="font-bold text-xs text-teal-300">محادثات واتساب فورية مخصصة</span>
            </div>
            <Sparkles className="w-6 h-6 text-teal-400 opacity-80" />
          </div>
        </div>

        <CustomersCrm />
      </main>
    </div>
  );
}
