"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateCartSummary } from "@/lib/utils";

export interface CartItem {
  id: string;
  type: "PHYSICAL_BOOK" | "EBOOK" | "COURSE" | "CONSULTATION";
  title: string;
  price: number;
  originalPrice?: number;
  coverImage?: string;
  quantity: number;
  deliveryCity?: string;
  selectedSlot?: string;
  selectedDate?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  shippingCost: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  subtotal: number;
  vatAmount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("جدة");
  const [paymentMethod, setPaymentMethod] = useState("MADA");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("alshawa_cart_v1");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("alshawa_cart_v1", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const hasPhysicalBooks = items.some((i) => i.type === "PHYSICAL_BOOK");
  const shippingCost = hasPhysicalBooks ? (selectedCity === "جدة" ? 0 : 25) : 0;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { vatAmount, total } = calculateCartSummary(subtotal, shippingCost);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedCity,
        setSelectedCity,
        shippingCost,
        paymentMethod,
        setPaymentMethod,
        subtotal,
        vatAmount,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
