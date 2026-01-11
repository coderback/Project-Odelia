'use client';

import { motion } from 'framer-motion';
import { messageVariants } from '@/lib/animations';

export default function RomanticMessage() {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className="text-center space-y-6"
    >
      {/* Main romantic message */}
      <div className="space-y-4">
        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-water-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Tui and La, the moon and ocean,
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-water-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          have always circled each other in an eternal dance.
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-water-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Push and Pull. Life and Death. Good and Evil. Yin and Yang.
        </motion.p>
      </div>

      {/* Valentine's message */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-romantic-pink to-romantic-gold bg-clip-text text-transparent">
          Happy Valentine's Agent Odell
        </p>
      </motion.div>

      {/* Water droplet decoration */}
      <motion.div
        className="flex justify-center items-center gap-4 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-water-400"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
