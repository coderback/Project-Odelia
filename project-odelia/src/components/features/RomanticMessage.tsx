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
      {/* Main romantic message - Tui and La */}
      <div className="space-y-4">
        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Tui and La, the Moon and Ocean,
          <br />
          have always circled each other in an eternal dance.
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          They balance each other.
          <br />
          Push and Pull. Life and Death.
          <br />
          Good and Evil. Yin and Yang.
        </motion.p>
      </div>

      {/* Balance message */}
      <motion.p
        className="text-xl md:text-2xl font-calligraphy text-gray-700 leading-relaxed pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Just like them, we can learn to find balance.
      </motion.p>

      {/* Valentine's message */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <p className="text-2xl md:text-3xl font-display font-bold text-red-500">
          Happy Valentine's Day, Odelia
        </p>
      </motion.div>

      {/* All four element symbols decoration */}
      <motion.div
        className="flex justify-center items-center gap-6 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        {/* Water symbol */}
        <motion.img
          src="/images/water_symbol.jpg"
          alt="Water Symbol"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            delay: 0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Fire symbol */}
        <motion.img
          src="/images/fire_symbol.jpg"
          alt="Fire Symbol"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.8,
            delay: 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Earth symbol */}
        <motion.img
          src="/images/earth_symbol.jpg"
          alt="Earth Symbol"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          animate={{
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            delay: 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Air symbol */}
        <motion.img
          src="/images/air_symbol.jpg"
          alt="Air Symbol"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          animate={{
            x: [-5, 5, -5],
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5,
            delay: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
