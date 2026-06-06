"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = { src: string; alt: string };

type HeroCarouselProps = {
  slides: HeroSlide[];
  /** Time each slide is held, in ms. */
  interval?: number;
};

export function HeroCarousel({ slides, interval = 5000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;

    // Honor users who prefer reduced motion — hold on the first slide.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [paused, slides.length, interval]);

  return (
    <div
      className="hero-slides"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide${i === index ? " is-active" : ""}`}
          aria-hidden={i === index ? undefined : true}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1000px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
