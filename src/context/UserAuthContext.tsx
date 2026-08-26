"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  username: string;
  phone: string;
  email?: string;
  isLoggedIn: boolean;
  avatarColor?: string;
  freelanceTier?: string;
}

export interface BookingRecord {
  id: string;
  sessionTitle: string;
  deliveryLabel: string;
  dateStr: string;
  timeSlot: string;
  price: number;
  zoomLink?: string;
  intakeCompleted?: boolean;
  intakeData?: {
    businessField: string;
    socialLink: string;
    marketingChallenge: string;
  };
  createdAt: string;
}

export interface ShippingOrderRecord {
  id: string;
  orderNumber: string;
  items: string[];
  totalPrice: number;
  courier: "SMSA" | "ARAMEX" | "REDBOX";
  trackingNumber: string;
  status: "CONFIRMED" | "HANDED_TO_COURIER" | "OUT_FOR_DELIVERY" | "DELIVERED";
  recipientCity: string;
  estimatedDelivery: string;
  createdAt: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  purchasedCourses: string[];
  activeBookings: BookingRecord[];
  shippingOrders: ShippingOrderRecord[];
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (username: string, phone: string, email?: string) => void;
  logout: () => void;
  addBooking: (booking: BookingRecord) => void;
  updateBookingIntake: (bookingId: string, intakeData: { businessField: string; socialLink: string; marketingChallenge: string }) => void;
  addShippingOrder: (order: ShippingOrderRecord) => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "ahmed_alshawa_user_profile",
  COURSES: "ahmed_alshawa_purchased_courses",
  BOOKINGS: "ahmed_alshawa_active_bookings",
  SHIPPING: "ahmed_alshawa_shipping_orders",
};

const DEFAULT_INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "booking-demo-1",
    sessionTitle: "جلسة حضورية خاصة في جدة",
    deliveryLabel: "لقاء مباشر في المكتب (جدة)",
    dateStr: "الخميس، 27 أغسطس 2026",
    timeSlot: "11:00 ص",
    price: 950,
    zoomLink: "https://zoom.us/j/98421048892?pwd=VIP_SHAWA_MEETING",
    intakeCompleted: true,
    intakeData: {
      businessField: "متجر إلكتروني للعطور",
      socialLink: "@aloud_perfumes",
      marketingChallenge: "تخفيض تكلفة الاستحواذ على العميل في سناب شات",
    },
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_INITIAL_ORDERS: ShippingOrderRecord[] = [
  {
    id: "order-demo-1",
    orderNumber: "ORD-98421",
    items: ["كتاب إستراتيجيات التسويق الرقمي (نسخة مطبوعة فاخرة)"],
    totalPrice: 165,
    courier: "SMSA",
    trackingNumber: "SMSA-SA-84920194",
    status: "OUT_FOR_DELIVERY",
    recipientCity: "جدة - حي الشاطئ",
    estimatedDelivery: "اليوم خلال 4 ساعات",
    createdAt: new Date().toISOString(),
  },
];

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>(["course-digital-marketing-mastery"]);
  const [activeBookings, setActiveBookings] = useState<BookingRecord[]>(DEFAULT_INITIAL_BOOKINGS);
  const [shippingOrders, setShippingOrders] = useState<ShippingOrderRecord[]>(DEFAULT_INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (savedCourses) {
        setPurchasedCourses(JSON.parse(savedCourses));
      }

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) {
        setActiveBookings(JSON.parse(savedBookings));
      }

      const savedOrders = localStorage.getItem(STORAGE_KEYS.SHIPPING);
      if (savedOrders) {
        setShippingOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.warn("Storage sync fallback:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync back to localStorage
  const login = (username: string, phone: string, email?: string) => {
    const newUser: UserProfile = {
      username: username.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : `${phone.replace(/\s+/g, "")}@client.sa`,
      isLoggedIn: true,
      avatarColor: "from-brand-amber-400 to-brand-amber-600",
      freelanceTier: "مشترك موثق",
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    document.cookie = `ahmed_user_token=${encodeURIComponent(newUser.username)}; path=/; max-age=2592000; SameSite=Lax`;
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    document.cookie = "ahmed_user_token=; path=/; max-age=0";
  };

  const addBooking = (booking: BookingRecord) => {
    setActiveBookings((prev) => {
      const updated = [booking, ...prev];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateBookingIntake = (
    bookingId: string,
    intakeData: { businessField: string; socialLink: string; marketingChallenge: string }
  ) => {
    setActiveBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, intakeCompleted: true, intakeData } : b
      );
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    });
  };

  const addShippingOrder = (order: ShippingOrderRecord) => {
    setShippingOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem(STORAGE_KEYS.SHIPPING, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        purchasedCourses,
        activeBookings,
        shippingOrders,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        logout,
        addBooking,
        updateBookingIntake,
        addShippingOrder,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
}
