export interface BookItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  type: "PHYSICAL_BOOK" | "EBOOK" | "BUNDLE";
  coverImage: string;
  rating: number;
  reviewCount: number;
  pagesCount: number;
  isbn: string;
  stockQuantity: number;
  isBestseller: boolean;
  features: string[];
  samplePdfUrl: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  isFreePreview: boolean;
  videoUrl: string;
  description: string;
  resources: { title: string; type: string; size: string; url: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  trailerVideoUrl: string;
  level: string;
  durationHours: number;
  studentsCount: number;
  rating: number;
  reviewCount: number;
  certificate: boolean;
  drmProtected: boolean;
  isFeatured: boolean;
  badge: string;
  whatYouWillLearn: string[];
  modules: CourseModule[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string;
  publishDate: string;
  description: string;
  audioUrl: string;
  coverImage: string;
  listensCount: number;
}

export interface ConsultationService {
  id: string;
  title: string;
  durationMin: number;
  price: number;
  originalPrice: number;
  badge: string;
  deliveryType: "IN_PERSON_JEDDAH" | "ONLINE_REMOTE";
  description: string;
  features: string[];
  availableSlots: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string;
  rating: number;
  content: string;
  productTitle: string;
  verifiedPurchase: boolean;
}

export interface MediaFeatureItem {
  id: string;
  outlet: string;
  program: string;
  topic: string;
  badge: string;
  image: string;
  summary: string;
  videoUrl?: string;
}

export interface MarketingFrameworkItem {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  points: string[];
}

export interface TrainingTrackItem {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  targetAudience: string;
}

export const INSTRUCTOR_INFO = {
  name: "أحمد الشوا",
  title: "مستشار ومدرب تسويق رقمي معتمد",
  accreditation: "مدرب معتمد من المؤسسة العامة للتدريب التقني والمهني (TVTC)",
  slogan: "التسويق أساس نجاح أي مشروع",
  location: "جدة، المملكة العربية السعودية (متاح حضورياً وعن بُعد)",
  phone: "+966 55 558 3379",
  phoneRaw: "0555583379",
  email: "a.alshawa79@gmail.com",
  whatsappNumber: "966555583379",
  bio: "مستشار ومدرب تسويق رقمي معتمد من المؤسسة العامة للتدريب التقني والمهني (TVTC)، بخبرة تتجاوز 20 عاماً في بناء الخطط التسويقية وتدريب الكوادر ورواد الأعمال وإدارة ميزانيات الحملات الإعلانية في السوق السعودي.",
  stats: [
    { label: "متدرب ومستفيد", value: "+5,000" },
    { label: "خبرة في التسويق وتطوير الذات", value: "+20 سنة" },
    { label: "نسبة رضا العملاء", value: "98.7%" },
  ],
  socials: {
    instagram: "https://instagram.com/ahmedshawa",
    instagramHandle: "@ahmedshawa",
    threads: "https://threads.net/@ahmedshawa",
    threadsHandle: "@ahmedshawa",
    snapchat: "https://snapchat.com/add/aqwe1234",
    snapchatHandle: "aqwe1234",
    whatsapp: "https://wa.me/966555583379",
    email: "mailto:a.alshawa79@gmail.com",
  }
};

export const MEDIA_FEATURES_DATA: MediaFeatureItem[] = [
  {
    id: "media-alarabiya",
    outlet: "قناة العربية",
    program: "برنامج صباح العربية",
    badge: "ظهور تلفزيوني مميز",
    topic: "تحليل اتجاهات الإنفاق الإعلاني وطرق بناء حملات ممولة ناجحة",
    image: "/images/ahmed-alshawa-workshop.jpg",
    summary: "استضافة المستشار أحمد الشوا للحديث عن التغيرات المتسارعة في سلوك المستهلك السعودي وأفضل الاستراتيجيات لخفض تكلفة اكتساب العميل (CAC) مع تعظيم العائد الاستثماري.",
  },
  {
    id: "media-panorama-1",
    outlet: "إذاعة بانوراما FM (MBC Group)",
    program: "برنامج هدى وهن",
    badge: "لقاء إذاعي تفاعلي",
    topic: "استشارات تسويقية وحلول استثمارية مباشرة للشركات الناشئة",
    image: "/images/ahmed-alshawa-coaching.jpg",
    summary: "حوار إذاعي مباشر يقدم فيه حلولاً وتوجيهات عملية لأصحاب المشاريع المنزلية والمتاجر الرقمية حول صناعة المحتوى الجذاب والتسعير الذكي.",
  },
  {
    id: "media-panorama-2",
    outlet: "إذاعة بانوراما FM",
    program: "برنامج بانوراما كافيه",
    badge: "توجيه ريادي",
    topic: "سيكولوجية الإقناع والتفاوض وتحويل الفرص التسويقية إلى مبيعات",
    image: "/images/ahmed-alshawa-about.jpg",
    summary: "نقاش ملهم مع رواد الأعمال في المملكة حول فنون الإغلاق البيعي وبناء علاقات طويلة الأمد مع العملاء.",
  }
];

export const MARKETING_FRAMEWORK_DATA: MarketingFrameworkItem[] = [
  {
    stepNumber: "01",
    title: "البحث الجيد وتحليل السوق",
    subtitle: "الدراسة الاستباقية للجمهور والمنافسين",
    description: "دراسة دقيقة للمنافسين وسلوك الجمهور المستهدف في السوق السعودي قبل رصد أي ميزانيات إعلانية، لتجنب الهدر المالي واقتناص الفرص الحقيقية.",
    iconName: "SearchCheck",
    points: [
      "تحديد شخصية العميل المثالي (Buyer Persona) في السوق المحلي",
      "تحليل الفجوات التسويقية لدى المنافسين",
      "اختيار القنوات الإعلانية الأنسب للشريحة المستهدفة"
    ]
  },
  {
    stepNumber: "02",
    title: "صناعة المحتوى الجذاب",
    subtitle: "الدمج بين الاستراتيجية وسيكولوجية العميل",
    description: "الدمج الاحترافي بين الاستراتيجية التسويقية واللغة القريبة من مشاعر واحتياجات العملاء لكسب ولائهم وتحويل المشاهدات إلى قرارات شراء.",
    iconName: "Sparkles",
    points: [
      "صياغة خطافات إعلانية (Hooks) تزيد وقت المشاهدة",
      "كتابة نصوص بيعية مقنعة تركز على القيمة وليس المواصفات فقط",
      "صناعة محتوى مرئي يعزز مصداقية وهوية البراند"
    ]
  },
  {
    stepNumber: "03",
    title: "أتمتة الخطط وقياس الأداء",
    subtitle: "أهداف ذكية وعائد إعلاني قابل للتكرار",
    description: "وضع أهداف ذكية (Smart Goals) قابلة للقياس والتحسين المستمر لتحقيق أعلى عائد على الاستثمار الإعلاني (ROI) ونمو متسارع للمشروع.",
    iconName: "TrendingUp",
    points: [
      "تتبع مؤشرات الأداء الرئيسية (ROAS, CTR, Conversion Rate)",
      "أتمتة مسارات التواصل عبر الواتساب والبريد الإلكتروني",
      "إعادة الاستهداف الذكي لرفع القيمة الدائمة للعميل (LTV)"
    ]
  }
];

export const TRAINING_TRACKS_DATA: TrainingTrackItem[] = [
  {
    id: "service-social-management",
    title: "إدارة حسابات سوشل ميديا",
    icon: "Share2",
    tagline: "إدارة احترافية متكاملة لحساباتك وبناء حضور رقمي مؤثر",
    summary: "نتولى إدارة حساباتك على منصات التواصل الاجتماعي من تخطيط المحتوى والكتابة الإبداعية والنشر المنتظم إلى التفاعل مع الجمهور وتحليل الأداء لتحقيق نمو حقيقي.",
    outcomes: [
      "إعداد خطة محتوى شهرية متوافقة مع هوية علامتك التجارية",
      "صياغة نصوص ومنشورات جذابة ترفع التفاعل والثقة",
      "متابعة الأداء وتقارير دورية لقياس النتائج والنمو"
    ],
    targetAudience: "الشركات، المتاجر، ورواد الأعمال الباحثين عن حضور رقمي احترافي"
  },
  {
    id: "service-ad-campaigns",
    title: "حملات إعلانية",
    icon: "Megaphone",
    tagline: "إطلاق وإدارة حملات إعلانية ممولة تستهدف عملاءك بدقة",
    summary: "تصميم وإدارة الحملات الإعلانية الممولة على سناب شات، تيك توك، إنستغرام، وجوجل بأسلوب احترافي يركز على جودة الاستهداف وتحويل المشاهدات إلى مبيعات.",
    outcomes: [
      "استهداف دقيق للجمهور المهتم في السوق السعودي والخليجي",
      "تحسين مستمر للإعلانات لخفض تكلفة الوصول ورفع المبيعات",
      "تقارير واضحة لنتائج الحملة ومعدلات التحويل"
    ],
    targetAudience: "أصحاب المشاريع والمتاجر الإلكترونية والخدمات"
  },
  {
    id: "service-author-books",
    title: "تسويق كتب المؤلفين",
    icon: "BookOpen",
    tagline: "خطط تسويقية متخصصة لإيصال كتابك لأوسع شريحة من القراء",
    summary: "خدمة مخصصة للمؤلفين والكتّاب لتسويق إصداراتهم العلمية والأدبية وبناء حملات إطلاق احترافية تعزز انتشار الكتاب ومبيعاته محلياً وإقليمياً.",
    outcomes: [
      "بناء هوية تسويقية جاذبة للكتاب والمؤلف",
      "حملات ترويجية تستهدف القراء المهتمين بمجال الكتاب",
      "استراتيجيات فعالة لرفع المبيعات والوصول لمعارض الكتب والمنصات"
    ],
    targetAudience: "المؤلفون، الأكاديميون، والكتّاب في مختلف المجالات"
  },
  {
    id: "service-clinics",
    title: "تسويق العيادات",
    icon: "Stethoscope",
    tagline: "استقطاب المرضى وبناء السمعة الرقمية للعيادات والمراكز الطبية",
    summary: "تسويق طبي احترافي للعيادات والمراكز الصحية يلتزم بالضوابط المهنية ويركز على إبراز خدمات العيادة والأطباء لزيادة الحجوزات والمراجعين.",
    outcomes: [
      "إدارة المحتوى التوعوي والتعريفي لخدمات العيادة والأطباء",
      "حملات إعلانية موجهة لزيادة حجوزات المواعيد والاستشارات",
      "تحسين الظهور الرقمي وبناء الثقة مع المراجعين"
    ],
    targetAudience: "العيادات التخصصية، المراكز الطبية، والأطباء"
  }
];

export const BOOKS_DATA: BookItem[] = [
  {
    id: "book-marketing-strategies",
    slug: "digital-marketing-strategies",
    title: "استراتيجيات التسويق الرقمي",
    subtitle: "دليل عملي لبناء عقلية تسويقية مبدعة تواكب السوق السعودي",
    tagline: "الكتاب التطبيقي الشامل لرواد الأعمال والمسوقين",
    description: "كتاب تطبيقي فريد يلخص خبرة أكثر من 20 عاماً للمستشار أحمد الشوا. يشرح بأسلوب سلس ومباشر كيفية بناء منظومة تسويقية رابحة، وصياغة الرسائل المقنعة، واقتناص فرص النمو في بيئة التجارة الرقمية السعودية.",
    price: 50,
    originalPrice: 50,
    type: "PHYSICAL_BOOK",
    coverImage: "/images/book-marketing-strategies.jpg",
    rating: 4.98,
    reviewCount: 520,
    pagesCount: 162,
    isbn: "978-603-8455-35-7",
    stockQuantity: 38,
    isBestseller: true,
    features: [
      "نسخة ورقية فاخرة وتوقيع شخصي من المستشار أحمد الشوا",
      "توصيل فوري بنفس اليوم داخل جدة وشحن سريع لكافة مدن المملكة",
      "خيار الدفع عند الاستلام بجدة أو الدفع الإلكتروني الآمن"
    ],
    samplePdfUrl: "/samples/marketing-strategies-sample.pdf"
  }
];

export const COURSES_DATA: CourseItem[] = [
  {
    id: "course-sales-marketing-pro",
    slug: "professional-sales-marketing-skills",
    title: "مهارات البيع والتسويق المحترف",
    subtitle: "إتقان فنون البيع الحديثة وبناء استراتيجيات تسويقية عملية",
    description: "دورة تدريبية شاملة تؤهلك لفهم سيكولوجية العميل، بناء العرض المقنع، وإتقان مهارات البيع والتسويق الاحترافي لتحقيق نتائج ملموسة في المبيعات.",
    price: 450,
    originalPrice: 450,
    thumbnail: "/images/course-digital-marketing.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    level: "شامل لجميع المستويات",
    durationHours: 8,
    studentsCount: 1450,
    rating: 4.97,
    reviewCount: 320,
    certificate: true,
    drmProtected: true,
    isFeatured: true,
    badge: "دورة معتمدة",
    whatYouWillLearn: [
      "أساسيات البيع الاحترافي وفهم احتياجات العميل",
      "بناء الرسالة التسويقية المقنعة وصياغة العروض",
      "معالجة اعتراضات العملاء وإتمام الصفقات بنجاح"
    ],
    modules: [
      {
        id: "mod-sm-1",
        title: "الوحدة 1: أسس البيع والتسويق المحترف",
        lessons: [
          {
            id: "les-sm-1",
            title: "مدخل إلى مهارات البيع والتسويق الحديث",
            durationMinutes: 25,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "التعرف على العلاقة التكاملية بين التسويق والمبيعات.",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "course-master-social-media",
    slug: "master-social-media",
    title: "احترف السوشل ميديا",
    subtitle: "صناعة المحتوى وإدارة المنصات وبناء الجمهور المستهدف",
    description: "برنامج عملي متكامل لتعلم أسرار النجاح على منصات التواصل الاجتماعي، من التخطيط وصناعة المحتوى المؤثر إلى زيادة التفاعل وتحويل المتابعين إلى عملاء.",
    price: 400,
    originalPrice: 400,
    thumbnail: "/images/ahmed-alshawa-workshop.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    level: "من المبتدئ إلى المحترف",
    durationHours: 6,
    studentsCount: 1820,
    rating: 4.96,
    reviewCount: 280,
    certificate: true,
    drmProtected: true,
    isFeatured: true,
    badge: "الأكثر طلباً",
    whatYouWillLearn: [
      "فهم خوارزميات المنصات (إنستغرام، تيك توك، سناب شات)",
      "إعداد خطة محتوى احترافية تجذب الجمهور المستهدف",
      "تحليل الأداء ومضاعفة الوصول العضوي والممول"
    ],
    modules: [
      {
        id: "mod-soc-1",
        title: "الوحدة 1: استراتيجيات السوشل ميديا",
        lessons: [
          {
            id: "les-soc-1",
            title: "كيف تبني حضوراً قوياً على منصات التواصل",
            durationMinutes: 22,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            description: "مقدمة شاملة في إدارة وتطوير حسابات التواصل الاجتماعي.",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "course-sales-service-excellence",
    slug: "excellence-in-sales-service",
    title: "التميز في خدمة المبيعات",
    subtitle: "تقديم تجربة عميل استثنائية ترفع الولاء وتضاعف المبيعات",
    description: "تركز هذه الدورة على الارتقاء بجودة خدمة المبيعات، مهارات التواصل الراقي مع العملاء، وبناء تجربة شراء احترافية تضمن عودة العميل وتوصيته للآخرين.",
    price: 380,
    originalPrice: 380,
    thumbnail: "/images/course-sales-mastery.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    level: "للفرق ومقدمي الخدمات",
    durationHours: 6,
    studentsCount: 980,
    rating: 4.95,
    reviewCount: 190,
    certificate: true,
    drmProtected: true,
    isFeatured: false,
    badge: "تطوير مهني",
    whatYouWillLearn: [
      "معايير التميز في استقبال وخدمة العملاء قبل وأثناء وبعد البيع",
      "التعامل الاحترافي مع شكاوى واستفسارات العملاء",
      "رفع ولاء العميل وزيادة معدل تكرار الشراء"
    ],
    modules: [
      {
        id: "mod-ss-1",
        title: "الوحدة 1: معايير التميز في خدمة المبيعات",
        lessons: [
          {
            id: "les-ss-1",
            title: "رحلة العميل وصناعة الانطباع الأول",
            durationMinutes: 20,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            description: "أسس تقديم خدمة مبيعات احترافية ومتميزة.",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "course-tot",
    slug: "training-of-trainers-tot",
    title: "تدريب المدربين (TOT)",
    subtitle: "إعداد وتأهيل المدرب المحترف في الإلقاء وتصميم الحقائب التدريبية",
    description: "برنامج متخصص لإعداد المدربين وتطوير مهارات العرض والإلقاء، إدارة القاعات التدريبية، وتصميم الحقائب التدريبية وفق المعايير المعتمدة.",
    price: 650,
    originalPrice: 650,
    thumbnail: "/images/ahmed-alshawa-coaching.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    level: "متقدم / تأهيلي",
    durationHours: 12,
    studentsCount: 740,
    rating: 4.99,
    reviewCount: 215,
    certificate: true,
    drmProtected: true,
    isFeatured: true,
    badge: "معتمد TVTC",
    whatYouWillLearn: [
      "مهارات الإلقاء المؤثر ولغة الجسد أمام الجمهور",
      "تصميم الحقائب التدريبية وبناء الأنشطة التفاعلية",
      "إدارة المتدربين والتعامل مع مختلف الأنماط في القاعة"
    ],
    modules: [
      {
        id: "mod-tot-1",
        title: "الوحدة 1: أساسيات المدرب المحترف",
        lessons: [
          {
            id: "les-tot-1",
            title: "مواصفات المدرب الناجح وكسر حاجز الرهبة",
            durationMinutes: 28,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "خطوات عملية لإتقان فنون التدريب والإلقاء.",
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "course-write-scientific-book",
    slug: "how-to-write-a-scientific-book",
    title: "كيف تؤلف كتاباً علمياً",
    subtitle: "منهجية عملية من الفكرة والبحث حتى الطباعة والنشر والتسويق",
    description: "دورة عملية ترشدك خطوة بخطوة في اختيار فكرة الكتاب العلمي، هيكلة الفصول، توثيق المصادر، الصياغة الواضحة، وإخراج الكتاب للنشر باحترافية.",
    price: 350,
    originalPrice: 350,
    thumbnail: "/images/ahmed-alshawa-about.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    level: "للباحثين والمؤلفين",
    durationHours: 5,
    studentsCount: 620,
    rating: 4.96,
    reviewCount: 145,
    certificate: true,
    drmProtected: true,
    isFeatured: false,
    badge: "تأليف ونشر",
    whatYouWillLearn: [
      "تحديد موضوع الكتاب العلمي وبناء الفهرس والهيكل العام",
      "منهجية البحث العلمي والتوثيق الأكاديمي الصحيح",
      "خطوات المراجعة اللغوية والطباعة والترقيم الدولي (ISBN)"
    ],
    modules: [
      {
        id: "mod-bk-1",
        title: "الوحدة 1: التخطيط لتأليف الكتاب العلمي",
        lessons: [
          {
            id: "les-bk-1",
            title: "من الفكرة إلى خطة الكتاب المتكاملة",
            durationMinutes: 20,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            description: "كيف تبدأ رحلة تأليف كتابك العلمي بخطوات واضحة.",
            resources: []
          }
        ]
      }
    ]
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "pod-1",
    title: "التسويق أساس نجاح أي مشروع: أخطاء شائعة تدمر ميزانيتك الإعلانية",
    episodeNumber: 24,
    duration: "38:40",
    publishDate: "2026-08-20",
    description: "في هذه الحلقة يناقش المستشار أحمد الشوا لماذا يفشل 70% من أصحاب المتاجر في تحقيق أرباح مستدامة، وكيف تصحح بوصلة حملاتك التسويقية.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80",
    listensCount: 16500
  },
  {
    id: "pod-2",
    title: "أسرار المحتوى الجذاب: كيف تجعل عميلك يثق بك ويطلب منتجك فوراً؟",
    episodeNumber: 23,
    duration: "42:15",
    publishDate: "2026-08-05",
    description: "حوار عملي حول سيكولوجية صناعة الفيديو القصير المقنع وتقنيات السرد القصصي (Storytelling) في التجارة الإلكترونية.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    listensCount: 21800
  }
];

export const CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: "consult-in-person-jeddah",
    title: "جلسة استشارية حضورية خاصة في جدة (ساعتين)",
    durationMin: 120,
    price: 800,
    originalPrice: 800,
    deliveryType: "IN_PERSON_JEDDAH",
    badge: "متاحة حضورياً بمقر المستشار بجدة",
    description: "لقاء حضوري مباشر وجهاً لوجه مع المستشار أحمد الشوا لمدة ساعتين (800 ر.س، وكل ساعة إضافية بـ 200 ر.س) لمراجعة خطتك التسويقية، تشخيص حملاتك الإعلانية، ووضع استراتيجية نمو تنفيذية.",
    features: [
      "مدة الجلسة الأساسية ساعتين مقابل 800 ر.س",
      "إمكانية التمديد بساعات إضافية (200 ر.س لكل ساعة بعد الساعتين)",
      "تشخيص شامل للمشروع ووضع خطة عمل وتوصيات تنفيذية"
    ],
    availableSlots: ["11:00 ص", "04:30 م", "06:00 م", "08:30 م"]
  },
  {
    id: "consult-online-remote",
    title: "استشارة تسويقية استراتيجية عن بُعد عبر Zoom (ساعتين)",
    durationMin: 120,
    price: 800,
    originalPrice: 800,
    deliveryType: "ONLINE_REMOTE",
    badge: "أونلاين لجميع مدن المملكة والخليج",
    description: "جلسة مرئية مباشرة ومكثفة عبر Zoom لمدة ساعتين (800 ر.س، وكل ساعة إضافية بـ 200 ر.س) لحل مشكلات المبيعات، تحسين التسويق، وضبط الحملات الإعلانية.",
    features: [
      "مدة الجلسة الأساسية ساعتين مقابل 800 ر.س",
      "إمكانية التمديد بساعات إضافية (200 ر.س لكل ساعة بعد الساعتين)",
      "مرونة وسرعة في تنسيق المواعيد لكافة المدن"
    ],
    availableSlots: ["01:00 م", "05:00 م", "07:30 م", "09:30 م"]
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "م. خالد الحربي",
    role: "مؤسس علامة تجارية في قطاع الأزياء",
    company: "جدة",
    city: "جدة",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "جلستي الاستشارية الحضورية مع الأستاذ أحمد الشوا بجدة غيرت مجرى حملاتنا الإعلانية. رفعنا العائد على الإنفاق ROAS من 2x إلى 5.4x خلال شهر واحد فقط بتطبيق قواعده.",
    productTitle: "جلسة استشارية حضورية بجدة",
    verifiedPurchase: true
  },
  {
    id: "test-2",
    name: "نورة القحطاني",
    role: "مديرة تسويق ومؤسس متجر إلكتروني",
    company: "الرياض",
    city: "الرياض",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "كتاب استراتيجيات التسويق الرقمي مرجع يومي لفريق العمل لدينا. محتوى عملي واقعي ومكتوب خصيصاً ليناسب السوق السعودي بدون حشو أو تنظير فارغ.",
    productTitle: "كتاب استراتيجيات التسويق الرقمي",
    verifiedPurchase: true
  },
  {
    id: "test-3",
    name: "د. عبد الله الشهري",
    role: "شريك تنفيذي ومستثمر",
    company: "الخبر",
    city: "المنطقة الشرقية",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "الماستر كلاس والتدريب المعتمد مع المستشار أحمد الشوا كان استثماراً في محله. احترافية عالية جداً ونظام منصة مشفر وسلس للغاية.",
    productTitle: "ماستر كلاس التسويق الرقمي وهندسة النمو",
    verifiedPurchase: true
  }
];

export const JEDDAH_DISTRICTS = [
  "الروضة",
  "الشاطئ",
  "الحمراء",
  "الزهراء",
  "السلامة",
  "المرجان",
  "أبحر الشمالية",
  "أبحر الجنوبية",
  "النعيم",
  "البوادي",
  "السامر",
  "الصفا",
  "المحمدية",
  "الأندلس",
  "حي البلد التاريخي"
];

export const SAUDI_CITIES = [
  { name: "جدة", shippingDays: "نفس اليوم (خلال 3-6 ساعات)", cost: 0, isLocal: true },
  { name: "مكة المكرمة", shippingDays: "خلال 24 ساعة", cost: 20, isLocal: false },
  { name: "الرياض", shippingDays: "1-2 يوم عمل", cost: 25, isLocal: false },
  { name: "المدينة المنورة", shippingDays: "1-2 يوم عمل", cost: 25, isLocal: false },
  { name: "الدمام والخبر", shippingDays: "2-3 أيام عمل", cost: 30, isLocal: false },
  { name: "الطائف", shippingDays: "1-2 يوم عمل", cost: 25, isLocal: false },
  { name: "تبوك", shippingDays: "2-3 أيام عمل", cost: 30, isLocal: false },
  { name: "أبها وخميس مشيط", shippingDays: "2-3 أيام عمل", cost: 30, isLocal: false },
  { name: "القصيم", shippingDays: "2-3 أيام عمل", cost: 30, isLocal: false },
  { name: "باقي مدن المملكة", shippingDays: "2-4 أيام عمل", cost: 35, isLocal: false },
];
