'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ElementBackground from '@/components/ui/ElementBackground';
import ParchmentCard from '@/components/ui/ParchmentCard';
import QuestionInterface from '@/components/features/QuestionInterface';
import ElementHub from '@/components/features/ElementHub';
import ElementMastery from '@/components/features/ElementMastery';
import BackgroundMusic from '@/components/ui/BackgroundMusic';
import { ElementType } from '@/lib/elements';

type ViewState = 'hub' | 'mastery' | 'question';

export default function Home() {
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
    // Delay transition for dramatic effect
    setTimeout(() => {
      setView('question');
    }, 800);
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

          {view === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </ParchmentCard>
    </main>
  );
}
