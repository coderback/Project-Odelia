'use client';

import { motion } from 'framer-motion';

interface StoryStageProps {
  lines: string[];
  delay?: number; // Base delay before starting text reveal
  stagger?: number; // Delay between each line
  className?: string;
}

export default function StoryStage({
  lines,
  delay = 0,
  stagger = 0.3,
  className = '',
}: StoryStageProps) {
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
          className="text-lg md:text-xl font-calligraphy text-water-700 leading-relaxed text-center"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
