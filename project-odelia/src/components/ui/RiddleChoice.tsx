'use client';

import { motion } from 'framer-motion';
import { choiceVariants } from '@/lib/animations';

interface RiddleChoiceProps {
  label: string;
  onClick: () => void;
  index: number;
  disabled?: boolean;
}

export default function RiddleChoice({
  label,
  onClick,
  index,
  disabled = false,
}: RiddleChoiceProps) {
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
      className="
        px-6 py-3 md:px-8 md:py-4
        text-base md:text-lg
        font-semibold
        text-white
        water-gradient
        rounded-xl
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water-400
        shadow-water-md
        hover:shadow-water-lg
        min-h-[48px]
        w-full md:w-auto
      "
      aria-label={`Choice: ${label}`}
    >
      <span className="relative z-10 drop-shadow-sm">
        {label}
      </span>
    </motion.button>
  );
}
