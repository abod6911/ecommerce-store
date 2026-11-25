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
  User,
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
    id: "account",
    label: "حسابي ومكتبتي الرقمية",
    subLabel: "الدورات المشفرة، الشحنات، والفواتير",
    href: "/account",
    icon: User,
    badge: "جديد",
    badgeColor: "gold",
  },
  {
    id: "books",
    label: "كتاب استراتيجيات التسويق الرقمي",
    subLabel: "بسعر 50 ر.س مع الشحن الفوري",
    href: "/#books",
    icon: BookOpen,
    badge: "50 ر.س",
    badgeColor: "gold",
  },
  {
    id: "courses",
    label: "الدورات التدريبية",
    subLabel: "5 برامج تدريبية متخصصة",
    href: "/#courses",
    icon: GraduationCap,
    badge: "معتمد TVTC",
    badgeColor: "emerald",
  },
  {
    id: "services",
    label: "الخدمات التسويقية",
    subLabel: "سوشل ميديا، إعلانات، كتب، عيادات",
    href: "/#services",
    icon: ShieldCheck,
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
