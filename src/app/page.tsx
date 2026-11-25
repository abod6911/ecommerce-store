import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import MediaMarquee from "@/components/home/MediaMarquee";
import BooksSection from "@/components/home/BooksSection";
import CoursesSection from "@/components/home/CoursesSection";
import AboutSection from "@/components/home/AboutSection";

// Dynamically import below-the-fold sections for fast mobile loading & hydration
const TrainingTracks = dynamic(() => import("@/components/home/TrainingTracks"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const BookingWidget = dynamic(() => import("@/components/home/BookingWidget"), {
  loading: () => <div className="min-h-[400px] bg-brand-dark-900 animate-pulse" />,
});

const MediaFeatures = dynamic(() => import("@/components/home/MediaFeatures"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const CustomBlocksSection = dynamic(() => import("@/components/home/CustomBlocksSection"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark-900 text-slate-100 overflow-x-hidden font-ibm">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Media Logo Marquee */}
      <MediaMarquee />

      {/* 3. Book Store (50 SAR) */}
      <BooksSection />

      {/* 4. Training Courses (5 Specialized Courses) */}
      <CoursesSection />

      {/* 5. Marketing Services (Social Media, Ad Campaigns, Authors Books, Clinics) */}
      <TrainingTracks />

      {/* 6. Consultation Booking (2 Hours = 800 SAR, +200 SAR / extra hour) */}
      <BookingWidget />

      {/* 7. About Instructor & TVTC Accreditation */}
      <AboutSection />

      {/* 8. Media Features */}
      <MediaFeatures />

      {/* 9. Coordinator Custom Added Blocks */}
      <CustomBlocksSection />
    </div>
  );
}
