import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AudioProvider } from "@/context/AudioContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { SupabaseAuthProvider } from "@/context/SupabaseAuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import GlobalAudioPlayer from "@/components/audio/GlobalAudioPlayer";
import RealAuthModal from "@/components/auth/RealAuthModal";
import AbandonedCartModal from "@/components/marketing/AbandonedCartModal";
import MobileActionBar from "@/components/layout/MobileActionBar";

export const metadata: Metadata = {
  title: "أحمد الشوا | المستشار ومدرب التسويق الرقمي المعتمد",
  description: "المنصة الرسمية للمستشار أحمد الشوا. كتب حصرية، برامج ماستر كلاس مشفرة DRM، استشارات VIP مخصصة لرواد الأعمال والمستثمرين في السعودية والخليج.",
  keywords: ["أحمد الشوا", "استشارات تسويقية", "كتب التسويق الرقمي", "سيكولوجية الإقناع", "ماستر كلاس إعلانات", "جدة", "السعودية"],
  authors: [{ name: "Ahmed Alshawa" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-dark-900 text-slate-100 antialiased min-h-screen flex flex-col font-ibm selection:bg-brand-amber-400 selection:text-slate-950">
        <SupabaseAuthProvider>
          <UserAuthProvider>
            <CartProvider>
              <AudioProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <CartDrawer />
                <WhatsAppButton />
                <GlobalAudioPlayer />
                <RealAuthModal />
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
