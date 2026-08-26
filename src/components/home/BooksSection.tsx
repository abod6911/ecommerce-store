"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ShoppingBag,
  Truck,
  CheckCircle2,
  FileText,
  Star,
  Eye,
  CreditCard,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import { BOOKS_DATA, BookItem } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { formatSAR } from "@/lib/utils";
import TiltCard from "@/components/animations/TiltCard";
import MagneticButton from "@/components/animations/MagneticButton";
import { getAssetPath } from "@/lib/utils";

export default function BooksSection() {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedBookForPreview, setSelectedBookForPreview] = useState<BookItem | null>(null);

  const handleBuyNow = (book: BookItem) => {
    addItem({
      id: book.id,
      title: book.title,
      price: book.price,
      type: "PHYSICAL_BOOK",
      coverImage: book.coverImage,
    });
    setIsCartOpen(true);
  };

  return (
    <section id="books" className="py-24 bg-brand-dark-900 border-t border-white/10 relative overflow-hidden font-ibm" dir="rtl">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-brand-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber-400/10 border border-brand-amber-400/30 text-brand-amber-300 text-xs sm:text-sm font-bold">
            <BookOpen className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>مؤلفات وإصدارات المستشار أحمد الشوا</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            الكتب الحصرية <span className="gold-text-gradient">والأدلة التطبيقية المطبوعة</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            مؤلفات تطبيقية مطبوعة بغلاف فاخر وموقعة شخصياً، تلخص ممارسات السوق السعودي مع خدمة التوصيل الفوري بجدة والشحن السريع لجميع مناطق المملكة.
          </p>
        </div>

        {/* Books Grid - Spacious 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {BOOKS_DATA.map((book) => (
            <div
              key={book.id}
              className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 hover:border-brand-amber-400/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl backdrop-blur-xl group text-right"
            >
              {/* Top Row: High-Res 3D Tilt Cover + Book Info */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                {/* 3D Tilt Book Cover Box (5 Cols) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative group/book w-full max-w-[210px]">
                    <TiltCard maxTilt={14} glareOpacity={0.32}>
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-brand-amber-400/50 relative bg-brand-dark-950">
                        <img
                          src={getAssetPath(book.coverImage)}
                          alt={`${book.title} - تأليف أحمد الشوا`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </TiltCard>

                    {book.isBestseller && (
                      <span className="absolute -top-2.5 -right-2.5 px-3 py-1 rounded-full bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-black text-[10px] shadow-gold-glow whitespace-nowrap z-30">
                        الأكثر طلباً بالمملكة ⭐
                      </span>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-[11px] text-brand-emerald-400 font-bold flex items-center justify-center gap-1 whitespace-nowrap">
                      <Truck className="w-3.5 h-3.5" />
                      متاح توصيل فوري بجدة
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 whitespace-nowrap">
                      المتبقي: {book.stockQuantity} نسخة فقط (ردمك: {book.isbn})
                    </span>
                  </div>
                </div>

                {/* Book Details (7 Cols) */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-brand-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-brand-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">
                      ({book.rating} / 5 من {book.reviewCount} تقييم)
                    </span>
                  </div>

                  <h3 className="font-alexandria font-bold text-lg sm:text-xl text-white group-hover:text-brand-amber-300 transition-colors leading-[1.4] pb-0.5">
                    {book.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-amber-300/90 leading-relaxed">
                    {book.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                    {book.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                    {book.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Price & Spacious Magnetic Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Price Display */}
                <div className="text-right w-full sm:w-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-alexandria font-black text-2xl text-brand-amber-300">
                      {formatSAR(book.price)}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {formatSAR(book.originalPrice)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block whitespace-nowrap mt-0.5">
                    شامل الضريبة 15% وتغليف الإهداء
                  </span>
                </div>

                {/* Buttons (Protected with whitespace-nowrap and ample padding) */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedBookForPreview(book)}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>معاينة الفهرس</span>
                  </button>

                  <MagneticButton
                    onClick={() => handleBuyNow(book)}
                    variant="primary"
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>طلب النسخة الآن</span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Preview Sample Modal */}
      {selectedBookForPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-brand-dark-900 border border-brand-amber-400/40 p-6 sm:p-8 space-y-6 text-right font-ibm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBookForPreview.coverImage}
                  alt={selectedBookForPreview.title}
                  className="w-12 h-16 rounded-lg object-cover border border-brand-amber-400/40 shrink-0"
                />
                <div>
                  <h3 className="font-alexandria font-bold text-base sm:text-lg text-white">
                    معاينة: {selectedBookForPreview.title}
                  </h3>
                  <p className="text-xs text-brand-amber-300 mt-0.5">
                    تأليف: المستشار أحمد الشوا (ردمك: {selectedBookForPreview.isbn})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBookForPreview(null)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1.5 bg-white/10 rounded-lg shrink-0"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-80 overflow-y-auto pr-2">
              <div className="p-4 rounded-2xl bg-brand-dark-950 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">مقتطف من مقدمة الكتاب:</h4>
                <p className="italic text-slate-300 leading-relaxed">
                  "التسويق ليس مجرد إعلانات ممولة تنفق فيها الأموال؛ بل هو هندسة دقيقة لسيكولوجية العميل، وفهم عميق للفرص التسويقية في السوق السعودي المتسارع. هذا الكتاب كُتب ليكون دليلك العملي خطوة بخطوة..."
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">فصول ومحتويات الكتاب:</h4>
                <ul className="space-y-2 text-xs">
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>الفصل الأول: عقلية المسوق الذكي وتفكيك سلوك المستهلك السعودي</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>الفصل الثاني: صناعة العروض التي لا تقاوم وهندسة القيمة</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>الفصل الثالث: إتقان الحملات الإعلانية في سناب شات وتيك توك وجوجل</span>
                  </li>
                  <li className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-brand-amber-400/20 text-brand-amber-300 flex items-center justify-center font-bold text-[10px]">4</span>
                    <span>الفصل الرابع: نماذج إغلاق المبيعات وخدمة ما بعد البيع</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-alexandria font-bold text-brand-amber-300 text-base">
                {formatSAR(selectedBookForPreview.price)}
              </span>
              <button
                onClick={() => {
                  handleBuyNow(selectedBookForPreview);
                  setSelectedBookForPreview(null);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs shadow-gold-glow whitespace-nowrap"
              >
                طلب النسخة الورقية الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
