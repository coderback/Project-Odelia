'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ElementBackground from '@/components/ui/ElementBackground';
import ParchmentCard from '@/components/ui/ParchmentCard';
import QuestionInterface from '@/components/features/QuestionInterface';
import ElementHub from '@/components/features/ElementHub';
import ElementMastery from '@/components/features/ElementMastery';
import BackgroundMusic from '@/components/ui/BackgroundMusic';
import { ElementType } from '@/lib/elements';
import { markChapterComplete } from '@/lib/chapters';

type ViewState = 'hub' | 'mastery' | 'transition' | 'question' | 'complete';

export default function ValentinePage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>('hub');
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [masteredElements, setMasteredElements] = useState<Set<ElementType>>(new Set());

  const handleSelectElement = (element: ElementType) => {
    setSelectedElement(element);
    setView('mastery');
  };

  const handleMasteryComplete = () => {
    if (selectedElement) {
      setMasteredElements((prev) => new Set(prev).add(selectedElement));
    }
    setSelectedElement(null);
    setView('hub');
  };

  const handleAllMastered = () => {
    // Show transition screen first
    setTimeout(() => {
      setView('transition');
    }, 800);
  };

  const handleTransitionComplete = () => {
    setView('question');
  };

  const handleQuestionComplete = () => {
    // Mark chapter as complete
    markChapterComplete('valentine');
    setView('complete');
  };

  const handleBackToTimeline = () => {
    router.push('/timeline');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Background Music */}
      <BackgroundMusic />

      {/* Animated Element Background */}
      <ElementBackground
        element={
          view === 'hub'
            ? 'all'
            : view === 'mastery' && selectedElement
            ? selectedElement
            : 'all'
        }
      />

      {/* Main Content Card */}
      <ParchmentCard className="my-4 md:my-8 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'hub' && (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ElementHub
                masteredElements={masteredElements}
                onSelectElement={handleSelectElement}
                onAllComplete={handleAllMastered}
              />
              {/* Back to Timeline link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-6"
              >
                <button
                  onClick={handleBackToTimeline}
                  className="text-parchment-500 hover:text-parchment-700 transition-colors text-sm"
                >
                  ← Back to Timeline
                </button>
              </motion.div>
            </motion.div>
          )}

          {view === 'mastery' && selectedElement && (
            <motion.div
              key="mastery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ElementMastery
                element={selectedElement}
                onComplete={handleMasteryComplete}
                onBack={() => setView('hub')}
              />
            </motion.div>
          )}

          {view === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="py-16 md:py-24"
            >
              <div className="text-center space-y-8">
                {/* Decorative element symbols */}
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {['💧', '🔥', '🪨', '🌀'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-3xl md:text-4xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Main text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-800">
                    Now, a Question for you
                  </h2>
                  <motion.p
                    className="text-4xl md:text-6xl font-calligraphy text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  >
                    Odelia...
                  </motion.p>
                </motion.div>

                {/* Continue button */}
                <motion.button
                  onClick={handleTransitionComplete}
                  className="mt-8 px-8 py-4 bg-gray-800 text-white font-bold text-xl rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          )}

          {view === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionInterface onComplete={handleQuestionComplete} />
            </motion.div>
          )}

          {view === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              <h2 className="text-3xl font-display text-fire-600 mb-4">
                Chapter Complete!
              </h2>
              <p className="text-parchment-600 mb-8">
                You&apos;ve completed the Valentine&apos;s Game chapter.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToTimeline}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-fire-400 to-fire-600 text-white font-medium shadow-lg"
              >
                Continue to Timeline
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </ParchmentCard>
    </main>
  );
}
