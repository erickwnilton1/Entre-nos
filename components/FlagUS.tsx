import type { JSX } from 'react';

type Props = { width?: number; className?: string };

export default function FlagUS({ width = 76, className = "" }: Props) {
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect
      key={`s${i}`}
      y={(i * 100) / 13}
      width="190"
      height={100 / 13 + 0.1}
      fill={i % 2 ? "#ffffff" : "#b22234"}
    />
  ));

  const stars: JSX.Element[] = [];
  for (let r = 0; r < 9; r++) {
    const n = r % 2 ? 5 : 6;
    for (let c = 0; c < n; c++) {
      stars.push(
        <circle
          key={`${r}-${c}`}
          cx={(r % 2 ? 12.667 : 6.333) + c * 12.667}
          cy={5.385 * (r + 1)}
          r={1.7}
          fill="#ffffff"
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 190 100"
      width={width}
      role="img"
      aria-label="Bandeira dos Estados Unidos"
      className={`flag-us mx-auto mb-2 rounded-md border border-[var(--line)] shadow-[var(--sombra)] ${className}`}
    >
      {stripes}
      <rect width="76" height="53.85" fill="#3c3b6e" />
      {stars}
    </svg>
  );
}
