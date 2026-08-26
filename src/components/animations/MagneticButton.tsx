"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "emerald" | "outline";
  distance?: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
  size: number;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  distance = 0.35,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Motion values for smooth magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic return
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * distance;
    const deltaY = (e.clientY - centerY) * distance;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.2;
      const newRipple: Ripple = { x: clickX, y: clickY, id: Date.now(), size };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Base styling per variant
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-brand-amber-400 via-brand-amber-500 to-brand-amber-600 text-slate-950 shadow-gold-glow hover:brightness-110";
      case "emerald":
        return "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-glow hover:brightness-110";
      case "secondary":
        return "bg-brand-emerald-950/80 text-brand-emerald-300 border border-brand-emerald-500/40 shadow-emerald-glow hover:bg-brand-emerald-900";
      case "outline":
        return "bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 hover:border-white/30";
      default:
        return "bg-gradient-to-r from-brand-amber-400 to-brand-amber-500 text-slate-950 shadow-gold-glow";
    }
  };

  const content = (
    <motion.div
      ref={buttonRef}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <div
        className={`relative overflow-hidden cursor-pointer select-none font-alexandria font-bold transition-all duration-200 active:scale-95 ${getVariantStyles()} ${className}`}
      >
        {/* Click Ripple elements */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/35 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleClick} className="inline-block bg-transparent border-0 p-0 m-0">
      {content}
    </button>
  );
}
