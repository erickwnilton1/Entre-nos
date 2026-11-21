import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import type { Database } from '../../lib/supabase';
import { getSupabaseConfig, getSupabaseSetupError } from './config';

export async function updateSession(request: NextRequest) {
  const config = getSupabaseConfig();
  let supabaseResponse = NextResponse.next({ request });

  if (!config || getSupabaseSetupError()) return supabaseResponse;

  const supabase = createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  return supabaseResponse;
}
