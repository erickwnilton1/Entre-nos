import type { AppData } from '../../data/data';
import type { ContentModalState } from '../shared/types';
import Image from 'next/image';

type MemoriesProps = {
  data: AppData;
  onOpen: (modal: ContentModalState) => void;
};

export default function Memories({ data, onOpen }: MemoriesProps) {
  return (
    <>
      <h2>Nossa caixa de <em>memórias</em></h2>
      <p className="muted">Pra te lembrar um pouco dos nossos dias.</p>
      <div className="grid memories">
        {data.mem.map((memory, index) => (
          <button className="polaroid" key={index} onClick={() => onOpen({ type: 'memory', index })}>
            <div className="photo-placeholder">
              {memory.image && (
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  sizes="(max-width: 600px) 90vw, 230px"
                  className="memory-photo"
                />
              )}
            </div>
            <h3>{memory.title}</h3>
            <div className="mono">{memory.year}</div>
            <p>{memory.description}</p>
          </button>
        ))}
      </div>
    </>
  );
}
