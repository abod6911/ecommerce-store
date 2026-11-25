"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INSTRUCTOR_INFO,
  BOOKS_DATA,
  COURSES_DATA,
  TRAINING_TRACKS_DATA,
  CONSULTATION_SERVICES,
  BookItem,
  CourseItem,
  TrainingTrackItem,
  ConsultationService,
} from "@/data/mockData";

export interface CustomBlockItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface SiteContentState {
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    accreditation: string;
    slogan: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    location: string;
    aboutBio: string;
  };
  consultationPricing: {
    basePrice: number;
    extraHourPrice: number;
    baseDurationLabel: string;
  };
  books: BookItem[];
  courses: CourseItem[];
  services: TrainingTrackItem[];
  consultations: ConsultationService[];
  customBlocks: CustomBlockItem[];
}

const DEFAULT_SITE_CONTENT: SiteContentState = {
  hero: {
    headlineLine1: "ابنِ ثروتك المستدامة",
    headlineLine2: "وضاعف أرباحك في السوق السعودي",
    subheadline:
      "حلول واستشارات تسويقية مخصصة لتمكين رواد الأعمال وأصحاب المشاريع، بخبرة عملية تتجاوز 20 عاماً في السوق السعودي.",
    accreditation: INSTRUCTOR_INFO.accreditation,
    slogan: INSTRUCTOR_INFO.slogan,
    phone: INSTRUCTOR_INFO.phone,
    whatsappNumber: INSTRUCTOR_INFO.whatsappNumber,
    email: INSTRUCTOR_INFO.email,
    location: INSTRUCTOR_INFO.location,
    aboutBio: INSTRUCTOR_INFO.bio,
  },
  consultationPricing: {
    basePrice: 800,
    extraHourPrice: 200,
    baseDurationLabel: "ساعتين",
  },
  books: BOOKS_DATA,
  courses: COURSES_DATA,
  services: TRAINING_TRACKS_DATA,
  consultations: CONSULTATION_SERVICES,
  customBlocks: [],
};

const STORAGE_KEY = "alshawa_site_content_v1";

interface SiteContentContextType {
  content: SiteContentState;
  isLoaded: boolean;
  updateHero: (hero: Partial<SiteContentState["hero"]>) => void;
  updateConsultationPricing: (pricing: Partial<SiteContentState["consultationPricing"]>) => void;
  setBooks: (books: BookItem[]) => void;
  setCourses: (courses: CourseItem[]) => void;
  setServices: (services: TrainingTrackItem[]) => void;
  setConsultations: (consultations: ConsultationService[]) => void;
  setCustomBlocks: (blocks: CustomBlockItem[]) => void;
  resetToDefaults: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContentState>(DEFAULT_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setContent({
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          consultationPricing: {
            ...DEFAULT_SITE_CONTENT.consultationPricing,
            ...(parsed.consultationPricing || {}),
          },
          books: Array.isArray(parsed.books) ? parsed.books : DEFAULT_SITE_CONTENT.books,
          courses: Array.isArray(parsed.courses) ? parsed.courses : DEFAULT_SITE_CONTENT.courses,
          services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_SITE_CONTENT.services,
          consultations: Array.isArray(parsed.consultations)
            ? parsed.consultations
            : DEFAULT_SITE_CONTENT.consultations,
          customBlocks: Array.isArray(parsed.customBlocks) ? parsed.customBlocks : [],
        });
      }
    } catch (e) {
      console.warn("Failed to load site content from storage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const persist = (next: SiteContentState) => {
    setContent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("Failed to save site content:", e);
    }
  };

  const updateHero = (hero: Partial<SiteContentState["hero"]>) => {
    persist({ ...content, hero: { ...content.hero, ...hero } });
  };

  const updateConsultationPricing = (
    pricing: Partial<SiteContentState["consultationPricing"]>
  ) => {
    persist({
      ...content,
      consultationPricing: { ...content.consultationPricing, ...pricing },
    });
  };

  const setBooks = (books: BookItem[]) => persist({ ...content, books });
  const setCourses = (courses: CourseItem[]) => persist({ ...content, courses });
  const setServices = (services: TrainingTrackItem[]) => persist({ ...content, services });
  const setConsultations = (consultations: ConsultationService[]) =>
    persist({ ...content, consultations });
  const setCustomBlocks = (customBlocks: CustomBlockItem[]) =>
    persist({ ...content, customBlocks });

  const resetToDefaults = () => {
    setContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isLoaded,
        updateHero,
        updateConsultationPricing,
        setBooks,
        setCourses,
        setServices,
        setConsultations,
        setCustomBlocks,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return ctx;
}
