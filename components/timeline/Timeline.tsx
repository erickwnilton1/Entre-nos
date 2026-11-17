"use client";

import useNow from '../shared/useNow';
import type { AppData } from '../../data/data';

export default function Timeline({ data }: { data: AppData }) {
  const now = useNow();
  const start = +new Date(data.dep);
  const events: [string, number, string][] = [
    ['Partida', start, 'O começo da sua aventura.'],
    ['Primeiro dia nos EUA', start, 'Tudo novo, tudo possível.'],
    ['30 dias', start + 30 * 864e5, 'Um mês.'],
    ['60 dias', start + 60 * 864e5, 'Dois meses.'],
    ['90 dias', start + 90 * 864e5, 'Noventa dias de coragem.'],
    ['Retorno', +new Date(data.ret), 'Contar os segundos para te abraçar.']
  ];

  return (
    <>
      <h2>Marcos da <em>viagem</em></h2>
      <div className="timeline">
        {events.map(([name, date, description], index) => (
          <div className={now >= date ? 'reached' : ''} key={index}>
            <div className="mono">{new Date(date).toLocaleDateString('pt-BR')}</div>
            <h3>{name}</h3>
            <span className="muted">{description}</span>
          </div>
        ))}
      </div>
    </>
  );
}
