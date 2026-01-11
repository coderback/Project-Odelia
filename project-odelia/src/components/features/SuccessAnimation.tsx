'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SuccessAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function SuccessAnimation({ isActive, onComplete }: SuccessAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStage(0);
      return;
    }

    // Stage 1: Droplets gather (0-1200ms)
    const timer1 = setTimeout(() => setStage(1), 0);

    // Stage 2: Form heart (1200-2000ms)
    const timer2 = setTimeout(() => setStage(2), 1200);

    // Stage 3: Heart glows and pulses (2000-2800ms)
    const timer3 = setTimeout(() => setStage(3), 2000);

    // Stage 4: Fade to message (2800-3200ms)
    const timer4 = setTimeout(() => {
      setStage(4);
      onComplete?.();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isActive, onComplete]);

  // Generate positions for water droplets around the edges
  const dropletPositions = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 300;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <AnimatePresence>
      {isActive && stage > 0 && stage < 4 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {/* Stage 1: Water droplets gathering */}
          {stage >= 1 && stage < 3 && (
            <>
              {dropletPositions.map((pos, i) => (
                <motion.div
                  key={`droplet-${i}`}
                  className="absolute w-4 h-4 bg-water-400 rounded-full"
                  initial={{
                    x: pos.x,
                    y: pos.y,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 0.8,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </>
          )}

          {/* Stage 2 & 3: Heart shape formation and pulsing */}
          {stage >= 2 && (
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: stage === 3 ? [1, 1.1, 1] : 1,
                opacity: 1,
              }}
              transition={{
                scale: {
                  duration: 1,
                  repeat: stage === 3 ? 2 : 0,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.5,
                },
              }}
            >
              {/* SVG Heart with water gradient */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Glow filter for stage 3 */}
                  {stage === 3 && (
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  )}
                </defs>

                <motion.path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="url(#waterGradient)"
                  stroke="#0ea5e9"
                  strokeWidth="1"
                  filter={stage === 3 ? "url(#glow)" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                />
              </svg>

              {/* Rotating water droplets around heart */}
              {stage === 3 && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`orbit-${i}`}
                      className="absolute w-3 h-3 bg-teal-400/60 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: Math.cos((i / 8) * Math.PI * 2) * 120,
                        y: Math.sin((i / 8) * Math.PI * 2) * 120,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}

          {/* Sparkle effects */}
          {stage === 3 && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-2 h-2 bg-romantic-gold rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
