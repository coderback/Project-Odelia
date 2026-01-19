'use client';

import { motion } from 'framer-motion';
import { useDodgyButton } from '@/hooks/useDodgyButton';

interface DodgyButtonProps {
  disabled?: boolean;
  onDodge?: (count: number) => void;
}

export default function DodgyButton({ disabled = false, onDodge }: DodgyButtonProps) {
  const {
    buttonRef,
    position,
    dodgeCount,
    isPositioned,
    moveToRandomPosition
  } = useDodgyButton({
    proximityThreshold: 100,
    escapeDistance: 150,
  });

  // Handle touch - move button away on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    moveToRandomPosition();
    onDodge?.(dodgeCount + 1);
  };

  // Switch to fixed positioning after first dodge
  const shouldBeFixed = isPositioned && dodgeCount > 0;

  // Handle click - just move to random position
  const handleClick = () => {
    moveToRandomPosition();
    onDodge?.(dodgeCount + 1);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      disabled={disabled}
      className={`
        ${shouldBeFixed ? 'fixed' : 'relative'}
        px-8 py-4
        text-lg md:text-xl
        font-semibold
        text-gray-700
        bg-gray-200
        border-2 border-gray-300
        rounded-xl
        hover:bg-gray-300
        active:bg-gray-400
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400
        shadow-md
        hover:shadow-lg
        touch-none
        z-10
      `}
      style={shouldBeFixed ? {
        left: position.x,
        top: position.y,
      } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      aria-label="Click to say NO (if you dare)"
    >
      {/* Button text */}
      <span className="relative z-10">
        NO
      </span>

      {/* Tooltip after multiple dodges */}
      {dodgeCount >= 3 && dodgeCount < 10 && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs md:text-sm px-3 py-1 rounded-lg whitespace-nowrap pointer-events-none z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dodgeCount < 5 && "Nope!"}
          {dodgeCount >= 5 && dodgeCount < 7 && "Can't catch me!"}
          {dodgeCount >= 7 && "Maybe reconsider?"}
        </motion.div>
      )}

      {/* Mobile hint after first dodge */}
      {dodgeCount === 1 && (
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap pointer-events-none z-50 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          Try to catch me!
        </motion.div>
      )}
    </motion.button>
  );
}
