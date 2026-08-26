"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Database, ShippingStatus, CourierProvider, PaymentStatus, PaymentMethod } from "@/lib/supabase/types";

export type OrderRecord = Database["public"]["Tables"]["book_orders"]["Row"];
export type OrderUpdate = Database["public"]["Tables"]["book_orders"]["Update"];

export async function fetchAdminOrders(): Promise<OrderRecord[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("book_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  return data || [];
}

export async function updateOrderShippingStatus(
  orderId: string,
  shippingStatus: ShippingStatus,
  courierName?: CourierProvider,
  trackingCode?: string
) {
  const supabase = createServerSupabaseClient();
  const updatePayload: OrderUpdate = {
    shipping_status: shippingStatus,
    updated_at: new Date().toISOString(),
  };

  if (courierName) updatePayload.courier_name = courierName;
  if (trackingCode !== undefined) updatePayload.tracking_code = trackingCode;

  const { data, error } = await (supabase.from("book_orders") as any)
    .update(updatePayload)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function createBookOrder(orderData: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingCity: string;
  shippingAddress: string;
  bookTitle: string;
  quantity?: number;
  amountSar: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}) {
  const supabase = createServerSupabaseClient();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `SHW-${randomSuffix}`;

  const { data, error } = await (supabase.from("book_orders") as any)
    .insert({
      order_number: orderNumber,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      customer_email: orderData.customerEmail || null,
      shipping_city: orderData.shippingCity,
      shipping_address: orderData.shippingAddress,
      book_title: orderData.bookTitle,
      quantity: orderData.quantity || 1,
      amount_sar: orderData.amountSar,
      payment_method: orderData.paymentMethod,
      payment_status: "paid",
      shipping_status: "processing",
      courier_name: "SMSA",
      notes: orderData.notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating book order:", error);
    return { success: false, error: error.message };
  }

  return { success: true, order: data };
}
