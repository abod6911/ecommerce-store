import React from "react";
import HeroSection from "@/components/home/HeroSection";
import MediaMarquee from "@/components/home/MediaMarquee";
import BooksSection from "@/components/home/BooksSection";
import CoursesSection from "@/components/home/CoursesSection";
import AboutSection from "@/components/home/AboutSection";
import MarketingFramework from "@/components/home/MarketingFramework";
import RoiCalculator from "@/components/home/RoiCalculator";
import BookingWidget from "@/components/home/BookingWidget";
import MediaFeatures from "@/components/home/MediaFeatures";
import TrainingTracks from "@/components/home/TrainingTracks";
import PodcastSection from "@/components/home/PodcastSection";
import TrustBanner from "@/components/home/TrustBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark-900 text-slate-100 overflow-x-hidden font-ibm">
      {/* 1. Hero Section with 3D Tilt, Magnetic CTAs, and Animated Stats Counter */}
      <HeroSection />

      {/* 2. Infinite Media Logo Marquee (العربية، بانوراما FM، TVTC، الغرفة التجارية) */}
      <MediaMarquee />

      {/* 3. Physical Books Store with 3D Tilt & Instant Delivery (Raised to the Top!) */}
      <BooksSection />

      {/* 4. DRM-Protected Masterclasses & Video Courses (Directly accessible!) */}
      <CoursesSection />

      {/* 5. About Instructor & TVTC Accreditation */}
      <AboutSection />

      {/* 6. Core Marketing Framework (قواعد أحمد الشوا للنمو) */}
      <MarketingFramework />

      {/* 7. Interactive Marketing ROI Calculator (حاسبة العائد الإعلاني الذكية) */}
      <RoiCalculator />

      {/* 8. VIP Consultation Booking Portal (جدة حضورياً / أونلاين عبر Zoom) */}
      <BookingWidget />

      {/* 9. Media Features & Workshop Photo Gallery */}
      <MediaFeatures />

      {/* 10. Training Capabilities & Executive Tracks */}
      <TrainingTracks />

      {/* 11. Free Audio Podcasts & Radio Broadcasts */}
      <PodcastSection />

      {/* 12. Social Proof & Trust Testimonials */}
      <TrustBanner />
    </div>
  );
}
