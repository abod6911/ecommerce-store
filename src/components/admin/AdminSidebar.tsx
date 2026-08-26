"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  Users,
  GraduationCap,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronLeft
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logoutAdmin, metrics } = useAdmin();

  const NAV_ITEMS = [
    {
      id: "overview",
      label: "نظرة عامة والتقارير",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "orders",
      label: "إدارة الطلبات والشحن",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: metrics.pendingDeliveryCount > 0 ? `${metrics.pendingDeliveryCount}` : null,
    },
    {
      id: "bookings",
      label: "مواعيد الاستشارات VIP",
      href: "/admin/bookings",
      icon: Calendar,
      badge: metrics.upcomingConsultationsCount > 0 ? `${metrics.upcomingConsultationsCount}` : null,
    },
    {
      id: "customers",
      label: "سجل العملاء (CRM)",
      href: "/admin/customers",
      icon: Users,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 sm:w-72 bg-brand-dark-950 border-l border-white/10 min-h-screen p-5 flex flex-col justify-between font-ibm text-right shrink-0" dir="rtl">
      <div className="space-y-6">
        {/* Logo & Portal Brand */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-black border-2 border-brand-amber-400/50 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0">
            <img
              src="/images/logo.jpg"
              alt="أحمد الشوا"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-alexandria font-bold text-sm text-white">بوابة الإدارة المركزية</h2>
              <span className="w-2 h-2 rounded-full bg-brand-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-brand-amber-300 font-medium">
              المستشار أحمد الشوا
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-3 block pb-1">
            القائمة الرئيسية
          </span>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-brand-emerald-950/90 text-brand-amber-300 border border-brand-amber-400/40 shadow-gold-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-amber-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-amber-400 text-slate-950 text-[10px] font-black shadow-sm">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Store Quick Return Link */}
        <div className="pt-2 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-emerald-400" />
              <span>معاينة الموقع للزوار</span>
            </div>
            <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </div>

      {/* Admin User Footer & Logout */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-bold text-xs text-white block">أحمد محمد الشوا</span>
            <span className="text-[10px] text-brand-emerald-400 font-medium block">
              المدير العام والمستشار المعتمد
            </span>
          </div>
          <ShieldCheck className="w-5 h-5 text-brand-amber-400 shrink-0" />
        </div>

        <button
          type="button"
          onClick={logoutAdmin}
          className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>قفل اللوحة وتسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
