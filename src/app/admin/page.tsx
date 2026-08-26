"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminKpiCards from "@/components/admin/AdminKpiCards";
import AdminCharts from "@/components/admin/AdminCharts";
import OrdersTable from "@/components/admin/OrdersTable";
import ConsultationsManager from "@/components/admin/ConsultationsManager";
import {
  Sparkles,
  ArrowUpLeft,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="لوحة التقارير والعمليات التنفيذية"
        subtitle="مرحباً بك في مركز إدارة المبيعات والاستشارات والخدمات اللوجستية"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* 1. Executive Top KPI Cards */}
        <AdminKpiCards />

        {/* 2. Visual Revenue & Order Status Charts */}
        <AdminCharts />

        {/* 3. Quick Actions & Tables Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-alexandria font-bold text-lg text-white">
                أحدث طلبات الكتب الورقية المطبوعة
              </h3>
              <p className="text-xs text-slate-400">
                متابعة شحنات سمسا وأرامكس وريدبوكس المباشرة
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs text-brand-amber-300 hover:underline flex items-center gap-1 font-bold"
            >
              <span>عرض كل الطلبات</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <OrdersTable />
        </div>

        {/* 4. Upcoming Consultations Section */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-alexandria font-bold text-lg text-white">
                مواعيد الجلسات الاستشارية القادمة (VIP)
              </h3>
              <p className="text-xs text-slate-400">
                قاعات Zoom الافتراضية واللقاءات الحضورية بجدة
              </p>
            </div>

            <Link
              href="/admin/bookings"
              className="text-xs text-brand-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>إدارة كافة المواعيد</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ConsultationsManager />
        </div>
      </main>
    </div>
  );
}
