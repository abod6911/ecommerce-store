export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "customer" | "admin" | "super_admin" | "vip_client";
export type PaymentMethod = "mada" | "apple_pay" | "credit_card" | "bank_transfer" | "cod";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type ShippingStatus = "processing" | "handed_to_courier" | "in_transit" | "delivered" | "cancelled";
export type CourierProvider = "SMSA" | "ARAMEX" | "REDBOX" | "LOCAL_DRIVER";
export type ConsultationStatus = "upcoming" | "completed" | "rescheduled" | "cancelled";
export type StoreEventType = 
  | "login"
  | "otp_requested"
  | "otp_verified"
  | "book_purchase_attempt"
  | "book_order_created"
  | "consultation_view"
  | "consultation_booked"
  | "checkout_started"
  | "checkout_abandoned"
  | "drm_video_play"
  | "role_delegated"
  | "passkey_verified";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          role: UserRole;
          city: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          role?: UserRole;
          city?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          role?: UserRole;
          city?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      book_orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          shipping_city: string;
          shipping_address: string;
          book_title: string;
          quantity: number;
          amount_sar: number;
          payment_method: PaymentMethod;
          payment_status: PaymentStatus;
          shipping_status: ShippingStatus;
          courier_name: CourierProvider | null;
          tracking_code: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          shipping_city?: string;
          shipping_address: string;
          book_title: string;
          quantity?: number;
          amount_sar: number;
          payment_method?: PaymentMethod;
          payment_status?: PaymentStatus;
          shipping_status?: ShippingStatus;
          courier_name?: CourierProvider | null;
          tracking_code?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          shipping_city?: string;
          shipping_address?: string;
          book_title?: string;
          quantity?: number;
          amount_sar?: number;
          payment_method?: PaymentMethod;
          payment_status?: PaymentStatus;
          shipping_status?: ShippingStatus;
          courier_name?: CourierProvider | null;
          tracking_code?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      consultation_bookings: {
        Row: {
          id: string;
          user_id: string | null;
          client_name: string;
          client_phone: string;
          client_email: string | null;
          session_type: "in_person_jeddah" | "online_zoom" | string;
          session_date: string;
          time_slot: string;
          price_sar: number;
          payment_status: PaymentStatus;
          payment_method: string;
          zoom_url: string | null;
          status: ConsultationStatus;
          intake_data: {
            business_field?: string;
            social_links?: string;
            challenges?: string;
            budget?: string;
            [key: string]: any;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          client_name: string;
          client_phone: string;
          client_email?: string | null;
          session_type: "in_person_jeddah" | "online_zoom" | string;
          session_date: string;
          time_slot: string;
          price_sar: number;
          payment_status?: PaymentStatus;
          payment_method?: string;
          zoom_url?: string | null;
          status?: ConsultationStatus;
          intake_data?: {
            business_field?: string;
            social_links?: string;
            challenges?: string;
            budget?: string;
            [key: string]: any;
          } | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          client_name?: string;
          client_phone?: string;
          client_email?: string | null;
          session_type?: "in_person_jeddah" | "online_zoom" | string;
          session_date?: string;
          time_slot?: string;
          price_sar?: number;
          payment_status?: PaymentStatus;
          payment_method?: string;
          zoom_url?: string | null;
          status?: ConsultationStatus;
          intake_data?: {
            business_field?: string;
            social_links?: string;
            challenges?: string;
            budget?: string;
            [key: string]: any;
          } | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      customer_activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          event_type: StoreEventType | string;
          metadata: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          event_type: StoreEventType | string;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          event_type?: StoreEventType | string;
          metadata?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      security_audit_logs: {
        Row: {
          id: string;
          performed_by: string | null;
          target_user: string | null;
          action_type: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          performed_by?: string | null;
          target_user?: string | null;
          action_type: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          performed_by?: string | null;
          target_user?: string | null;
          action_type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
  };
}
