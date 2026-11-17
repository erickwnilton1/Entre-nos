"use client";

import { useEffect, useState } from 'react';

export default function TypedText({ text }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const id = setInterval(() => setCount(value => Math.min(text.length, value + 2)), 18);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className="letter-text" onClick={() => setCount(text.length)}>
      {text.slice(0, count)}{count < text.length && <span className="pulse">▌</span>}
    </p>
  );
}
