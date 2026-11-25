export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. SHW-8491
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingCity: string;
  shippingAddress: string;
  bookTitle: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: "MADA" | "APPLE_PAY" | "CREDIT_CARD" | "CASH_ON_DELIVERY" | "BANK_TRANSFER";
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  shippingStatus: "PROCESSING" | "HANDED_TO_COURIER" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  courierName: "SMSA" | "ARAMEX" | "REDBOX" | "LOCAL_DRIVER";
  trackingCode?: string;
  notes?: string;
  createdAt: string;
}

export interface AdminConsultation {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  sessionType: "جلسة حضورية خاصة في جدة" | "استشارة تسويقية عن بُعد (Zoom)";
  delivery: "IN_PERSON" | "ONLINE_ZOOM";
  date: string;
  timeSlot: string;
  price: number;
  status: "UPCOMING" | "COMPLETED" | "RESCHEDULED" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING";
  paymentMethod: "MADA" | "APPLE_PAY" | "BANK_TRANSFER";
  zoomMeetingUrl: string;
  intakeAnswers: {
    businessField: string;
    socialLink: string;
    marketingChallenge: string;
    currentBudget: string;
  };
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  tag: "VIP_CONSULTING" | "BOOK_BUYER" | "COURSE_STUDENT" | "ALL_PRODUCTS";
  totalSpent: number; // LTV in SAR
  totalOrdersCount: number;
  enrolledCoursesCount: number;
  consultationsCount: number;
  lastActive: string;
  createdAt: string;
}

export const ADMIN_INITIAL_ORDERS: AdminOrder[] = [];

export const ADMIN_INITIAL_CONSULTATIONS: AdminConsultation[] = [];

export const ADMIN_INITIAL_CUSTOMERS: AdminCustomer[] = [];

export const MONTHLY_REVENUE_CHART = [
  { month: "يناير", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "فبراير", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "مارس", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "أبريل", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "مايو", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "يونيو", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "يوليو", books: 0, consultations: 0, courses: 0, total: 0 },
  { month: "أغسطس", books: 0, consultations: 0, courses: 0, total: 0 },
];
