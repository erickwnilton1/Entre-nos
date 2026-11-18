import dynamic from 'next/dynamic';
import { CITIES, type AppData, type Coordinate } from '../../data/data';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => <div className="map-loading" aria-label="Carregando mapa" />
});

export default function Map({ data }: { data: AppData }) {
  const origin: Coordinate = CITIES[data.orig] || CITIES.Recife;
  const destination: Coordinate = CITIES[data.dest] || CITIES.Miami;

  return (
    <div className="map" aria-label={`Mapa da rota entre ${data.orig} e ${data.dest}`}>
      <InteractiveMap
        origin={origin}
        destination={destination}
        originLabel={data.orig}
        destinationLabel={data.dest}
      />
    </div>
  );
}
