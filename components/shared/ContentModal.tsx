"use client";

import { isLetterUnlocked } from '../letters/letterAccess';
import TypedText from '../letters/TypedText';
import Image from 'next/image';
import type { AppData } from '../../data/data';
import type { ContentModalState } from './types';

type ContentModalProps = {
  modal: ContentModalState;
  data: AppData;
  day: number;
  onClose: () => void;
};

export default function ContentModal({ modal, data, day, onClose }: ContentModalProps) {
  const letter = modal.type === 'letter' ? data.cartas[modal.index] : null;
  const memory = modal.type === 'memory' ? data.mem[modal.index] : null;
  const unlocked = modal.type === 'letter'
    && isLetterUnlocked(modal.index, day, data.ret);

  return (
    <div className="modal" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <article className="sheet">
        {letter
          ? (unlocked
            ? <>
                <div className="mono">{letter[1]}</div>
                <h2>{letter[0]}</h2>
                <TypedText text={letter[2]} />
              </>
            : <p>Calma, ainda não é hora. Essa carta espera o momento certo.</p>)
          : <>
              <div className="photo-placeholder">
                {memory?.image && (
                  <Image
                    src={memory.image}
                    alt={memory.title}
                    fill
                    sizes="(max-width: 600px) 90vw, 580px"
                    className="memory-photo"
                  />
                )}
              </div>
              <h2>{memory?.title}</h2>
              <div className="mono">{memory?.year}</div>
              <p>{memory?.description}</p>
            </>}
        <button onClick={onClose}>Fechar</button>
      </article>
    </div>
  );
}
