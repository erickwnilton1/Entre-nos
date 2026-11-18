"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Memory } from '../../data/data';

export default function HomeCarousel({ memories }: { memories: Memory[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (memories.length === 0) return null;

  const activeMemory = memories[activeIndex];
  const goTo = (index: number) => {
    setActiveIndex((index + memories.length) % memories.length);
  };

  return (
    <section className="home-carousel" aria-label="Carrossel de memórias">
      <div className="home-carousel-frame">
        {activeMemory.image ? (
          <Image
            src={activeMemory.image}
            alt={activeMemory.title}
            fill
            sizes="(max-width: 700px) 90vw, 40vw"
            className="home-carousel-image"
            priority={activeIndex === 0}
          />
        ) : (
          <div className="home-carousel-placeholder">
            <span>Sua foto aparecerá aqui</span>
          </div>
        )}
        {memories.length > 1 && (
          <>
            <button
              className="home-carousel-arrow previous"
              type="button"
              aria-label="Mostrar memória anterior"
              onClick={() => goTo(activeIndex - 1)}
            >
              ‹
            </button>
            <button
              className="home-carousel-arrow next"
              type="button"
              aria-label="Mostrar próxima memória"
              onClick={() => goTo(activeIndex + 1)}
            >
              ›
            </button>
          </>
        )}
      </div>
      <div className="home-carousel-caption" aria-live="polite">
        <div>
          <h2>{activeMemory.title}</h2>
          <span className="mono">{activeMemory.year}</span>
        </div>
        {memories.length > 1 && (
          <div className="home-carousel-dots" aria-label="Escolher memória">
            {memories.map((memory, index) => (
              <button
                key={`${memory.title}-${index}`}
                type="button"
                aria-label={`Mostrar memória ${index + 1}: ${memory.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
