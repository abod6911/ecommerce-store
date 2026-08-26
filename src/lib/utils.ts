import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const basePath = process.env.NODE_ENV === "production" ? "/ecommerce-store" : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.startsWith("/ecommerce-store/")) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}

export function formatSAR(amount: number): string {
  if (isNaN(amount)) return "0 ر.س";
  return `${amount.toLocaleString("en-US")} ر.س`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function formatArabicDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    calendar: "gregory",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("ar-EG", options).format(date);
}

export function calculateCartSummary(subtotal: number, shipping: number = 0, discount: number = 0) {
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const vatRate = 0.15; // 15% VAT in Saudi Arabia
  const vatAmount = discountedSubtotal * vatRate;
  const total = discountedSubtotal + vatAmount + shipping;

  return {
    subtotal: discountedSubtotal,
    vatAmount,
    shipping,
    discount,
    total,
  };
}
