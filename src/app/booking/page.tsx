import React from "react";
import BookingWidget from "@/components/home/BookingWidget";
import TrustBanner from "@/components/home/TrustBanner";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-brand-dark-950 pt-20 font-ibm" dir="rtl">
      <BookingWidget />
      <TrustBanner />
    </div>
  );
}
