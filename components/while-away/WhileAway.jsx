"use client";

import { useState } from 'react';

export default function WhileAway({ data, day, done, setDone }) {
  const [saudade, setSaudade] = useState('Toque para receber um abraço em palavras.');
  const [motivo, setMotivo] = useState('');
  const [reveal, setReveal] = useState('');
  const randomItem = key => data[key][Math.floor(Math.random() * data[key].length)];

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
        {data.todo.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={!!done[index]}
              onChange={event => setDone({ ...done, [index]: event.target.checked })}
            />
            <span>{item}</span>
          </label>
        ))}
      </section>
    </>
  );
}
