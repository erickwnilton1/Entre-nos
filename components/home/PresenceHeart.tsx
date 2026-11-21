"use client";

import { useEffect, useState } from 'react';
import {
  getSupabaseClient,
  getSupabaseErrorMessage,
  getSupabaseSetupError,
  type HeartAuthor
} from '../../lib/supabase';

function formatPresenceDate(value: string): string {
  const date = new Date(value);
  const now = new Date();
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(date).replace(':', 'h');
  const isToday = date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate();

  if (isToday) return `hoje, às ${time}`;

  const day = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
  return `em ${day}, às ${time}`;
}

export default function PresenceHeart() {
  const setupError = getSupabaseSetupError();
  const client = setupError ? null : getSupabaseClient();
  const [author, setAuthor] = useState<HeartAuthor | ''>('');
  const [latestHeart, setLatestHeart] = useState<{
    id: string;
    author: HeartAuthor;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client || setupError) {
      setLoading(false);
      return;
    }

    let active = true;
    const loadLatestHeart = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: queryError } = await client
          .from('presence_hearts')
          .select('id, author, created_at')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (queryError) throw queryError;
        if (active) setLatestHeart(data);
      } catch (loadError) {
        if (active) setError(`Não foi possível carregar o último coração: ${getSupabaseErrorMessage(loadError)}`);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadLatestHeart();
    return () => {
      active = false;
    };
  }, [client, setupError]);

  const leaveHeart = async () => {
    if (!client || !author || saving) return;

    setSaving(true);
    setError(null);
    try {
      const { data, error: insertError } = await client
        .from('presence_hearts')
        .insert({ author })
        .select('id, author, created_at')
        .single();

      if (insertError) throw insertError;
      setLatestHeart(data);
    } catch (saveError) {
      setError(`Não foi possível deixar o coração: ${getSupabaseErrorMessage(saveError)}`);
    } finally {
      setSaving(false);
    }
  };

  const latestAuthor = latestHeart
    ? latestHeart.author === 'rafaela' ? 'Rafaela' : 'Erick'
    : null;
  let presenceMessage = 'Ainda não tem coração por aqui. Você pode deixar o primeiro.';

  if (setupError) presenceMessage = 'Conecte o Supabase para compartilhar os corações.';
  else if (loading) presenceMessage = 'Procurando o último coração...';
  else if (error) presenceMessage = 'Não foi possível consultar os corações agora.';
  else if (latestHeart && latestAuthor) {
    presenceMessage = `${latestAuthor} esteve aqui ${formatPresenceDate(latestHeart.created_at)} e deixou um coração para você.`;
  }

  return (
    <section className="card presence-card" aria-labelledby="presence-title">
      <div className="presence-copy">
        <div className="mono">Um carinho à distância</div>
        <h2 id="presence-title">Você passou por aqui <em>❤️</em></h2>
        <p className="muted">Deixe um coração para mostrar que esteve por aqui, sem precisar conversar.</p>
        <p className="presence-message" aria-live="polite">{presenceMessage}</p>
      </div>
      <div className="presence-actions">
        {setupError ? (
          <p className="presence-error" role="alert">{setupError}</p>
        ) : (
          <>
            <label htmlFor="presence-author">Quem está por aqui?</label>
            <select
              id="presence-author"
              value={author}
              onChange={(event) => {
                const selected = event.target.value;
                setAuthor(selected === 'eu' || selected === 'rafaela' ? selected : '');
              }}
              disabled={saving}
            >
              <option value="">Escolha uma opção</option>
              <option value="eu">Erick</option>
              <option value="rafaela">Rafaela</option>
            </select>
            <button
              className="presence-submit"
              type="button"
              onClick={leaveHeart}
              disabled={!author || loading || saving}
            >
              {saving ? 'Deixando...' : 'Deixar meu coração ❤️'}
            </button>
          </>
        )}
        {error && <p className="presence-error" role="alert">{error}</p>}
      </div>
    </section>
  );
}
