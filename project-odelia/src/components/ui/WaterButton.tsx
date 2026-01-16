'use client';

import { motion } from 'framer-motion';
import { waterButtonVariants } from '@/lib/animations';

interface WaterButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function WaterButton({ onClick, disabled = false }: WaterButtonProps) {
  return (
    <motion.button
      variants={waterButtonVariants}
      initial="initial"
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
        rounded-2xl
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline-none
        overflow-hidden
        group
      "
      style={{
        background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)',
      }}
      aria-label="Click to say YES to being my Valentine"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Button text */}
      <span className="relative z-10 drop-shadow-md">
        YES ❤️
      </span>

      {/* Water droplet particles on hover */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
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
