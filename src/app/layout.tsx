import type { Metadata } from "next";
import { Alexandria, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AudioProvider } from "@/context/AudioContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { SupabaseAuthProvider } from "@/context/SupabaseAuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import GlobalAudioPlayer from "@/components/audio/GlobalAudioPlayer";
import EmailOtpAuthModal from "@/components/auth/EmailOtpAuthModal";
import AbandonedCartModal from "@/components/marketing/AbandonedCartModal";
import MobileActionBar from "@/components/layout/MobileActionBar";

const ibmFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

const alexandriaFont = Alexandria({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
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
      className={`dark scroll-smooth ${ibmFont.variable} ${alexandriaFont.variable} ${cairoFont.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
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
