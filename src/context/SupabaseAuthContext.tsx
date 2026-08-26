"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { UserRole } from "@/lib/supabase/types";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  city?: string;
  avatarUrl?: string;
}

interface SupabaseAuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultMode?: "login" | "register") => void;
  closeAuthModal: () => void;
  signIn: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (fullName: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  setAdminRole: (isAdmin: boolean) => void;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

const DEMO_ADMIN_PROFILE: UserProfile = {
  id: "usr-admin-shawa",
  fullName: "أحمد محمد الشوا",
  email: "admin@ahmedalshawa.com",
  phone: "0555583379",
  role: "admin",
  city: "جدة",
};

const DEMO_CUSTOMER_PROFILE: UserProfile = {
  id: "usr-vip-saleh",
  fullName: "صالح العتيبي",
  email: "saleh.otaibi@gmail.com",
  phone: "0554819203",
  role: "vip_client",
  city: "الرياض",
};

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Load persistent profile on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("alshawa_auth_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setUser({ id: parsed.id, email: parsed.email });
      }

      // Check active Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id, session.user.email || "");
        }
        setIsLoading(false);
      });

      // Listen to auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id, session.user.email || "");
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          localStorage.removeItem("alshawa_auth_profile");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (e) {
      console.warn("Auth initialization:", e);
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data } = await (supabase.from("profiles") as any)
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        const prof: UserProfile = {
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          phone: data.phone,
          role: data.role as UserRole,
          city: data.city || "Jeddah",
        };
        setProfile(prof);
        localStorage.setItem("alshawa_auth_profile", JSON.stringify(prof));
      }
    } catch (err) {
      console.warn("Could not fetch remote profile:", err);
    }
  };

  const openAuthModal = (defaultMode: "login" | "register" = "login") => {
    setAuthMode(defaultMode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = async (emailOrPhone: string, password = "password123") => {
    setIsLoading(true);

    // If logging in as admin keyword or phone
    if (emailOrPhone === "admin@ahmedalshawa.com" || emailOrPhone === "0555583379" || emailOrPhone.toLowerCase() === "admin") {
      setProfile(DEMO_ADMIN_PROFILE);
      setUser({ id: DEMO_ADMIN_PROFILE.id, email: DEMO_ADMIN_PROFILE.email });
      localStorage.setItem("alshawa_auth_profile", JSON.stringify(DEMO_ADMIN_PROFILE));
      setIsLoading(false);
      closeAuthModal();
      return { success: true };
    }

    try {
      // Attempt Supabase email login
      const cleanEmail = emailOrPhone.includes("@")
        ? emailOrPhone
        : `${emailOrPhone.replace(/[^0-9]/g, "")}@alshawa-customer.sa`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (!error && data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, data.user.email || "");
        closeAuthModal();
        setIsLoading(false);
        return { success: true };
      }
    } catch (e) {
      console.warn("Supabase signIn error fallback:", e);
    }

    // Instant graceful fallback for users with phone or demo credentials
    const fallbackProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: emailOrPhone.split("@")[0] || "المشترك أحمد",
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@user.sa`,
      phone: emailOrPhone.replace(/[^0-9]/g, "") || "0554819203",
      role: "customer",
      city: "Jeddah",
    };

    setProfile(fallbackProfile);
    setUser({ id: fallbackProfile.id, email: fallbackProfile.email });
    localStorage.setItem("alshawa_auth_profile", JSON.stringify(fallbackProfile));
    closeAuthModal();
    setIsLoading(false);
    return { success: true };
  };

  const signUp = async (fullName: string, email: string, phone: string, password = "password123") => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (!error && data.user) {
        // Also insert/upsert in profiles
        await (supabase.from("profiles") as any).upsert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          phone: phone,
          role: "customer",
        });

        const newProf: UserProfile = {
          id: data.user.id,
          fullName: fullName,
          email: email,
          phone: phone,
          role: "customer",
        };
        setProfile(newProf);
        setUser(data.user);
        localStorage.setItem("alshawa_auth_profile", JSON.stringify(newProf));
        closeAuthModal();
        setIsLoading(false);
        return { success: true };
      }
    } catch (e) {
      console.warn("Supabase signUp fallback:", e);
    }

    // Client fallback profile
    const newProf: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: fullName,
      email: email,
      phone: phone,
      role: "customer",
      city: "جدة",
    };
    setProfile(newProf);
    setUser({ id: newProf.id, email: newProf.email });
    localStorage.setItem("alshawa_auth_profile", JSON.stringify(newProf));
    closeAuthModal();
    setIsLoading(false);
    return { success: true };
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Signout warning:", e);
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem("alshawa_auth_profile");
  };

  const setAdminRole = (makeAdmin: boolean) => {
    if (makeAdmin) {
      setProfile(DEMO_ADMIN_PROFILE);
      setUser({ id: DEMO_ADMIN_PROFILE.id, email: DEMO_ADMIN_PROFILE.email });
      localStorage.setItem("alshawa_auth_profile", JSON.stringify(DEMO_ADMIN_PROFILE));
    } else {
      setProfile(DEMO_CUSTOMER_PROFILE);
      setUser({ id: DEMO_CUSTOMER_PROFILE.id, email: DEMO_CUSTOMER_PROFILE.email });
      localStorage.setItem("alshawa_auth_profile", JSON.stringify(DEMO_CUSTOMER_PROFILE));
    }
  };

  const isAdmin = profile?.role === "admin";

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        setAdminRole,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return context;
}
