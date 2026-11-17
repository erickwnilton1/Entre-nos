"use client";

import { CITIES } from '../../data/data';
import useNow from '../shared/useNow';
import Map from './Map';

const haversine = (a, b) => {
  const radians = value => value * Math.PI / 180;
  const h = Math.sin(radians(b[0] - a[0]) / 2) ** 2
    + Math.cos(radians(a[0])) * Math.cos(radians(b[0]))
    * Math.sin(radians(b[1] - a[1]) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

const formatNumber = value => value.toLocaleString('pt-BR');

export default function Home({ data }) {
  const now = useNow();
  const seconds = Math.max(0, Math.floor((new Date(data.ret) - now) / 1000));
  const origin = CITIES[data.orig] || CITIES.Recife;
  const destination = CITIES[data.dest] || CITIES.Orlando;
  const kilometers = Math.round(haversine(origin, destination));
  const units = [
    [Math.floor(seconds / 86400), 'dias'],
    [Math.floor(seconds % 86400 / 3600), 'horas'],
    [Math.floor(seconds % 3600 / 60), 'min'],
    [seconds % 60, 'seg']
  ];

  return (
    <>
      <div className="mono">Entre Nós</div>
      <h1>Entre nós, qualquer <em>distância é pequena.</em></h1>
      <p className="intro">
        Existem quilômetros entre nós, um oceano nos separando e meses de saudade pela frente.
        <br/><br/>Mas existe algo que nenhuma distância consegue mudar: o quanto você é importante para mim.
        <br/><br/>Fiz esse pequeno espaço para que, mesmo longe, você sempre encontre um pedacinho de nós.
      </p>
      <section className="card">
        <Map data={data} />
        <div className="g2 centered">
          <div><div className="mono">Brasil</div>{data.orig}<small>esperando por você</small></div>
          <div><div className="mono">Distância</div><h2>{formatNumber(kilometers)} km</h2></div>
          <div><div className="mono">Estados Unidos</div>{data.dest}<small>sua aventura</small></div>
        </div>
      </section>
      <section className="card countdown">
        <div className="mono">Faltam para o reencontro</div>
        <div className="cd">
          {units.map(([number, label]) => (
            <div key={label}><b>{String(number).padStart(2, '0')}</b><span>{label}</span></div>
          ))}
        </div>
      </section>
      <h2 className="closing"><em>A distância é física. O amor não.</em></h2>
    </>
  );
}
