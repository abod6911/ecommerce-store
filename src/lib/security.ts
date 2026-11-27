import { BOOKS_DATA, COURSES_DATA, SAUDI_CITIES } from "@/data/mockData";

/**
 * Strip HTML tags, control characters, and limit string length to prevent XSS/injection.
 */
export function sanitizeText(input: string | null | undefined, maxLength = 300): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate email address format strictly.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

/**
 * Normalize & validate Saudi phone numbers (05XXXXXXXX or +9665XXXXXXXX or 5XXXXXXXX).
 */
export function normalizeSaudiPhone(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.startsWith("966")) return digits.slice(0, 12);
  if (digits.startsWith("05")) return `966${digits.slice(1, 10)}`;
  if (digits.startsWith("5")) return `966${digits.slice(0, 9)}`;
  return digits.slice(0, 15);
}

export function isValidSaudiPhone(phone: string): boolean {
  const normalized = normalizeSaudiPhone(phone);
  return /^9665\d{8}$/.test(normalized) || /^\d{9,15}$/.test(phone.replace(/[^\d]/g, ""));
}

/**
 * Constant-time string comparison to prevent timing side-channel attacks.
 */
export function constantTimeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const maxLen = Math.max(a.length, b.length);
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < maxLen; i++) {
    const codeA = i < a.length ? a.charCodeAt(i) : 0;
    const codeB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= codeA ^ codeB;
  }
  return mismatch === 0;
}

/**
 * Sliding-window rate limiter to mitigate brute-force and spam flooding.
 */
const rateLimitBuckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const timestamps = (rateLimitBuckets.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= maxAttempts) {
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - timestamps[0])) / 1000));
    rateLimitBuckets.set(key, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  rateLimitBuckets.set(key, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

/**
 * Server-trusted price calculation against official catalog (prevents client price tampering).
 */
export function computeVerifiedOrderTotal(params: {
  items?: Array<{ id: string; quantity: number }>;
  quantity?: number;
  shippingCity: string;
  couponCode?: string;
}): { subtotal: number; shippingCost: number; vatAmount: number; totalSar: number } {
  const catalog = [...BOOKS_DATA, ...COURSES_DATA];
  let subtotal = 0;
  let hasPhysicalBook = false;

  if (params.items && params.items.length > 0) {
    for (const entry of params.items) {
      const qty = Math.max(1, Math.min(50, Math.floor(Number(entry.quantity) || 1)));
      const foundBook = BOOKS_DATA.find((b) => b.id === entry.id);
      const foundCourse = COURSES_DATA.find((c) => c.id === entry.id);
      const matched = foundBook || foundCourse;
      if (matched) {
        subtotal += matched.price * qty;
        if (foundBook) hasPhysicalBook = true;
      } else {
        // Fallback minimum book price if custom CMS book was ordered
        subtotal += 50 * qty;
        hasPhysicalBook = true;
      }
    }
  } else {
    const qty = Math.max(1, Math.min(50, Math.floor(Number(params.quantity) || 1)));
    const defaultBookPrice = BOOKS_DATA[0]?.price ?? 50;
    subtotal = defaultBookPrice * qty;
    hasPhysicalBook = true;
  }

  const cityObj = SAUDI_CITIES.find((c) => c.name === params.shippingCity);
  const shippingCost = hasPhysicalBook ? (cityObj ? cityObj.cost : params.shippingCity === "جدة" ? 0 : 25) : 0;

  const normalizedCoupon = (params.couponCode || "").trim().toUpperCase();
  const discountRate = normalizedCoupon === "ALSHAWA10" || normalizedCoupon === "VIP10" ? 0.1 : 0;
  const discount = subtotal * discountRate;

  const vatAmount = Math.round(subtotal * 0.15 * 100) / 100;
  const totalSar = Math.max(0, Math.round((subtotal - discount + shippingCost) * 100) / 100);

  return { subtotal, shippingCost, vatAmount, totalSar };
}
