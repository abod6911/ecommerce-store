export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. SHW-8491
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingCity: string;
  shippingAddress: string;
  bookTitle: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: "MADA" | "APPLE_PAY" | "CREDIT_CARD" | "CASH_ON_DELIVERY" | "BANK_TRANSFER";
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  shippingStatus: "PROCESSING" | "HANDED_TO_COURIER" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  courierName: "SMSA" | "ARAMEX" | "REDBOX" | "LOCAL_DRIVER";
  trackingCode?: string;
  notes?: string;
  createdAt: string;
}

export interface AdminConsultation {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  sessionType: "جلسة حضورية خاصة في جدة" | "استشارة تسويقية عن بُعد (Zoom)";
  delivery: "IN_PERSON" | "ONLINE_ZOOM";
  date: string;
  timeSlot: string;
  price: number;
  status: "UPCOMING" | "COMPLETED" | "RESCHEDULED" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING";
  paymentMethod: "MADA" | "APPLE_PAY" | "BANK_TRANSFER";
  zoomMeetingUrl: string;
  intakeAnswers: {
    businessField: string;
    socialLink: string;
    marketingChallenge: string;
    currentBudget: string;
  };
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  tag: "VIP_CONSULTING" | "BOOK_BUYER" | "COURSE_STUDENT" | "ALL_PRODUCTS";
  totalSpent: number; // LTV in SAR
  totalOrdersCount: number;
  enrolledCoursesCount: number;
  consultationsCount: number;
  lastActive: string;
  createdAt: string;
}

export const ADMIN_INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "SHW-9842",
    customerName: "م. تركي القحطاني",
    customerPhone: "0554819203",
    customerEmail: "turki.q@gmail.com",
    shippingCity: "الرياض",
    shippingAddress: "حي النرجس، شارع أنس بن مالك",
    bookTitle: "إستراتيجيات التسويق الرقمي (توقيع خاص)",
    quantity: 1,
    totalPrice: 165,
    paymentMethod: "APPLE_PAY",
    paymentStatus: "PAID",
    shippingStatus: "IN_TRANSIT",
    courierName: "SMSA",
    trackingCode: "SMSA-SA-84920194",
    notes: "تغليف إهداء فاخر",
    createdAt: "2026-08-25T14:30:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "SHW-9841",
    customerName: "د. سارة المنصور",
    customerPhone: "0503928114",
    customerEmail: "dr.sara@almansoor.com",
    shippingCity: "جدة",
    shippingAddress: "حي الشاطئ، برج الجوهرة",
    bookTitle: "سيكولوجية الإقناع وفنون المبيعات",
    quantity: 2,
    totalPrice: 330,
    paymentMethod: "MADA",
    paymentStatus: "PAID",
    shippingStatus: "HANDED_TO_COURIER",
    courierName: "LOCAL_DRIVER",
    trackingCode: "JED-EXP-48910",
    notes: "توصيل مسائي بعد الساعة 5",
    createdAt: "2026-08-25T11:15:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "SHW-9840",
    customerName: "أ. فيصل الشمري",
    customerPhone: "0561234987",
    customerEmail: "faisal.sh@outlook.sa",
    shippingCity: "الدمام",
    shippingAddress: "حي الشاطئ الشرقي",
    bookTitle: "إستراتيجيات التسويق الرقمي + سيكولوجية الإقناع",
    quantity: 2,
    totalPrice: 330,
    paymentMethod: "CREDIT_CARD",
    paymentStatus: "PAID",
    shippingStatus: "DELIVERED",
    courierName: "ARAMEX",
    trackingCode: "ARAMEX-SA-9948210",
    createdAt: "2026-08-24T09:40:00Z",
  },
  {
    id: "ord-4",
    orderNumber: "SHW-9839",
    customerName: "خالد بن عبدالعزيز الغامدي",
    customerPhone: "0548819230",
    customerEmail: "khalid.g@gmail.com",
    shippingCity: "مكة المكرمة",
    shippingAddress: "حي العوالي، مجمع رواء",
    bookTitle: "إستراتيجيات التسويق الرقمي",
    quantity: 1,
    totalPrice: 165,
    paymentMethod: "CASH_ON_DELIVERY",
    paymentStatus: "PENDING",
    shippingStatus: "PROCESSING",
    courierName: "REDBOX",
    trackingCode: "RBOX-MECCA-1049",
    notes: "خزائن ريدبوكس محطة العوالي",
    createdAt: "2026-08-25T16:20:00Z",
  },
  {
    id: "ord-5",
    orderNumber: "SHW-9838",
    customerName: "نورة السبيعي",
    customerPhone: "0559981245",
    customerEmail: "noura.subaie@gmail.com",
    shippingCity: "الخبر",
    shippingAddress: "حي الحزام الذهبي",
    bookTitle: "سيكولوجية الإقناع وفنون المبيعات",
    quantity: 1,
    totalPrice: 165,
    paymentMethod: "APPLE_PAY",
    paymentStatus: "PAID",
    shippingStatus: "DELIVERED",
    courierName: "SMSA",
    trackingCode: "SMSA-SA-77491023",
    createdAt: "2026-08-23T18:00:00Z",
  },
];

export const ADMIN_INITIAL_CONSULTATIONS: AdminConsultation[] = [
  {
    id: "c-1",
    clientName: "م. فهد القرني",
    clientPhone: "0555583379",
    clientEmail: "fahad.qarni@rawan-perfumes.sa",
    sessionType: "جلسة حضورية خاصة في جدة",
    delivery: "IN_PERSON",
    date: "الخميس، 27 أغسطس 2026",
    timeSlot: "11:00 ص",
    price: 950,
    status: "UPCOMING",
    paymentStatus: "PAID",
    paymentMethod: "MADA",
    zoomMeetingUrl: "https://zoom.us/j/98421048892?pwd=VIP_SHAWA_MEETING",
    intakeAnswers: {
      businessField: "متجر إلكتروني للعطور والمستحضرات الفاخرة",
      socialLink: "https://instagram.com/rawan_perfumes",
      marketingChallenge: "رفع مبيعات الحملات في تيك توك وسناب شات وتخفيض تكلفة الاستحواذ على العميل (CAC).",
      currentBudget: "35,000 ر.س شهرياً",
    },
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "c-2",
    clientName: "أ. ريما العبدالله",
    clientPhone: "0504819201",
    clientEmail: "reema@abdulah-clinic.com",
    sessionType: "استشارة تسويقية عن بُعد (Zoom)",
    delivery: "ONLINE_ZOOM",
    date: "الجمعة، 28 أغسطس 2026",
    timeSlot: "04:30 م",
    price: 650,
    status: "UPCOMING",
    paymentStatus: "PAID",
    paymentMethod: "APPLE_PAY",
    zoomMeetingUrl: "https://zoom.us/j/84920194812?pwd=VIP_SHAWA_CLINIC",
    intakeAnswers: {
      businessField: "مجمع عيادات طب الأسنان والتجميل",
      socialLink: "https://snapchat.com/add/clinic_sa",
      marketingChallenge: "استقطاب عملاء زراعة وتقويم الأسنان من خلال إعلانات جوجل والمسارات المؤتمتة.",
      currentBudget: "25,000 ر.س شهرياً",
    },
    createdAt: "2026-08-25T12:20:00Z",
  },
  {
    id: "c-3",
    clientName: "م. سلطان المطيري",
    clientPhone: "0569812340",
    clientEmail: "sultan.m@aqar-invest.sa",
    sessionType: "جلسة حضورية خاصة في جدة",
    delivery: "IN_PERSON",
    date: "السبت، 29 أغسطس 2026",
    timeSlot: "06:00 م",
    price: 950,
    status: "UPCOMING",
    paymentStatus: "PAID",
    paymentMethod: "BANK_TRANSFER",
    zoomMeetingUrl: "https://zoom.us/j/77481920194?pwd=VIP_SHAWA_AQAR",
    intakeAnswers: {
      businessField: "شركة تطوير عقاري وفلل فاخرة بجدة",
      socialLink: "https://x.com/sultan_realestate",
      marketingChallenge: "إغلاق مبيعات مشاريع البيع على الخارطة والمشترين VIP للمشاريع السكنية الكبرى.",
      currentBudget: "60,000 ر.س شهرياً",
    },
    createdAt: "2026-08-24T15:45:00Z",
  },
  {
    id: "c-4",
    clientName: "د. عبدالمحسن الشهري",
    clientPhone: "0539102938",
    clientEmail: "dr.shehri@gmail.com",
    sessionType: "استشارة تسويقية عن بُعد (Zoom)",
    delivery: "ONLINE_ZOOM",
    date: "الإثنين، 24 أغسطس 2026",
    timeSlot: "08:30 م",
    price: 650,
    status: "COMPLETED",
    paymentStatus: "PAID",
    paymentMethod: "MADA",
    zoomMeetingUrl: "https://zoom.us/j/66491028391?pwd=VIP_SHAWA_COMPLETED",
    intakeAnswers: {
      businessField: "منصة تدريب صحي واستشارات تغذية",
      socialLink: "https://tiktok.com/@dr_shehri",
      marketingChallenge: "هندسة عروض الاشتراكات السنوية وبناء مسار إيميلات تسويقية مؤتمت.",
      currentBudget: "15,000 ر.س شهرياً",
    },
    createdAt: "2026-08-22T08:10:00Z",
  },
];

export const ADMIN_INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "م. فهد القرني",
    phone: "0555583379",
    email: "fahad.qarni@rawan-perfumes.sa",
    city: "جدة",
    tag: "ALL_PRODUCTS",
    totalSpent: 2100,
    totalOrdersCount: 2,
    enrolledCoursesCount: 1,
    consultationsCount: 1,
    lastActive: "منذ 15 دقيقة",
    createdAt: "2026-07-12",
  },
  {
    id: "cust-2",
    name: "د. سارة المنصور",
    phone: "0503928114",
    email: "dr.sara@almansoor.com",
    city: "جدة",
    tag: "BOOK_BUYER",
    totalSpent: 330,
    totalOrdersCount: 1,
    enrolledCoursesCount: 0,
    consultationsCount: 0,
    lastActive: "منذ ساعتين",
    createdAt: "2026-08-25",
  },
  {
    id: "cust-3",
    name: "م. تركي القحطاني",
    phone: "0554819203",
    email: "turki.q@gmail.com",
    city: "الرياض",
    tag: "COURSE_STUDENT",
    totalSpent: 1155,
    totalOrdersCount: 1,
    enrolledCoursesCount: 1,
    consultationsCount: 0,
    lastActive: "اليوم 03:20 م",
    createdAt: "2026-06-18",
  },
  {
    id: "cust-4",
    name: "م. سلطان المطيري",
    phone: "0569812340",
    email: "sultan.m@aqar-invest.sa",
    city: "جدة",
    tag: "VIP_CONSULTING",
    totalSpent: 1940,
    totalOrdersCount: 1,
    enrolledCoursesCount: 1,
    consultationsCount: 1,
    lastActive: "أمس",
    createdAt: "2026-05-30",
  },
  {
    id: "cust-5",
    name: "أ. ريما العبدالله",
    phone: "0504819201",
    email: "reema@abdulah-clinic.com",
    city: "الرياض",
    tag: "VIP_CONSULTING",
    totalSpent: 650,
    totalOrdersCount: 0,
    enrolledCoursesCount: 0,
    consultationsCount: 1,
    lastActive: "منذ 4 ساعات",
    createdAt: "2026-08-25",
  },
];

export const MONTHLY_REVENUE_CHART = [
  { month: "يناير", books: 18500, consultations: 24500, courses: 38000, total: 81000 },
  { month: "فبراير", books: 22000, consultations: 28000, courses: 42000, total: 92000 },
  { month: "مارس", books: 29500, consultations: 34000, courses: 51000, total: 114500 },
  { month: "أبريل", books: 26000, consultations: 31500, courses: 46000, total: 103500 },
  { month: "مايو", books: 34000, consultations: 39000, courses: 58000, total: 131000 },
  { month: "يونيو", books: 38500, consultations: 44000, courses: 64000, total: 146500 },
  { month: "يوليو", books: 42000, consultations: 49500, courses: 72000, total: 163500 },
  { month: "أغسطس (الحالي)", books: 48500, consultations: 56000, courses: 81000, total: 185500 },
];
