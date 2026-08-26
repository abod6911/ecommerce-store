import React from "react";
import HeroSection from "@/components/home/HeroSection";
import MediaMarquee from "@/components/home/MediaMarquee";
import AboutSection from "@/components/home/AboutSection";
import MarketingFramework from "@/components/home/MarketingFramework";
import RoiCalculator from "@/components/home/RoiCalculator";
import TrainingTracks from "@/components/home/TrainingTracks";
import BooksSection from "@/components/home/BooksSection";
import CoursesSection from "@/components/home/CoursesSection";
import MediaFeatures from "@/components/home/MediaFeatures";
import BookingWidget from "@/components/home/BookingWidget";
import PodcastSection from "@/components/home/PodcastSection";
import TrustBanner from "@/components/home/TrustBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark-900 text-slate-100 overflow-x-hidden font-ibm">
      {/* 1. Hero Section with 3D Tilt, Magnetic CTAs, and Animated Stats Counter */}
      <HeroSection />

      {/* 2. Infinite Media Logo Marquee (العربية، بانوراما FM، TVTC، الغرفة التجارية) */}
      <MediaMarquee />

      {/* 3. About Instructor & TVTC Accreditation */}
      <AboutSection />

      {/* 4. Core Marketing Framework (قواعد أحمد الشوا للنمو) */}
      <MarketingFramework />

      {/* 5. Interactive Marketing ROI Calculator (حاسبة العائد الإعلاني الذكية) */}
      <RoiCalculator />

      {/* 6. Training Capabilities & Pillars */}
      <TrainingTracks />

      {/* 7. Physical Books with 3D Tilt & Magnetic CTAs */}
      <BooksSection />

      {/* 8. DRM-Protected Masterclasses */}
      <CoursesSection />

      {/* 9. Media Features with Waveform Audio Visualizer */}
      <MediaFeatures />

      {/* 10. VIP Consultation Booking Portal (جدة حضورياً / أونلاين) */}
      <BookingWidget />

      {/* 11. Free Audio Podcasts */}
      <PodcastSection />

      {/* 12. Social Proof & Trust Testimonials */}
      <TrustBanner />
    </div>
  );
}
