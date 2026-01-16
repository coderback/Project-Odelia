'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AirGuideChallengeProps {
  onSuccess: () => void;
}

export default function AirGuideChallenge({ onSuccess }: AirGuideChallengeProps) {
  const [particlePos, setParticlePos] = useState({ x: 100, y: 250 });
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 250 });
  const [ringsReached, setRingsReached] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // 3 waypoint rings
  const rings = [
    { id: 0, x: 250, y: 200, radius: 50 },
    { id: 1, x: 400, y: 300, radius: 50 },
    { id: 2, x: 550, y: 200, radius: 50 },
  ];

  // Target (after all rings)
  const target = { x: 650, y: 250, radius: 60 };

  // Handle mouse/touch movement
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 700;
    const y = ((clientY - rect.top) / rect.height) * 500;

    setCursorPos({ x, y });
  };

  // Move particle toward cursor (magnetic attraction)
  useEffect(() => {
    const interval = setInterval(() => {
      setParticlePos((prev) => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) return prev;

        const speed = 4; // pixels per frame
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 30); // ~30 FPS

    return () => clearInterval(interval);
  }, [cursorPos]);

  // Check collision with rings and target
  useEffect(() => {
    // Check rings
    rings.forEach((ring) => {
      const dx = particlePos.x - ring.x;
      const dy = particlePos.y - ring.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ring.radius && !ringsReached.has(ring.id)) {
        setRingsReached((prev) => new Set(prev).add(ring.id));
      }
    });

    // Check target (only if all rings completed)
    if (ringsReached.size === 3) {
      const dx = particlePos.x - target.x;
      const dy = particlePos.y - target.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < target.radius) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    }
  }, [particlePos, ringsReached, onSuccess]);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-air-700 mb-2">
          Sky Bison Wind Guide
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Move your cursor to guide the wind through all waypoints
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-air-500">
            {ringsReached.size}/3 Waypoints Reached
          </span>
        </div>
      </div>

      {/* Game Canvas */}
      <div
        ref={containerRef}
        className="relative bg-gradient-to-br from-air-50 to-sky-50 rounded-lg shadow-inner overflow-hidden cursor-none touch-none"
        style={{ height: '400px', maxHeight: '500px' }}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        <svg viewBox="0 0 700 500" className="w-full h-full">
          {/* Waypoint Rings */}
          {rings.map((ring) => {
            const isReached = ringsReached.has(ring.id);

            return (
              <g key={ring.id}>
                {/* Ring */}
                <motion.circle
                  cx={ring.x}
                  cy={ring.y}
                  r={ring.radius}
                  fill="none"
                  stroke={isReached ? '#facc15' : '#cbd5e1'}
                  strokeWidth="4"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={
                    isReached
                      ? { scale: [1, 1.2, 1], opacity: 1 }
                      : { scale: 1, opacity: 0.6 }
                  }
                  transition={
                    isReached
                      ? { duration: 0.5 }
                      : {}
                  }
                />

                {/* Ring number */}
                <text
                  x={ring.x}
                  y={ring.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isReached ? '#facc15' : '#94a3b8'}
                  fontSize="24"
                  fontWeight="bold"
                >
                  {ring.id + 1}
                </text>

                {/* Checkmark for completed rings */}
                {isReached && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <circle cx={ring.x + 25} cy={ring.y - 25} r="15" fill="#22c55e" />
                    <path
                      d={`M ${ring.x + 18} ${ring.y - 25} L ${ring.x + 23} ${ring.y - 20} L ${ring.x + 32} ${ring.y - 30}`}
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* Target (appears after all rings completed) */}
          {ringsReached.size === 3 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.circle
                cx={target.x}
                cy={target.y}
                r={target.radius}
                fill="rgba(250, 204, 21, 0.2)"
                stroke="#facc15"
                strokeWidth="4"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <text
                x={target.x}
                y={target.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#facc15"
                fontSize="28"
                fontWeight="bold"
              >
                TARGET
              </text>
            </motion.g>
          )}

          {/* Floating Particle */}
          <motion.g>
            <motion.circle
              cx={particlePos.x}
              cy={particlePos.y}
              r="12"
              fill="#facc15"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Trail effect */}
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={particlePos.x}
                cy={particlePos.y}
                r="12"
                fill="#facc15"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2 + i, opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.g>

          {/* Cursor indicator */}
          <motion.circle
            cx={cursorPos.x}
            cy={cursorPos.y}
            r="8"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {ringsReached.size < 3
          ? "Move your cursor to attract the wind particle - guide it through each waypoint"
          : "Almost there! Guide the wind to the target to complete your mastery."}
      </p>
    </div>
  );
}
