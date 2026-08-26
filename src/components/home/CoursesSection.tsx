"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Lock,
  Clock,
  Users,
  Star,
  Award,
  Play,
  CheckCircle,
  FileSpreadsheet,
  ArrowLeft,
  ChevronDown
} from "lucide-react";
import { COURSES_DATA, CourseItem } from "@/data/mockData";
import { formatSAR, getAssetPath } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CoursesSection() {
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
    <section id="courses" className="py-24 bg-brand-dark-950 relative overflow-hidden font-ibm" dir="rtl">
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-brand-emerald-300 text-xs sm:text-sm font-bold">
            <GraduationCap className="w-4 h-4 text-brand-amber-400 shrink-0" />
            <span>برامج الماستر كلاس المشفرة DRM</span>
          </div>

          <h2 className="font-alexandria font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.45] pb-1">
            دورات تدريبية <span className="emerald-text-gradient">محمية وعالية القيمة</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-[1.85] max-w-2xl mx-auto">
            محتوى تعليمي تطبيقي مسجل بأعلى معايير الإنتاج، محمي بنظام علامات مائية تفاعلية وتشفير DRM لمنع القرصنة، مع إمكانية الوصول مدى الحياة وتحديثات دورية مجانية.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 hover:border-brand-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-emerald-glow shadow-2xl relative group backdrop-blur-md"
            >
              <div className="space-y-6">
                {/* Course Thumbnail with Video Badge */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark-950 border border-white/10">
                  <img
                    src={getAssetPath(course.thumbnail)}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-brand-dark-950/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-dark-950/80 backdrop-blur-md border border-brand-emerald-500/40 text-[10px] font-bold text-brand-emerald-300 flex items-center gap-1 whitespace-nowrap">
                      <Lock className="w-3 h-3 text-brand-amber-400" />
                      مشفر DRM
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 text-[10px] font-black shadow-sm whitespace-nowrap">
                      {course.badge}
                    </span>
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="absolute inset-0 flex items-center justify-center group/play"
                  >
                    <div className="w-14 h-14 rounded-full bg-brand-amber-400 text-brand-dark-950 flex items-center justify-center shadow-gold-glow group-hover/play:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current mr-0.5" />
                    </div>
                  </Link>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-brand-amber-400" />
                        {course.durationHours} ساعة تدريبية
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Users className="w-3.5 h-3.5 text-brand-emerald-400" />
                        {course.studentsCount} مشترك
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-amber-400 font-bold whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course Title & Description */}
                <div className="space-y-3 text-right">
                  <h3 className="font-alexandria font-bold text-xl sm:text-2xl text-white group-hover:text-brand-emerald-300 transition-colors leading-[1.4] pb-0.5">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                    {course.description}
                  </p>
                </div>

                {/* What you will learn */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-right">
                  <h4 className="text-xs font-bold text-brand-amber-300 flex items-center gap-1.5 pb-1 border-b border-white/5">
                    <Sparkles className="w-3.5 h-3.5" />
                    أبرز ما ستكتسبه في هذا البرنامج:
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {course.whatYouWillLearn.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-brand-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-right w-full sm:w-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-alexandria font-black text-2xl text-brand-amber-300">
                      {formatSAR(course.price)}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {formatSAR(course.originalPrice)}
                    </span>
                  </div>
                  <span className="text-[11px] text-brand-emerald-400 font-semibold block whitespace-nowrap mt-0.5">
                    وصول فوري وشامل لجميع الوحدات والملفات
                  </span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <Link
                    href={`/courses/${course.id}`}
                    className="px-4 py-3 rounded-xl bg-brand-emerald-950/80 hover:bg-brand-emerald-900 text-brand-emerald-300 font-semibold text-xs border border-brand-emerald-500/30 transition-all text-center whitespace-nowrap shrink-0"
                  >
                    تفاصيل المنهاج
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleEnroll(course)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0"
                  >
                    <span>الاشتراك الفوري</span>
                    <ArrowLeft className="w-4 h-4" />
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
