'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getElementConfig } from '@/lib/elements';
import { ElementType } from '@/types';
import { StoryStage } from '../ui/StoryStage';
import WaterTraceChallenge from '../challenges/WaterTraceChallenge';
import FireRhythmChallenge from '../challenges/FireRhythmChallenge';
import EarthBalanceChallenge from '../challenges/EarthBalanceChallenge';
import AirGuideChallenge from '../challenges/AirGuideChallenge';

interface ElementMasteryProps {
  element: ElementType;
  onComplete: () => void;
  onBack: () => void;
}

export default function ElementMastery({ element, onComplete, onBack }: ElementMasteryProps) {
  const [stage, setStage] = useState<'intro' | 'challenge' | 'success'>('intro');
  const config = getElementConfig(element);

  if (!config) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Stage 1: Element Lore Introduction */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 text-center"
          >
            <h2 className={`text-4xl md:text-5xl font-display font-bold ${config.colors.text}`}>
              {config.name}
            </h2>

            <StoryStage lines={config.lore} element={element} delay={0.3} stagger={0.25} />

            <motion.button
              onClick={() => setStage('challenge')}
              className="px-8 py-4 rounded-lg text-white font-bold text-xl shadow-lg"
              style={{
                background: element === 'water'
                  ? 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)'
                  : element === 'fire'
                  ? 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #dc2626 100%)'
                  : element === 'earth'
                  ? 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)'
                  : 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: config.lore.length * 0.25 + 0.5, duration: 0.4 }}
            >
              Begin Challenge
            </motion.button>
          </motion.div>
        )}

        {/* Stage 2: Mini-Game Challenge */}
        {stage === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {element === 'water' && <WaterTraceChallenge onSuccess={() => setStage('success')} />}
            {element === 'fire' && <FireRhythmChallenge onSuccess={() => setStage('success')} />}
            {element === 'earth' && <EarthBalanceChallenge onSuccess={() => setStage('success')} />}
            {element === 'air' && <AirGuideChallenge onSuccess={() => setStage('success')} />}
          </motion.div>
        )}

        {/* Stage 3: Success Celebration */}
        {stage === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-8 text-center px-4"
          >
            {/* Element Symbol (instead of generic checkmark) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: element === 'water'
                  ? 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)'
                  : element === 'fire'
                  ? 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #dc2626 100%)'
                  : element === 'earth'
                  ? 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)'
                  : 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)'
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
              >
                {element === 'water' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full opacity-90" />
                )}
                {element === 'fire' && (
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 bg-white opacity-90"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                  />
                )}
                {element === 'earth' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-sm opacity-90 rotate-45" />
                )}
                {element === 'air' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full opacity-90" />
                )}
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="space-y-3 md:space-y-4"
            >
              <h2 className={`text-2xl md:text-4xl font-display font-bold ${config.colors.text}`}>
                Mastery Achieved
              </h2>

              <p className="text-lg md:text-2xl text-gray-700 font-calligraphy px-4">
                {element === 'water' && "Like water, you flow with grace and adaptability."}
                {element === 'fire' && "Like fire, your passion burns bright and true."}
                {element === 'earth' && "Like earth, you stand firm and unshakeable."}
                {element === 'air' && "Like air, you soar to boundless heights."}
              </p>
            </motion.div>

            {/* Return Button - element themed */}
            <motion.button
              onClick={onComplete}
              className="px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-bold text-lg md:text-xl shadow-lg"
              style={{
                background: element === 'water'
                  ? 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)'
                  : element === 'fire'
                  ? 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #dc2626 100%)'
                  : element === 'earth'
                  ? 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)'
                  : 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
