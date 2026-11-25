"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSiteContent, CustomBlockItem } from "@/context/SiteContentContext";
import { BookItem, CourseItem, TrainingTrackItem } from "@/data/mockData";
import {
  Save,
  Plus,
  Trash2,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Briefcase,
  Calendar,
  Layout,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type TabKey = "hero" | "books" | "courses" | "services" | "consultations" | "custom";

export default function AdminContentManagerPage() {
  const {
    content,
    updateHero,
    updateConsultationPricing,
    setBooks,
    setCourses,
    setServices,
    setCustomBlocks,
    resetToDefaults,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const notifySaved = (msg = "تم حفظ التعديلات وتطبيقها على الموقع فوراً ✨") => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  // Add New Book
  const handleAddBook = () => {
    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      slug: `book-${Date.now()}`,
      title: "عنوان الكتاب الجديد",
      subtitle: "وصف مختصر للكتاب",
      tagline: "إصدار جديد",
      description: "اكتب وصف الكتاب وتفاصيله هنا...",
      price: 50,
      originalPrice: 50,
      type: "PHYSICAL_BOOK",
      coverImage: "/images/book-marketing-strategies.jpg",
      rating: 5,
      reviewCount: 0,
      pagesCount: 150,
      isbn: "978-603-0000-00-0",
      stockQuantity: 50,
      isBestseller: false,
      features: ["نسخة ورقية فاخرة", "شحن سريع لكافة مدن المملكة"],
      samplePdfUrl: "#",
    };
    setBooks([...content.books, newBook]);
    notifySaved("تمت إضافة كتاب جديد بنجاح!");
  };

  // Add New Course
  const handleAddCourse = () => {
    const newCourse: CourseItem = {
      id: `course-${Date.now()}`,
      slug: `course-${Date.now()}`,
      title: "اسم الدورة التدريبية الجديدة",
      subtitle: "نبذة مختصرة عن الدورة",
      description: "اكتب تفاصيل ومحاور الدورة التدريبية هنا...",
      price: 400,
      originalPrice: 400,
      thumbnail: "/images/course-digital-marketing.jpg",
      trailerVideoUrl: "",
      level: "شامل لجميع المستويات",
      durationHours: 6,
      studentsCount: 0,
      rating: 5,
      reviewCount: 0,
      certificate: true,
      drmProtected: true,
      isFeatured: false,
      badge: "دورة جديدة",
      whatYouWillLearn: ["مهارة عملية 1", "مهارة عملية 2", "مهارة عملية 3"],
      modules: [],
    };
    setCourses([...content.courses, newCourse]);
    notifySaved("تمت إضافة دورة تدريبية جديدة بنجاح!");
  };

  // Add New Service
  const handleAddService = () => {
    const newService: TrainingTrackItem = {
      id: `service-${Date.now()}`,
      title: "اسم الخدمة الجديدة",
      icon: "Megaphone",
      tagline: "وصف مختصر للخدمة",
      summary: "اكتب تفاصيل الخدمة وما تقدمه للعميل هنا...",
      outcomes: ["ميزة 1", "ميزة 2"],
      targetAudience: "أصحاب المشاريع والشركات",
    };
    setServices([...content.services, newService]);
    notifySaved("تمت إضافة خدمة جديدة بنجاح!");
  };

  // Add Custom Section Block
  const handleAddCustomBlock = () => {
    const newBlock: CustomBlockItem = {
      id: `block-${Date.now()}`,
      badge: "عرض خاص / إعلان",
      title: "عنوان القسم الجديد",
      description: "اكتب النص الذي ترغب في ظهوره للزوار في الصفحة الرئيسية...",
      ctaLabel: "احجز الآن",
      ctaHref: "/#booking",
    };
    setCustomBlocks([...content.customBlocks, newBlock]);
    notifySaved("تمت إضافة قسم جديد في الصفحة الرئيسية!");
  };

  const TABS: { key: TabKey; label: string; icon: any }[] = [
    { key: "hero", label: "الواجهة والبيانات الأساسية", icon: Layout },
    { key: "books", label: `الكتب (${content.books.length})`, icon: BookOpen },
    { key: "courses", label: `الدورات (${content.courses.length})`, icon: GraduationCap },
    { key: "services", label: `الخدمات (${content.services.length})`, icon: Briefcase },
    { key: "consultations", label: "الاستشارات والأسعار", icon: Calendar },
    { key: "custom", label: `أقسام مضافة (${content.customBlocks.length})`, icon: Sparkles },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen font-ibm text-right" dir="rtl">
      <AdminHeader
        title="إدارة وتعديل محتوى الموقع بالكامل (CMS)"
        subtitle="عدّل النصوص، الأسعار، الكتب، الدورات، والخدمات أو أضف أقساماً جديدة فوراً"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Action Bar & Save Toast */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-dark-900 border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-brand-emerald-400 shrink-0" />
            <span>أي تعديل أو إضافة تحفظها هنا تنعكس مباشرة على صفحات الموقع.</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm("هل أنت متأكد من استعادة جميع النصوص والأسعار الافتراضية؟")) {
                resetToDefaults();
                notifySaved("تمت استعادة الإعدادات الافتراضية بنجاح.");
              }
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>
        </div>

        {savedNotice && (
          <div className="p-3.5 rounded-2xl bg-brand-emerald-500/15 border border-brand-emerald-400/40 text-brand-emerald-300 text-xs font-bold flex items-center gap-2">
            <Save className="w-4 h-4 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-emerald-950 text-brand-amber-300 border-brand-amber-400/50 shadow-gold-glow"
                    : "bg-brand-dark-900 text-slate-300 border-white/10 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: HERO & PROFILE */}
        {activeTab === "hero" && (
          <div className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-5">
            <h3 className="font-alexandria font-bold text-base text-white border-b border-white/10 pb-3">
              تعديل نصوص الواجهة الرئيسية والبيانات الشخصية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">العنوان الرئيسي (السطر الأول)</label>
                <input
                  type="text"
                  value={content.hero.headlineLine1}
                  onChange={(e) => updateHero({ headlineLine1: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">العنوان الرئيسي (السطر الثاني الذهبي)</label>
                <input
                  type="text"
                  value={content.hero.headlineLine2}
                  onChange={(e) => updateHero({ headlineLine2: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">الوصف أسفل العنوان</label>
                <textarea
                  rows={2}
                  value={content.hero.subheadline}
                  onChange={(e) => updateHero({ subheadline: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">شارة الاعتماد (TVTC)</label>
                <input
                  type="text"
                  value={content.hero.accreditation}
                  onChange={(e) => updateHero({ accreditation: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">الشعار (Slogan)</label>
                <input
                  type="text"
                  value={content.hero.slogan}
                  onChange={(e) => updateHero({ slogan: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">نبذة عن المستشار (قسم من أنا)</label>
                <textarea
                  rows={3}
                  value={content.hero.aboutBio}
                  onChange={(e) => updateHero({ aboutBio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => notifySaved()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التغييرات</span>
            </button>
          </div>
        )}

        {/* TAB 2: BOOKS */}
        {activeTab === "books" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-alexandria font-bold text-base text-white">إدارة الكتب المطبوعة</h3>
              <button
                type="button"
                onClick={handleAddBook}
                className="px-4 py-2.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة كتاب جديد</span>
              </button>
            </div>

            {content.books.map((book, idx) => (
              <div key={book.id} className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-sm text-brand-amber-300">كتاب #{idx + 1}: {book.title}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setBooks(content.books.filter((b) => b.id !== book.id));
                      notifySaved("تم حذف الكتاب.");
                    }}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">عنوان الكتاب</label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => {
                        const updated = [...content.books];
                        updated[idx] = { ...book, title: e.target.value };
                        setBooks(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">السعر (ر.س)</label>
                    <input
                      type="number"
                      value={book.price}
                      onChange={(e) => {
                        const updated = [...content.books];
                        updated[idx] = { ...book, price: Number(e.target.value) || 0 };
                        setBooks(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">رابط الصورة</label>
                    <input
                      type="text"
                      value={book.coverImage}
                      onChange={(e) => {
                        const updated = [...content.books];
                        updated[idx] = { ...book, coverImage: e.target.value };
                        setBooks(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-3">
                    <label className="text-xs text-slate-400">الوصف</label>
                    <textarea
                      rows={2}
                      value={book.description}
                      onChange={(e) => {
                        const updated = [...content.books];
                        updated[idx] = { ...book, description: e.target.value };
                        setBooks(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: COURSES */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-alexandria font-bold text-base text-white">إدارة الدورات التدريبية</h3>
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-4 py-2.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة دورة جديدة</span>
              </button>
            </div>

            {content.courses.map((course, idx) => (
              <div key={course.id} className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-sm text-brand-amber-300">دورة #{idx + 1}: {course.title}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCourses(content.courses.filter((c) => c.id !== course.id));
                      notifySaved("تم حذف الدورة.");
                    }}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400">اسم الدورة</label>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => {
                        const updated = [...content.courses];
                        updated[idx] = { ...course, title: e.target.value };
                        setCourses(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">السعر (ر.س)</label>
                    <input
                      type="number"
                      value={course.price}
                      onChange={(e) => {
                        const updated = [...content.courses];
                        updated[idx] = { ...course, price: Number(e.target.value) || 0 };
                        setCourses(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">عدد الساعات</label>
                    <input
                      type="number"
                      value={course.durationHours}
                      onChange={(e) => {
                        const updated = [...content.courses];
                        updated[idx] = { ...course, durationHours: Number(e.target.value) || 1 };
                        setCourses(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-4">
                    <label className="text-xs text-slate-400">وصف الدورة</label>
                    <textarea
                      rows={2}
                      value={course.description}
                      onChange={(e) => {
                        const updated = [...content.courses];
                        updated[idx] = { ...course, description: e.target.value };
                        setCourses(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-alexandria font-bold text-base text-white">إدارة الخدمات التسويقية</h3>
              <button
                type="button"
                onClick={handleAddService}
                className="px-4 py-2.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>

            {content.services.map((service, idx) => (
              <div key={service.id} className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-sm text-brand-amber-300">خدمة #{idx + 1}: {service.title}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setServices(content.services.filter((s) => s.id !== service.id));
                      notifySaved("تم حذف الخدمة.");
                    }}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">اسم الخدمة</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx] = { ...service, title: e.target.value };
                        setServices(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">العنوان الفرعي (Tagline)</label>
                    <input
                      type="text"
                      value={service.tagline}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx] = { ...service, tagline: e.target.value };
                        setServices(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400">وصف الخدمة</label>
                    <textarea
                      rows={2}
                      value={service.summary}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx] = { ...service, summary: e.target.value };
                        setServices(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: CONSULTATIONS PRICING */}
        {activeTab === "consultations" && (
          <div className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-5">
            <h3 className="font-alexandria font-bold text-base text-white border-b border-white/10 pb-3">
              تسعير الاستشارات
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">السعر الأساسي للاستشارة (ر.س)</label>
                <input
                  type="number"
                  value={content.consultationPricing.basePrice}
                  onChange={(e) =>
                    updateConsultationPricing({ basePrice: Number(e.target.value) || 0 })
                  }
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">سعر كل ساعة إضافية (ر.س)</label>
                <input
                  type="number"
                  value={content.consultationPricing.extraHourPrice}
                  onChange={(e) =>
                    updateConsultationPricing({ extraHourPrice: Number(e.target.value) || 0 })
                  }
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">المدة الأساسية (مثال: ساعتين)</label>
                <input
                  type="text"
                  value={content.consultationPricing.baseDurationLabel}
                  onChange={(e) =>
                    updateConsultationPricing({ baseDurationLabel: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => notifySaved()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow"
            >
              <Save className="w-4 h-4" />
              <span>حفظ تسعير الاستشارات</span>
            </button>
          </div>
        )}

        {/* TAB 6: CUSTOM ADDED SECTIONS */}
        {activeTab === "custom" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-alexandria font-bold text-base text-white">
                إضافة أقسام أو عروض جديدة للصفحة الرئيسية
              </h3>
              <button
                type="button"
                onClick={handleAddCustomBlock}
                className="px-4 py-2.5 rounded-xl bg-brand-emerald-600 hover:bg-brand-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قسم جديد</span>
              </button>
            </div>

            {content.customBlocks.length === 0 ? (
              <div className="p-8 rounded-3xl bg-brand-dark-900 border border-white/10 text-center text-xs text-slate-400">
                لا توجد أقسام إضافية حالياً. اضغط على &quot;إضافة قسم جديد&quot; لإضافة إعلان أو خدمة أو عرض خاص في الصفحة الرئيسية.
              </div>
            ) : (
              content.customBlocks.map((block, idx) => (
                <div key={block.id} className="rounded-3xl bg-brand-dark-900 border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-bold text-sm text-brand-amber-300">قسم #{idx + 1}: {block.title}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomBlocks(content.customBlocks.filter((b) => b.id !== block.id));
                        notifySaved("تم حذف القسم.");
                      }}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">الشارة العلوية (Badge)</label>
                      <input
                        type="text"
                        value={block.badge}
                        onChange={(e) => {
                          const updated = [...content.customBlocks];
                          updated[idx] = { ...block, badge: e.target.value };
                          setCustomBlocks(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">العنوان</label>
                      <input
                        type="text"
                        value={block.title}
                        onChange={(e) => {
                          const updated = [...content.customBlocks];
                          updated[idx] = { ...block, title: e.target.value };
                          setCustomBlocks(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-xs text-slate-400">النص التفصيلي</label>
                      <textarea
                        rows={2}
                        value={block.description}
                        onChange={(e) => {
                          const updated = [...content.customBlocks];
                          updated[idx] = { ...block, description: e.target.value };
                          setCustomBlocks(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">نص الزر</label>
                      <input
                        type="text"
                        value={block.ctaLabel}
                        onChange={(e) => {
                          const updated = [...content.customBlocks];
                          updated[idx] = { ...block, ctaLabel: e.target.value };
                          setCustomBlocks(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">رابط الزر</label>
                      <input
                        type="text"
                        value={block.ctaHref}
                        onChange={(e) => {
                          const updated = [...content.customBlocks];
                          updated[idx] = { ...block, ctaHref: e.target.value };
                          setCustomBlocks(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-brand-dark-950 border border-white/15 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
