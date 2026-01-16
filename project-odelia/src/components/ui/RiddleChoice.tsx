'use client';

import { motion } from 'framer-motion';
import { choiceVariants } from '@/lib/animations';
import { ElementType, getElementGradient } from '@/lib/elements';

interface RiddleChoiceProps {
  label: string;
  onClick: () => void;
  index: number;
  disabled?: boolean;
  element?: ElementType; // NEW: Element for gradient
}

export default function RiddleChoice({
  label,
  onClick,
  index,
  disabled = false,
  element = 'water',
}: RiddleChoiceProps) {
  const gradientClass = getElementGradient(element);

  // Get shadow class based on element
  const getShadowClass = () => {
    switch (element) {
      case 'water':
        return 'shadow-water-md hover:shadow-water-lg focus-visible:outline-water-400';
      case 'fire':
        return 'shadow-fire-md hover:shadow-fire-lg focus-visible:outline-fire-400';
      case 'earth':
        return 'shadow-earth-md hover:shadow-earth-lg focus-visible:outline-jade-400';
      case 'air':
        return 'shadow-air-md hover:shadow-air-lg focus-visible:outline-air-400';
      default:
        return 'shadow-water-md hover:shadow-water-lg focus-visible:outline-water-400';
    }
  };

  return (
    <motion.button
      custom={index}
      variants={choiceVariants}
      initial="hidden"
      animate="visible"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 md:px-8 md:py-4
        text-base md:text-lg
        font-semibold
        text-white
        ${gradientClass}
        rounded-xl
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
        ${getShadowClass()}
        min-h-[48px]
        w-full md:w-auto
      `}
      aria-label={`Choice: ${label}`}
    >
      <span className="relative z-10 drop-shadow-sm">
        {label}
      </span>
    </motion.button>
  );
}
