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
  
  // Detect if running on Vercel, local preview, or GitHub Pages
  const isVercelOrLocal = typeof window !== "undefined" 
    ? !window.location.hostname.includes("github.io")
    : Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (isVercelOrLocal) {
    return cleanPath.replace(/^\/ecommerce-store/, "");
  }

  // GitHub Pages environment
  if (cleanPath.startsWith("/ecommerce-store/")) {
    return cleanPath;
  }
  return `/ecommerce-store${cleanPath}`;
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
