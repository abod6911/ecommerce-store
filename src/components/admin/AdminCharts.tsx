"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  Sparkles,
  Layers,
  Truck
} from "lucide-react";
import { MONTHLY_REVENUE_CHART } from "@/data/adminMockData";
import { formatSAR } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

export default function AdminCharts() {
  const { orders } = useAdmin();
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Calculate Order Delivery Statuses
  const statusCounts = {
    PROCESSING: orders.filter((o) => o.shippingStatus === "PROCESSING").length,
    HANDED: orders.filter((o) => o.shippingStatus === "HANDED_TO_COURIER").length,
    IN_TRANSIT: orders.filter((o) => o.shippingStatus === "IN_TRANSIT").length,
    DELIVERED: orders.filter((o) => o.shippingStatus === "DELIVERED").length,
  };
  const totalOrders = orders.length || 1;

  const maxMonthlyRevenue = Math.max(...MONTHLY_REVENUE_CHART.map((m) => m.total));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-ibm text-right" dir="rtl">
      {/* Chart 1: Monthly Revenue Breakdown (8 Cols) */}
      <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-amber-300">
              <BarChart3 className="w-4 h-4 text-brand-amber-400" />
              <span>تحليل الإيرادات ونمو المبيعات الشهرية (2026)</span>
            </div>
            <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">
              توزيع المداخيل بين الكتب والاستشارات والدورات
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-amber-400" />
              الكتب المطبوعة
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald-400" />
              الاستشارات VIP
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              الدورات المشفرة
            </span>
          </div>
        </div>

        {/* Responsive Bar Chart Visualizer */}
        <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
          {MONTHLY_REVENUE_CHART.map((data, idx) => {
            const heightPct = (data.total / maxMonthlyRevenue) * 100;
            const isHovered = hoveredMonth === idx;

            return (
              <div
                key={data.month}
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-44 p-3 rounded-xl bg-brand-dark-950 border border-brand-amber-400/50 shadow-2xl z-30 text-right text-xs space-y-1 backdrop-blur-md animate-in fade-in zoom-in-95 pointer-events-none">
                    <span className="font-bold text-white block border-b border-white/10 pb-1">
                      {data.month}
                    </span>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>الكتب:</span>
                      <span className="font-bold text-brand-amber-300">{formatSAR(data.books)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>الاستشارات:</span>
                      <span className="font-bold text-brand-emerald-400">{formatSAR(data.consultations)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>الدورات:</span>
                      <span className="font-bold text-teal-300">{formatSAR(data.courses)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-white pt-1 border-t border-white/10">
                      <span>الإجمالي:</span>
                      <span className="text-brand-amber-300">{formatSAR(data.total)}</span>
                    </div>
                  </div>
                )}

                {/* Stacked Bars */}
                <div
                  className="w-full max-w-[44px] rounded-xl overflow-hidden flex flex-col-reverse transition-all duration-300 group-hover:brightness-125 group-hover:scale-105"
                  style={{ height: `${heightPct}%` }}
                >
                  <div
                    className="w-full bg-brand-amber-400"
                    style={{ height: `${(data.books / data.total) * 100}%` }}
                  />
                  <div
                    className="w-full bg-brand-emerald-500"
                    style={{ height: `${(data.consultations / data.total) * 100}%` }}
                  />
                  <div
                    className="w-full bg-teal-400"
                    style={{ height: `${(data.courses / data.total) * 100}%` }}
                  />
                </div>

                <span className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  isHovered ? "text-brand-amber-300 font-bold" : "text-slate-400"
                }`}>
                  {data.month.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2: Order Delivery Status Breakdown Donut (4 Cols) */}
      <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 shadow-2xl backdrop-blur-xl space-y-6 flex flex-col justify-between">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-emerald-300">
            <Truck className="w-4 h-4 text-brand-emerald-400" />
            <span>حالات شحن وتوصيل الكتب</span>
          </div>
          <h3 className="font-alexandria font-bold text-base text-white">
            توزيع مراحل الشحن اللوجستي
          </h3>
        </div>

        {/* Donut Progress Stats */}
        <div className="space-y-3.5 py-2">
          {/* 1. Delivered */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                تم التوصيل بنجاح:
              </span>
              <span className="font-bold text-emerald-400">{statusCounts.DELIVERED} طلبات ({Math.round((statusCounts.DELIVERED / totalOrders) * 100)}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(statusCounts.DELIVERED / totalOrders) * 100}%` }} />
            </div>
          </div>

          {/* 2. In Transit */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-amber-400" />
                قيد التوصيل مع المندوب:
              </span>
              <span className="font-bold text-brand-amber-300">{statusCounts.IN_TRANSIT} طلبات ({Math.round((statusCounts.IN_TRANSIT / totalOrders) * 100)}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-brand-amber-400 rounded-full" style={{ width: `${(statusCounts.IN_TRANSIT / totalOrders) * 100}%` }} />
            </div>
          </div>

          {/* 3. Handed to Courier */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                تم التسليم لشركة الشحن:
              </span>
              <span className="font-bold text-teal-300">{statusCounts.HANDED} طلبات ({Math.round((statusCounts.HANDED / totalOrders) * 100)}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: `${(statusCounts.HANDED / totalOrders) * 100}%` }} />
            </div>
          </div>

          {/* 4. Processing */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                قيد التجهيز والتغليف:
              </span>
              <span className="font-bold text-slate-300">{statusCounts.PROCESSING} طلبات ({Math.round((statusCounts.PROCESSING / totalOrders) * 100)}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(statusCounts.PROCESSING / totalOrders) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Express Tip */}
        <div className="p-3.5 rounded-2xl bg-brand-emerald-950/70 border border-brand-emerald-500/30 text-[11px] text-brand-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-amber-400 shrink-0" />
          <span>متوسط وقت تسليم طلبات جدة: <strong>أقل من 6 ساعات</strong> عبر المندوب الفوري.</span>
        </div>
      </div>
    </div>
  );
}
