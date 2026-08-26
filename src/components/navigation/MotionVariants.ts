import { Variants } from "framer-motion";

// Backdrop Fade
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// RTL Drawer Slide from Right Edge (100% -> 0%)
export const drawerVariants: Variants = {
  hidden: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 260,
    },
  },
  visible: {
    x: "0%",
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 220,
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 32,
      stiffness: 260,
    },
  },
};

// Staggered Menu Item
export const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.15 },
  },
};

// Footer Slide-up
export const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      delay: 0.35,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: { duration: 0.15 },
  },
};
