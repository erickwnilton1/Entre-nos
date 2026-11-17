export default function Gate({ onEnter }) {
  return (
    <div className="gate">
      <div className="orb">E·R</div>
      <div className="mono">Entre Nós</div>
      <p>Fiz isso para você. Para que, mesmo longe, nunca falte um pedacinho de nós.</p>
      <button onClick={onEnter}>Entrar no nosso cantinho</button>
    </div>
  );
}
