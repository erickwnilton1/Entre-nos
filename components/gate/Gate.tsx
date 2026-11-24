import FlagUS from '../FlagUS';

type GateProps = {
  onEnter: () => void;
};

export default function Gate({ onEnter }: GateProps) {
  return (
    <div className="gate">
      <div className="orb">E·R</div>
      <div className="mono">Entre Nós</div>
      <p>Fiz isso para você. Para que, mesmo longe, nunca falte um pedacinho de mim com você.</p>
      <FlagUS width={96} />
      <button onClick={onEnter}>Entre aqui</button>
    </div>
  );
}
