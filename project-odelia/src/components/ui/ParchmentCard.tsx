'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/lib/animations';

interface ParchmentCardProps {
  children: ReactNode;
  className?: string;
}

export default function ParchmentCard({ children, className = '' }: ParchmentCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`
        relative
        bg-parchment-200
        rounded-2xl
        shadow-parchment
        p-8 md:p-12
        max-w-2xl
        w-full
        mx-auto
        parchment-texture
        border border-parchment-300/50
        ${className}
      `}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-water-400/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-water-400/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-water-400/30 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-water-400/30 rounded-br-2xl" />

      {/* Water symbol decoration at top */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 rounded-full bg-parchment-200 border-2 border-water-400/30 flex items-center justify-center shadow-water-md">
          <svg
            className="w-8 h-8 text-water-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
