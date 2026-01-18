'use client';

import { motion } from 'framer-motion';
import { waterButtonVariants } from '@/lib/animations';

interface ElementButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  element?: string;
}

export default function ElementButton({ onClick, disabled = false }: ElementButtonProps) {
  return (
    <motion.button
      variants={waterButtonVariants}
      initial="initial"
      animate="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onClick={onClick}
      disabled={disabled}
      className="
        relative
        px-12 py-6
        text-2xl md:text-3xl
        font-bold
        text-white
        bg-red-500
        rounded-2xl
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline-none
        overflow-hidden
        group
        hover:bg-red-600
        shadow-lg
        hover:shadow-xl
      "
      aria-label="Click to say YES to being my Valentine"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Button text */}
      <span className="relative z-10 drop-shadow-md">
        YES
      </span>
    </motion.button>
  );
}
