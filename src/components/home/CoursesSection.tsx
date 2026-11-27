"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { CourseItem } from "@/data/mockData";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatSAR, getAssetPath } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CoursesSection() {
  const { content } = useSiteContent();
  const coursesList = content.courses;
  const { addItem } = useCart();

  const handleEnroll = (course: CourseItem) => {
    addItem({
      id: course.id,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      type: "COURSE",
      coverImage: course.thumbnail,
    });
  };

  return (
    <section id="courses" className="py-20 sm:py-24 bg-brand-dark-950 border-t border-white/[0.06] font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-amber-300">
            <GraduationCap className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>البرامج التدريبية المعتمدة</span>
          </div>

          <h2 className="font-alexandria font-bold text-2xl sm:text-3xl md:text-4xl text-[#F5F2EB] leading-[1.45]">
            الدورات <span className="gold-text-gradient">التدريبية التخصصية</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 leading-[1.85]">
            برامج تدريبية عملية في مهارات البيع، التسويق عبر منصات التواصل، وتأهيل المدربين والمؤلفين.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesList.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] hover:border-brand-amber-500/35 p-5 sm:p-6 flex flex-col justify-between transition-colors overflow-hidden group"
            >
              <div className="space-y-5">
                {/* Course Thumbnail */}
                <Link
                  href={`/courses/${course.id}`}
                  className="block relative aspect-video rounded-xl overflow-hidden bg-brand-dark-950 border border-white/[0.06]"
                >
                  <img
                    src={getAssetPath(course.thumbnail)}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070909]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-stone-200">
                    <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-brand-amber-400" />
                      {course.durationHours} ساعات تدريبية
                    </span>
                    <span className="text-[11px] font-medium text-brand-amber-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {course.badge}
                    </span>
                  </div>
                </Link>

                {/* Title & Description */}
                <div className="space-y-2 text-right">
                  <h3 className="font-alexandria font-bold text-lg sm:text-xl text-[#F5F2EB] group-hover:text-brand-amber-300 transition-colors leading-[1.45]">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-[1.8]">
                    {course.description}
                  </p>
                </div>

                {/* Outcomes */}
                <ul className="space-y-2 pt-3 border-t border-white/[0.06] text-xs text-stone-300">
                  {course.whatYouWillLearn.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Price & 2 Clean Buttons */}
              <div className="pt-5 mt-5 border-t border-white/[0.08] flex flex-col gap-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-alexandria font-bold text-xl text-brand-amber-300">
                      {formatSAR(course.price)}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-xs text-stone-500 line-through">
                        {formatSAR(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">
                    شهادة إتمام معتمدة
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <Link
                    href={`/courses/${course.id}`}
                    className="px-3 py-2.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-stone-200 border border-white/15 font-semibold text-xs text-center flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    التفاصيل
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleEnroll(course)}
                    className="px-3 py-2.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] font-alexandria font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>التسجيل الآن</span>
                    <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
