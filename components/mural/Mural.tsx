"use client";

import { useEffect, useState, type FormEvent } from 'react';
import {
  getSupabaseClient,
  getSupabaseErrorMessage,
  getSupabaseSetupError,
  type MuralAuthor,
  type MuralMessage,
  type MuralMessageKind
} from '../../lib/supabase';

const MAX_MESSAGES = 50;

function isMuralMessage(value: unknown): value is MuralMessage {
  return typeof value === 'object'
    && value !== null
    && 'id' in value
    && typeof value.id === 'string'
    && 'author' in value
    && (value.author === 'erick' || value.author === 'rafaela')
    && 'kind' in value
    && (value.kind === 'message' || value.kind === 'update' || value.kind === 'heart')
    && 'content' in value
    && typeof value.content === 'string'
    && 'created_at' in value
    && typeof value.created_at === 'string';
}

function mergeMessages(current: MuralMessage[], incoming: MuralMessage[]): MuralMessage[] {
  const messages = new Map(current.map((message) => [message.id, message]));
  incoming.forEach((message) => messages.set(message.id, message));
  return Array.from(messages.values())
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .slice(0, MAX_MESSAGES);
}

function formatMessageDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

const AUTHOR_LABELS: Record<MuralAuthor, string> = {
  erick: 'Erick',
  rafaela: 'Rafaela'
};

const KIND_LABELS: Record<MuralMessageKind, string> = {
  message: 'Mensagem',
  update: 'Atualização',
  heart: 'Carinho'
};

export default function Mural() {
  const setupError = getSupabaseSetupError();
  const supabase = setupError ? null : getSupabaseClient();
  const [messages, setMessages] = useState<MuralMessage[]>([]);
  const [author, setAuthor] = useState<MuralAuthor | ''>('');
  const [kind, setKind] = useState<'message' | 'update'>('message');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [realtimeState, setRealtimeState] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [realtimeError, setRealtimeError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!supabase || setupError) {
      setLoading(false);
      setRealtimeState('disconnected');
      return;
    }

    let active = true;
    setLoading(true);
    setLoadError(null);
    setRealtimeState('connecting');
    setRealtimeError(null);

    const channel = supabase
      .channel('mural-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mural_messages' },
        (payload) => {
          const incoming: unknown = payload.new;
          if (!active || !isMuralMessage(incoming)) return;
          setMessages((current) => mergeMessages(current, [incoming]));
        }
      )
      .subscribe((status) => {
        if (!active) return;
        if (status === 'SUBSCRIBED') {
          setRealtimeState('connected');
          setRealtimeError(null);
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setRealtimeState('disconnected');
          setRealtimeError('A conexão ao vivo falhou. Confira se a tabela mural_messages foi habilitada no Realtime do Supabase.');
        } else if (status === 'CLOSED') {
          setRealtimeState('disconnected');
        }
      });

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('mural_messages')
          .select('id, author, kind, content, created_at')
          .order('created_at', { ascending: false })
          .limit(MAX_MESSAGES);

        if (error) throw error;
        if (active) setMessages((current) => mergeMessages(current, data));
      } catch (error) {
        if (active) setLoadError(`Não foi possível carregar o mural: ${getSupabaseErrorMessage(error)}`);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadMessages();
    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [supabase, setupError, reload]);

  const publish = async (messageKind: MuralMessageKind, messageContent: string) => {
    const text = messageContent.trim();
    if (!supabase || !author || submitting || !text || text.length > 280) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const { data, error } = await supabase
        .from('mural_messages')
        .insert({ author, kind: messageKind, content: text })
        .select('id, author, kind, content, created_at')
        .single();

      if (error) throw error;
      setMessages((current) => mergeMessages(current, [data]));
      if (messageKind !== 'heart') setContent('');
    } catch (error) {
      setSubmitError(`Não foi possível publicar: ${getSupabaseErrorMessage(error)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void publish(kind, content);
  };

  return (
    <>
      <header className="mural-heading">
        <div className="mono">Um cantinho nosso</div>
        <h2>Nosso <em>mural</em></h2>
        <p className="muted">Mensagens pequenas.</p>
      </header>

      <form className="card mural-composer" onSubmit={handleSubmit}>
        <div className="mural-fields">
          <label>
            Quem está escrevendo?
            <select
              value={author}
              onChange={(event) => {
                const selected = event.target.value;
                setAuthor(selected === 'erick' || selected === 'rafaela' ? selected : '');
              }}
              disabled={!!setupError || submitting}
              required
            >
              <option value="">Escolha uma pessoa</option>
              <option value="erick">Erick</option>
              <option value="rafaela">Rafaela</option>
            </select>
          </label>
          <label>
            Tipo de publicação
            <select
              value={kind}
              onChange={(event) => setKind(event.target.value === 'update' ? 'update' : 'message')}
              disabled={!!setupError || submitting}
            >
              <option value="message">Mensagem</option>
              <option value="update">Pequena atualização</option>
            </select>
          </label>
        </div>
        <label className="mural-message-label">
          Sua mensagem
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={280}
            placeholder="Escreva algo"
            disabled={!!setupError || submitting}
          />
        </label>
        <div className="mural-composer-footer">
          <span className="muted">{content.length}/280</span>
          <div className="mural-actions">
            <button type="submit" disabled={!!setupError || !author || !content.trim() || submitting}>
              {submitting ? 'Publicando...' : 'Publicar'}
            </button>
            <button
              type="button"
              className="mural-heart-button"
              onClick={() => void publish('heart', '❤️')}
              disabled={!!setupError || !author || submitting}
            >
              Deixar um coração ❤️
            </button>
          </div>
        </div>
        {setupError && <p className="presence-error" role="alert">{setupError}</p>}
        {submitError && <p className="presence-error" role="alert">{submitError}</p>}
      </form>

      <section className="mural-feed-section" aria-labelledby="mural-feed-title">
        <div className="mural-feed-heading">
          <h3 id="mural-feed-title">Recadinhos</h3>
          <span className={`mural-connection ${realtimeState}`} role="status">
            {realtimeState === 'connected' ? 'Ao vivo' : realtimeState === 'connecting' ? 'Conectando...' : 'Sem conexão ao vivo'}
          </span>
        </div>
        {realtimeError && <p className="presence-error" role="alert">{realtimeError}</p>}
        {loadError && (
          <div role="alert">
            <p className="presence-error">{loadError}</p>
            <button type="button" onClick={() => setReload((value) => value + 1)}>Tentar novamente</button>
          </div>
        )}
        {loading && <p className="muted">Carregando o mural...</p>}
        {!loading && !loadError && messages.length === 0 && (
          <p className="card muted">O mural está quietinho. Deixe o primeiro recadinho ou coração.</p>
        )}
        <div className="mural-feed" aria-live="polite">
          {messages.map((message) => (
            <article className={`card mural-entry mural-entry-${message.kind}`} key={message.id}>
              <header className="mural-entry-heading">
                <div>
                  <strong>{AUTHOR_LABELS[message.author]}</strong>
                  <span className="mural-kind">{KIND_LABELS[message.kind]}</span>
                </div>
                <time dateTime={message.created_at}>{formatMessageDate(message.created_at)}</time>
              </header>
              <p className={message.kind === 'heart' ? 'mural-entry-heart' : 'mural-entry-content'}>
                {message.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
