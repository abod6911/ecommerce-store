"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  isLast?: boolean;
}

export function SingleCounter({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  delay = 0,
  isLast = false,
}: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // luxury easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        setIsCompleted(true);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, delay]);

  const formattedNumber =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString("en-US");

  // Determine if suffix is a long text like "مليون ر.س" or short like "%" / "سنة"
  const isLongSuffix = suffix.length > 3;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-3 sm:p-4 text-center transition-all ${
        !isLast ? "sm:border-l border-white/10" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="relative flex items-baseline justify-center gap-1.5 flex-wrap"
      >
        <div
          className={`font-alexandria font-black text-2xl sm:text-3xl lg:text-[32px] text-brand-amber-300 leading-none transition-all duration-700 flex items-baseline gap-1 ${
            isCompleted ? "drop-shadow-[0_0_15px_rgba(245,158,11,0.45)]" : ""
          }`}
        >
          {prefix && <span className="text-brand-amber-400 font-bold">{prefix}</span>}
          <span>{formattedNumber}</span>
        </div>

        {suffix && (
          <span
            className={`font-alexandria font-bold text-brand-amber-400/90 leading-none ${
              isLongSuffix
                ? "text-xs sm:text-sm lg:text-base"
                : "text-base sm:text-lg lg:text-xl"
            }`}
          >
            {suffix}
          </span>
        )}
      </motion.div>

      <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed mt-2 text-center">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      label: "متدرب ومستفيد",
      value: 5000,
      prefix: "+",
      suffix: "",
      decimals: 0,
    },
    {
      label: "خبرة في التسويق وتطوير الذات",
      value: 20,
      prefix: "+",
      suffix: "سنة",
      decimals: 0,
    },
    {
      label: "ميزانيات واستشارات مدارة",
      value: 25,
      prefix: "+",
      suffix: "مليون ر.س",
      decimals: 0,
    },
    {
      label: "نسبة رضا العملاء",
      value: 98.7,
      prefix: "",
      suffix: "%",
      decimals: 1,
    },
  ];

  return (
    <div className="rounded-3xl bg-brand-dark-850/90 border border-brand-emerald-500/25 shadow-2xl backdrop-blur-xl p-4 sm:p-6 lg:p-7">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-0 items-center divide-y md:divide-y-0">
        {stats.map((stat, idx) => (
          <SingleCounter
            key={idx}
            label={stat.label}
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
            delay={idx * 0.15}
            isLast={idx === stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
