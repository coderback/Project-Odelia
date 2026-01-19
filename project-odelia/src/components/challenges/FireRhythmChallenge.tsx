'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FireRhythmChallengeProps {
  onSuccess: () => void;
}

type GamePhase = 'watching' | 'playing' | 'success' | 'retry';

export default function FireRhythmChallenge({ onSuccess }: FireRhythmChallengeProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [activeOrb, setActiveOrb] = useState<number | null>(null);
  const [phase, setPhase] = useState<GamePhase>('watching');
  const [round, setRound] = useState(1);
  const [showingIndex, setShowingIndex] = useState(-1);

  // 4 flame orbs positioned around center
  const orbs = [
    { id: 0, angle: -90 },  // Top
    { id: 1, angle: 0 },    // Right
    { id: 2, angle: 90 },   // Bottom
    { id: 3, angle: 180 },  // Left
  ];

  // Generate a new sequence
  const generateSequence = useCallback((length: number) => {
    const newSequence: number[] = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 4));
    }
    return newSequence;
  }, []);

  // Start/restart the game
  const startRound = useCallback(() => {
    const sequenceLength = round + 1; // Round 1 = 2 orbs, Round 2 = 3 orbs, Round 3 = 4 orbs
    const newSequence = generateSequence(sequenceLength);
    setSequence(newSequence);
    setPlayerInput([]);
    setPhase('watching');
    setShowingIndex(-1);
  }, [round, generateSequence]);

  // Start initial round
  useEffect(() => {
    const timer = setTimeout(() => {
      startRound();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show the sequence to the player
  useEffect(() => {
    if (phase !== 'watching' || sequence.length === 0) return;

    let index = 0;
    const showNext = () => {
      if (index < sequence.length) {
        setShowingIndex(index);
        setActiveOrb(sequence[index]);

        setTimeout(() => {
          setActiveOrb(null);
          index++;
          setTimeout(showNext, 300); // Gap between orbs
        }, 600); // Orb lit duration
      } else {
        setShowingIndex(-1);
        setPhase('playing');
      }
    };

    const startTimer = setTimeout(showNext, 800);
    return () => clearTimeout(startTimer);
  }, [phase, sequence]);

  // Handle orb click
  const handleOrbClick = (orbId: number) => {
    if (phase !== 'playing') return;

    // Flash the clicked orb
    setActiveOrb(orbId);
    setTimeout(() => setActiveOrb(null), 200);

    const newInput = [...playerInput, orbId];
    setPlayerInput(newInput);

    // Check if correct
    const expectedOrb = sequence[newInput.length - 1];
    if (orbId !== expectedOrb) {
      // Wrong! Show retry feedback and restart round
      setPhase('retry');
      setTimeout(() => {
        setPlayerInput([]);
        startRound();
      }, 1000);
      return;
    }

    // Check if sequence complete
    if (newInput.length === sequence.length) {
      if (round >= 3) {
        // Victory! Completed all 3 rounds
        setPhase('success');
        setTimeout(() => {
          onSuccess();
        }, 800);
      } else {
        // Move to next round
        setPhase('success');
        setTimeout(() => {
          setRound(r => r + 1);
          setTimeout(() => {
            const nextLength = round + 2;
            const nextSequence = generateSequence(nextLength);
            setSequence(nextSequence);
            setPlayerInput([]);
            setPhase('watching');
            setShowingIndex(-1);
          }, 500);
        }, 800);
      }
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-fire-700 mb-2">
          Dragon Dance Sequence
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Learn the ancient dragon dance, passed down through generations since the era of Raava
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <span className="text-lg md:text-xl font-bold text-fire-500">
            Round {round}/3
          </span>
          <span className="text-sm md:text-base text-gray-500">
            {phase === 'watching' && '(Watch the sequence...)'}
            {phase === 'playing' && `(Your turn! ${playerInput.length}/${sequence.length})`}
            {phase === 'success' && '(Correct!)'}
            {phase === 'retry' && '(Try again!)'}
          </span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative bg-gradient-to-br from-fire-50 to-orange-50 rounded-lg p-4 md:p-8 shadow-inner">
        <div className="relative mx-auto" style={{ width: '320px', height: '320px' }}>
          {/* Center Dragon Symbol */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-fire-500 to-red-600 flex items-center justify-center shadow-lg"
              animate={
                phase === 'watching'
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 20px rgba(249, 115, 22, 0.3)',
                        '0 0 40px rgba(249, 115, 22, 0.6)',
                        '0 0 20px rgba(249, 115, 22, 0.3)',
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: 1.5,
                repeat: phase === 'watching' ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              {/* Dragon icon representation */}
              <motion.span
                className="text-5xl md:text-6xl"
                animate={{
                  rotate: phase === 'watching' ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                🐉
              </motion.span>
            </motion.div>
          </div>

          {/* 4 Flame Orbs */}
          {orbs.map((orb) => {
            const radius = 120;
            const angleRad = (orb.angle * Math.PI) / 180;
            const x = 160 + Math.cos(angleRad) * radius - 36;
            const y = 160 + Math.sin(angleRad) * radius - 36;
            const isActive = activeOrb === orb.id;
            const isClickable = phase === 'playing';

            return (
              <motion.button
                key={orb.id}
                className={`absolute w-[72px] h-[72px] rounded-full flex items-center justify-center transition-colors ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                style={{ left: x, top: y }}
                onClick={() => handleOrbClick(orb.id)}
                disabled={!isClickable}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                {/* Orb background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isActive
                      ? 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, #dc2626 100%)'
                      : 'radial-gradient(circle, #fed7aa 0%, #fdba74 50%, #fb923c 100%)',
                  }}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            '0 0 20px rgba(249, 115, 22, 0.8)',
                            '0 0 40px rgba(249, 115, 22, 1)',
                            '0 0 20px rgba(249, 115, 22, 0.8)',
                          ],
                        }
                      : { boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' }
                  }
                  transition={{ duration: 0.3 }}
                />

                {/* Flame emoji */}
                <motion.span
                  className="relative z-10 text-3xl"
                  animate={
                    isActive
                      ? { scale: [1, 1.3, 1], y: [-2, -8, -2] }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  🔥
                </motion.span>

                {/* Ripple effect when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-fire-400"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}

          {/* Sequence progress indicator */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {sequence.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < playerInput.length
                    ? 'bg-fire-500'
                    : showingIndex === index
                    ? 'bg-fire-400'
                    : 'bg-gray-300'
                }`}
                animate={
                  showingIndex === index
                    ? { scale: [1, 1.3, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Phase indicator */}
        <AnimatePresence mode="wait">
          {phase === 'retry' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg"
            >
              <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
                <p className="text-fire-600 font-bold text-lg">Watch again...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper text */}
      <p className="text-center mt-6 text-sm text-gray-500">
        {phase === 'watching'
          ? "Watch the dragon's flame pattern carefully"
          : phase === 'playing'
          ? "Click the flames in the same order"
          : phase === 'success' && round >= 3
          ? "You've mastered the ancient dragon dance!"
          : "Well done! Watch the next sequence..."}
      </p>
    </div>
  );
}
