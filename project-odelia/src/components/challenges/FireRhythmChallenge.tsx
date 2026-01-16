'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FireRhythmChallengeProps {
  onSuccess: () => void;
}

export default function FireRhythmChallenge({ onSuccess }: FireRhythmChallengeProps) {
  const [activeCircle, setActiveCircle] = useState(0);
  const [clickedCircles, setClickedCircles] = useState<Set<number>>(new Set());

  // 5 circles arranged around center
  const circles = Array.from({ length: 5 }, (_, i) => ({
    angle: (i / 5) * Math.PI * 2 - Math.PI / 2, // Start from top
    radius: 150,
  }));

  // Auto-pulse through circles
  useEffect(() => {
    if (clickedCircles.size >= 5) {
      setTimeout(() => {
        onSuccess();
      }, 500);
      return;
    }

    const interval = setInterval(() => {
      setActiveCircle((prev) => (prev + 1) % 5);
    }, 1400); // Pulse every 1.4 seconds

    return () => clearInterval(interval);
  }, [clickedCircles, onSuccess]);

  const handleCircleClick = (index: number) => {
    // Accept clicks for current or adjacent circles (forgiving timing)
    const isValidClick =
      index === activeCircle ||
      Math.abs(index - activeCircle) === 1 ||
      Math.abs(index - activeCircle) === 4; // Wrap around

    if (isValidClick && !clickedCircles.has(index)) {
      setClickedCircles((prev) => new Set(prev).add(index));
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-fire-700 mb-2">
          Dragon's Breath Rhythm
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Click each flame as it pulses - match the dragon's breathing pattern
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-fire-500">
            {clickedCircles.size}/5 Completed
          </span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative bg-gradient-to-br from-fire-50 to-orange-50 rounded-lg p-4 md:p-8 shadow-inner flex items-center justify-center" style={{ minHeight: '350px', maxHeight: '450px' }}>
        <div className="relative w-[400px] h-[400px]">
          {/* Center Fire Symbol */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-20 h-20 bg-gradient-to-t from-fire-600 to-fire-400"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          </motion.div>

          {/* 5 Breath Circles */}
          {circles.map((circle, index) => {
            const isClicked = clickedCircles.has(index);
            const isActive = activeCircle === index;

            const x = 200 + Math.cos(circle.angle) * circle.radius;
            const y = 200 + Math.sin(circle.angle) * circle.radius;

            return (
              <motion.button
                key={index}
                className={`absolute w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                  isClicked
                    ? 'bg-fire-400 border-fire-600'
                    : 'bg-transparent border-fire-400'
                }`}
                style={{
                  left: x - 40,
                  top: y - 40,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive && !isClicked ? [1, 1.3, 1] : 1,
                  opacity: isClicked ? 0.7 : 1,
                }}
                transition={{
                  scale: { duration: 0.7, repeat: isActive && !isClicked ? Infinity : 0 },
                  opacity: { duration: 0.3 },
                }}
                whileHover={{ scale: isClicked ? 1 : 1.1 }}
                whileTap={{ scale: isClicked ? 1 : 0.95 }}
                onClick={() => handleCircleClick(index)}
                disabled={isClicked}
              >
                {/* Checkmark for clicked circles */}
                {isClicked && (
                  <motion.svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}

                {/* Pulsing glow for active circle */}
                {isActive && !isClicked && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-fire-400"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}

                {/* Ember particles */}
                {!isClicked && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-fire-400 rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {clickedCircles.size < 5
          ? "Click the glowing circle - timing doesn't have to be perfect!"
          : "Excellent! You've captured the dragon's rhythm."}
      </p>
    </div>
  );
}
