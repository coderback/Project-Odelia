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
  color: string;
  gradient: string;
}

const dateOptions: DateOption[] = [
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'A romantic dinner for two at a cozy restaurant',
    icon: '🍽️',
    color: 'fire',
    gradient: 'from-fire-400 to-fire-600',
  },
  {
    id: 'movie',
    title: 'Movie Night',
    description: 'Cozy up for a movie night together',
    icon: '🎬',
    color: 'water',
    gradient: 'from-water-400 to-water-600',
  },
  {
    id: 'picnic',
    title: 'Picnic',
    description: 'An outdoor adventure with delicious food',
    icon: '🧺',
    color: 'earth',
    gradient: 'from-earth-400 to-earth-600',
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'Something exciting and new to explore together',
    icon: '🎢',
    color: 'air',
    gradient: 'from-air-400 to-air-600',
  },
  {
    id: 'stay-in',
    title: 'Stay-in Night',
    description: 'A cozy night in together at home',
    icon: '🏠',
    color: 'teal',
    gradient: 'from-teal-400 to-teal-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
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
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function DatePlanHub() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<DateOption | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (option: DateOption) => {
    setSelectedOption(option);
    setIsConfirming(true);
  };

  const handleConfirm = async () => {
    if (!selectedOption || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Send notification
      await fetch('/api/date-selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: selectedOption.title }),
      });

      // Mark chapter as complete
      markChapterComplete('datePlan', { selectedOption: selectedOption.id });

      setIsComplete(true);
    } catch (error) {
      console.error('Failed to save selection:', error);
      // Still mark as complete even if email fails
      markChapterComplete('datePlan', { selectedOption: selectedOption.id });
      setIsComplete(true);
    }
  };

  const handleCancel = () => {
    setSelectedOption(null);
    setIsConfirming(false);
  };

  const handleBackToTimeline = () => {
    router.push('/timeline');
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      {isComplete && <ConfettiEffect trigger={isComplete} />}

      <AnimatePresence mode="wait">
        {!isConfirming && !isComplete && (
          <motion.div
            key="selection"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title */}
            <motion.div variants={titleVariants} className="text-center mb-6 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-fire-600 mb-2 sm:mb-4">
                Plan Our Date
              </h1>
              <p className="text-base sm:text-lg text-parchment-600">
                What kind of date sounds perfect to you?
              </p>
            </motion.div>

            {/* Date Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dateOptions.map((option) => (
                <motion.button
                  key={option.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleSelect(option)}
                  className={`
                    relative
                    bg-parchment-200
                    rounded-xl sm:rounded-2xl
                    shadow-parchment
                    p-4 sm:p-6
                    parchment-texture
                    border-2
                    border-parchment-300
                    hover:border-${option.color}-400
                    transition-colors
                    duration-300
                    text-left
                    group
                    active:scale-[0.98]
                  `}
                >
                  {/* Icon */}
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

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display text-parchment-800 mb-1 sm:mb-2">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-parchment-600 pr-6">
                    {option.description}
                  </p>

                  {/* Hover indicator */}
                  <div className={`
                    absolute bottom-4 right-4
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}>
                    <span className="text-xl sm:text-2xl">→</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Back to Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-8 sm:mt-10"
            >
              <button
                onClick={handleBackToTimeline}
                className="text-sm sm:text-base text-parchment-500 hover:text-parchment-700 transition-colors"
              >
                ← Back to Timeline
              </button>
            </motion.div>
          </motion.div>
        )}

        {isConfirming && !isComplete && selectedOption && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-sm sm:max-w-md mx-auto text-center px-2"
          >
            <div className="bg-parchment-200 rounded-xl sm:rounded-2xl shadow-parchment p-6 sm:p-8 parchment-texture">
              {/* Selected option icon */}
              <div className={`
                w-20 h-20 sm:w-24 sm:h-24
                mx-auto
                rounded-xl sm:rounded-2xl
                bg-gradient-to-br ${selectedOption.gradient}
                flex items-center justify-center
                text-4xl sm:text-5xl
                shadow-lg
                mb-4 sm:mb-6
              `}>
                {selectedOption.icon}
              </div>

              <h2 className="text-xl sm:text-2xl font-display text-parchment-800 mb-1 sm:mb-2">
                {selectedOption.title}
              </h2>
              <p className="text-sm sm:text-base text-parchment-600 mb-6 sm:mb-8">
                {selectedOption.description}
              </p>

              <p className="text-base sm:text-lg text-fire-600 font-medium mb-4 sm:mb-6">
                Is this your choice?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
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
                  className={`
                    px-5 sm:px-6 py-2.5 sm:py-3
                    rounded-lg sm:rounded-xl
                    bg-gradient-to-r ${selectedOption.gradient}
                    text-white
                    font-medium
                    shadow-lg
                    hover:shadow-xl
                    transition-shadow
                    disabled:opacity-50
                    text-sm sm:text-base
                    order-1 sm:order-2
                  `}
                >
                  {isSubmitting ? 'Saving...' : 'Yes, this is perfect!'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {isComplete && selectedOption && (
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
                Perfect Choice!
              </h2>

              <p className="text-base sm:text-lg text-parchment-700 mb-1 sm:mb-2">
                You chose: <strong>{selectedOption.title}</strong>
              </p>

              <p className="text-sm sm:text-base text-parchment-600 mb-6 sm:mb-8">
                I can&apos;t wait for our {selectedOption.title.toLowerCase()}!
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
