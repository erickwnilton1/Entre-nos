type Props = { width?: number; className?: string };

const STARS: [number, number][] = [
  [88, 52], [96, 50], [104, 53], [112, 51], [92, 60],
  [100, 58], [108, 60], [100, 86], [90, 82], [110, 82],
];

export default function FlagBR({ width = 76, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 140"
      width={width}
      role="img"
      aria-label="Bandeira do Brasil"
      className={`flag-br mx-auto mb-2 rounded-md border border-[var(--line)] shadow-[var(--sombra)] ${className}`}
    >
      <defs>
        <clipPath id="brc"><circle cx="100" cy="70" r="35" /></clipPath>
      </defs>
      <rect width="200" height="140" fill="#009c3b" />
      <polygon points="100,12 188,70 100,128 12,70" fill="#ffdf00" />
      <circle cx="100" cy="70" r="35" fill="#002776" />
      <g clipPath="url(#brc)">
        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill="#ffffff" />
        ))}
        <path d="M60 78 Q100 56 140 84" fill="none" stroke="#ffffff" strokeWidth={7} />
      </g>
    </svg>
  );
}
