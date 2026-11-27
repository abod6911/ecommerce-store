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
      className={`flex flex-col items-center justify-center py-4 px-5 text-center ${
        !isLast ? "sm:border-l border-white/[0.08]" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className="relative flex items-baseline justify-center gap-1.5 flex-wrap"
      >
        <div className="font-alexandria font-bold text-2xl sm:text-3xl text-brand-amber-300 leading-none flex items-baseline gap-1">
          {prefix && <span className="text-brand-amber-400 font-semibold">{prefix}</span>}
          <span>{formattedNumber}</span>
        </div>

        {suffix && (
          <span
            className={`font-alexandria font-semibold text-brand-amber-400/90 leading-none ${
              isLongSuffix
                ? "text-xs sm:text-sm"
                : "text-sm sm:text-base"
            }`}
          >
            {suffix}
          </span>
        )}
      </motion.div>

      <p className="text-xs sm:text-[13px] text-stone-400 font-medium leading-relaxed mt-2 text-center">
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
      label: "عاماً من الخبرة العملية",
      value: 20,
      prefix: "+",
      suffix: "",
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
    <div className="rounded-2xl bg-brand-dark-850 border border-white/[0.08] p-3 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 items-center divide-y sm:divide-y-0 divide-white/[0.06]">
        {stats.map((stat, idx) => (
          <SingleCounter
            key={idx}
            label={stat.label}
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
            delay={idx * 0.1}
            isLast={idx === stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
