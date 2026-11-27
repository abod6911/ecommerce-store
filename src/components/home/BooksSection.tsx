"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Eye,
  X
} from "lucide-react";
import { BookItem } from "@/data/mockData";
import { useSiteContent } from "@/context/SiteContentContext";
import { useCart } from "@/context/CartContext";
import { formatSAR, getAssetPath } from "@/lib/utils";

export default function BooksSection() {
  const { content } = useSiteContent();
  const booksList = content.books;
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
    <section id="books" className="py-20 sm:py-24 bg-brand-dark-900 border-t border-white/[0.06] relative font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
            <BookOpen className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>إصدارات ومؤلفات المستشار</span>
          </div>

          <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
            الكتاب التطبيقي <span className="gold-text-gradient">المطبوع</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-[1.85]">
            دليل عملي مطبوع يلخص خلاصة التجربة الميدانية في التسويق الرقمي وبناء الخطط البيعية في السوق السعودي.
          </p>
        </div>

        {/* Books Grid */}
        <div className={booksList.length === 1 ? "max-w-4xl mx-auto" : "grid grid-cols-1 lg:grid-cols-2 gap-8"}>
          {booksList.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] hover:border-brand-amber-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors text-right"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-7 items-center">
                {/* Clean Book Cover */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-[210px] aspect-[3/4] rounded-xl overflow-hidden border border-brand-amber-500/30 bg-brand-dark-950 shadow-card-luxury">
                    <img
                      src={getAssetPath(book.coverImage)}
                      alt={`${book.title} - تأليف أحمد الشوا`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-3.5 text-center space-y-1">
                    <span className="text-[11px] text-brand-emerald-300 font-medium flex items-center justify-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      توصيل داخل جدة وشحن لجميع المدن
                    </span>
                    <span className="text-[11px] text-stone-500 block font-mono">
                      ISBN: {book.isbn}
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <h3 className="font-alexandria font-bold text-xl sm:text-2xl text-[#F5F2EB] leading-[1.4]">
                      {book.title}
                    </h3>
                    <p className="text-xs font-medium text-brand-amber-300 mt-1.5 leading-relaxed">
                      {book.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-[1.85]">
                    {book.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/[0.07] text-xs text-stone-300">
                    {book.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-right w-full sm:w-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-alexandria font-bold text-2xl text-brand-amber-300">
                      {formatSAR(book.price)}
                    </span>
                    {book.originalPrice > book.price && (
                      <span className="text-xs text-stone-500 line-through">
                        {formatSAR(book.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400 block mt-0.5">
                    شامل ضريبة القيمة المضافة ({book.pagesCount} صفحة)
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedBookForPreview(book)}
                    className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-stone-200 border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>معاينة الفهرس</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBuyNow(book)}
                    className="px-6 py-2.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>اطلب نسختك</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Preview Modal */}
      {selectedBookForPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-brand-dark-900 border border-white/15 p-6 sm:p-8 space-y-6 text-right font-ibm">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={getAssetPath(selectedBookForPreview.coverImage)}
                  alt={selectedBookForPreview.title}
                  className="w-12 h-16 rounded-lg object-cover border border-white/15 shrink-0"
                />
                <div>
                  <h3 className="font-alexandria font-bold text-base sm:text-lg text-[#F5F2EB]">
                    {selectedBookForPreview.title}
                  </h3>
                  <p className="text-xs text-brand-amber-300 mt-0.5">
                    تأليف: أحمد الشوا — {selectedBookForPreview.pagesCount} صفحة
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBookForPreview(null)}
                className="p-2 text-stone-400 hover:text-white bg-white/5 rounded-lg"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-80 overflow-y-auto pr-1">
              <div className="p-4 rounded-xl bg-brand-dark-950 border border-white/[0.06] space-y-2">
                <h4 className="font-bold text-[#F5F2EB] text-sm">مقدمة الكتاب:</h4>
                <p className="text-stone-300 leading-relaxed">
                  &quot;التسويق الفعال لا يقوم على الإنفاق العشوائي في الإعلانات، بل على فهم دقيق لسلوك العميل وصياغة رسالة واضحة تلامس احتياجاته الفعلية في السوق.&quot;
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#F5F2EB] text-sm">أبرز محاور الكتاب:</h4>
                <ul className="space-y-2 text-xs">
                  <li className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2.5">
                    <span className="text-brand-amber-400 font-bold">01</span>
                    <span>بناء العقلية التسويقية وفهم سلوك المستهلك السعودي</span>
                  </li>
                  <li className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2.5">
                    <span className="text-brand-amber-400 font-bold">02</span>
                    <span>صياغة العروض التسويقية وإبراز القيمة التنافسية</span>
                  </li>
                  <li className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2.5">
                    <span className="text-brand-amber-400 font-bold">03</span>
                    <span>تخطيط وإدارة الحملات عبر منصات التواصل الاجتماعي</span>
                  </li>
                  <li className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2.5">
                    <span className="text-brand-amber-400 font-bold">04</span>
                    <span>مهارات الإقناع، إغلاق المبيعات، وبناء ولاء العملاء</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-alexandria font-bold text-brand-amber-300 text-lg">
                {formatSAR(selectedBookForPreview.price)}
              </span>
              <button
                onClick={() => {
                  handleBuyNow(selectedBookForPreview);
                  setSelectedBookForPreview(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-bold text-xs whitespace-nowrap transition-colors"
              >
                إضافة إلى السلة
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
