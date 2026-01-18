'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AirGuideChallengeProps {
  onSuccess: () => void;
}

interface Cloud {
  id: number;
  symbol: string;
  symbolName: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  revealed: boolean;
  matched: boolean;
  size: number;
}

const SYMBOLS = [
  { symbol: '🌀', name: 'Air Swirl' },
  { symbol: '🦬', name: 'Sky Bison' },
  { symbol: '🪁', name: 'Glider' },
];

let cloudIdCounter = 0;

function createClouds(): Cloud[] {
  const clouds: Cloud[] = [];

  // Create pairs of clouds (6 total = 3 pairs)
  SYMBOLS.forEach((s) => {
    // First of pair
    clouds.push({
      id: ++cloudIdCounter,
      symbol: s.symbol,
      symbolName: s.name,
      x: 10 + Math.random() * 30, // Left side
      y: 15 + Math.random() * 60,
      speedX: 0.02 + Math.random() * 0.02,
      speedY: (Math.random() - 0.5) * 0.01,
      revealed: false,
      matched: false,
      size: 80 + Math.random() * 20,
    });
    // Second of pair
    clouds.push({
      id: ++cloudIdCounter,
      symbol: s.symbol,
      symbolName: s.name,
      x: 55 + Math.random() * 30, // Right side
      y: 15 + Math.random() * 60,
      speedX: 0.02 + Math.random() * 0.02,
      speedY: (Math.random() - 0.5) * 0.01,
      revealed: false,
      matched: false,
      size: 80 + Math.random() * 20,
    });
  });

  return clouds;
}

export default function AirGuideChallenge({ onSuccess }: AirGuideChallengeProps) {
  const [clouds, setClouds] = useState<Cloud[]>(() => createClouds());
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

  // Animate drifting clouds
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setClouds(prev => prev.map(cloud => {
        if (cloud.matched) return cloud;

        let newX = cloud.x + cloud.speedX * delta * 0.05;
        let newY = cloud.y + cloud.speedY * delta * 0.05;

        // Wrap around horizontally
        if (newX > 100) newX = -15;
        if (newX < -15) newX = 100;

        // Bounce vertically
        if (newY > 80 || newY < 10) {
          return { ...cloud, x: newX, speedY: -cloud.speedY };
        }

        return { ...cloud, x: newX, y: newY };
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

  // Handle cloud click
  const handleCloudClick = (cloudId: number) => {
    const cloud = clouds.find(c => c.id === cloudId);
    if (!cloud || cloud.matched) return;

    if (selectedId === null) {
      // First selection - reveal the cloud
      setSelectedId(cloudId);
      setClouds(prev => prev.map(c =>
        c.id === cloudId ? { ...c, revealed: true } : c
      ));
    } else if (selectedId === cloudId) {
      // Deselect same cloud
      setSelectedId(null);
      setClouds(prev => prev.map(c =>
        c.id === cloudId ? { ...c, revealed: false } : c
      ));
    } else {
      // Second selection - reveal and check for match
      setClouds(prev => prev.map(c =>
        c.id === cloudId ? { ...c, revealed: true } : c
      ));

      const firstCloud = clouds.find(c => c.id === selectedId);

      if (firstCloud && firstCloud.symbol === cloud.symbol) {
        // Match found!
        setTimeout(() => {
          setClouds(prev => prev.map(c =>
            c.id === selectedId || c.id === cloudId
              ? { ...c, matched: true }
              : c
          ));
          setMatchedCount(prev => prev + 1);
        }, 400);
      } else {
        // No match - hide both after delay
        setTimeout(() => {
          setClouds(prev => prev.map(c =>
            c.id === selectedId || c.id === cloudId
              ? { ...c, revealed: false }
              : c
          ));
        }, 800);
      }
      setSelectedId(null);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-air-700 mb-2">
          Sky Bison Cloud Match
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Like Appa finding his way home, unite the sky spirits
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-air-500">
            {matchedCount}/3 Pairs Matched
          </span>
        </div>
      </div>

      {/* Game Canvas - Sky */}
      <div className="relative bg-gradient-to-b from-sky-300 via-sky-200 to-yellow-100 rounded-lg shadow-inner overflow-hidden" style={{ height: '400px' }}>
        {/* Sun */}
        <motion.div
          className="absolute top-4 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400"
          style={{ boxShadow: '0 0 60px rgba(250, 204, 21, 0.6)' }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 60px rgba(250, 204, 21, 0.6)',
              '0 0 80px rgba(250, 204, 21, 0.8)',
              '0 0 60px rgba(250, 204, 21, 0.6)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Distant mountains */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0,20 L0,15 L10,8 L20,14 L30,5 L40,12 L50,3 L60,10 L70,6 L80,12 L90,8 L100,14 L100,20 Z"
              fill="#93c5fd"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Clouds */}
        <AnimatePresence>
          {clouds.map((cloud) => (
            <motion.button
              key={cloud.id}
              className={`absolute cursor-pointer ${cloud.matched ? 'pointer-events-none' : ''}`}
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: cloud.size,
                height: cloud.size * 0.6,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleCloudClick(cloud.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: cloud.matched ? [1, 1.3, 0] : 1,
                opacity: cloud.matched ? [1, 1, 0] : 1,
                y: cloud.matched ? -50 : 0,
              }}
              transition={{
                scale: { duration: cloud.matched ? 0.8 : 0.3 },
                y: { duration: 0.8 },
              }}
              whileHover={!cloud.matched ? { scale: 1.1 } : {}}
              whileTap={!cloud.matched ? { scale: 0.95 } : {}}
            >
              {/* Cloud shape */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  y: [0, -3, 0, 3, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Cloud body using multiple circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`absolute rounded-full transition-colors duration-300 ${
                      cloud.revealed || cloud.matched
                        ? 'bg-gradient-to-br from-yellow-100 to-amber-200'
                        : 'bg-gradient-to-br from-white to-gray-100'
                    }`}
                    style={{
                      width: '70%',
                      height: '100%',
                      left: '15%',
                      top: 0,
                      boxShadow: cloud.revealed
                        ? '0 4px 20px rgba(250, 204, 21, 0.4)'
                        : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <div
                    className={`absolute rounded-full transition-colors duration-300 ${
                      cloud.revealed || cloud.matched
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-100'
                        : 'bg-gradient-to-br from-white to-gray-50'
                    }`}
                    style={{
                      width: '50%',
                      height: '80%',
                      left: 0,
                      top: '10%',
                    }}
                  />
                  <div
                    className={`absolute rounded-full transition-colors duration-300 ${
                      cloud.revealed || cloud.matched
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-100'
                        : 'bg-gradient-to-br from-white to-gray-50'
                    }`}
                    style={{
                      width: '45%',
                      height: '70%',
                      right: 0,
                      top: '20%',
                    }}
                  />
                </div>

                {/* Symbol (visible when revealed) */}
                <AnimatePresence>
                  {(cloud.revealed || cloud.matched) && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="text-3xl md:text-4xl drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                        }}
                      >
                        {cloud.symbol}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Question mark when hidden */}
                {!cloud.revealed && !cloud.matched && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-400 font-bold">?</span>
                  </div>
                )}

                {/* Glow effect when revealed */}
                {cloud.revealed && !cloud.matched && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ boxShadow: '0 0 0 0 rgba(250, 204, 21, 0)' }}
                    animate={{
                      boxShadow: [
                        '0 0 10px 5px rgba(250, 204, 21, 0.3)',
                        '0 0 20px 10px rgba(250, 204, 21, 0.5)',
                        '0 0 10px 5px rgba(250, 204, 21, 0.3)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Rainbow sparkle effect for matched clouds */}
              {cloud.matched && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        background: `hsl(${(i * 45) % 360}, 80%, 60%)`,
                      }}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        x: Math.cos((i * Math.PI * 2) / 8) * 60,
                        y: Math.sin((i * Math.PI * 2) / 8) * 60 - 30,
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
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
              className={`w-10 h-6 rounded-full flex items-center justify-center ${
                i < matchedCount
                  ? 'bg-gradient-to-br from-yellow-300 to-amber-400'
                  : 'bg-white/60'
              }`}
              style={{
                boxShadow: i < matchedCount
                  ? '0 2px 10px rgba(250, 204, 21, 0.5)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
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
                  className="text-white text-sm"
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
          ? "Click clouds to reveal their spirits, then find matching pairs"
          : "The sky spirits are united! Like air, you soar freely."}
      </p>
    </div>
  );
}
