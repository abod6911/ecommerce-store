"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  BookOpen,
  Calendar,
  Users,
  Package,
  Sparkles,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

export default function AdminKpiCards() {
  const { metrics } = useAdmin();

  const KPIS = [
    {
      id: "revenue",
      title: "إجمالي الإيرادات المحققة",
      value: formatSAR(metrics.totalRevenue),
      change: `+${metrics.revenueGrowthPct}% نمو هذا الشهر`,
      changePositive: true,
      icon: DollarSign,
      color: "from-brand-amber-400 to-brand-amber-600",
      textColor: "text-brand-amber-300",
      borderColor: "border-brand-amber-400/40",
      bgGlow: "bg-brand-amber-500/10",
      subLabel: "شامل مبيعات الكتب والدورات والاستشارات",
    },
    {
      id: "books",
      title: "مبيعات الكتب الورقية والشحن",
      value: `${metrics.totalBooksSold} نسخة`,
      change: `${metrics.pendingDeliveryCount} شحنات قيد التوصيل`,
      changePositive: true,
      icon: BookOpen,
      color: "from-brand-emerald-500 to-teal-600",
      textColor: "text-brand-emerald-300",
      borderColor: "border-brand-emerald-500/40",
      bgGlow: "bg-brand-emerald-500/10",
      subLabel: "سمسا | أرامكس | ريدبوكس | مندوب جدة",
    },
    {
      id: "consultations",
      title: "الجلسات الاستشارية VIP",
      value: `${metrics.upcomingConsultationsCount} جلسات قادمة`,
      change: "تأكيد فوري ومزامنة Zoom",
      changePositive: true,
      icon: Calendar,
      color: "from-teal-400 to-emerald-600",
      textColor: "text-brand-emerald-400",
      borderColor: "border-brand-emerald-500/40",
      bgGlow: "bg-brand-emerald-500/10",
      subLabel: "حضورياً بمكتب جدة + عبر Zoom",
    },
    {
      id: "customers",
      title: "إجمالي المشتركين والعملاء",
      value: `${metrics.totalCustomersCount.toLocaleString("en-US")} مشترك`,
      change: "+85 مشترك جديد هذا الأسبوع",
      changePositive: true,
      icon: Users,
      color: "from-brand-amber-500 to-brand-emerald-500",
      textColor: "text-brand-amber-300",
      borderColor: "border-brand-amber-400/30",
      bgGlow: "bg-brand-amber-500/10",
      subLabel: "رواد أعمال وأصحاب متاجر سعودية",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-ibm text-right" dir="rtl">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`p-5 sm:p-6 rounded-3xl bg-brand-dark-850/90 border ${kpi.borderColor} shadow-2xl backdrop-blur-xl space-y-4 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Ambient subtle glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${kpi.bgGlow} rounded-full blur-2xl pointer-events-none -z-0`} />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold text-slate-400">{kpi.title}</span>
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${kpi.color} text-slate-950 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <div className={`font-alexandria font-black text-xl sm:text-2xl lg:text-[26px] ${kpi.textColor} leading-tight`}>
                {kpi.value}
              </div>
              <p className="text-[11px] text-slate-400 truncate">{kpi.subLabel}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
              <span className="text-brand-emerald-400 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {kpi.change}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">محدث الآن</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
