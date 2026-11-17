"use client";

import { useEffect, useState } from 'react';
import { CITIES } from '../../data/data';

export default function Admin({ data, onSave }) {
  const [draft, setDraft] = useState(data);
  const [selected, setSelected] = useState(0);
  const [json, setJson] = useState('');

  useEffect(() => {
    setDraft(data);
    const { cartas, mem, n1, n2, orig, dest, dep, ret, ...rest } = data;
    setJson(JSON.stringify(rest, null, 2));
  }, [data]);

  const update = (key, value) => setDraft(old => ({ ...old, [key]: value }));
  const editLetter = (field, value) => update(
    'cartas',
    draft.cartas.map((letter, index) => index === selected
      ? letter.map((item, itemIndex) => itemIndex === field ? value : item)
      : letter)
  );

  return (
    <>
      <h2>Painel do <em>administrador</em></h2>
      <section className="card admin-card">
        <label>Origem
          <select value={draft.orig} onChange={event => update('orig', event.target.value)}>
            {Object.keys(CITIES).map(city => <option key={city}>{city}</option>)}
          </select>
        </label>
        <label>Destino
          <select value={draft.dest} onChange={event => update('dest', event.target.value)}>
            {Object.keys(CITIES).map(city => <option key={city}>{city}</option>)}
          </select>
        </label>
        <label>Partida
          <input type="datetime-local" value={draft.dep} onChange={event => update('dep', event.target.value)}/>
        </label>
        <label>Retorno
          <input type="datetime-local" value={draft.ret} onChange={event => update('ret', event.target.value)}/>
        </label>
        <button onClick={() => onSave(draft)}>Salvar datas e cidades</button>
      </section>
      <section className="card admin-card">
        <label>Carta
          <select value={selected} onChange={event => setSelected(+event.target.value)}>
            {draft.cartas.map((letter, index) => <option key={index} value={index}>{letter[0]}</option>)}
          </select>
        </label>
        <label>Título
          <input value={draft.cartas[selected]?.[0] || ''} onChange={event => editLetter(0, event.target.value)}/>
        </label>
        <label>Descrição
          <input value={draft.cartas[selected]?.[1] || ''} onChange={event => editLetter(1, event.target.value)}/>
        </label>
        <label>Mensagem
          <textarea value={draft.cartas[selected]?.[2] || ''} onChange={event => editLetter(2, event.target.value)}/>
        </label>
        <button onClick={() => onSave(draft)}>Salvar carta</button>
        <button
          className="secondary"
          onClick={() => {
            const next = { ...draft, cartas: [...draft.cartas, ['Abra quando…', 'Nova carta', 'Escreva aqui.']] };
            setDraft(next);
            setSelected(next.cartas.length - 1);
            onSave(next);
          }}
        >
          Nova carta
        </button>
      </section>
      <section className="card admin-card">
        <label>Memórias, mensagens, surpresas, playlist e lista (JSON)
          <textarea className="json-editor" value={json} onChange={event => setJson(event.target.value)}/>
        </label>
        <button
          onClick={() => {
            try {
              onSave({ ...draft, ...JSON.parse(json) });
            } catch {
              alert('JSON inválido. Confira a estrutura antes de salvar.');
            }
          }}
        >
          Salvar conteúdo
        </button>
      </section>
    </>
  );
}
