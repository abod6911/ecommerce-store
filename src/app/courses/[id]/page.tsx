"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const { addItem } = useCart();

  // Find course or fallback to first course
  const course: CourseItem = COURSES_DATA.find((c) => c.id === courseId || c.slug === courseId) || COURSES_DATA[0];

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
              lessonNumber={activeLesson.title}
              posterImage={course.thumbnail}
              onEnded={() => {
                if (!completedLessons.includes(activeLesson.id)) {
                  setCompletedLessons((prev) => [...prev, activeLesson.id]);
                }
              }}
            />

            {/* Current Lesson Title & Complete Toggle */}
            <div className="p-6 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-amber-400/20 text-brand-amber-300">
                      الدرس الحالي
                    </span>
                    <span className="text-xs text-slate-400">
                      المدة: {activeLesson.durationMinutes} دقيقة
                    </span>
                  </div>
                  <h1 className="font-alexandria font-bold text-xl sm:text-2xl text-white leading-snug">
                    {activeLesson.title}
                  </h1>
                </div>

                <button
                  onClick={() => toggleComplete(activeLesson.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                    completedLessons.includes(activeLesson.id)
                      ? "bg-brand-emerald-500/20 text-brand-emerald-300 border border-brand-emerald-500/40"
                      : "bg-brand-emerald-600 text-brand-dark-950 shadow-emerald-glow hover:brightness-110"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedLessons.includes(activeLesson.id) ? "تم إكمال الدرس ✓" : "تحديد كمكتمل"}
                  </span>
                </button>
              </div>

              {/* Tabs Menu */}
              <div className="flex items-center gap-3 border-b border-white/10 pt-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2.5 text-xs font-bold transition-all relative ${
                    activeTab === "overview"
                      ? "text-brand-amber-300 border-b-2 border-brand-amber-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  نظرة عامة وملاحظات
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`pb-2.5 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
                    activeTab === "resources"
                      ? "text-brand-amber-300 border-b-2 border-brand-amber-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>الملفات والمرفقات ({activeLesson.resources?.length || 2})</span>
                </button>
                <button
                  onClick={() => setActiveTab("discussion")}
                  className={`pb-2.5 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
                    activeTab === "discussion"
                      ? "text-brand-amber-300 border-b-2 border-brand-amber-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>الأسئلة والنقاش</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTab === "overview" && (
                  <div className="space-y-3">
                    <p>{activeLesson.description || course.description}</p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <h4 className="font-bold text-white text-xs sm:text-sm">💡 إرشادات المستشار أحمد الشوا للمحاضرة:</h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        احرص على تنزيل نموذج الإكسل المرفق قبل متابعة الشرح العملي لتطبيق الأرقام وحساب هوامش الأمان والمخاطر خطوة بخطوة.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="space-y-2">
                    <p className="text-slate-400 mb-2">الملفات المرفقة للتحميل المباشر للطلاب المسجلين:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-6 h-6 text-brand-emerald-400" />
                          <div>
                            <h5 className="font-bold text-white text-xs">نموذج_إكسل_الهندسة_المالية_2026.xlsx</h5>
                            <span className="text-[10px] text-slate-400">حجم الملف: 2.8 MB</span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert("جاري تنزيل ملف الإكسل المعتمد...")}
                          className="p-2 rounded-lg bg-brand-emerald-500/20 text-brand-emerald-400 hover:bg-brand-emerald-500/40"
                          title="تنزيل"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-6 h-6 text-brand-amber-400" />
                          <div>
                            <h5 className="font-bold text-white text-xs">ملخص_الوحدة_ودليل_التحوط.pdf</h5>
                            <span className="text-[10px] text-slate-400">حجم الملف: 1.4 MB</span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert("جاري تنزيل ملخص الدورة PDF...")}
                          className="p-2 rounded-lg bg-brand-amber-400/20 text-brand-amber-300 hover:bg-brand-amber-400/40"
                          title="تنزيل"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "discussion" && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="اطرح استفسارك الأكاديمي أو المالي حول هذا الدرس..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-brand-dark-900 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-amber-400 text-xs"
                      />
                      <button
                        onClick={() => alert("تم إرسال استفسارك للمستشار وفريق التدريب وسيتم الرد خلال ساعات.")}
                        className="px-4 py-2.5 rounded-xl bg-brand-amber-400 text-slate-950 font-bold text-xs shadow-gold-glow"
                      >
                        إرسال السؤال
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-dark-900 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">م. فهد القرني</span>
                        <span className="text-[10px] text-slate-500">منذ يومين</span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        سؤال: هل نموذج التوزيع ينطبق على صناديق الريت ذات العائد المتغير؟
                      </p>
                      <div className="p-3 rounded-lg bg-brand-emerald-950/50 border border-brand-emerald-500/20 text-brand-emerald-300 text-xs">
                        <strong>إجابة المستشار أحمد الشوا:</strong> نعم بكل تأكيد، يمكنك تعديل خانة العائد التقديري في شيت رقم 3 لاحتساب سيناريو التوزيع المتغير بأمان.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Curriculum (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 text-right">
            {/* Progress Card */}
            <div className="p-5 rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 space-y-3 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">نسبة إنجاز الدورة</span>
                <span className="text-brand-emerald-400 font-black">{progressPct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-amber-400 to-brand-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>{completedLessons.length} من {totalLessons} درس مكتمل</span>
                {progressPct === 100 && (
                  <span className="text-brand-amber-300 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    جاهز لإصدار الشهادة
                  </span>
                )}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/20 overflow-hidden shadow-xl backdrop-blur-md">
              <div className="p-4 bg-brand-dark-950 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-alexandria font-bold text-sm text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-amber-400" />
                  منهاج ووحدات البرنامج
                </h3>
                <span className="text-xs text-slate-400">{course.modules.length} وحدات</span>
              </div>

              <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                {course.modules.map((module, mIdx) => {
                  const isOpen = openModules[module.id] ?? false;
                  return (
                    <div key={module.id} className="bg-brand-dark-900/50">
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 flex items-center justify-between text-right hover:bg-white/5 transition-colors"
                      >
                        <div className="min-w-0 flex-1 pl-2">
                          <span className="text-[10px] text-brand-emerald-400 font-bold block mb-0.5">
                            الوحدة {mIdx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-white truncate">{module.title}</h4>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {/* Lessons List */}
                      {isOpen && (
                        <div className="bg-brand-dark-950/60 divide-y divide-white/5 py-1">
                          {module.lessons.map((lesson) => {
                            const isCurrent = activeLesson.id === lesson.id;
                            const isCompleted = completedLessons.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className={`w-full p-3.5 pl-4 flex items-center justify-between text-right transition-all ${
                                  isCurrent
                                    ? "bg-brand-emerald-950/60 border-r-4 border-brand-amber-400 text-white"
                                    : "hover:bg-white/5 text-slate-300"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1 pl-2">
                                  <div
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                      isCompleted
                                        ? "bg-brand-emerald-500/20 text-brand-emerald-400"
                                        : isCurrent
                                        ? "bg-brand-amber-400/20 text-brand-amber-300"
                                        : "bg-white/5 text-slate-500"
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    ) : (
                                      <Play className="w-3 h-3 fill-current mr-0.5" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className={`text-xs font-medium truncate ${isCurrent ? "text-brand-amber-300 font-bold" : ""}`}>
                                      {lesson.title}
                                    </h5>
                                    <span className="text-[10px] text-slate-500 block">
                                      {lesson.durationMinutes} دقيقة
                                    </span>
                                  </div>
                                </div>

                                {lesson.isFreePreview && (
                                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-brand-emerald-500/20 text-brand-emerald-300 shrink-0">
                                    معاينة مجانية
                                  </span>
                                )}
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

            {/* VIP Support Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-emerald-950 to-brand-dark-900 border border-brand-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-brand-amber-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>هل تحتاج استشارة مباشرة لتطبيق المنهج؟</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                احجز جلسة 1-on-1 مع أحمد الشوا لمراجعة خطتك المالية والتسويقية.
              </p>
              <Link
                href="/#booking"
                className="inline-block pt-1 text-xs font-bold text-brand-emerald-400 hover:text-brand-emerald-300 underline"
              >
                احجز موعد استشارتك الآن ⟵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
