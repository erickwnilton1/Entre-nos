import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient as createBrowserClient } from '../utils/supabase/client';
import { getSupabaseSetupError } from '../utils/supabase/config';

export { getSupabaseSetupError } from '../utils/supabase/config';

export type HeartAuthor = 'eu' | 'rafaela';
export type MuralAuthor = 'erick' | 'rafaela';
export type MuralMessageKind = 'message' | 'update' | 'heart';

export type Database = {
  public: {
    Tables: {
      mural_messages: {
        Row: {
          id: string;
          author: MuralAuthor;
          kind: MuralMessageKind;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          author: MuralAuthor;
          kind: MuralMessageKind;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          author?: MuralAuthor;
          kind?: MuralMessageKind;
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      away_checklist: {
        Row: {
          item_index: number;
          checked: boolean;
        };
        Insert: {
          item_index: number;
          checked?: boolean;
        };
        Update: {
          item_index?: number;
          checked?: boolean;
        };
        Relationships: [];
      };
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

export type MuralMessage = Database['public']['Tables']['mural_messages']['Row'];

let client: SupabaseClient<Database> | null = null;

export function getSupabaseErrorMessage(error: unknown): string {
  const message = error instanceof Error
    ? error.message
    : typeof error === 'string'
      ? error
      : typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
        ? error.message
        : '';

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(message)) {
    return 'Não foi possível conectar ao Supabase. Confira a URL do projeto, a configuração de CORS para o domínio do site e se a rede ou o navegador está bloqueando a conexão.';
  }

  if (error instanceof Error || typeof error === 'string') return message;
  if (typeof error === 'object' && error !== null) {
    const details: string[] = [];
    if (message) details.push(message);
    if ('code' in error && typeof error.code === 'string' && error.code) details.push(`código ${error.code}`);
    if ('details' in error && typeof error.details === 'string' && !error.details.includes('webpack-internal')) {
      details.push(error.details);
    }
    if ('hint' in error && typeof error.hint === 'string' && error.hint) details.push(`dica: ${error.hint}`);
    if (details.length > 0) return details.join(' — ');
  }

  return 'Ocorreu um erro inesperado.';
}

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (getSupabaseSetupError()) return null;

  if (!client) client = createBrowserClient();
  return client;
}
