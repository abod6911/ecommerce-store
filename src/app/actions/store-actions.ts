import { supabase } from "@/lib/supabase/client";
import { PaymentMethod, StoreEventType } from "@/lib/supabase/types";
import {
  sanitizeText,
  isValidEmail,
  isValidSaudiPhone,
  normalizeSaudiPhone,
  checkRateLimit,
  computeVerifiedOrderTotal,
} from "@/lib/security";

export interface CreateOrderParams {
  userId?: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  shippingCity: string;
  shippingAddress: string;
  bookTitle: string;
  quantity: number;
  amountSar: number;
  items?: Array<{ id: string; quantity: number }>;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface CreateBookingParams {
  userId?: string | null;
  clientName: string;
  clientPhone: string;
  clientEmail?: string | null;
  sessionType: string;
  sessionDate: string;
  timeSlot: string;
  priceSar: number;
  extraHours?: number;
  paymentMethod: string;
  intakeData?: {
    businessField?: string;
    socialLinks?: string;
    challenges?: string;
    budget?: string;
    [key: string]: any;
  };
}

/**
 * 1. Log Telemetry & Store Activity to Supabase customer_activity_logs
 */
export async function logStoreActivity(
  eventType: StoreEventType | string,
  metadata: Record<string, any> = {},
  userId?: string | null
) {
  try {
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "server-agent";

    await (supabase.from("customer_activity_logs") as any).insert({
      user_id: userId || null,
      event_type: eventType,
      metadata: metadata,
      ip_address: "client-direct",
      user_agent: userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error("Telemetry Logging Error:", error);
    return { success: false, error };
  }
}

/**
 * 2. Create Book Order with Off-Site Database Storage
 */
export async function createBookOrder(params: CreateOrderParams) {
  try {
    const cleanName = sanitizeText(params.customerName, 120);
    const cleanPhone = normalizeSaudiPhone(params.customerPhone || "");
    const cleanEmail = params.customerEmail ? sanitizeText(params.customerEmail, 160) : null;
    const cleanCity = sanitizeText(params.shippingCity, 60);
    const cleanAddress = sanitizeText(params.shippingAddress, 250);
    const cleanTitle = sanitizeText(params.bookTitle, 250);
    const cleanNotes = params.notes ? sanitizeText(params.notes, 400) : null;

    if (!cleanName || !isValidSaudiPhone(cleanPhone) || !cleanAddress) {
      return { success: false, error: "يرجى التحقق من صحة الاسم ورقم الجوال والعنوان." };
    }
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return { success: false, error: "صيغة البريد الإلكتروني غير صحيحة." };
    }

    const rate = checkRateLimit(`order:${cleanPhone}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return { success: false, error: `تم تجاوز الحد المسموح. يرجى المحاولة بعد ${rate.retryAfterSec} ثانية.` };
    }

    // Recompute authoritative price on server side
    const verifiedPricing = computeVerifiedOrderTotal({
      items: params.items,
      quantity: params.quantity,
      shippingCity: cleanCity,
      couponCode: params.couponCode,
    });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SHW-${randomSuffix}`;
    const trackingCode = `SMSA-${Date.now().toString().slice(-8)}`;
    const safeQuantity = Math.max(1, Math.min(50, Math.floor(Number(params.quantity) || 1)));

    const { data, error } = await (supabase.from("book_orders") as any)
      .insert({
        order_number: orderNumber,
        user_id: params.userId || null,
        customer_name: cleanName,
        customer_phone: cleanPhone,
        customer_email: cleanEmail,
        shipping_city: cleanCity,
        shipping_address: cleanAddress,
        book_title: cleanTitle,
        quantity: safeQuantity,
        amount_sar: verifiedPricing.totalSar,
        payment_method: params.paymentMethod,
        payment_status: params.paymentMethod === "cod" ? "pending" : "paid",
        shipping_status: "processing",
        courier_name: cleanCity === "جدة" ? "LOCAL_DRIVER" : "SMSA",
        tracking_code: trackingCode,
        notes: cleanNotes,
      })
      .select()
      .single();

    // Log telemetry event
    await logStoreActivity("book_order_created", {
      orderNumber,
      bookTitle: cleanTitle,
      amountSar: verifiedPricing.totalSar,
      paymentMethod: params.paymentMethod,
      city: cleanCity,
    }, params.userId);

    return {
      success: true,
      order: data,
      orderNumber,
      trackingCode,
    };
  } catch (err: any) {
    console.error("Create Book Order Exception:", err);
    return {
      success: false,
      error: "تعذر إنشاء الطلب حالياً. يرجى المحاولة مرة أخرى.",
    };
  }
}

/**
 * 3. Create VIP Consultation Booking with Off-Site Database Storage
 */
export async function createConsultationBooking(params: CreateBookingParams) {
  try {
    const cleanName = sanitizeText(params.clientName, 120);
    const cleanPhone = normalizeSaudiPhone(params.clientPhone || "");
    const cleanEmail = params.clientEmail ? sanitizeText(params.clientEmail, 160) : null;
    const cleanSessionType = sanitizeText(params.sessionType, 80);
    const cleanDate = sanitizeText(params.sessionDate, 40);
    const cleanSlot = sanitizeText(params.timeSlot, 30);

    if (!cleanName || !isValidSaudiPhone(cleanPhone)) {
      return { success: false, error: "يرجى إدخال اسم ورقم جوال صحيحين." };
    }
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return { success: false, error: "صيغة البريد الإلكتروني غير صحيحة." };
    }

    const rate = checkRateLimit(`booking:${cleanPhone}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return { success: false, error: `تم تجاوز الحد المسموح. يرجى المحاولة بعد ${rate.retryAfterSec} ثانية.` };
    }

    // Enforce server-side consultation pricing (800 SAR base for 2h + 200 SAR/extra hour)
    const extraHours = Math.max(0, Math.min(8, Math.floor(Number(params.extraHours) || 0)));
    const authoritativePriceSar = 800 + extraHours * 200;

    const zoomMeetingId = Math.floor(10000000000 + Math.random() * 90000000000);
    const zoomUrl = `https://zoom.us/j/${zoomMeetingId}?pwd=VIP_SHAWA`;

    const { data, error } = await (supabase.from("consultation_bookings") as any)
      .insert({
        user_id: params.userId || null,
        client_name: cleanName,
        client_phone: cleanPhone,
        client_email: cleanEmail,
        session_type: cleanSessionType,
        session_date: cleanDate,
        time_slot: cleanSlot,
        price_sar: authoritativePriceSar,
        payment_status: "paid",
        payment_method: sanitizeText(params.paymentMethod, 30),
        zoom_url: zoomUrl,
        status: "upcoming",
        intake_data: params.intakeData || {},
      })
      .select()
      .single();

    // Log telemetry event
    await logStoreActivity("consultation_booked", {
      bookingId: data?.id,
      sessionType: cleanSessionType,
      sessionDate: cleanDate,
      timeSlot: cleanSlot,
      priceSar: authoritativePriceSar,
    }, params.userId);

    return {
      success: true,
      booking: data,
      zoomUrl,
    };
  } catch (err: any) {
    console.error("Create Consultation Exception:", err);
    return {
      success: false,
      error: "تعذر إتمام الحجز حالياً. يرجى المحاولة مرة أخرى.",
    };
  }
}

/**
 * 4. Request Supabase 6-Digit Email OTP
 */
export async function requestEmailOtp(
  email: string,
  fullName: string,
  phone: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanEmail = sanitizeText(email, 160).toLowerCase();
    const cleanName = sanitizeText(fullName, 120);
    const cleanPhone = normalizeSaudiPhone(phone || "");

    if (!isValidEmail(cleanEmail)) {
      return { success: false, error: "يرجى إدخال بريد إلكتروني صحيح." };
    }

    const rate = checkRateLimit(`otp-req:${cleanEmail}`, 3, 5 * 60 * 1000);
    if (!rate.allowed) {
      return { success: false, error: `تم إرسال عدة رموز متتالية. انتظر ${rate.retryAfterSec} ثانية.` };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        data: {
          full_name: cleanName,
          phone: cleanPhone,
          role: "customer",
        },
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.warn("Supabase Auth OTP Notice:", error.message);
      return { success: false, error: error.message };
    }

    // Log OTP request telemetry
    await logStoreActivity("otp_requested", { email: cleanEmail, phone: cleanPhone });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "تعذر إرسال رمز التحقق." };
  }
}

/**
 * 5. Verify 6-Digit Email OTP
 */
export async function verifyEmailOtp(
  email: string,
  token: string,
  fullName?: string,
  phone?: string
): Promise<{ success: boolean; error?: string; user?: any; session?: any }> {
  try {
    const cleanEmail = sanitizeText(email, 160).toLowerCase();
    const cleanToken = (token || "").replace(/\D/g, "").slice(0, 6);

    if (!isValidEmail(cleanEmail) || !/^\d{6}$/.test(cleanToken)) {
      return { success: false, error: "رمز التحقق يجب أن يكون مكوناً من 6 أرقام صحيحة." };
    }

    const rate = checkRateLimit(`otp-verify:${cleanEmail}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return { success: false, error: `محاولات تحقق كثيرة. انتظر ${rate.retryAfterSec} ثانية.` };
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type: "email",
    });

    if (error) {
      console.warn("Supabase OTP Verify Notice:", error.message);
      return { success: false, error: error.message };
    }

    // If verified, upsert profile
    if (data?.user) {
      await (supabase.from("profiles") as any).upsert({
        id: data.user.id,
        email: data.user.email || cleanEmail,
        full_name: sanitizeText(fullName, 120) || data.user.user_metadata?.full_name || "مشترك معتمد",
        phone: normalizeSaudiPhone(phone || data.user.user_metadata?.phone || ""),
        role: "customer",
      });

      await logStoreActivity("otp_verified", { email: cleanEmail, userId: data.user.id }, data.user.id);
    }

    return {
      success: true,
      user: data?.user,
      session: data?.session,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل التحقق من الرمز." };
  }
}
