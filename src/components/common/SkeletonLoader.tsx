"use client";

import React from "react";

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl bg-brand-dark-850/80 border border-white/10 p-6 space-y-4 animate-pulse overflow-hidden relative ${className}`}
    >
      <div className="h-44 w-full bg-slate-800/60 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-slate-800/80 rounded" />
        <div className="h-3 w-1/2 bg-slate-800/50 rounded" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="h-6 w-20 bg-slate-800/70 rounded-lg" />
        <div className="h-8 w-24 bg-slate-800/80 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`p-4 rounded-2xl bg-brand-dark-900 border border-white/5 flex items-center justify-between gap-4 animate-pulse ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-32 bg-slate-800/90 rounded" />
          <div className="h-2.5 w-20 bg-slate-800/50 rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-slate-800/70 rounded-full" />
    </div>
  );
}
