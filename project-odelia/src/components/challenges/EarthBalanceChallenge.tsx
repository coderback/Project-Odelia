'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Rock {
  id: string;
  x: number;
  caught: boolean;
}

interface EarthBalanceChallengeProps {
  onSuccess: () => void;
}

export default function EarthBalanceChallenge({ onSuccess }: EarthBalanceChallengeProps) {
  const [rocks, setRocks] = useState<Rock[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const totalRocks = 5;
  const rockIdCounter = useRef(0);
  const hasSpawned = useRef(false);

  // Spawn rocks one by one
  useEffect(() => {
    // Prevent double-spawning in React Strict Mode
    if (hasSpawned.current) return;
    hasSpawned.current = true;

    const spawnDelays = [0, 2000, 4000, 6000, 8000];
    const timeouts: NodeJS.Timeout[] = [];

    spawnDelays.forEach((delay) => {
      const timeout = setTimeout(() => {
        rockIdCounter.current += 1;
        const newRock: Rock = {
          id: `rock-${rockIdCounter.current}`,
          x: 20 + Math.random() * 60, // Random x position (20-80%)
          caught: false,
        };
        setRocks((prev) => [...prev, newRock]);
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Check if all caught
  useEffect(() => {
    if (caughtCount >= totalRocks) {
      setTimeout(() => {
        onSuccess();
      }, 500);
    }
  }, [caughtCount, onSuccess]);

  const handleRockClick = (rockId: string) => {
    setRocks((prev) =>
      prev.map((rock) =>
        rock.id === rockId && !rock.caught ? { ...rock, caught: true } : rock
      )
    );
    setCaughtCount((prev) => prev + 1);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-earth-700 mb-2">
          Badgermole Balance
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Catch the falling rocks before they reach the ground
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-jade-500">
            {caughtCount}/{totalRocks} Caught
          </span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative bg-gradient-to-br from-jade-50 to-earth-50 rounded-lg shadow-inner overflow-hidden" style={{ height: '400px', maxHeight: '500px' }}>
        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-earth-600" />

        <AnimatePresence>
          {rocks.map((rock) => (
            <motion.button
              key={rock.id}
              className={`absolute w-14 h-14 rounded-md flex items-center justify-center ${
                rock.caught
                  ? 'bg-jade-400 cursor-default'
                  : 'bg-earth-600 cursor-pointer'
              }`}
              style={{
                left: `${rock.x}%`,
              }}
              initial={{ y: -60, rotate: 0 }}
              animate={
                rock.caught
                  ? {
                      y: rock.caught ? [null, -20] : 500,
                      rotate: [null, 45],
                      scale: [null, 1.2, 1.2],
                    }
                  : {
                      y: 500,
                      rotate: 360,
                    }
              }
              transition={
                rock.caught
                  ? {
                      duration: 0.5,
                      ease: 'easeOut',
                    }
                  : {
                      y: { duration: 5, ease: 'linear' },
                      rotate: { duration: 5, ease: 'linear' },
                    }
              }
              onClick={() => handleRockClick(rock.id)}
              disabled={rock.caught}
              whileHover={!rock.caught ? { scale: 1.1 } : {}}
              whileTap={!rock.caught ? { scale: 0.9 } : {}}
              exit={{ opacity: 0, scale: 0 }}
            >
              {rock.caught ? (
                /* Jade crystal with checkmark */
                <motion.svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              ) : (
                /* Rock texture */
                <div className="w-full h-full bg-earth-700 rounded-md opacity-50" />
              )}

              {/* Sparkle effect for caught rocks */}
              {rock.caught && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-jade-300 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, (i % 2 === 0 ? 20 : -20) * Math.cos((i * Math.PI) / 2)],
                        y: [0, (i % 2 === 0 ? 20 : -20) * Math.sin((i * Math.PI) / 2)],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Floating caught rocks display */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(totalRocks)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-8 h-8 rounded-sm ${
                i < caughtCount ? 'bg-jade-400' : 'bg-gray-300'
              }`}
              initial={{ scale: 0, rotate: 0 }}
              animate={
                i < caughtCount
                  ? {
                      scale: 1,
                      rotate: 45,
                    }
                  : { scale: 1 }
              }
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            />
          ))}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {caughtCount < totalRocks
          ? "Click the falling rocks to transform them into jade crystals"
          : "Perfect balance! Like earth, you stand unshakeable."}
      </p>
    </div>
  );
}
