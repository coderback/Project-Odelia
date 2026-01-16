'use client';

import { motion } from 'framer-motion';
import { ElementType, getElementTextColor } from '@/lib/elements';

interface StoryStageProps {
  lines: string[];
  delay?: number; // Base delay before starting text reveal
  stagger?: number; // Delay between each line
  className?: string;
  element?: ElementType; // NEW: Element for text color
}

export function StoryStage({
  lines,
  delay = 0,
  stagger = 0.3,
  className = '',
  element = 'water',
}: StoryStageProps) {
  const textColor = getElementTextColor(element);

  return (
    <div className={`space-y-4 ${className}`}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.8,
            ease: 'easeOut',
          }}
          className={`text-lg md:text-xl font-calligraphy ${textColor} leading-relaxed text-center`}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

export default StoryStage;
