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

  // Generate positions for all four element particles
  // Water droplets from top-left
  const waterPositions = Array.from({ length: 5 }, (_, i) => ({
    x: -200 - i * 30,
    y: -200 - i * 20,
  }));

  // Fire embers from top-right
  const firePositions = Array.from({ length: 5 }, (_, i) => ({
    x: 200 + i * 30,
    y: -200 - i * 20,
  }));

  // Earth rocks from bottom-left
  const earthPositions = Array.from({ length: 5 }, (_, i) => ({
    x: -200 - i * 30,
    y: 200 + i * 20,
  }));

  // Air swirls from bottom-right
  const airPositions = Array.from({ length: 5 }, (_, i) => ({
    x: 200 + i * 30,
    y: 200 + i * 20,
  }));

  return (
    <AnimatePresence>
      {isActive && stage > 0 && stage < 4 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {/* Stage 1: All four element particles gathering */}
          {stage >= 1 && stage < 3 && (
            <>
              {/* Water droplets from top-left */}
              {waterPositions.map((pos, i) => (
                <motion.div
                  key={`water-${i}`}
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

              {/* Fire embers from top-right */}
              {firePositions.map((pos, i) => (
                <motion.div
                  key={`fire-${i}`}
                  className="absolute w-4 h-4 bg-fire-400 rounded-full"
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

              {/* Earth rocks from bottom-left */}
              {earthPositions.map((pos, i) => (
                <motion.div
                  key={`earth-${i}`}
                  className="absolute w-4 h-4 bg-jade-400 rounded-sm"
                  initial={{
                    x: pos.x,
                    y: pos.y,
                    scale: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 0.8,
                    rotate: 180,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Air swirls from bottom-right */}
              {airPositions.map((pos, i) => (
                <motion.div
                  key={`air-${i}`}
                  className="absolute w-4 h-4 bg-air-400 rounded-full"
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
              {/* SVG Heart with avatar gradient (all 4 elements) */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="33%" stopColor="#f97316" stopOpacity="0.9" />
                    <stop offset="66%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0.9" />
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
                  fill="url(#avatarGradient)"
                  stroke="url(#avatarGradient)"
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

              {/* Orbiting element symbols around heart */}
              {stage === 3 && (
                <>
                  {/* Water droplet at 0° (right) */}
                  <motion.div
                    className="absolute w-6 h-6 bg-water-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      x: 120,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0,
                      duration: 0.5,
                    }}
                  />

                  {/* Fire flame at 90° (bottom) */}
                  <motion.div
                    className="absolute w-6 h-6 bg-fire-400"
                    style={{
                      left: '50%',
                      top: '50%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      x: 0,
                      y: 120,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                      duration: 0.5,
                    }}
                  />

                  {/* Earth crystal at 180° (left) */}
                  <motion.div
                    className="absolute w-6 h-6 bg-jade-400 rounded-sm"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      x: -120,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 45,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.5,
                    }}
                  />

                  {/* Air swirl at 270° (top) */}
                  <motion.div
                    className="absolute w-6 h-6 bg-air-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      x: 0,
                      y: -120,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.3,
                      duration: 0.5,
                    }}
                  />
                </>
              )}
            </motion.div>
          )}

          {/* Sparkle effects with all four element colors */}
          {stage === 3 && (
            <>
              {[...Array(12)].map((_, i) => {
                const colors = ['bg-water-400', 'bg-fire-400', 'bg-jade-400', 'bg-air-400'];
                const colorClass = colors[i % 4];

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className={`absolute w-2 h-2 ${colorClass} rounded-full`}
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
                );
              })}
            </>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
