import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import MediaMarquee from "@/components/home/MediaMarquee";
import BooksSection from "@/components/home/BooksSection";
import CoursesSection from "@/components/home/CoursesSection";
import AboutSection from "@/components/home/AboutSection";

// Dynamically import heavy below-the-fold sections for instant mobile loading & hydration
const MarketingFramework = dynamic(() => import("@/components/home/MarketingFramework"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const RoiCalculator = dynamic(() => import("@/components/home/RoiCalculator"), {
  loading: () => <div className="min-h-[400px] bg-brand-dark-900 animate-pulse" />,
});

const BookingWidget = dynamic(() => import("@/components/home/BookingWidget"), {
  loading: () => <div className="min-h-[400px] bg-brand-dark-900 animate-pulse" />,
});

const MediaFeatures = dynamic(() => import("@/components/home/MediaFeatures"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const TrainingTracks = dynamic(() => import("@/components/home/TrainingTracks"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const PodcastSection = dynamic(() => import("@/components/home/PodcastSection"), {
  loading: () => <div className="min-h-[300px] bg-brand-dark-900 animate-pulse" />,
});

const TrustBanner = dynamic(() => import("@/components/home/TrustBanner"), {
  loading: () => <div className="min-h-[250px] bg-brand-dark-900 animate-pulse" />,
});

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark-900 text-slate-100 overflow-x-hidden font-ibm">
      {/* 1. Hero Section with 3D Tilt, Magnetic CTAs, and Animated Stats Counter (Immediate render) */}
      <HeroSection />

      {/* 2. Infinite Media Logo Marquee */}
      <MediaMarquee />

      {/* 3. Physical Books Store with 3D Tilt & Instant Delivery */}
      <BooksSection />

      {/* 4. DRM-Protected Masterclasses & Video Courses */}
      <CoursesSection />

      {/* 5. About Instructor & TVTC Accreditation */}
      <AboutSection />

      {/* 6. Core Marketing Framework (Lazy loaded) */}
      <MarketingFramework />

      {/* 7. Interactive Marketing ROI Calculator (Lazy loaded) */}
      <RoiCalculator />

      {/* 8. VIP Consultation Booking Portal (Lazy loaded) */}
      <BookingWidget />

      {/* 9. Media Features & Workshop Photo Gallery (Lazy loaded) */}
      <MediaFeatures />

      {/* 10. Training Capabilities & Executive Tracks (Lazy loaded) */}
      <TrainingTracks />

      {/* 11. Free Audio Podcasts & Radio Broadcasts (Lazy loaded) */}
      <PodcastSection />

      {/* 12. Social Proof & Trust Testimonials (Lazy loaded) */}
      <TrustBanner />
    </div>
  );
}
