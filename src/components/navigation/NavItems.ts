import {
  Home,
  UserCheck,
  BookOpen,
  GraduationCap,
  Calendar,
  Tv,
  PhoneCall,
  LayoutDashboard,
  ShieldCheck,
  LucideIcon
} from "lucide-react";

export interface MobileNavItem {
  id: string;
  label: string;
  subLabel?: string;
  href: string;
  icon: LucideIcon;
  badge?: string | null;
  badgeColor?: "gold" | "emerald" | "amber";
  isPrimary?: boolean;
}

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    id: "home",
    label: "الرئيسية",
    subLabel: "واجهة المنصة والمستشار",
    href: "/",
    icon: Home,
  },
  {
    id: "books",
    label: "كتاب استراتيجيات التسويق والأدلة",
    subLabel: "الكتب المطبوعة مع الشحن الفوري",
    href: "/#books",
    icon: BookOpen,
    badge: "الأكثر طلباً",
    badgeColor: "gold",
  },
  {
    id: "courses",
    label: "ماستر كلاس الكورسات المحمية",
    subLabel: "تدريب مسجل مشفر بتقنية DRM",
    href: "/#courses",
    icon: GraduationCap,
    badge: "معتمد TVTC",
    badgeColor: "emerald",
  },
  {
    id: "about",
    label: "عن المستشار وخبراته",
    subLabel: "+20 عاماً في السوق السعودي",
    href: "/#about",
    icon: UserCheck,
  },
  {
    id: "booking",
    label: "حجز جلسة استشارية VIP",
    subLabel: "حضورياً بجدة أو أونلاين عبر Zoom",
    href: "/#booking",
    icon: Calendar,
    badge: "متاح الآن",
    badgeColor: "amber",
    isPrimary: true,
  },
  {
    id: "media",
    label: "الظهور الإعلامي والبودكاست",
    subLabel: "حوارات العربية وبانوراما FM",
    href: "/#media",
    icon: Tv,
  },
  {
    id: "contact",
    label: "تواصل معنا والدعم الفني",
    subLabel: "فريق المستشار جاهز للرد",
    href: "/#contact",
    icon: PhoneCall,
  },
];
