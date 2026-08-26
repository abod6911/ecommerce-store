"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Database, ConsultationStatus } from "@/lib/supabase/types";

export type BookingRecord = Database["public"]["Tables"]["consultation_bookings"]["Row"];
export type BookingUpdate = Database["public"]["Tables"]["consultation_bookings"]["Update"];

export async function fetchAdminBookings(): Promise<BookingRecord[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("consultation_bookings")
    .select("*")
    .order("session_date", { ascending: true });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
  return data || [];
}

export async function updateConsultationStatus(
  bookingId: string,
  status: ConsultationStatus,
  zoomUrl?: string
) {
  const supabase = createServerSupabaseClient();
  const updatePayload: BookingUpdate = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (zoomUrl !== undefined) updatePayload.zoom_url = zoomUrl;

  const { data, error } = await (supabase.from("consultation_bookings") as any)
    .update(updatePayload)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error("Error updating consultation status:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function createConsultationBooking(bookingData: {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  sessionType: "in_person_jeddah" | "online_zoom";
  sessionDate: string;
  timeSlot: string;
  priceSar: number;
  intakeData?: {
    business_field?: string;
    social_links?: string;
    challenges?: string;
    budget?: string;
  };
}) {
  const supabase = createServerSupabaseClient();
  const randomMeetingId = Math.floor(10000000000 + Math.random() * 90000000000);
  const zoomUrl =
    bookingData.sessionType === "online_zoom"
      ? `https://zoom.us/j/${randomMeetingId}?pwd=VIP_SHAWA_${Math.floor(1000 + Math.random() * 9000)}`
      : null;

  const { data, error } = await (supabase.from("consultation_bookings") as any)
    .insert({
      client_name: bookingData.clientName,
      client_phone: bookingData.clientPhone,
      client_email: bookingData.clientEmail || null,
      session_type: bookingData.sessionType,
      session_date: bookingData.sessionDate,
      time_slot: bookingData.timeSlot,
      price_sar: bookingData.priceSar,
      payment_status: "paid",
      payment_method: "mada",
      zoom_url: zoomUrl,
      status: "upcoming",
      intake_data: bookingData.intakeData || {},
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }

  return { success: true, booking: data };
}
