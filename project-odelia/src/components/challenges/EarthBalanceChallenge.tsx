'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EarthBalanceChallengeProps {
  onSuccess: () => void;
}

interface Crystal {
  id: number;
  symbol: string;
  symbolName: string;
  x: number;
  y: number;
  matched: boolean;
  selected: boolean;
}

const SYMBOLS = [
  { symbol: '🦡', name: 'Badgermole' },
  { symbol: '🏔️', name: 'Mountain' },
  { symbol: '💎', name: 'Crystal' },
];

let crystalIdCounter = 0;

function createCrystals(): Crystal[] {
  const crystals: Crystal[] = [];

  // Create pairs of crystals (6 total = 3 pairs)
  SYMBOLS.forEach((s) => {
    // First of pair
    crystals.push({
      id: ++crystalIdCounter,
      symbol: s.symbol,
      symbolName: s.name,
      x: 15 + Math.random() * 70, // Random x position (15-85%)
      y: -10 - Math.random() * 30, // Start above screen
      matched: false,
      selected: false,
    });
    // Second of pair
    crystals.push({
      id: ++crystalIdCounter,
      symbol: s.symbol,
      symbolName: s.name,
      x: 15 + Math.random() * 70,
      y: -40 - Math.random() * 30,
      matched: false,
      selected: false,
    });
  });

  return crystals;
}

export default function EarthBalanceChallenge({ onSuccess }: EarthBalanceChallengeProps) {
  const [crystals, setCrystals] = useState<Crystal[]>(() => createCrystals());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Check win condition
  useEffect(() => {
    if (matchedCount === 3) {
      setTimeout(() => {
        onSuccess();
      }, 800);
    }
  }, [matchedCount, onSuccess]);

  // Animate falling crystals
  useEffect(() => {
    const fallSpeed = 0.015; // Slow descent (% per frame)

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setCrystals(prev => prev.map(crystal => {
        if (crystal.matched) return crystal;

        const newY = crystal.y + fallSpeed * delta;

        // Reset crystal position if it falls below screen (respawn at top)
        if (newY > 100) {
          return {
            ...crystal,
            y: -20,
            x: 15 + Math.random() * 70,
          };
        }

        return { ...crystal, y: newY };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle crystal click
  const handleCrystalClick = (crystalId: number) => {
    const crystal = crystals.find(c => c.id === crystalId);
    if (!crystal || crystal.matched) return;

    if (selectedId === null) {
      // First selection
      setSelectedId(crystalId);
      setCrystals(prev => prev.map(c =>
        c.id === crystalId ? { ...c, selected: true } : c
      ));
    } else if (selectedId === crystalId) {
      // Deselect same crystal
      setSelectedId(null);
      setCrystals(prev => prev.map(c =>
        c.id === crystalId ? { ...c, selected: false } : c
      ));
    } else {
      // Second selection - check for match
      const firstCrystal = crystals.find(c => c.id === selectedId);
      if (firstCrystal && firstCrystal.symbol === crystal.symbol) {
        // Match found!
        setCrystals(prev => prev.map(c =>
          c.id === selectedId || c.id === crystalId
            ? { ...c, matched: true, selected: false }
            : c
        ));
        setMatchedCount(prev => prev + 1);
      } else {
        // No match - deselect both
        setCrystals(prev => prev.map(c =>
          c.id === selectedId ? { ...c, selected: false } : c
        ));
      }
      setSelectedId(null);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-earth-700 mb-2">
          Crystal Cavern Match
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          The Badgermoles carved these crystals - restore their pattern
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-jade-500">
            {matchedCount}/3 Pairs Matched
          </span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 rounded-lg shadow-inner overflow-hidden" style={{ height: '400px' }}>
        {/* Cave stalactites background */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0,0 L0,10 L5,5 L10,12 L15,6 L20,10 L25,4 L30,11 L35,7 L40,10 L45,5 L50,13 L55,6 L60,9 L65,5 L70,11 L75,7 L80,10 L85,4 L90,12 L95,6 L100,10 L100,0 Z"
              fill="#44403c"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Ground danger zone */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-red-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800/60" />

        {/* Crystals */}
        <AnimatePresence>
          {crystals.map((crystal) => (
            <motion.button
              key={crystal.id}
              className={`absolute w-16 h-16 md:w-20 md:h-20 cursor-pointer ${
                crystal.matched ? 'pointer-events-none' : ''
              }`}
              style={{
                left: `${crystal.x}%`,
                top: `${crystal.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleCrystalClick(crystal.id)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: crystal.matched ? [1, 1.5, 0] : 1,
                rotate: crystal.matched ? 180 : 0,
                opacity: crystal.matched ? [1, 1, 0] : 1,
              }}
              transition={{
                scale: { duration: crystal.matched ? 0.6 : 0.3 },
                opacity: { duration: 0.6 },
              }}
              whileHover={!crystal.matched ? { scale: 1.1 } : {}}
              whileTap={!crystal.matched ? { scale: 0.95 } : {}}
            >
              {/* Crystal shape */}
              <motion.div
                className={`w-full h-full relative ${
                  crystal.selected
                    ? 'ring-4 ring-yellow-400 ring-opacity-80'
                    : ''
                }`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: crystal.matched
                    ? 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)'
                    : crystal.selected
                    ? 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)'
                    : 'linear-gradient(135deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
                  boxShadow: crystal.selected
                    ? '0 0 30px rgba(251, 191, 36, 0.8)'
                    : '0 4px 20px rgba(16, 185, 129, 0.4)',
                }}
                animate={
                  crystal.selected
                    ? {
                        boxShadow: [
                          '0 0 20px rgba(251, 191, 36, 0.6)',
                          '0 0 40px rgba(251, 191, 36, 0.9)',
                          '0 0 20px rgba(251, 191, 36, 0.6)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.8, repeat: crystal.selected ? Infinity : 0 }}
              >
                {/* Inner glow */}
                <div className="absolute inset-2 bg-white/20 rounded-full blur-sm" />

                {/* Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl">{crystal.symbol}</span>
                </div>

                {/* Facet lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="1" />
                  <line x1="25" y1="15" x2="75" y2="85" stroke="white" strokeWidth="0.5" />
                  <line x1="75" y1="15" x2="25" y2="85" stroke="white" strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Sparkle effect for matched crystals */}
              {crystal.matched && (
                <>
                  {[...Array(6)].map((_, i) => (
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
                        x: Math.cos((i * Math.PI * 2) / 6) * 50,
                        y: Math.sin((i * Math.PI * 2) / 6) * 50,
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

        {/* Progress indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                i < matchedCount
                  ? 'bg-jade-500'
                  : 'bg-stone-600'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                rotate: i < matchedCount ? 0 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: i * 0.1,
              }}
            >
              {i < matchedCount && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-white text-lg"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {matchedCount < 3
          ? "Click two crystals with the same symbol to match them"
          : "Perfect harmony! Like earth, you stand unshakeable."}
      </p>
    </div>
  );
}
