"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface LiveRevenueMetrics {
  currentMonthRevenue: number;
  totalLifetimeRevenue: number;
  booksSoldThisMonth: number;
  upcomingConsultationsCount: number;
  totalCustomersCount: number;
  revenueGrowthPct: number;
  lastUpdated: string;
}

export async function getLiveRevenueMetrics(): Promise<LiveRevenueMetrics> {
  const supabase = createServerSupabaseClient();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  try {
    // 1. Fetch This Month's Paid Book Orders
    const { data: monthOrders } = await (supabase.from("book_orders") as any)
      .select("amount_sar, quantity")
      .eq("payment_status", "paid")
      .gte("created_at", startOfMonth);

    // 2. Fetch This Month's Paid Consultations
    const { data: monthBookings } = await (supabase.from("consultation_bookings") as any)
      .select("price_sar")
      .eq("payment_status", "paid")
      .gte("created_at", startOfMonth);

    // 3. Fetch All Lifetime Paid Orders & Consultations
    const { data: allOrders } = await (supabase.from("book_orders") as any)
      .select("amount_sar, quantity")
      .eq("payment_status", "paid");

    const { data: allBookings } = await (supabase.from("consultation_bookings") as any)
      .select("price_sar")
      .eq("payment_status", "paid");

    // 4. Fetch Upcoming Confirmed Consultations
    const { count: upcomingCount } = await supabase
      .from("consultation_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "upcoming");

    // 5. Fetch Total Registered Profiles
    const { count: customersCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Calculate sums
    const monthOrdersSum = ((monthOrders || []) as Array<{ amount_sar: number; quantity: number }>).reduce((sum, o) => sum + Number(o.amount_sar || 0), 0);
    const monthBookingsSum = ((monthBookings || []) as Array<{ price_sar: number }>).reduce((sum, b) => sum + Number(b.price_sar || 0), 0);
    const booksSoldMonth = ((monthOrders || []) as Array<{ amount_sar: number; quantity: number }>).reduce((sum, o) => sum + Number(o.quantity || 1), 0);

    const lifetimeOrdersSum = ((allOrders || []) as Array<{ amount_sar: number; quantity: number }>).reduce((sum, o) => sum + Number(o.amount_sar || 0), 0);
    const lifetimeBookingsSum = ((allBookings || []) as Array<{ price_sar: number }>).reduce((sum, b) => sum + Number(b.price_sar || 0), 0);

    const currentMonthRevenue = monthOrdersSum + monthBookingsSum;
    const totalLifetimeRevenue = lifetimeOrdersSum + lifetimeBookingsSum;
    const booksSoldThisMonth = booksSoldMonth;
    const upcomingConsultationsCount = upcomingCount ?? 0;
    const totalCustomersCount = customersCount ?? 0;

    return {
      currentMonthRevenue,
      totalLifetimeRevenue,
      booksSoldThisMonth,
      upcomingConsultationsCount,
      totalCustomersCount,
      revenueGrowthPct: 0,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching live revenue metrics:", error);
    return {
      currentMonthRevenue: 0,
      totalLifetimeRevenue: 0,
      booksSoldThisMonth: 0,
      upcomingConsultationsCount: 0,
      totalCustomersCount: 0,
      revenueGrowthPct: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}
