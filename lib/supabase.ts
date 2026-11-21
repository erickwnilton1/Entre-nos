import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient as createBrowserClient } from '../utils/supabase/client';
import { getSupabaseSetupError } from '../utils/supabase/config';

export { getSupabaseSetupError } from '../utils/supabase/config';

export type HeartAuthor = 'eu' | 'rafaela';

export type Database = {
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

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (getSupabaseSetupError()) return null;

  if (!client) client = createBrowserClient();
  return client;
}
