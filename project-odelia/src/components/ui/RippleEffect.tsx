'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { rippleVariants } from '@/lib/animations';
import { Position } from '@/types';

interface RippleEffectProps {
  isActive: boolean;
  position?: Position;
}

export default function RippleEffect({ isActive, position = { x: 0, y: 0 } }: RippleEffectProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Multiple overlapping ripples for depth */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-4 border-water-400/50"
              style={{
                left: position.x,
                top: position.y,
                width: 100,
                height: 100,
                marginLeft: -50,
                marginTop: -50,
              }}
              variants={rippleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Additional water droplet ripples */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`droplet-${i}`}
              className="absolute rounded-full bg-water-400/30"
              style={{
                left: position.x + (Math.cos((i / 5) * Math.PI * 2) * 80),
                top: position.y + (Math.sin((i / 5) * Math.PI * 2) * 80),
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
              }}
              initial={{
                scale: 0,
                opacity: 0.8,
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
