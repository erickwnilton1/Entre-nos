"use client";

import { isLetterUnlocked } from '../letters/letterAccess';
import TypedText from '../letters/TypedText';

export default function ContentModal({ modal, data, day, onClose }) {
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
              <div className="photo-placeholder"/>
              <h2>{memory?.[0]}</h2>
              <div className="mono">{memory?.[1]}</div>
              <p>{memory?.[2]}</p>
            </>}
        <button onClick={onClose}>Fechar</button>
      </article>
    </div>
  );
}
