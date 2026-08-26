"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Filter,
  Truck,
  ExternalLink,
  Edit,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  Package,
  Sparkles,
  Save,
  X
} from "lucide-react";
import { formatSAR } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import { AdminOrder } from "@/data/adminMockData";

const STATUS_LABELS = {
  PROCESSING: { label: "قيد التجهيز", color: "bg-slate-500/20 text-slate-300 border-slate-500/40" },
  HANDED_TO_COURIER: { label: "تم التسليم للناقل", color: "bg-teal-500/20 text-teal-300 border-teal-500/40" },
  IN_TRANSIT: { label: "قيد التوصيل", color: "bg-brand-amber-400/20 text-brand-amber-300 border-brand-amber-400/40" },
  DELIVERED: { label: "تم التوصيل بنجاح", color: "bg-brand-emerald-500/20 text-brand-emerald-400 border-brand-emerald-500/40" },
  CANCELLED: { label: "ملغي", color: "bg-red-500/20 text-red-400 border-red-500/40" },
};

export default function OrdersTable() {
  const { orders, updateOrderStatus, exportToCsv } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);

  // Edit State
  const [editStatus, setEditStatus] = useState<AdminOrder["shippingStatus"]>("PROCESSING");
  const [editCourier, setEditCourier] = useState<AdminOrder["courierName"]>("SMSA");
  const [editTracking, setEditTracking] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm) ||
      o.shippingCity.includes(searchTerm);
    const matchesStatus = statusFilter === "ALL" || o.shippingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (order: AdminOrder) => {
    setEditingOrder(order);
    setEditStatus(order.shippingStatus);
    setEditCourier(order.courierName);
    setEditTracking(order.trackingCode || "");
  };

  const handleSaveEdit = () => {
    if (editingOrder) {
      updateOrderStatus(editingOrder.id, editStatus, editCourier, editTracking);
      setEditingOrder(null);
    }
  };

  return (
    <div className="space-y-6 font-ibm text-right" dir="rtl">
      {/* Top Controls: Search, Filter, and Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-xl backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث باسم العميل، رقم الجوال، أو رقم الطلب..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Status Filter Dropdown & Export */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
            >
              <option value="ALL">جميع حالات الشحن</option>
              <option value="PROCESSING">قيد التجهيز</option>
              <option value="HANDED_TO_COURIER">تم التسليم للناقل</option>
              <option value="IN_TRANSIT">قيد التوصيل</option>
              <option value="DELIVERED">تم التوصيل بنجاح</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => exportToCsv("orders")}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>تصدير إلى Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-brand-dark-950 border-b border-white/10 text-slate-400 font-bold">
              <tr>
                <th className="py-4 px-5">رقم الطلب</th>
                <th className="py-4 px-5">العميل والمستلم</th>
                <th className="py-4 px-5">الكتاب المطبوع</th>
                <th className="py-4 px-5">المدينة والعنوان</th>
                <th className="py-4 px-5">المبلغ</th>
                <th className="py-4 px-5">شركة الشحن</th>
                <th className="py-4 px-5">حالة الشحن</th>
                <th className="py-4 px-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Order Number */}
                    <td className="py-4 px-5 font-mono font-bold text-brand-amber-300">
                      {order.orderNumber}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400 font-mono block" dir="ltr">
                          {order.customerPhone}
                        </span>
                      </div>
                    </td>

                    {/* Book */}
                    <td className="py-4 px-5 text-slate-200 font-medium max-w-[200px] truncate">
                      {order.bookTitle}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-white block">{order.shippingCity}</span>
                      <span className="text-[10px] text-slate-400 truncate block max-w-[150px]">
                        {order.shippingAddress}
                      </span>
                    </td>

                    {/* Price & Payment */}
                    <td className="py-4 px-5">
                      <span className="font-alexandria font-bold text-brand-amber-300 block">
                        {formatSAR(order.totalPrice)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {order.paymentMethod === "APPLE_PAY" ? " Apple Pay" : order.paymentMethod === "MADA" ? "مدى" : order.paymentMethod}
                      </span>
                    </td>

                    {/* Courier & Tracking */}
                    <td className="py-4 px-5">
                      <span className="font-bold text-teal-300 block">{order.courierName}</span>
                      {order.trackingCode ? (
                        <span className="font-mono text-[10px] text-slate-400 block truncate max-w-[120px]">
                          {order.trackingCode}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">لم يُربط بعد</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border inline-block whitespace-nowrap ${
                        STATUS_LABELS[order.shippingStatus]?.color
                      }`}>
                        {STATUS_LABELS[order.shippingStatus]?.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(order)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-brand-emerald-500/20 text-slate-300 hover:text-brand-emerald-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 mx-auto transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400 text-xs">
                    لا توجد طلبات مطابقة لمعايير البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-ibm" dir="rtl">
          <div className="relative w-full max-w-lg rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/50 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-2xl text-right">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">
                  تحديث حالة الطلب: {editingOrder.orderNumber}
                </h3>
                <p className="text-xs text-brand-amber-300 mt-0.5">
                  العميل: {editingOrder.customerName} ({editingOrder.shippingCity})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Shipping Status Selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  1. حالة الشحن الحالية:
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AdminOrder["shippingStatus"])}
                  className="w-full px-3.5 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
                >
                  <option value="PROCESSING">قيد التجهيز والتغليف</option>
                  <option value="HANDED_TO_COURIER">تم التسليم لشركة الشحن</option>
                  <option value="IN_TRANSIT">الشحنة قيد التوصيل الفوري</option>
                  <option value="DELIVERED">تم الاستلام بنجاح</option>
                  <option value="CANCELLED">إلغاء الطلب</option>
                </select>
              </div>

              {/* Courier Provider */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  2. شركة الشحن والناقل اللوجستي:
                </label>
                <select
                  value={editCourier}
                  onChange={(e) => setEditCourier(e.target.value as AdminOrder["courierName"])}
                  className="w-full px-3.5 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
                >
                  <option value="SMSA">سمسا إكسبريس (SMSA Express)</option>
                  <option value="ARAMEX">أرامكس (Aramex)</option>
                  <option value="REDBOX">خزائن ريدبوكس الذكية (RedBox)</option>
                  <option value="LOCAL_DRIVER">مندوب جدة السريع</option>
                </select>
              </div>

              {/* Tracking Number Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">
                  3. رقم بوليصة الشحن (Tracking Code):
                </label>
                <input
                  type="text"
                  value={editTracking}
                  onChange={(e) => setEditTracking(e.target.value)}
                  placeholder="مثال: SMSA-SA-98421048"
                  className="w-full px-3.5 py-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald-500 to-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-emerald-glow hover:brightness-110 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتحديث بيانات الشحن</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="px-5 py-3.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
