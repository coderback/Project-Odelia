'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ElementCard from '../ui/ElementCard';
import { ElementType } from '@/types';

interface ElementHubProps {
  masteredElements: Set<ElementType>;
  onSelectElement: (element: ElementType) => void;
  onAllComplete: () => void;
}

export default function ElementHub({ masteredElements, onSelectElement, onAllComplete }: ElementHubProps) {
  // Check if all 4 mastered
  useEffect(() => {
    if (masteredElements.size === 4) {
      onAllComplete();
    }
  }, [masteredElements, onAllComplete]);

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8 px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center space-y-2 px-2">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-black leading-tight"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Master the Four Elements, Odelia
        </motion.h1>
        <motion.p
          className="text-base md:text-xl text-gray-600 font-calligraphy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {masteredElements.size}/4 Elements Mastered
        </motion.p>
      </div>

      {/* Element Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {(['water', 'fire', 'earth', 'air'] as const).map((element, index) => (
          <motion.div
            key={element}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <ElementCard
              element={element}
              isMastered={masteredElements.has(element)}
              onClick={() => onSelectElement(element)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
