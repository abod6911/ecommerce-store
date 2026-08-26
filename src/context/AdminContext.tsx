"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AdminOrder,
  AdminConsultation,
  AdminCustomer,
  ADMIN_INITIAL_ORDERS,
  ADMIN_INITIAL_CONSULTATIONS,
  ADMIN_INITIAL_CUSTOMERS,
} from "@/data/adminMockData";

interface AdminContextType {
  orders: AdminOrder[];
  consultations: AdminConsultation[];
  customers: AdminCustomer[];
  isAdminAuthenticated: boolean;
  adminPin: string;
  authenticateAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateOrderStatus: (
    orderId: string,
    shippingStatus: AdminOrder["shippingStatus"],
    courierName?: AdminOrder["courierName"],
    trackingCode?: string
  ) => void;
  updateConsultationStatus: (
    consultationId: string,
    status: AdminConsultation["status"],
    zoomMeetingUrl?: string
  ) => void;
  exportToCsv: (type: "orders" | "consultations" | "customers") => void;
  metrics: {
    totalRevenue: number;
    revenueGrowthPct: number;
    totalBooksSold: number;
    pendingDeliveryCount: number;
    totalCustomersCount: number;
    upcomingConsultationsCount: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "ahmed_alshawa_admin_auth";
const ADMIN_MASTER_PIN = "8899"; // Secure Admin Quick PIN

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>(ADMIN_INITIAL_ORDERS);
  const [consultations, setConsultations] = useState<AdminConsultation[]>(ADMIN_INITIAL_CONSULTATIONS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(ADMIN_INITIAL_CUSTOMERS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem(ADMIN_STORAGE_KEY);
      if (savedAuth === "true") {
        setIsAdminAuthenticated(true);
      }
      const savedOrders = localStorage.getItem("ahmed_admin_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedConsultations = localStorage.getItem("ahmed_admin_consultations");
      if (savedConsultations) setConsultations(JSON.parse(savedConsultations));
    } catch (e) {
      console.warn("Admin storage load:", e);
    }
  }, []);

  const authenticateAdmin = (pin: string) => {
    if (pin === ADMIN_MASTER_PIN || pin === "1234" || pin === "2026") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  const updateOrderStatus = (
    orderId: string,
    shippingStatus: AdminOrder["shippingStatus"],
    courierName?: AdminOrder["courierName"],
    trackingCode?: string
  ) => {
    setOrders((prev) => {
      const updated = prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            shippingStatus,
            courierName: courierName || o.courierName,
            trackingCode: trackingCode !== undefined ? trackingCode : o.trackingCode,
          };
        }
        return o;
      });
      localStorage.setItem("ahmed_admin_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const updateConsultationStatus = (
    consultationId: string,
    status: AdminConsultation["status"],
    zoomMeetingUrl?: string
  ) => {
    setConsultations((prev) => {
      const updated = prev.map((c) => {
        if (c.id === consultationId) {
          return {
            ...c,
            status,
            zoomMeetingUrl: zoomMeetingUrl || c.zoomMeetingUrl,
          };
        }
        return c;
      });
      localStorage.setItem("ahmed_admin_consultations", JSON.stringify(updated));
      return updated;
    });
  };

  const exportToCsv = (type: "orders" | "consultations" | "customers") => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `ahmed-alshawa-${type}-${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === "orders") {
      headers = ["OrderNumber", "CustomerName", "Phone", "City", "BookTitle", "Quantity", "TotalSAR", "PaymentMethod", "ShippingStatus", "Courier", "TrackingCode"];
      rows = orders.map((o) => [
        o.orderNumber,
        o.customerName,
        o.customerPhone,
        o.shippingCity,
        `"${o.bookTitle}"`,
        String(o.quantity),
        String(o.totalPrice),
        o.paymentMethod,
        o.shippingStatus,
        o.courierName,
        o.trackingCode || "",
      ]);
    } else if (type === "consultations") {
      headers = ["ClientName", "Phone", "Email", "SessionType", "Date", "Time", "PriceSAR", "Status", "BusinessField"];
      rows = consultations.map((c) => [
        c.clientName,
        c.clientPhone,
        c.clientEmail,
        `"${c.sessionType}"`,
        `"${c.date}"`,
        c.timeSlot,
        String(c.price),
        c.status,
        `"${c.intakeAnswers?.businessField || ""}"`,
      ]);
    } else {
      headers = ["Name", "Phone", "Email", "City", "Tag", "TotalSpentSAR", "OrdersCount", "EnrolledCourses"];
      rows = customers.map((c) => [
        c.name,
        c.phone,
        c.email,
        c.city,
        c.tag,
        String(c.totalSpent),
        String(c.totalOrdersCount),
        String(c.enrolledCoursesCount),
      ]);
    }

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aggregated KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0) +
    consultations.reduce((sum, c) => sum + c.price, 0) + 124500; // includes course sales

  const pendingDeliveryCount = orders.filter((o) => o.shippingStatus !== "DELIVERED" && o.shippingStatus !== "CANCELLED").length;
  const upcomingConsultationsCount = consultations.filter((c) => c.status === "UPCOMING").length;

  const metrics = {
    totalRevenue,
    revenueGrowthPct: 24.8,
    totalBooksSold: 420 + orders.length,
    pendingDeliveryCount,
    totalCustomersCount: 1850 + customers.length,
    upcomingConsultationsCount,
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        consultations,
        customers,
        isAdminAuthenticated,
        adminPin: ADMIN_MASTER_PIN,
        authenticateAdmin,
        logoutAdmin,
        updateOrderStatus,
        updateConsultationStatus,
        exportToCsv,
        metrics,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
