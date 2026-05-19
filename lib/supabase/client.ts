import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          long_description: string | null;
          technologies: string[] | null;
          github_url: string | null;
          live_url: string | null;
          image_url: string | null;
          images: string[] | null;
          status: string | null;
          featured: boolean | null;
          categories: string[] | null;
          tags: string[] | null;
          start_date: string | null;
          end_date: string | null;
          sort_order: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      research: {
        Row: {
          id: string;
          title: string;
          abstract: string | null;
          authors: string[] | null;
          publication_date: string | null;
          journal: string | null;
          conference: string | null;
          pdf_url: string | null;
          doi: string | null;
          tags: string[] | null;
          type: string | null;
          featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['research']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['research']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string | null;
          expiry_date: string | null;
          credential_id: string | null;
          credential_url: string | null;
          image_url: string | null;
          description: string | null;
          categories: string[] | null;
          skills: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          type: string | null;
          position: string | null;
          organization: string | null;
          event_date: string | null;
          image_url: string | null;
          certificate_url: string | null;
          tags: string[] | null;
          featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      social_links: {
        Row: {
          id: string;
          platform: string;
          url: string;
          icon: string | null;
          visible: boolean | null;
          sort_order: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['social_links']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['social_links']['Insert']>;
      };
      resume_files: {
        Row: {
          id: string;
          title: string;
          file_url: string;
          file_type: string | null;
          is_active: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['resume_files']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['resume_files']['Insert']>;
      };
      homepage_content: {
        Row: {
          id: string;
          section: string;
          content: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['homepage_content']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['homepage_content']['Insert']>;
      };
      seo_metadata: {
        Row: {
          id: string;
          page: string;
          title: string | null;
          description: string | null;
          keywords: string[] | null;
          og_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seo_metadata']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seo_metadata']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
