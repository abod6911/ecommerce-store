"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpLeft } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function CustomBlocksSection() {
  const { content } = useSiteContent();
  const blocks = content.customBlocks || [];

  if (blocks.length === 0) return null;

  return (
    <section className="py-16 bg-brand-dark-950 border-t border-white/10 font-ibm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="rounded-3xl bg-brand-dark-850/90 border border-brand-amber-400/35 p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-2xl backdrop-blur-xl text-right"
            >
              <div className="space-y-3">
                {block.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-amber-400/15 text-brand-amber-300 border border-brand-amber-400/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{block.badge}</span>
                  </span>
                )}
                <h3 className="font-alexandria font-extrabold text-xl sm:text-2xl text-white">
                  {block.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-[1.85]">
                  {block.description}
                </p>
              </div>

              {block.ctaLabel && (
                <div>
                  <Link
                    href={block.ctaHref || "/#booking"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-gold-glow hover:brightness-110 transition-all"
                  >
                    <span>{block.ctaLabel}</span>
                    <ArrowUpLeft className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
