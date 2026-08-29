import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AudioProvider } from "@/context/AudioContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { SupabaseAuthProvider } from "@/context/SupabaseAuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";

// Dynamically load client-only modals & audio player to eliminate main thread blocking on mobile
const CartDrawer = dynamic(() => import("@/components/common/CartDrawer"), { ssr: false });
const GlobalAudioPlayer = dynamic(() => import("@/components/audio/GlobalAudioPlayer"), { ssr: false });
const EmailOtpAuthModal = dynamic(() => import("@/components/auth/EmailOtpAuthModal"), { ssr: false });
const AbandonedCartModal = dynamic(() => import("@/components/marketing/AbandonedCartModal"), { ssr: false });

const ibmFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
  preload: true,
});

const alexandriaFont = Alexandria({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "أحمد الشوا | المستشار ومدرب التسويق الرقمي المعتمد",
  description: "المنصة الرسمية للمستشار أحمد الشوا. كتب حصرية، برامج ماستر كلاس مشفرة DRM، استشارات VIP مخصصة لرواد الأعمال والمستثمرين في السعودية والخليج.",
  keywords: ["أحمد الشوا", "استشارات تسويقية", "كتب التسويق الرقمي", "سيكولوجية الإقناع", "ماستر كلاس إعلانات", "جدة", "السعودية"],
  authors: [{ name: "Ahmed Alshawa" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`dark scroll-smooth ${ibmFont.variable} ${alexandriaFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="bg-brand-dark-900 text-slate-100 antialiased min-h-screen flex flex-col font-ibm selection:bg-brand-amber-400 selection:text-slate-950">
        <SupabaseAuthProvider>
          <UserAuthProvider>
            <CartProvider>
              <AudioProvider>
                <Header />
                <main className="flex-grow pt-16 sm:pt-20 pb-16 lg:pb-0">{children}</main>
                <Footer />
                <CartDrawer />
                <GlobalAudioPlayer />
                <EmailOtpAuthModal />
                <AbandonedCartModal />
                <MobileActionBar />
              </AudioProvider>
            </CartProvider>
          </UserAuthProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
