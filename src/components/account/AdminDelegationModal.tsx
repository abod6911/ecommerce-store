"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  KeyRound,
  UserCheck,
  UserX,
  Search,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  History,
  Crown,
  Users
} from "lucide-react";
import {
  delegateUserRole,
  fetchAuditLogs,
  fetchUsersForDelegation,
  SecurityAuditRecord,
} from "@/app/actions/admin-actions";
import { UserRole } from "@/lib/supabase/types";
import { useSupabaseAuth } from "@/context/SupabaseAuthContext";

interface AdminDelegationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AdminDelegationModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminDelegationModalProps) {
  const { profile } = useSupabaseAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersList, setUsersList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [targetRole, setTargetRole] = useState<UserRole>("admin");
  const [passkey, setPasskey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditRecord[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<"delegate" | "audit">("delegate");

  // Fetch initial users and audit logs
  useEffect(() => {
    if (isOpen) {
      loadUsers();
      loadAuditLogs();
      setStatusMsg(null);
      setPasskey("");
    }
  }, [isOpen]);

  const loadUsers = async (query = "") => {
    const res = await fetchUsersForDelegation(query);
    if (res.success) {
      setUsersList(res.users);
      if (!selectedUser && res.users.length > 0) {
        setSelectedUser(res.users[0]);
      }
    }
  };

  const loadAuditLogs = async () => {
    const res = await fetchAuditLogs();
    if (res.success) {
      setAuditLogs(res.logs);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadUsers(searchQuery);
  };

  const handleSubmitDelegation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      setStatusMsg({ type: "error", text: "يرجى تحديد المستخدم أولاً." });
      return;
    }
    if (!passkey.trim()) {
      setStatusMsg({ type: "error", text: "يرجى إدخال رمز الحماية الرئيسي (Master Passkey)." });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    const res = await delegateUserRole({
      targetUserId: selectedUser.id,
      targetEmail: selectedUser.email,
      newRole: targetRole,
      passkey: passkey.trim(),
      performedBy: profile?.id || "usr-admin-shawa",
      performerEmail: profile?.email || "admin@ahmedalshawa.com",
    });

    setIsSubmitting(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: res.message || "تم تحديث الصلاحية بنجاح!" });
      setPasskey("");
      loadUsers(searchQuery);
      loadAuditLogs();
      if (onSuccess) onSuccess();
    } else {
      setStatusMsg({ type: "error", text: res.error || "فشل التحقق من رمز الحماية." });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-ibm text-right overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-brand-dark-900 border-2 border-brand-amber-400/60 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 bg-brand-dark-950 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-amber-400/20 text-brand-amber-300 border border-brand-amber-400/40 flex items-center justify-center shadow-gold-glow">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-alexandria font-bold text-base text-white">
                  بوابة إدارة وتفويض صلاحيات المسؤولين (Super Admin)
                </h3>
                <p className="text-xs text-brand-emerald-400 font-medium">
                  منطقة حماية مشفرة تتطلب رمز الحماية الرئيسي (Master Passkey)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-brand-dark-950/50">
            <button
              type="button"
              onClick={() => setActiveSubTab("delegate")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeSubTab === "delegate"
                  ? "border-brand-amber-400 text-brand-amber-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>منح وسحب الصلاحيات</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab("audit")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeSubTab === "audit"
                  ? "border-brand-amber-400 text-brand-amber-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <History className="w-4 h-4" />
              <span>سجل التدقيق الأمني ({auditLogs.length})</span>
            </button>
          </div>

          {/* Tab 1: Delegate Form */}
          {activeSubTab === "delegate" && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Search User Form */}
              <form onSubmit={handleSearch} className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  1. ابحث عن المستخدم (بالاسم، البريد، أو رقم الجوال):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو البريد مثل: saleh@... أو 055..."
                    className="w-full pl-24 pr-4 py-3 rounded-2xl bg-brand-dark-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-amber-400 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute left-2 top-2 bottom-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>بحث</span>
                  </button>
                </div>
              </form>

              {/* Users Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  2. حدد المستخدم المستهدف:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1">
                  {usersList.map((u) => {
                    const isSelected = selectedUser?.id === u.id;
                    return (
                      <div
                        key={u.id}
                        onClick={() => setSelectedUser(u)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? "bg-brand-emerald-950/80 border-brand-amber-400 shadow-gold-glow"
                            : "bg-white/5 border-white/10 hover:border-brand-emerald-500/40"
                        }`}
                      >
                        <div className="space-y-0.5 text-right">
                          <p className="font-bold text-white truncate max-w-[150px]">
                            {u.full_name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]">
                            {u.email}
                          </p>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                            u.role === "super_admin"
                              ? "bg-brand-amber-400 text-slate-950"
                              : u.role === "admin"
                              ? "bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {u.role === "super_admin"
                            ? "Super Admin"
                            : u.role === "admin"
                            ? "Admin"
                            : "Customer"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Form */}
              <form onSubmit={handleSubmitDelegation} className="space-y-4 pt-2 border-t border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    3. حدد الصلاحية الجديدة لـ ({selectedUser?.full_name || "المستخدم"}):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetRole("admin")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                        targetRole === "admin"
                          ? "bg-brand-emerald-500/20 border-brand-emerald-400 text-brand-emerald-300 shadow-emerald-glow"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-brand-emerald-400" />
                      <span>مسؤول (Admin)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetRole("customer")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                        targetRole === "customer"
                          ? "bg-red-500/20 border-red-400 text-red-300 shadow-sm"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserX className="w-4 h-4 text-red-400" />
                      <span>سحب الصلاحية (User)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetRole("super_admin")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                        targetRole === "super_admin"
                          ? "bg-brand-amber-400/20 border-brand-amber-400 text-brand-amber-300 shadow-gold-glow"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Crown className="w-4 h-4 text-brand-amber-400" />
                      <span>مالك المنصة (Super)</span>
                    </button>
                  </div>
                </div>

                {/* Master Passkey Input */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-brand-dark-950 border border-brand-amber-400/30">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-brand-amber-300 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-brand-amber-400" />
                      <span>رمز الحماية الرئيسي (Master Passkey) *</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (الافتراضي: SHAWA_SECURE_PASSKEY_2026)
                    </span>
                  </div>

                  <input
                    type="password"
                    required
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="أدخل رمز Passkey السري للتأكيد"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark-900 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-amber-400 font-mono tracking-widest"
                  />
                </div>

                {statusMsg && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border ${
                      statusMsg.type === "success"
                        ? "bg-brand-emerald-500/10 border-brand-emerald-500/30 text-brand-emerald-300"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}
                  >
                    {statusMsg.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                    )}
                    <span>{statusMsg.text}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 font-alexandria font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>تأكيد تفويض الصلاحية المشفرة ⚡</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Security Audit Log Feed */}
          {activeSubTab === "audit" && (
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-slate-300">
                  سجل العمليات الإدارية الحية وتغيير الصلاحيات:
                </span>
                <button
                  type="button"
                  onClick={loadAuditLogs}
                  className="text-xs text-brand-amber-400 hover:text-brand-amber-300 flex items-center gap-1 font-bold"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>تحديث</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-brand-dark-950 border border-white/10 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          log.action_type === "ROLE_PROMOTED"
                            ? "bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40"
                            : "bg-red-500/20 text-red-300 border border-red-500/40"
                        }`}
                      >
                        {log.action_type === "ROLE_PROMOTED" ? "ترقية صلاحية مسؤول" : "سحب صلاحية"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(log.created_at).toLocaleString("ar-SA")}
                      </span>
                    </div>

                    <p className="text-white font-medium">
                      المستهدف: <strong className="text-brand-amber-300">{log.metadata?.targetEmail || log.target_name || "مستخدم"}</strong> • الصلاحية: <strong className="text-brand-emerald-400">{log.metadata?.newRole || "admin"}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      بواسطة: {log.performer_name || log.metadata?.performerEmail || "مالك المنصة"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-3.5 bg-brand-dark-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1 text-brand-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>معدل الحماية 3 محاولات / 15 دقيقة لمنع هجمات التخمين</span>
            </div>
            <span className="font-mono text-slate-400">RBAC Level 3 Protected</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
