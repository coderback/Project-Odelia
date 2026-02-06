'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { markChapterComplete } from '@/lib/chapters';
import ConfettiEffect from '@/components/ui/ConfettiEffect';

interface DateOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const restaurants: DateOption[] = [
  {
    id: 'italian',
    title: 'Italian Bistro',
    description: 'Cozy pasta and candlelight',
    icon: '🍝',
    gradient: 'from-fire-400 to-fire-600',
  },
  {
    id: 'sushi',
    title: 'Sushi Bar',
    description: 'Fresh rolls and good vibes',
    icon: '🍣',
    gradient: 'from-water-400 to-water-600',
  },
  {
    id: 'steakhouse',
    title: 'Steakhouse',
    description: 'Classic and satisfying',
    icon: '🥩',
    gradient: 'from-earth-400 to-earth-600',
  },
  {
    id: 'french',
    title: 'French Café',
    description: 'Charming and romantic',
    icon: '🥐',
    gradient: 'from-air-400 to-air-600',
  },
  {
    id: 'thai',
    title: 'Thai Kitchen',
    description: 'Bold flavors and warmth',
    icon: '🍜',
    gradient: 'from-teal-400 to-teal-600',
  },
];

const activities: DateOption[] = [
  {
    id: 'movie',
    title: 'Movie Night',
    description: 'Cozy up for a film together',
    icon: '🎬',
    gradient: 'from-water-400 to-water-600',
  },
  {
    id: 'bowling',
    title: 'Bowling',
    description: 'A little friendly competition',
    icon: '🎳',
    gradient: 'from-fire-400 to-fire-600',
  },
  {
    id: 'minigolf',
    title: 'Mini Golf',
    description: 'Playful and fun',
    icon: '⛳',
    gradient: 'from-earth-400 to-earth-600',
  },
  {
    id: 'stargazing',
    title: 'Stargazing Walk',
    description: 'A romantic evening stroll',
    icon: '🌙',
    gradient: 'from-air-400 to-air-600',
  },
  {
    id: 'arcade',
    title: 'Arcade',
    description: 'Retro fun and high scores',
    icon: '🕹️',
    gradient: 'from-teal-400 to-teal-600',
  },
];

const TOTAL_STEPS = 2;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  hover: {
    scale: 1.05,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
  tap: {
    scale: 0.98,
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function DatePlanHub() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState<DateOption | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<DateOption | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePickRestaurant = (option: DateOption) => {
    setSelectedRestaurant(option);
    setStep(2);
  };

  const handlePickActivity = (option: DateOption) => {
    setSelectedActivity(option);
    setStep(3); // review
  };

  const handleConfirm = async () => {
    if (!selectedRestaurant || !selectedActivity || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/date-selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant: selectedRestaurant.title,
          activity: selectedActivity.title,
        }),
      });

      markChapterComplete('datePlan', {
        selectedOption: `${selectedRestaurant.id}+${selectedActivity.id}`,
      });

      setIsComplete(true);
    } catch (error) {
      console.error('Failed to save selection:', error);
      markChapterComplete('datePlan', {
        selectedOption: `${selectedRestaurant.id}+${selectedActivity.id}`,
      });
      setIsComplete(true);
    }
  };

  const handleBackToTimeline = () => {
    router.push('/timeline');
  };

  const stepTitle = step === 1
    ? 'Pick a Restaurant'
    : step === 2
    ? 'Pick an Activity'
    : 'Your Date Plan';

  const stepSubtitle = step === 1
    ? 'Where should we eat?'
    : step === 2
    ? 'What should we do?'
    : 'Here\'s what you\'ve planned!';

  const currentOptions = step === 1 ? restaurants : activities;

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      {isComplete && <ConfettiEffect trigger={isComplete} />}

      <AnimatePresence mode="wait">
        {/* Step 1 & 2: Selection grids */}
        {(step === 1 || step === 2) && !isComplete && (
          <motion.div
            key={`step-${step}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -30 }}
            className="max-w-4xl mx-auto"
          >
            {/* Step Indicator */}
            <motion.div variants={titleVariants} className="text-center mb-6 sm:mb-10">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className={`
                      w-8 h-8 sm:w-10 sm:h-10
                      rounded-full
                      flex items-center justify-center
                      text-xs sm:text-sm font-medium
                      transition-all duration-300
                      ${i + 1 < step
                        ? 'bg-earth-500 text-white'
                        : i + 1 === step
                        ? 'bg-fire-500 text-white shadow-lg scale-110'
                        : 'bg-parchment-300 text-parchment-500'
                      }
                    `}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    {i < TOTAL_STEPS - 1 && (
                      <div className={`
                        w-8 sm:w-16 h-0.5
                        transition-colors duration-300
                        ${i + 1 < step ? 'bg-earth-400' : 'bg-parchment-300'}
                      `} />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-parchment-500 mb-2">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-fire-600 mb-2 sm:mb-3">
                {stepTitle}
              </h1>
              <p className="text-base sm:text-lg text-parchment-600">
                {stepSubtitle}
              </p>

              {/* Show current restaurant selection on step 2 */}
              {step === 2 && selectedRestaurant && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-parchment-200 border border-parchment-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  <span className="text-lg sm:text-xl">{selectedRestaurant.icon}</span>
                  <span className="text-xs sm:text-sm text-parchment-700">{selectedRestaurant.title}</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-parchment-400 hover:text-parchment-600 text-xs ml-1"
                    title="Change restaurant"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentOptions.map((option) => (
                <motion.button
                  key={option.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => step === 1 ? handlePickRestaurant(option) : handlePickActivity(option)}
                  className={`
                    relative
                    bg-parchment-200
                    rounded-xl sm:rounded-2xl
                    shadow-parchment
                    p-4 sm:p-6
                    parchment-texture
                    border-2
                    border-parchment-300
                    transition-colors
                    duration-300
                    text-left
                    group
                    active:scale-[0.98]
                  `}
                >
                  <div className={`
                    w-12 h-12 sm:w-16 sm:h-16
                    rounded-lg sm:rounded-xl
                    bg-gradient-to-br ${option.gradient}
                    flex items-center justify-center
                    text-2xl sm:text-3xl
                    shadow-lg
                    mb-3 sm:mb-4
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  `}>
                    {option.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-display text-parchment-800 mb-1 sm:mb-2">
                    {option.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-parchment-600 pr-6">
                    {option.description}
                  </p>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xl sm:text-2xl">→</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8 sm:mt-10"
            >
              <button
                onClick={step === 1 ? handleBackToTimeline : () => setStep(1)}
                className="text-sm sm:text-base text-parchment-500 hover:text-parchment-700 transition-colors"
              >
                {step === 1 ? '← Back to Timeline' : '← Back to Restaurants'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && !isComplete && selectedRestaurant && selectedActivity && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-sm sm:max-w-lg mx-auto text-center px-2"
          >
            <div className="bg-parchment-200 rounded-xl sm:rounded-2xl shadow-parchment p-6 sm:p-8 parchment-texture">
              <h2 className="text-2xl sm:text-3xl font-display text-fire-600 mb-6 sm:mb-8">
                Your Date Plan
              </h2>

              {/* Selections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Restaurant card */}
                <div className="bg-white/60 rounded-xl p-4 sm:p-5 border border-parchment-300">
                  <p className="text-[10px] sm:text-xs text-parchment-500 uppercase tracking-wider mb-2">Restaurant</p>
                  <div className={`
                    w-14 h-14 sm:w-16 sm:h-16
                    mx-auto
                    rounded-xl
                    bg-gradient-to-br ${selectedRestaurant.gradient}
                    flex items-center justify-center
                    text-2xl sm:text-3xl
                    shadow-md
                    mb-2 sm:mb-3
                  `}>
                    {selectedRestaurant.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-display text-parchment-800">
                    {selectedRestaurant.title}
                  </h3>
                  <p className="text-xs text-parchment-500 mt-1">
                    {selectedRestaurant.description}
                  </p>
                </div>

                {/* Activity card */}
                <div className="bg-white/60 rounded-xl p-4 sm:p-5 border border-parchment-300">
                  <p className="text-[10px] sm:text-xs text-parchment-500 uppercase tracking-wider mb-2">Activity</p>
                  <div className={`
                    w-14 h-14 sm:w-16 sm:h-16
                    mx-auto
                    rounded-xl
                    bg-gradient-to-br ${selectedActivity.gradient}
                    flex items-center justify-center
                    text-2xl sm:text-3xl
                    shadow-md
                    mb-2 sm:mb-3
                  `}>
                    {selectedActivity.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-display text-parchment-800">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-xs text-parchment-500 mt-1">
                    {selectedActivity.description}
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-fire-600 font-medium mb-4 sm:mb-6">
                Does this look perfect?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-parchment-400 text-parchment-600 hover:bg-parchment-300 transition-colors text-sm sm:text-base order-2 sm:order-1"
                  disabled={isSubmitting}
                >
                  Go Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-fire-400 to-fire-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 text-sm sm:text-base order-1 sm:order-2"
                >
                  {isSubmitting ? 'Saving...' : 'This is perfect!'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Complete */}
        {isComplete && selectedRestaurant && selectedActivity && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm sm:max-w-md mx-auto text-center px-2"
          >
            <div className="bg-parchment-200 rounded-xl sm:rounded-2xl shadow-parchment p-6 sm:p-8 parchment-texture">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-5xl sm:text-6xl mb-4 sm:mb-6"
              >
                🎉
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-display text-fire-600 mb-3 sm:mb-4">
                Date Planned!
              </h2>

              <p className="text-sm sm:text-base text-parchment-700 mb-1">
                {selectedRestaurant.icon} {selectedRestaurant.title}
              </p>
              <p className="text-xs sm:text-sm text-parchment-500 mb-3">+</p>
              <p className="text-sm sm:text-base text-parchment-700 mb-4 sm:mb-6">
                {selectedActivity.icon} {selectedActivity.title}
              </p>

              <p className="text-sm sm:text-base text-parchment-600 mb-6 sm:mb-8">
                I can&apos;t wait for our date!
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToTimeline}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-fire-400 to-fire-600 text-white font-medium shadow-lg text-sm sm:text-base"
              >
                Back to Timeline
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
