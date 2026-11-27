"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, Award, ShieldCheck } from "lucide-react";

interface StatItemProps {
  label: string;
  sublabel: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  icon: React.ReactNode;
}

export function SingleCounter({
  label,
  sublabel,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  delay = 0,
  icon,
}: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, delay]);

  const formattedNumber =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString("en-US");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className="relative rounded-2xl bg-gradient-to-b from-brand-dark-850 to-brand-dark-900 border border-brand-emerald-500/20 hover:border-brand-amber-500/40 p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors text-right overflow-hidden"
    >
      {/* Subtle top champagne hairline */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-amber-500/45 to-transparent" />

      <div className="space-y-1 min-w-0">
        <div
          dir="ltr"
          className="font-cairo font-bold text-2xl sm:text-3xl text-brand-amber-300 leading-none tabular-nums inline-flex items-baseline gap-0.5"
        >
          {prefix && <span className="text-brand-amber-400">{prefix}</span>}
          <span>{formattedNumber}</span>
          {suffix && <span className="text-lg sm:text-xl text-brand-amber-400">{suffix}</span>}
        </div>

        <p className="text-sm font-bold text-[#F5F2EB] leading-snug pt-1">
          {label}
        </p>
        <p className="text-xs text-stone-400 leading-relaxed">
          {sublabel}
        </p>
      </div>

      <div className="w-11 h-11 rounded-xl bg-brand-emerald-950 border border-brand-emerald-500/25 flex items-center justify-center text-brand-amber-400 shrink-0">
        {icon}
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      label: "متدرب ومستفيد",
      sublabel: "في برامج التسويق والمبيعات",
      value: 5000,
      prefix: "+",
      suffix: "",
      decimals: 0,
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "عاماً من الخبرة العملية",
      sublabel: "استشارات وتدريب في السوق السعودي",
      value: 20,
      prefix: "+",
      suffix: "",
      decimals: 0,
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "نسبة رضا العملاء",
      sublabel: "تقييمات الجلسات والدورات التدريبية",
      value: 98.7,
      prefix: "",
      suffix: "%",
      decimals: 1,
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
      {stats.map((stat, idx) => (
        <SingleCounter
          key={idx}
          label={stat.label}
          sublabel={stat.sublabel}
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          decimals={stat.decimals}
          delay={idx * 0.1}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
