import { isLetterUnlocked } from './letterAccess';

export default function Letters({ data, day, onOpen }) {
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
