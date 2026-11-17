import type { AppData } from '../../data/data';
import type { ContentModalState } from '../shared/types';

type MemoriesProps = {
  data: AppData;
  onOpen: (modal: ContentModalState) => void;
};

export default function Memories({ data, onOpen }: MemoriesProps) {
  return (
    <>
      <h2>Nossa caixa de <em>memórias</em></h2>
      <p className="muted">Se algum dia você esquecer o quanto é amada, venha olhar tudo que já construímos.</p>
      <div className="grid memories">
        {data.mem.map((memory, index) => (
          <button className="polaroid" key={index} onClick={() => onOpen({ type: 'memory', index })}>
            <div className="photo-placeholder"/>
            <h3>{memory[0]}</h3>
            <div className="mono">{memory[1]}</div>
            <p>{memory[2]}</p>
          </button>
        ))}
      </div>
    </>
  );
}
