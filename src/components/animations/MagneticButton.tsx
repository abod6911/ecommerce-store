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

  // Base styling per variant - refined quiet luxury without neon glows
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909] shadow-sm";
      case "emerald":
        return "bg-brand-emerald-600 hover:bg-brand-emerald-500 text-[#F5F2EB] shadow-sm";
      case "secondary":
        return "bg-brand-dark-850 hover:bg-brand-dark-800 text-brand-amber-300 border border-brand-amber-500/35";
      case "outline":
        return "bg-transparent hover:bg-white/[0.04] text-[#F5F2EB] border border-white/15 hover:border-brand-amber-500/40";
      default:
        return "bg-brand-amber-500 hover:bg-brand-amber-400 text-[#070909]";
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
