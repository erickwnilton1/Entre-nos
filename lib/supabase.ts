import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type HeartAuthor = 'eu' | 'rafaela';

type Database = {
  public: {
    Tables: {
      presence_hearts: {
        Row: {
          id: string;
          author: HeartAuthor;
          created_at: string;
        };
        Insert: {
          id?: string;
          author: HeartAuthor;
          created_at?: string;
        };
        Update: {
          id?: string;
          author?: HeartAuthor;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: SupabaseClient<Database> | null = null;

export function getSupabaseSetupError(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return 'Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para ativar os corações.';
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return 'NEXT_PUBLIC_SUPABASE_URL precisa ser uma URL HTTP ou HTTPS válida.';
    }
  } catch {
    return 'NEXT_PUBLIC_SUPABASE_URL precisa ser uma URL HTTP ou HTTPS válida.';
  }

  return null;
}

export function getSupabaseClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  if (!client) client = createClient<Database>(url, anonKey);
  return client;
}
