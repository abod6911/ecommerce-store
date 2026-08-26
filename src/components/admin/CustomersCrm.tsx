"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Download,
  Filter,
  DollarSign,
  BookOpen,
  Calendar,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { AdminCustomer } from "@/data/adminMockData";

const TAG_LABELS = {
  ALL_PRODUCTS: { label: "عميل VIP متكامل ⭐", color: "bg-brand-amber-400/20 text-brand-amber-300 border-brand-amber-400/40" },
  VIP_CONSULTING: { label: "عميل استشارات VIP", color: "bg-brand-emerald-500/20 text-brand-emerald-400 border-brand-emerald-500/40" },
  BOOK_BUYER: { label: "مشتري كتب مطبوعة", color: "bg-teal-500/20 text-teal-300 border-teal-500/40" },
  COURSE_STUDENT: { label: "مشترك دورات DRM", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
};

export default function CustomersCrm() {
  const { customers, exportToCsv } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("ALL");

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = tagFilter === "ALL" || c.tag === tagFilter;
    return matchesSearch && matchesTag;
  });

  const handleWhatsApp = (phone: string, name: string) => {
    const msg = `مرحباً ${name}، نتواصل معك من مكتب المستشار أحمد الشوا لخدمتك وتقديم أي مساعدة تحتاجها.`;
    window.open(`https://wa.me/966${phone.replace(/^0/, "")}?text=${encodeURIComponent(msg)}`, "_blank");
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
            placeholder="بحث بالاسم، رقم الجوال، أو المدينة..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 justify-end flex-wrap">
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-3.5 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
          >
            <option value="ALL">جميع تصنيفات العملاء</option>
            <option value="ALL_PRODUCTS">عميل متكامل (VIP)</option>
            <option value="VIP_CONSULTING">عملاء الاستشارات</option>
            <option value="BOOK_BUYER">مشترين الكتب</option>
            <option value="COURSE_STUDENT">مشتركي الدورات</option>
          </select>

          <button
            type="button"
            onClick={() => exportToCsv("customers")}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>تصدير بيانات العملاء (CRM)</span>
          </button>
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-brand-dark-950 border-b border-white/10 text-slate-400 font-bold">
              <tr>
                <th className="py-4 px-5">العميل / المشترك</th>
                <th className="py-4 px-5">المدينة</th>
                <th className="py-4 px-5">التصنيف</th>
                <th className="py-4 px-5">القيمة الدائمة (LTV)</th>
                <th className="py-4 px-5">الكتب</th>
                <th className="py-4 px-5">الاستشارات</th>
                <th className="py-4 px-5">الدورات</th>
                <th className="py-4 px-5 text-center">التواصل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/[0.03] transition-colors">
                  {/* Name & Phone */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-amber-400 to-brand-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                        {cust.name.slice(0, 1)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{cust.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
                          {cust.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* City */}
                  <td className="py-4 px-5 text-slate-300 font-medium">
                    {cust.city}
                  </td>

                  {/* Tag */}
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border inline-block whitespace-nowrap ${
                      TAG_LABELS[cust.tag]?.color
                    }`}>
                      {TAG_LABELS[cust.tag]?.label}
                    </span>
                  </td>

                  {/* LTV */}
                  <td className="py-4 px-5 font-alexandria font-black text-brand-amber-300">
                    {formatSAR(cust.totalSpent)}
                  </td>

                  {/* Books Count */}
                  <td className="py-4 px-5 font-bold text-slate-200">
                    {cust.totalOrdersCount}
                  </td>

                  {/* Consultations Count */}
                  <td className="py-4 px-5 font-bold text-slate-200">
                    {cust.consultationsCount}
                  </td>

                  {/* Courses Count */}
                  <td className="py-4 px-5 font-bold text-slate-200">
                    {cust.enrolledCoursesCount}
                  </td>

                  {/* WhatsApp Launcher */}
                  <td className="py-4 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(cust.phone, cust.name)}
                      className="px-3 py-1.5 rounded-xl bg-brand-emerald-600/20 hover:bg-brand-emerald-600/40 text-brand-emerald-300 border border-brand-emerald-500/30 text-xs font-bold flex items-center gap-1.5 mx-auto transition-colors"
                      title="محادثة واتساب مباشرة"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساب</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
