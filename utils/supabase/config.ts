export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

export function getSupabaseSetupError(): string | null {
  const config = getSupabaseConfig();
  if (!config) {
    return 'As variáveis do Supabase não foram carregadas nesta versão. Localmente, confira .env.local na raiz e reinicie pnpm dev. Em produção, configure-as antes de gerar um novo build e publicar.';
  }

  try {
    const parsedUrl = new URL(config.url);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return 'NEXT_PUBLIC_SUPABASE_URL precisa ser uma URL HTTP ou HTTPS válida.';
    }
  } catch {
    return 'NEXT_PUBLIC_SUPABASE_URL precisa ser uma URL HTTP ou HTTPS válida.';
  }

  return null;
}

export function requireSupabaseConfig(): SupabaseConfig {
  const config = getSupabaseConfig();
  const setupError = getSupabaseSetupError();
  if (setupError || !config) {
    throw new Error(setupError ?? 'Configuração do Supabase indisponível.');
  }
  return config;
}
