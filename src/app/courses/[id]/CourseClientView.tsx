"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Play,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Download,
  Share2,
  Award,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Shield,
  ArrowRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import { COURSES_DATA, CourseItem, CourseLesson } from "@/data/mockData";
import ProtectedVideoPlayer from "@/components/video/ProtectedVideoPlayer";
import { formatSAR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function CourseClientView({ initialCourseId }: { initialCourseId?: string }) {
  const courseId = initialCourseId || "digital-marketing-masterclass";
  const { addItem } = useCart();

  // Find course or fallback to first course
  const course: CourseItem =
    COURSES_DATA.find((c) => c.id === courseId || c.slug === courseId) || COURSES_DATA[0];

  const [activeLesson, setActiveLesson] = useState<CourseLesson>(
    course.modules[0]?.lessons[0] || {
      id: "les-1",
      title: "مقدمة البرنامج وقواعد الانطلاق",
      durationMinutes: 15,
      isFreePreview: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "شرح شامل لأهداف الدورة وكيفية الاستفادة القصوى من الأدوات والنماذج المرفقة.",
      resources: []
    }
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>(["les-101"]);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discussion">("overview");
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({
    [course.modules[0]?.id || "mod-1"]: true,
  });

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPct = Math.round((completedLessons.length / (totalLessons || 1)) * 100);

  return (
    <div className="min-h-screen bg-brand-dark-950 pt-28 pb-20 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 text-right">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-brand-amber-300 transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/#courses" className="hover:text-brand-amber-300 transition-colors">
              الدورات المحمية
            </Link>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-xs">{course.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/30 text-brand-emerald-400 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-brand-amber-400" />
              بث مشفر DRM وعلامة مائية حية
            </span>
          </div>
        </div>

        {/* Main Grid: Player + Syllabus Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video & Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 text-right">
            {/* Protected Video Player */}
            <ProtectedVideoPlayer
              key={activeLesson.id}
              videoUrl={activeLesson.videoUrl}
              title={activeLesson.title}
              onProgress={(seconds) => {
                if (seconds > 60 && !completedLessons.includes(activeLesson.id)) {
                  toggleComplete(activeLesson.id);
                }
              }}
            />

            {/* Lesson Title & Controls */}
            <div className="p-6 rounded-3xl bg-brand-dark-850 border border-brand-emerald-500/20 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-amber-400">
                      الدرس الحالي • {activeLesson.durationMinutes} دقيقة
                    </span>
                    {activeLesson.isFreePreview && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40 text-[10px] font-bold">
                        معاينة مجانية متاحة
                      </span>
                    )}
                  </div>
                  <h1 className="font-alexandria font-bold text-xl sm:text-2xl text-white">
                    {activeLesson.title}
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => toggleComplete(activeLesson.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
                    completedLessons.includes(activeLesson.id)
                      ? "bg-brand-emerald-500/20 border border-brand-emerald-500/50 text-brand-emerald-300"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      completedLessons.includes(activeLesson.id)
                        ? "text-brand-emerald-400 fill-brand-emerald-400/20"
                        : "text-slate-400"
                    }`}
                  />
                  <span>
                    {completedLessons.includes(activeLesson.id)
                      ? "تم إكمال الدرس"
                      : "تحديد كمكتمل"}
                  </span>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
                    activeTab === "overview"
                      ? "border-brand-amber-400 text-brand-amber-300"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  نظرة عامة والملخص
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("resources")}
                  className={`pb-2.5 px-3 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === "resources"
                      ? "border-brand-amber-400 text-brand-amber-300"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <span>الملفات والنماذج المرفقة</span>
                  <span className="w-4 h-4 rounded-full bg-brand-emerald-500/20 text-brand-emerald-300 text-[10px] flex items-center justify-center font-bold">
                    {activeLesson.resources?.length || 2}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("discussion")}
                  className={`pb-2.5 px-3 font-bold border-b-2 transition-colors ${
                    activeTab === "discussion"
                      ? "border-brand-amber-400 text-brand-amber-300"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  الأسئلة والنقاش
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-4 pt-2 text-sm text-slate-300 leading-relaxed">
                  <p>{activeLesson.description}</p>
                  <div className="p-4 rounded-2xl bg-brand-dark-950/60 border border-white/10 space-y-2">
                    <h4 className="font-alexandria font-bold text-xs text-brand-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>أهم المخرجات التطبيقية لهذا الدرس:</span>
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-1.5 pr-4 list-disc">
                      <li>تحديد نقاط القوة ونقاط الاحتكاك في المسار الإعلاني الحالي.</li>
                      <li>تطبيق معادلة مضاعفة معدل التحويل (CR) بدون رفع ميزانية الإعلانات.</li>
                      <li>الحصول على نسخة معتمدة من خطة الإطلاق السريع للأسبوع الأول.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-brand-dark-950/80 border border-white/10 flex items-center justify-between gap-3 hover:border-brand-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-brand-emerald-400 flex items-center justify-center shrink-0">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">
                          نموذج إكسل لحساب تكلفة الاقتناء (CAC & ROAS Simulator)
                        </h4>
                        <span className="text-[10px] text-slate-400">Excel Spreadsheet • 1.4 MB</span>
                      </div>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("تم بدء تحميل نموذج الإكسل بنجاح.");
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-emerald-500/20 text-brand-emerald-300 border border-white/10 hover:border-brand-emerald-500/40 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-dark-950/80 border border-white/10 flex items-center justify-between gap-3 hover:border-brand-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-amber-500/10 text-brand-amber-400 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">
                          دليل نصوص الإقناع وسيكولوجية الإغلاق السريع (PDF)
                        </h4>
                        <span className="text-[10px] text-slate-400">PDF Guide • 3.8 MB</span>
                      </div>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("تم بدء تحميل الدليل بصيغة PDF بنجاح.");
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-amber-500/20 text-brand-amber-300 border border-white/10 hover:border-brand-amber-500/40 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "discussion" && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-brand-dark-950/80 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">اسأل المستشار وفريق التدريب</span>
                      <span className="text-slate-400 text-[11px]">متاح لجميع المشتركين</span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="اكتب استفسارك أو الحالة التسويقية لمشروعك هنا..."
                      className="w-full p-3 rounded-xl bg-brand-dark-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => alert("تم إرسال سؤالك للمستشار وسيرد عليك قريباً.")}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
                      >
                        إرسال السؤال ⚡
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 text-right">
            {/* Progress Card */}
            <div className="p-5 rounded-3xl bg-brand-dark-850 border border-brand-emerald-500/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">نسبة إنجاز الدورة</span>
                <span className="font-bold font-mono text-brand-amber-300">{progressPct}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-brand-dark-950 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-brand-emerald-500 to-brand-amber-400 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                أكملت {completedLessons.length} من أصل {totalLessons} درس تطبيقي
              </p>
            </div>

            {/* Modules Accordion */}
            <div className="p-4 rounded-3xl bg-brand-dark-850 border border-white/10 shadow-xl space-y-3">
              <h3 className="font-alexandria font-bold text-sm text-white px-2 pt-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-amber-400" />
                <span>محتوى البرنامج التدريبي</span>
              </h3>

              <div className="space-y-2.5">
                {course.modules.map((mod, modIdx) => {
                  const isOpen = openModules[mod.id] ?? false;
                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl bg-brand-dark-950/70 border border-white/10 overflow-hidden"
                    >
                      {/* Module Header */}
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className="w-full p-3.5 flex items-center justify-between text-right hover:bg-white/5 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-brand-amber-400 block">
                            الوحدة {modIdx + 1}
                          </span>
                          <h4 className="font-alexandria font-bold text-xs text-white">
                            {mod.title}
                          </h4>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {/* Lessons List */}
                      {isOpen && (
                        <div className="p-2 space-y-1 bg-black/20 border-t border-white/5">
                          {mod.lessons.map((lesson) => {
                            const isCurrent = activeLesson.id === lesson.id;
                            const isDone = completedLessons.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                onClick={() => setActiveLesson(lesson)}
                                className={`w-full p-2.5 rounded-xl text-right flex items-center justify-between gap-3 transition-all ${
                                  isCurrent
                                    ? "bg-brand-amber-400/15 border border-brand-amber-400/40 text-brand-amber-300"
                                    : "hover:bg-white/5 text-slate-300"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-brand-emerald-400 shrink-0" />
                                  ) : (
                                    <Play
                                      className={`w-3.5 h-3.5 shrink-0 ${
                                        isCurrent ? "text-brand-amber-400 fill-brand-amber-400" : "text-slate-500"
                                      }`}
                                    />
                                  )}
                                  <span className="text-xs truncate font-medium">
                                    {lesson.title}
                                  </span>
                                </div>

                                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                  {lesson.durationMinutes} د
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certification Badge */}
            <div className="p-4 rounded-2xl bg-brand-emerald-950/40 border border-brand-emerald-500/30 text-right space-y-2">
              <div className="flex items-center gap-2 text-brand-emerald-300 font-bold text-xs">
                <Award className="w-4 h-4 text-brand-amber-400" />
                <span>شهادة إتمام معتمدة فور إنهاء البرنامج</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تصدر شهادة رقمية برقم تسلسلي موثق ومعتمد من المستشار أحمد الشوا بمجرد إتمامك 100% من الدروس.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
