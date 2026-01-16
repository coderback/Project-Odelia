'use client';

import { motion } from 'framer-motion';
import { getElementConfig } from '@/lib/elements';
import { ElementType } from '@/types';

interface ElementCardProps {
  element: ElementType;
  isMastered: boolean;
  onClick: () => void;
}

export default function ElementCard({ element, isMastered, onClick }: ElementCardProps) {
  const config = getElementConfig(element);

  if (!config) return null;

  // Render element-specific symbol using actual ATLA symbols
  const renderSymbol = () => {
    switch (element) {
      case 'water':
        return (
          <motion.img
            src="/images/water_symbol.jpg"
            alt="Water Symbol"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'fire':
        return (
          <motion.img
            src="/images/fire_symbol.jpg"
            alt="Fire Symbol"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'earth':
        return (
          <motion.img
            src="/images/earth_symbol.jpg"
            alt="Earth Symbol"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'air':
        return (
          <motion.img
            src="/images/air_symbol.jpg"
            alt="Air Symbol"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            animate={{
              x: [-5, 5, -5],
              y: [0, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className="bg-white p-6 md:p-8 rounded-xl relative overflow-hidden min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center gap-3 md:gap-4 border-4 border-white w-full shadow-md"
      whileHover={{
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        borderColor: config.colors.primary,
      }}
      whileTap={{
        scale: 0.98,
        borderColor: config.colors.primary,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Element Symbol */}
      <div className="relative z-10">{renderSymbol()}</div>

      {/* Element Name */}
      <h2 className={`text-2xl md:text-4xl font-display font-bold ${config.colors.text} relative z-10`}>
        {config.name}
      </h2>

      {/* Mastery Badge (if completed) - uses element symbol */}
      {isMastered && (
        <motion.div
          className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 border-2"
          style={{ borderColor: config.colors.primary }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke={config.colors.primary}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 ${
              element === 'water'
                ? 'bg-water-400 rounded-full'
                : element === 'fire'
                ? 'bg-fire-400 rounded-full'
                : element === 'earth'
                ? 'bg-jade-400 rounded-sm'
                : 'bg-air-400 rounded-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}
