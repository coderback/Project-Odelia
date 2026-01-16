'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryStage as StoryStageComponent } from '@/components/ui/StoryStage';
import RiddleChoice from '@/components/ui/RiddleChoice';
import { storyVariants, scrollUnfurlVariants } from '@/lib/animations';
import { StoryStage } from '@/types';
import { ElementType, ELEMENTS, Choice } from '@/lib/elements';

interface StoryIntroProps {
  onComplete: () => void;
  onElementChange?: (element: ElementType) => void;
}

export default function StoryIntro({ onComplete, onElementChange }: StoryIntroProps) {
  const [stage, setStage] = useState<StoryStage>('opening');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [choicesDisabled, setChoicesDisabled] = useState(false);

  // Map stages to elements - SEQUENTIAL PROGRESSION
  const stageToElement: Record<StoryStage, ElementType> = {
    'opening': 'water',      // Water: Tui & La
    'riddle': 'fire',        // Fire: Dragons
    'reflection': 'earth',   // Earth: Badgermoles
    'transition': 'air',     // Air: Sky Bison
    'complete': 'all',
  };

  const currentElement = stageToElement[stage];

  // Notify parent of element changes
  useEffect(() => {
    if (onElementChange) {
      onElementChange(currentElement);
    }
  }, [currentElement, onElementChange]);

  // Opening stage (WATER): auto-advance after text reveals
  useEffect(() => {
    if (stage === 'opening') {
      const lines = ELEMENTS.water.lore;
      const totalTime = (lines.length * 0.3 + 0.8 + 2.0) * 1000;
      const timer = setTimeout(() => {
        setStage('riddle');
      }, totalTime);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Reflection stage (EARTH): auto-advance after reflection text
  useEffect(() => {
    if (stage === 'reflection' && selectedChoice) {
      const totalTime = (selectedChoice.reflection.length * 0.3 + 0.8 + 2.0) * 1000;
      const timer = setTimeout(() => {
        setStage('transition');
      }, totalTime);
      return () => clearTimeout(timer);
    }
  }, [stage, selectedChoice]);

  // Transition stage (AIR): auto-advance to complete
  useEffect(() => {
    if (stage === 'transition') {
      const lines = ELEMENTS.air.lore;
      const totalTime = (lines.length * 0.3 + 0.8 + 1.5) * 1000;
      const timer = setTimeout(() => {
        setStage('complete');
        onComplete();
      }, totalTime);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  // Handle choice selection
  const handleChoiceClick = (choice: Choice) => {
    if (choicesDisabled) return;

    setChoicesDisabled(true);
    setSelectedChoice(choice);

    // Small delay before transitioning to reflection
    setTimeout(() => {
      setStage('reflection');
    }, 500);
  };

  // Get element-specific particle decorations
  const getElementParticles = (element: ElementType) => {
    switch (element) {
      case 'water':
        return (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-water-400"
                animate={{
                  y: [0, -20, 0],
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
        );
      case 'fire':
        return null; // Fire choices have their own glow
      case 'earth':
        return (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-sm bg-jade-400"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        );
      case 'air':
        return (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-air-400"
                animate={{
                  y: [0, -25, 0],
                  x: [(i - 2) * -10, (i - 2) * 10, (i - 2) * -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={scrollUnfurlVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {/* Stage 1: WATER Opening */}
        {stage === 'opening' && (
          <motion.div
            key="opening"
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[400px] flex items-center justify-center"
          >
            <StoryStageComponent
              lines={ELEMENTS.water.lore}
              delay={0}
              stagger={0.3}
              element="water"
            />
          </motion.div>
        )}

        {/* Stage 2: FIRE Riddle */}
        {stage === 'riddle' && (
          <motion.div
            key="riddle"
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[400px] flex flex-col items-center justify-center space-y-8"
          >
            {/* Fire Lore Introduction */}
            <StoryStageComponent
              lines={ELEMENTS.fire.lore.slice(0, -2)}
              delay={0}
              stagger={0.25}
              element="fire"
            />

            {/* Riddle Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
              className="text-center pt-4"
            >
              <p className="text-xl md:text-2xl font-calligraphy text-fire-700 leading-relaxed px-4">
                {ELEMENTS.fire.riddle.question}
              </p>
            </motion.div>

            {/* Choice Buttons */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 md:gap-6 w-full px-4 md:px-0 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              {ELEMENTS.fire.riddle.choices.map((choice, index) => (
                <RiddleChoice
                  key={choice.id}
                  label={choice.label}
                  onClick={() => handleChoiceClick(choice)}
                  index={index}
                  disabled={choicesDisabled}
                  element="fire"
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Stage 3: EARTH Reflection */}
        {stage === 'reflection' && selectedChoice && (
          <motion.div
            key="reflection"
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[400px] flex items-center justify-center relative"
          >
            {/* Earth Lore Introduction */}
            <div className="space-y-8">
              <StoryStageComponent
                lines={ELEMENTS.earth.lore.slice(0, 4)}
                delay={0}
                stagger={0.25}
                element="earth"
              />

              {/* Selected Choice Reflection */}
              <StoryStageComponent
                lines={selectedChoice.reflection}
                delay={1.5}
                stagger={0.3}
                element="earth"
              />
            </div>

            {/* Earth particle decorations */}
            {getElementParticles('earth')}
          </motion.div>
        )}

        {/* Stage 4: AIR Transition */}
        {stage === 'transition' && (
          <motion.div
            key="transition"
            variants={storyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[400px] flex items-center justify-center relative"
          >
            <StoryStageComponent
              lines={ELEMENTS.air.lore}
              delay={0}
              stagger={0.3}
              element="air"
              className="text-2xl md:text-3xl"
            />

            {/* Air particle decorations */}
            {getElementParticles('air')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
