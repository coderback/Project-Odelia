'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionVariants } from '@/lib/animations';
import ElementButton from '../ui/ElementButton';
import DodgyButton from '../ui/DodgyButton';
import RippleEffect from '../ui/RippleEffect';
import ConfettiEffect from '../ui/ConfettiEffect';
import SuccessAnimation from './SuccessAnimation';
import RomanticMessage from './RomanticMessage';
import { Position, Answer } from '@/types';

type InteractionState = 'idle' | 'selected' | 'animating' | 'complete';

export default function QuestionInterface() {
  const [state, setState] = useState<InteractionState>('idle');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [ripplePosition, setRipplePosition] = useState<Position>({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [startTime] = useState(Date.now());

  const handleYesClick = useCallback(async (event: React.MouseEvent) => {
    if (state !== 'idle') return;

    // Capture click position for ripple effect
    setRipplePosition({ x: event.clientX, y: event.clientY });

    // Start the animation sequence
    setState('selected');
    setAnswer('yes');

    // Trigger ripple
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 2000);

    // Trigger confetti
    setTimeout(() => setShowConfetti(true), 500);

    // Hide question text
    setState('animating');

    // Show success animation
    setTimeout(() => {
      setShowSuccessAnimation(true);
    }, 800);
  }, [state]);

  const handleSuccessComplete = useCallback(async () => {
    setState('complete');

    // Send response to API
    try {
      const timeToDecide = Date.now() - startTime;
      await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: 'yes',
          metadata: {
            dodgeCount,
            timeToDecide,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to save response:', error);
    }
  }, [dodgeCount, startTime]);


  return (
    <div className="relative">
      {/* Ripple Effect */}
      <RippleEffect isActive={showRipple} position={ripplePosition} />

      {/* Confetti Effect */}
      <ConfettiEffect trigger={showConfetti} />

      {/* Success Animation */}
      <SuccessAnimation
        isActive={showSuccessAnimation}
        onComplete={handleSuccessComplete}
      />

      {/* Question and Buttons */}
      <AnimatePresence mode="wait">
        {state === 'idle' || state === 'selected' ? (
          <motion.div
            key="question"
            variants={questionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-12"
          >
            {/* Main Question */}
            <div className="text-center space-y-4">
              <motion.h1
                className="text-4xl md:text-6xl font-display font-bold text-red-500 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Odelia
              </motion.h1>

              <motion.p
                className="text-3xl md:text-5xl font-calligraphy text-red-500 leading-relaxed"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                May I be your Valentine?
              </motion.p>

              {/* Decorative circles */}
              <motion.div
                className="flex justify-center gap-2 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-red-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <ElementButton
                onClick={handleYesClick}
                disabled={state !== 'idle'}
                element="all"
              />
              <DodgyButton disabled={state !== 'idle'} onDodge={setDodgeCount} />
            </motion.div>
          </motion.div>
        ) : null}

        {/* Romantic Message (after success animation) */}
        {state === 'complete' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <RomanticMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
