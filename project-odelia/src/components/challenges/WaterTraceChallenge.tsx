'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WaterTraceChallengeProps {
  onSuccess: () => void;
}

export default function WaterTraceChallenge({ onSuccess }: WaterTraceChallengeProps) {
  const [progress, setProgress] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);

  // Define the flowing path points (S-curve river)
  const pathPoints = [
    { x: 100, y: 200 },
    { x: 150, y: 180 },
    { x: 200, y: 200 },
    { x: 250, y: 240 },
    { x: 300, y: 260 },
    { x: 350, y: 240 },
    { x: 400, y: 200 },
    { x: 450, y: 180 },
    { x: 500, y: 200 },
    { x: 550, y: 220 },
    { x: 600, y: 200 },
  ];

  // Auto-complete for accessibility
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onSuccess();
      }, 500);
    }
  }, [progress, onSuccess]);

  const handlePointInteraction = (index: number) => {
    if (index === currentPoint) {
      setCurrentPoint(index + 1);
      setProgress(((index + 1) / pathPoints.length) * 100);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-water-700 mb-2">
          Flow Like Water
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Trace the flowing river - hover or tap each droplet in sequence
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-water-500">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-gradient-to-br from-water-50 to-teal-50 rounded-lg p-4 md:p-8 shadow-inner">
        <svg
          viewBox="0 0 700 400"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* Background path (gray line showing the route) */}
          <path
            d={`M ${pathPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`}
            stroke="#cbd5e1"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Progress path (blue gradient) */}
          <defs>
            <linearGradient id="waterTraceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>

          <motion.path
            d={`M ${pathPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`}
            stroke="url(#waterTraceGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.3 }}
          />

          {/* Interactive points (water droplets) */}
          {pathPoints.map((point, index) => {
            const isCompleted = index < currentPoint;
            const isCurrent = index === currentPoint;
            const isLocked = index > currentPoint;

            return (
              <motion.g
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {/* Hover/Tap area (larger hitbox for accessibility) */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="30"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => handlePointInteraction(index)}
                  onTouchStart={() => handlePointInteraction(index)}
                  onClick={() => handlePointInteraction(index)}
                />

                {/* Visual droplet */}
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={isCurrent ? "12" : "8"}
                  fill={isCompleted ? '#2dd4bf' : isCurrent ? '#38bdf8' : '#94a3b8'}
                  opacity={isLocked ? 0.3 : 1}
                  animate={
                    isCurrent
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: isCurrent ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />

                {/* Ripple effect for current point */}
                {isCurrent && (
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    initial={{ r: 8, opacity: 0.8 }}
                    animate={{ r: 20, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {progress < 100
          ? "Touch or hover over the glowing droplet to continue"
          : "Well done! The water flows through you."}
      </p>
    </div>
  );
}
