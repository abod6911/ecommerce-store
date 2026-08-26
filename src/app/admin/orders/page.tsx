"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import { ShoppingBag, Truck, Package, Sparkles } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminOrdersPage() {
  const { metrics } = useAdmin();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="إدارة طلبات الكتب والشحن اللوجستي"
        subtitle="تتبع وتحديث مسار الشحنات وربط بوالص سمسا وأرامكس وريدبوكس"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Logistics Mini Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">إجمالي الكتب المباعة:</span>
              <span className="font-alexandria font-bold text-lg text-white">{metrics.totalBooksSold} نسخة</span>
            </div>
            <Package className="w-6 h-6 text-brand-emerald-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-brand-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">شحنات قيد التجهيز والتوصيل:</span>
              <span className="font-alexandria font-bold text-lg text-brand-amber-300">{metrics.pendingDeliveryCount} شحنات</span>
            </div>
            <Truck className="w-6 h-6 text-brand-amber-400 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-brand-dark-850 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">شركات الشحن المربوطة:</span>
              <span className="font-bold text-xs text-teal-300">سمسا • أرامكس • ريدبوكس • مندوب</span>
            </div>
            <Sparkles className="w-6 h-6 text-teal-400 opacity-80" />
          </div>
        </div>

        <OrdersTable />
      </main>
    </div>
  );
}
