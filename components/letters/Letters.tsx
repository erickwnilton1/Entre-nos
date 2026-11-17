import type { AppData } from '../../data/data';
import type { ContentModalState } from '../shared/types';
import { isLetterUnlocked } from './letterAccess';

type LettersProps = {
  data: AppData;
  day: number;
  onOpen: (modal: ContentModalState) => void;
};

export default function Letters({ data, day, onOpen }: LettersProps) {
  return (
    <>
      <h2>Cartas para <em>você</em></h2>
      <p className="muted">Cada uma tem a hora certa de ser aberta.</p>
      <div className="grid">
        {data.cartas.map((letter, index) => {
          const unlocked = isLetterUnlocked(index, day, data.ret);
          return (
            <button
              className={`card letter-card ${!unlocked ? 'locked' : ''}`}
              key={index}
              onClick={() => onOpen({ type: 'letter', index })}
            >
              <span className="number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{letter[0]}</h3>
              <small>{unlocked ? letter[1] : '🔒 Criptografada até a hora certa'}</small>
            </button>
          );
        })}
      </div>
    </>
  );
}
