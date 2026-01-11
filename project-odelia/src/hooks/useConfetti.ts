'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Water-themed confetti colors
    const colors = ['#38bdf8', '#2dd4bf', '#fda4af', '#fbbf24', '#e0f2fe'];

    // First burst from center
    setTimeout(() => {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: colors,
      });
    }, 0);

    // Second burst, wider
    setTimeout(() => {
      fire(0.2, {
        spread: 60,
        colors: colors,
      });
    }, 100);

    // Third burst from sides
    setTimeout(() => {
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: colors,
      });
    }, 200);

    // Final burst
    setTimeout(() => {
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: colors,
      });
    }, 300);

    // Additional hearts falling
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#fda4af', '#fbbf24'],
        shapes: ['circle'],
        scalar: 1.5,
      });
    }, 400);

    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#fda4af', '#fbbf24'],
        shapes: ['circle'],
        scalar: 1.5,
      });
    }, 450);
  }, []);

  return { triggerConfetti };
}
