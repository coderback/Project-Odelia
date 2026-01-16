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
      {/* Main romantic message - All Four Elements */}
      <div className="space-y-4">
        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-water-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Like the Moon and Ocean spirits, our love flows in eternal harmony,
          <br />
          adaptable and persistent, healing all it touches...
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-fire-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Like the dragons Ran and Shaw, our passion burns bright,
          <br />
          illuminating the path forward and transforming us both...
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-earth-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Like the ancient Badgermoles, our bond stands firm and unwavering,
          <br />
          a foundation upon which all lasting things are built...
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-calligraphy text-air-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Like the Sky Bison soaring through endless skies,
          <br />
          our love lifts us to boundless heights of joy and freedom...
        </motion.p>

        <motion.p
          className="text-2xl md:text-3xl font-display bg-gradient-to-r from-water-400 via-fire-400 via-jade-400 to-air-400 bg-clip-text text-transparent font-bold pt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Together, Odelia, we bring balance to this world.
        </motion.p>
      </div>

      {/* Valentine's message */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <p className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-romantic-pink to-romantic-gold bg-clip-text text-transparent">
          Happy Valentine's Day, Odelia ❤️
        </p>
      </motion.div>

      {/* All four element symbols decoration */}
      <motion.div
        className="flex justify-center items-center gap-6 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      >
        {/* Water droplet */}
        <motion.div
          className="w-4 h-4 rounded-full bg-water-400"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: 0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Fire flame */}
        <motion.div
          className="w-4 h-4 bg-fire-400"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            delay: 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Earth rock/crystal */}
        <motion.div
          className="w-4 h-4 rounded-sm bg-jade-400"
          animate={{
            rotate: [0, 180, 360],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            delay: 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Air swirl */}
        <motion.div
          className="w-4 h-4 rounded-full bg-air-400"
          animate={{
            x: [-5, 5, -5],
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
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
