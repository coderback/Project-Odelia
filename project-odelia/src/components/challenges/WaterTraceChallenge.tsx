'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaterTraceChallengeProps {
  onSuccess: () => void;
}

interface Card {
  id: number;
  symbol: string;
  symbolName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = [
  { symbol: '🌙', name: 'Moon Spirit' },
  { symbol: '🌊', name: 'Ocean Spirit' },
  { symbol: '💧', name: 'Water Tribe' },
  { symbol: '🐟', name: 'Koi Fish' },
];

// Create shuffled deck of 8 cards (4 pairs)
function createDeck(): Card[] {
  const pairs = SYMBOLS.flatMap((s, index) => [
    { id: index * 2, symbol: s.symbol, symbolName: s.name, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, symbol: s.symbol, symbolName: s.name, isFlipped: false, isMatched: false },
  ]);

  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
}

export default function WaterTraceChallenge({ onSuccess }: WaterTraceChallengeProps) {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);

  // Check for win condition
  useEffect(() => {
    if (matchedCount === 4) {
      setTimeout(() => {
        onSuccess();
      }, 800);
    }
  }, [matchedCount, onSuccess]);

  // Handle card click
  const handleCardClick = (index: number) => {
    // Ignore if checking, already flipped, or already matched
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    // Ignore if two cards already flipped
    if (flippedIndices.length >= 2) return;

    // Flip the card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [first, second] = newFlipped;

      if (cards[first].symbol === cards[second].symbol) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setMatchedCount(prev => prev + 1);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-2 md:p-4">
      {/* Title and Instructions */}
      <div className="text-center mb-4 md:mb-6 px-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-water-700 mb-2">
          Spirit Oasis Memory
        </h3>
        <p className="text-sm md:text-lg text-gray-600">
          Like Tui and La, find the pairs that bring balance
        </p>
        <div className="mt-2">
          <span className="text-lg md:text-xl font-bold text-water-500">
            {matchedCount}/4 Pairs Matched
          </span>
        </div>
      </div>

      {/* Card Grid */}
      <div className="relative bg-gradient-to-br from-water-50 to-teal-50 rounded-lg p-4 md:p-8 shadow-inner">
        {/* Subtle water animation background */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-water-300 via-teal-300 to-water-300"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* 2x4 Grid of Cards */}
        <div className="relative grid grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              className="relative aspect-[3/4] cursor-pointer perspective-1000"
              onClick={() => handleCardClick(index)}
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              disabled={card.isMatched}
            >
              <AnimatePresence mode="wait">
                {card.isFlipped || card.isMatched ? (
                  // Card Front (revealed)
                  <motion.div
                    key="front"
                    className={`absolute inset-0 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-lg ${
                      card.isMatched
                        ? 'bg-gradient-to-br from-teal-400 to-water-500'
                        : 'bg-gradient-to-br from-water-100 to-teal-100'
                    }`}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={card.isMatched ? 'drop-shadow-lg' : ''}>
                      {card.symbol}
                    </span>

                    {/* Match glow effect */}
                    {card.isMatched && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ boxShadow: '0 0 0 0 rgba(45, 212, 191, 0)' }}
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(45, 212, 191, 0.4)',
                            '0 0 20px 10px rgba(45, 212, 191, 0)',
                          ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ) : (
                  // Card Back (hidden)
                  <motion.div
                    key="back"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-water-500 to-water-700 shadow-lg flex items-center justify-center overflow-hidden"
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Wave pattern on card back */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
                        fill="white"
                        animate={{
                          d: [
                            'M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z',
                            'M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z',
                            'M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </svg>

                    {/* Water symbol */}
                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-lg md:text-xl">💧</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center mt-4 text-sm text-gray-500">
        {matchedCount < 4
          ? "Click cards to reveal and match the spirit pairs"
          : "Balance restored! The spirits dance in harmony."}
      </p>
    </div>
  );
}
