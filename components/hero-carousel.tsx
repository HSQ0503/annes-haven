"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  /** object-fit for this slide; falls back to the carousel fit prop. */
  fit?: "cover" | "contain";
  /** object-position, e.g. "center 60%". */
  position?: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  /** Time each slide is held, in ms. */
  interval?: number;
  /** Default object-fit for slides. Default cover. */
  fit?: "cover" | "contain";
};

export function HeroCarousel({
  slides,
  interval = 5000,
  fit = "cover",
}: HeroCarouselProps) {
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
      {slides.map((slide, i) => {
        const slideFit = slide.fit ?? fit;
        const style: CSSProperties = {
          objectFit: slideFit,
          objectPosition: slide.position ?? "center",
        };
        return (
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
              style={style}
            />
          </div>
        );
      })}
    </div>
  );
}
