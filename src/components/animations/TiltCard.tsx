"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.25,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position in relative percentage [-0.5 to 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinates [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="inline-block w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden transition-shadow duration-300 will-change-transform ${className}`}
      >
        {/* Child Content with 3D Depth support */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>

        {/* Dynamic Specular Glare Layer */}
        <motion.div
          animate={{ opacity: isHovered ? glareOpacity : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.45) 0%, rgba(245, 158, 11, 0.15) 30%, transparent 70%)`,
          }}
          className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] mix-blend-overlay"
        />
      </motion.div>
    </div>
  );
}
