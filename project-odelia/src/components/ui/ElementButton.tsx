'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { waterButtonVariants } from '@/lib/animations';
import { ElementType, getElementGradient } from '@/lib/elements';

interface ElementButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  element: ElementType;
}

export default function ElementButton({ onClick, disabled = false, element }: ElementButtonProps) {
  const [currentElement, setCurrentElement] = useState<Exclude<ElementType, 'all'>>('water');

  // For element="all", cycle through colors
  useEffect(() => {
    if (element === 'all') {
      const elements: Array<Exclude<ElementType, 'all'>> = ['water', 'fire', 'earth', 'air'];
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % 4;
        setCurrentElement(elements[index]);
      }, 800); // Cycle every 800ms
      return () => clearInterval(interval);
    }
  }, [element]);

  const displayElement = element === 'all' ? currentElement : element;

  // Get gradient style based on element
  const getGradientStyle = () => {
    switch (displayElement) {
      case 'water':
        return 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)';
      case 'fire':
        return 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #dc2626 100%)';
      case 'earth':
        return 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)';
      case 'air':
        return 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)';
      default:
        return 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)';
    }
  };

  // Get particle color based on element
  const getParticleColor = () => {
    switch (displayElement) {
      case 'water':
        return 'bg-white/40';
      case 'fire':
        return 'bg-yellow-200/60';
      case 'earth':
        return 'bg-green-200/60';
      case 'air':
        return 'bg-sky-200/60';
      default:
        return 'bg-white/40';
    }
  };

  return (
    <motion.button
      key={displayElement} // Re-mount on element change for smooth transition
      variants={waterButtonVariants}
      initial="initial"
      animate="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: getGradientStyle(),
      }}
      className="
        relative
        px-12 py-6
        text-2xl md:text-3xl
        font-bold
        text-white
        rounded-2xl
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline-none
        overflow-hidden
        group
      "
      aria-label="Click to say YES to being my Valentine"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Button text */}
      <span className="relative z-10 drop-shadow-md">
        YES ❤️
      </span>

      {/* Element particles on hover */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${getParticleColor()} rounded-full`}
            style={{
              left: `${(i / 8) * 100}%`,
              bottom: 0,
            }}
            initial={{ opacity: 0, y: 0 }}
            whileHover={{
              opacity: [0, 1, 0],
              y: [0, -40],
              transition: {
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
              },
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}
