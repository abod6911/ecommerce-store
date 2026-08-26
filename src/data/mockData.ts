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
    { label: "ميزانيات واستشارات مدارة", value: "+25 مليون ر.س" },
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
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    summary: "استضافة المستشار أحمد الشوا للحديث عن التغيرات المتسارعة في سلوك المستهلك السعودي وأفضل الاستراتيجيات لخفض تكلفة اكتساب العميل (CAC) مع تعظيم العائد الاستثماري.",
  },
  {
    id: "media-panorama-1",
    outlet: "إذاعة بانوراما FM (MBC Group)",
    program: "برنامج هدى وهن",
    badge: "لقاء إذاعي تفاعلي",
    topic: "استشارات تسويقية وحلول استثمارية مباشرة للشركات الناشئة",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    summary: "حوار إذاعي مباشر يقدم فيه حلولاً وتوجيهات عملية لأصحاب المشاريع المنزلية والمتاجر الرقمية حول صناعة المحتوى الجذاب والتسعير الذكي.",
  },
  {
    id: "media-panorama-2",
    outlet: "إذاعة بانوراما FM",
    program: "برنامج بانوراما كافيه",
    badge: "توجيه ريادي",
    topic: "سيكولوجية الإقناع والتفاوض وتحويل الفرص التسويقية إلى مبيعات",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
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
    id: "track-marketing",
    title: "التسويق الرقمي وبناء الحملات",
    icon: "Megaphone",
    tagline: "إطلاق حملات ممولة باحترافية وأعلى عائد ROAS",
    summary: "برامج تدريبية متكاملة تغطي إعلانات سناب شات، تيك توك، جوجل، وإنستغرام باستهداف دقيق يواكب سلوك المستهلك في السعودية.",
    outcomes: [
      "هيكلة الحملات الإعلانية ومسارات التحويل (Funnels)",
      "قراءة وتفسير لوحات تحليلات الإعلانات بدقة",
      "إتقان استراتيجيات التسويق بالمحتوى والظهور المؤثر"
    ],
    targetAudience: "أصحاب المتاجر الرقمية والمسوقون ورواد الأعمال"
  },
  {
    id: "track-sales",
    title: "المبيعات وفنون الإقناع والتفاوض",
    icon: "Handshake",
    tagline: "تحويل المهتمين إلى مشترين دائمين وسفراء لعلامتك",
    summary: "تدريب تطبيقي على مهارات التفاوض المتقدم، التعامل مع الاعتراضات، وفنون الإغلاق البيعي للصفقات الكبرى والمتوسطة.",
    outcomes: [
      "تقنيات الإقناع المعتمدة على علم النفس السلوكي",
      "بناء سيناريوهات بيعية تذلل اعتراضات الأسعار",
      "إدارة علاقات العملاء وخدمة ما بعد البيع لزيادة التكرار"
    ],
    targetAudience: "مدراء ومسؤولو المبيعات وممثلو خدمة العملاء"
  },
  {
    id: "track-leadership",
    title: "تطوير الذات والقيادة المهنية",
    icon: "Compass",
    tagline: "صناعة العقلية القيادية والانضباط الإداري للنجاح المستمر",
    summary: "محاضرات وورش عمل لتطوير المهارات القيادية، تنظيم الوقت، وبناء عادات النجاح والإنتاجية العالية في بيئة الأعمال.",
    outcomes: [
      "إدارة الضغوط واتخاذ القرارات الاستراتيجية الحاسمة",
      "مهارات التحدث أمام الجمهور والعرض الاحترافي",
      "بناء ثقافة العمل بروح الفريق وتحفيز الإنجاز"
    ],
    targetAudience: "المدراء التنفيذيون، قادة الفرق، والمهنيون الطموحون"
  },
  {
    id: "track-startups",
    title: "ريادة الأعمال ونمو المشاريع الناشئة",
    icon: "Rocket",
    tagline: "من الفكرة إلى التشغيل والربحية والتوسع المدروس",
    summary: "خارطة طريق متكاملة لمؤسسي الشركات الناشئة لبناء نموذج العمل، دراسة الجدوى التسويقية، وتفادي الفخاخ المالية الشائعة.",
    outcomes: [
      "اختبار فكرة المشروع بأقل تكلفة (MVP)",
      "إدارة السيولة وتدفقات النقد التأسيسية",
      "استراتيجيات التوسع وجذب الاستثمارات والشراكات"
    ],
    targetAudience: "رواد الأعمال والمستثمرون الجدد"
  }
];

export const BOOKS_DATA: BookItem[] = [
  {
    id: "book-marketing-strategies",
    slug: "digital-marketing-strategies",
    title: "استراتيجيات التسويق الرقمي",
    subtitle: "دليل عملي لبناء عقلية تسويقية مبدعة تواكب السوق السعودي",
    tagline: "الكتاب التطبيقي الأكثر شمولاً لرواد الأعمال والمسوقين في المملكة 2026",
    description: "كتاب تطبيقي فريد يلخص خبرة أكثر من 20 عاماً للمستشار أحمد الشوا. يشرح بأسلوب سلس ومباشر كيفية بناء منظومة تسويقية رابحة، وصياغة الرسائل المقنعة، واقتناص فرص النمو في بيئة التجارة الرقمية السعودية.",
    price: 185,
    originalPrice: 260,
    type: "PHYSICAL_BOOK",
    coverImage: "/images/book-marketing-strategies.jpg",
    rating: 4.98,
    reviewCount: 520,
    pagesCount: 162,
    isbn: "978-603-8455-35-7",
    stockQuantity: 38,
    isBestseller: true,
    features: [
      "نسخة ورقية فاخرة ومجلدة بغلاف مقوى وتوقيع شخصي من المستشار",
      "توصيل فوري بنفس اليوم داخل جدة وشحن سريع لكافة مدن المملكة",
      "ملحق مجاني: دليل قوالب صناعة المحتوى الإعلاني المعتمدة",
      "خيار الدفع عند الاستلام لمندوب جدة أو الدفع الإلكتروني الآمن"
    ],
    samplePdfUrl: "/samples/marketing-strategies-sample.pdf"
  },
  {
    id: "book-psychology-wealth",
    slug: "sales-psychology-persuasion",
    title: "سيكولوجية الإقناع وفنون المبيعات",
    subtitle: "كيف تحول العميل المتردد إلى مشتري وفيّ لعلامتك التجارية",
    tagline: "أسرار التأثير وبناء الصفقات الناجحة",
    description: "يكشف الكتاب خفايا العقل البشري أثناء اتخاذ قرار الشراء، وكيف تصوغ عروضك بأسلوب يجذب الانتباه ويكسر حواجز الخوف والتردد لدى العميل.",
    price: 155,
    originalPrice: 220,
    type: "PHYSICAL_BOOK",
    coverImage: "/images/book-psychology-sales.jpg",
    rating: 4.9,
    reviewCount: 340,
    pagesCount: 280,
    isbn: "978-603-8455-36-4",
    stockQuantity: 24,
    isBestseller: false,
    features: [
      "طباعة فاخرة مع أمثلة وسيناريوهات تطبيقية من السوق الخليجي",
      "نماذج جاهزة للرد على أشهر 20 اعتراض بيعي",
      "شحن سريع مع أرامكس وسمسا"
    ],
    samplePdfUrl: "/samples/sales-psychology-sample.pdf"
  }
];

export const COURSES_DATA: CourseItem[] = [
  {
    id: "course-growth-marketing-masterclass",
    slug: "growth-marketing-saudi-masterclass",
    title: "ماستر كلاس التسويق الرقمي وهندسة النمو 2026",
    subtitle: "البرنامج التدريبي الشامل المعتمد لبناء حملات إعلانية تحقق عائد ROAS يتجاوز 5x",
    description: "برنامج تدريبي تطبيقي مكثف مسجل بأعلى جودة إنتاجية مع نظام حماية رقمي مشدد DRM. يغطي خطوة بخطوة إعداد مسارات البيع، إطلاق وتتبع الحملات الإعلانية في تيك توك وسناب شات وجوجل، وإدارة الميزانيات باحترافية.",
    price: 1250,
    originalPrice: 2400,
    thumbnail: "/images/course-digital-marketing.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    level: "من المبتدئ إلى المحترف",
    durationHours: 16,
    studentsCount: 4200,
    rating: 4.97,
    reviewCount: 710,
    certificate: true,
    drmProtected: true,
    isFeatured: true,
    badge: "البرنامج الأكثر طلباً للمسوقين",
    whatYouWillLearn: [
      "بناء خطة تسويقية شاملة متوافقة مع سلوك المستهلك السعودي",
      "صناعة إعلانات فيديو تحقق أعلى معدلات نقر (CTR) وتحويل مباشر",
      "إتقان استهداف الشرائح المربحة وتفادي هدر الميزانيات الإعلانية",
      "تحليل مقاييس الأداء واستخدام أدوات التتبع المتقدمة",
      "الحصول على شهادة معتمدة وقوالب عمل حصرية"
    ],
    modules: [
      {
        id: "mod-1",
        title: "الوحدة 1: الأساسيات وعقلية المسوق الاستراتيجي",
        lessons: [
          {
            id: "les-101",
            title: "المقدمة: خارطة طريق النمو التسويقي وأهداف البرنامج",
            durationMinutes: 15,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "شرح شامل لمنهجية البرنامج وكيفية الاستفادة القصوى من الأدوات والنماذج المرفقة.",
            resources: [
              { title: "دليل الدورة التعريفي والخطة الزمنية", type: "PDF", size: "2.1 MB", url: "#" },
              { title: "نموذج التشخيص التسويقي للمشروع", type: "XLSX", size: "1.2 MB", url: "#" }
            ]
          },
          {
            id: "les-102",
            title: "تحليل السوق والمنافسين: كيف تكتشف الفرص الذهبية المهملة",
            durationMinutes: 26,
            isFreePreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            description: "تحليل معمق للبيئة التسويقية واقتناص نقاط الضعف لدى المنافسين.",
            resources: [
              { title: "شيت مصفوفة تحليل المنافسين", type: "XLSX", size: "3.1 MB", url: "#" }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "الوحدة 2: صناعة العروض التي لا تقاوم وإطلاق الحملات",
        lessons: [
          {
            id: "les-201",
            title: "معادلة العرض المغري (Offer Architecture) لرفع التحويل",
            durationMinutes: 32,
            isFreePreview: false,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            description: "كيف تبني عرضاً يجعل الشراء قراراً بديهياً لدى العميل.",
            resources: [
              { title: "قوالب صياغة العروض الخاطفة", type: "PDF", size: "1.7 MB", url: "#" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "course-sales-mastery",
    slug: "sales-psychology-mastery",
    title: "ماستر كلاس سيكولوجية الإغلاق والمبيعات المتقدمة 2026",
    subtitle: "تدريب تطبيقي على فنون الإقناع، معالجة الاعتراضات، وإغلاق الصفقات الكبرى",
    description: "منهجية متكاملة لمدراء ومسؤولي المبيعات ورواد الأعمال لتعلم سيكولوجية المشتري السعودي، بناء نصوص بيعية قوية، وتحويل العملاء المترددين إلى صفقات رابحة.",
    price: 950,
    originalPrice: 1800,
    thumbnail: "/images/course-sales-mastery.jpg",
    trailerVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    level: "المستوى المتقدم",
    durationHours: 12,
    studentsCount: 2850,
    rating: 4.95,
    reviewCount: 430,
    certificate: true,
    drmProtected: true,
    isFeatured: true,
    badge: "الأعلى تقييماً في المبيعات",
    whatYouWillLearn: [
      "فهم الدوافع النفسية لقرار الشراء في بيئة الأعمال السعودية",
      "صياغة سيناريوهات تفاوض وحوار تذلل اعتراضات الأسعار",
      "تقنيات الإغلاق البيعي الفوري (Closing Techniques)",
      "إدارة ومتابعة العملاء المحتملين (Lead Nurturing)",
      "نماذج وعقود بيعية جاهزة للتحميل والتعديل"
    ],
    modules: [
      {
        id: "mod-sales-1",
        title: "الوحدة 1: سيكولوجية العميل والتأثير السلوكي",
        lessons: [
          {
            id: "les-s1",
            title: "المقدمة: كيف يشتري العميل ولماذا يتردد؟",
            durationMinutes: 20,
            isFreePreview: true,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "شرح معمق للمحفزات العاطفية والمنطقية لقرار الشراء.",
            resources: [
              { title: "دليل سيكولوجية المشتري", type: "PDF", size: "2.4 MB", url: "#" }
            ]
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
    title: "جلسة استشارية حضورية خاصة في جدة (60 دقيقة)",
    durationMin: 60,
    price: 950,
    originalPrice: 1500,
    deliveryType: "IN_PERSON_JEDDAH",
    badge: "متاحة حضورياً بمقر المستشار بجدة",
    description: "لقاء حضوري مباشر وجهاً لوجه مع المستشار أحمد الشوا لمراجعة خطتك التسويقية، تشخيص حملاتك الإعلانية، ووضع استراتيجية نمو تنفيذية فورية.",
    features: [
      "مراجعة مسبقة لمتجرك وحساباتك الإعلانية قبل الجلسة",
      "جلسة نقاش مغلقة واستراتيجية وجهاً لوجه بجدة",
      "خطة عمل وتوصيات تنفيذية مطبوعة وموقعة",
      "متابعة استفسارات عبر الواتساب لمدة 14 يوماً"
    ],
    availableSlots: ["11:00 ص", "04:30 م", "06:00 م", "08:30 م"]
  },
  {
    id: "consult-online-remote",
    title: "استشارة تسويقية استراتيجية عن بُعد عبر Zoom (45 دقيقة)",
    durationMin: 45,
    price: 650,
    originalPrice: 1100,
    deliveryType: "ONLINE_REMOTE",
    badge: "أونلاين لجميع مدن المملكة والخليج",
    description: "جلسة مرئية مباشرة ومكثفة عبر Zoom تركز على حل مشكلات ضعف المبيعات، تحسين معدل التحويل، وضبط ميزانيات الإعلانات.",
    features: [
      "تشخيص سريع لمتجرك أو نشاطك التجاري",
      "تسجيل فيديو عالي الدقة للجلسة يرسل لك مباشرة",
      "قوالب عمل ومؤشرات قياس مخصصة لمشروعك",
      "مرونة وسرعة في تنسيق المواعيد"
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
