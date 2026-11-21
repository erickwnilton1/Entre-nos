"use client";

import { useEffect, useState } from 'react';
import type { AppData } from '../../data/data';
import { getSupabaseClient, getSupabaseErrorMessage, getSupabaseSetupError } from '../../lib/supabase';

type WhileAwayProps = {
  data: AppData;
  day: number;
};

export default function WhileAway({ data, day }: WhileAwayProps) {
  const [saudade, setSaudade] = useState('Toque para receber um abraço em palavras.');
  const [motivo, setMotivo] = useState('');
  const [reveal, setReveal] = useState('');
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [loadingChecklist, setLoadingChecklist] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [reloadChecklist, setReloadChecklist] = useState(0);
  const setupError = getSupabaseSetupError();
  const supabase = setupError ? null : getSupabaseClient();
  const randomItem = (key: 'sau' | 'mot'): string => {
    const items = data[key];
    return items[Math.floor(Math.random() * items.length)];
  };

  useEffect(() => {
    if (!supabase || setupError) {
      setLoadingChecklist(false);
      return;
    }

    let active = true;
    const loadChecklist = async () => {
      setLoadingChecklist(true);
      setLoadError(null);

      try {
        const { data: rows, error } = await supabase
          .from('away_checklist')
          .select('item_index, checked');

        if (error) throw error;
        if (active) {
          const checkedItems: Record<number, boolean> = {};
          rows.forEach(({ item_index, checked }) => {
            checkedItems[item_index] = checked;
          });
          setDone(checkedItems);
        }
      } catch (error) {
        if (active) setLoadError(`Não foi possível carregar as marcações: ${getSupabaseErrorMessage(error)}`);
      } finally {
        if (active) setLoadingChecklist(false);
      }
    };

    void loadChecklist();
    return () => {
      active = false;
    };
  }, [supabase, setupError, reloadChecklist]);

  const updateChecklist = async (itemIndex: number, checked: boolean) => {
    if (!supabase || loadError || savingIndex !== null) return;

    const previousValue = !!done[itemIndex];
    setDone((current) => ({ ...current, [itemIndex]: checked }));
    setSavingIndex(itemIndex);
    setSaveError(null);

    try {
      const { error } = await supabase
        .from('away_checklist')
        .upsert({ item_index: itemIndex, checked }, { onConflict: 'item_index' });

      if (error) throw error;
    } catch (error) {
      setDone((current) => ({ ...current, [itemIndex]: previousValue }));
      setSaveError(`Não foi possível salvar a marcação: ${getSupabaseErrorMessage(error)}`);
    } finally {
      setSavingIndex(null);
    }
  };

  return (
    <>
      <h2>Enquanto você estiver <em>aí...</em></h2>
      <div className="g2">
        <section className="card">
          <div className="mono">Mensagem da semana · {Math.floor(Math.max(0, day) / 7) + 1}</div>
          <p>{data.sem[Math.min(Math.floor(Math.max(0, day) / 7), data.sem.length - 1)]}</p>
        </section>
        <section className="card">
          <div className="mono">Estou com saudade</div>
          <p>{saudade}</p>
          <button onClick={() => setSaudade(randomItem('sau'))}>Estou com saudade</button>
        </section>
        <section className="card">
          <div className="mono">Motivos para sorrir</div>
          <p>{motivo || 'Às vezes, tudo que a gente precisa é de um pequeno motivo para sorrir.'}</p>
          <button onClick={() => setMotivo(randomItem('mot'))}>Outro motivo</button>
        </section>
        <section className="card">
          <div className="mono">Quero te contar uma coisa</div>
          <p>{reveal || 'Tem uma coisa que quero que você saiba...'}</p>
          <button onClick={() => setReveal(data.conta)}>Revelar</button>
        </section>
      </div>
      <h3 className="section-title">Surpresas desbloqueáveis</h3>
      <div className="g2">
        {data.sur.map(surprise => (
          <section className="card" key={surprise[0]}>
            <div className="mono">{surprise[0]} dias</div>
            <h3>{surprise[1]}</h3>
            <p>{day >= surprise[0] ? surprise[2] : `🔒 Libera ao completar ${surprise[0]} dias.`}</p>
          </section>
        ))}
      </div>
      <h3 className="section-title">Quando você voltar, nós vamos…</h3>
      <section className="card checklist">
        {setupError && <p className="presence-error" role="alert">{setupError}</p>}
        {loadingChecklist && <p className="muted">Carregando as marcações...</p>}
        {loadError && (
          <div role="alert">
            <p className="presence-error">{loadError}</p>
            <button type="button" onClick={() => setReloadChecklist((value) => value + 1)}>
              Tentar novamente
            </button>
          </div>
        )}
        {saveError && <p className="presence-error" role="alert">{saveError}</p>}
        {data.todo.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={!!done[index]}
              disabled={!!setupError || loadingChecklist || !!loadError || savingIndex !== null}
              onChange={(event) => void updateChecklist(index, event.currentTarget.checked)}
            />
            <span>{item}</span>
          </label>
        ))}
      </section>
    </>
  );
}
