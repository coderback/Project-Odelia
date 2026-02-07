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
    id: 'french-brasserie',
    title: 'French Brasserie',
    description: 'Elegant dining with classic French flair',
    icon: '🥖',
    gradient: 'from-rose-300 to-rose-500',
  },
  {
    id: 'chinese',
    title: 'Chinese',
    description: 'Rich flavors and shared plates',
    icon: '🥡',
    gradient: 'from-pink-300 to-pink-500',
  },
  {
    id: 'british-brasserie',
    title: 'British Brasserie',
    description: 'Hearty comfort with a refined touch',
    icon: '🍽️',
    gradient: 'from-red-300 to-red-500',
  },
  {
    id: 'south-asian',
    title: 'South Asian',
    description: 'Vibrant spices and aromatic dishes',
    icon: '🍛',
    gradient: 'from-fuchsia-300 to-fuchsia-500',
  },
  {
    id: 'caribbean',
    title: 'Caribbean',
    description: 'Tropical flavors and island warmth',
    icon: '🌴',
    gradient: 'from-rose-400 to-pink-500',
  },
];

const activities: DateOption[] = [
  {
    id: 'ice-skating',
    title: 'Ice Skating',
    description: 'Glide across the ice together',
    icon: '⛸️',
    gradient: 'from-pink-300 to-rose-400',
  },
  {
    id: 'arcade',
    title: 'Arcade',
    description: 'Retro fun and high scores',
    icon: '🕹️',
    gradient: 'from-red-300 to-rose-500',
  },
  {
    id: 'escape-room',
    title: 'Escape Room',
    description: 'Solve puzzles and escape together',
    icon: '🔐',
    gradient: 'from-rose-300 to-red-400',
  },
  {
    id: 'go-karting',
    title: 'Go Karting',
    description: 'Race to the finish line',
    icon: '🏎️',
    gradient: 'from-fuchsia-300 to-pink-500',
  },
  {
    id: 'bowling',
    title: 'Bowling',
    description: 'A little friendly competition',
    icon: '🎳',
    gradient: 'from-pink-400 to-rose-500',
  },
];

const TOTAL_STEPS = 3;

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

const rankLabels = ['1st', '2nd', '3rd', '4th', '5th'];

// Floating hearts for Valentine's ambiance
const floatingHearts = [
  { left: '5%', delay: 0, duration: 12, size: 'text-2xl', opacity: 0.15 },
  { left: '15%', delay: 2, duration: 10, size: 'text-lg', opacity: 0.1 },
  { left: '25%', delay: 4, duration: 14, size: 'text-3xl', opacity: 0.12 },
  { left: '40%', delay: 1, duration: 11, size: 'text-xl', opacity: 0.08 },
  { left: '55%', delay: 3, duration: 13, size: 'text-2xl', opacity: 0.1 },
  { left: '70%', delay: 5, duration: 10, size: 'text-lg', opacity: 0.15 },
  { left: '80%', delay: 0.5, duration: 12, size: 'text-3xl', opacity: 0.1 },
  { left: '90%', delay: 2.5, duration: 11, size: 'text-xl', opacity: 0.12 },
];

export default function DatePlanHub() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [rankedRestaurants, setRankedRestaurants] = useState<DateOption[]>([]);
  const [rankedActivities, setRankedActivities] = useState<DateOption[]>([]);
  const [meals, setMeals] = useState({ breakfast: '', lunch: '', dinner: '' });
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentRanked = step === 1 ? rankedRestaurants : rankedActivities;
  const setCurrentRanked = step === 1 ? setRankedRestaurants : setRankedActivities;
  const currentOptions = step === 1 ? restaurants : activities;
  const allRanked = currentRanked.length === currentOptions.length;

  const handleToggleRank = (option: DateOption) => {
    const index = currentRanked.findIndex((r) => r.id === option.id);
    if (index >= 0) {
      setCurrentRanked((prev) => prev.filter((r) => r.id !== option.id));
    } else {
      setCurrentRanked((prev) => [...prev, option]);
    }
  };

  const getRank = (option: DateOption): number | null => {
    const index = currentRanked.findIndex((r) => r.id === option.id);
    return index >= 0 ? index + 1 : null;
  };

  const allMealsFilled = meals.breakfast.trim() && meals.lunch.trim() && meals.dinner.trim();

  const handleConfirm = async () => {
    if (rankedRestaurants.length === 0 || rankedActivities.length === 0 || !allMealsFilled || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/date-selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurants: rankedRestaurants.map((r) => r.title),
          activities: rankedActivities.map((a) => a.title),
          meals: {
            breakfast: meals.breakfast.trim(),
            lunch: meals.lunch.trim(),
            dinner: meals.dinner.trim(),
          },
        }),
      });

      markChapterComplete('datePlan', {
        selectedOption: `${rankedRestaurants[0].id}+${rankedActivities[0].id}`,
      });

      setIsComplete(true);
    } catch (error) {
      console.error('Failed to save selection:', error);
      markChapterComplete('datePlan', {
        selectedOption: `${rankedRestaurants[0].id}+${rankedActivities[0].id}`,
      });
      setIsComplete(true);
    }
  };

  const handleBackToTimeline = () => {
    router.push('/timeline');
  };

  const stepTitle = step === 1
    ? 'Rank the Restaurants'
    : step === 2
    ? 'Rank the Activities'
    : step === 3
    ? 'Stay at Home Meals'
    : 'Your Valentine\'s Plan';

  const stepSubtitle = step === 1
    ? 'Tap in order of preference!'
    : step === 2
    ? 'Tap in order of preference!'
    : step === 3
    ? 'What should we cook together?'
    : 'Here\'s what you\'ve planned!';

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      {isComplete && <ConfettiEffect trigger={isComplete} />}

      {/* Floating hearts background */}
      {floatingHearts.map((heart, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${heart.size} select-none`}
          style={{ left: heart.left, opacity: heart.opacity }}
          animate={{
            y: ['-10%', '-110vh'],
            rotate: [0, heart.delay % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            y: { duration: heart.duration, repeat: Infinity, ease: 'linear' },
            rotate: { duration: heart.duration / 2, repeat: Infinity, ease: 'easeInOut' },
            delay: heart.delay,
          }}
          initial={{ y: '100vh' }}
        >
          {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💗' : '❤️'}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {/* Step 1 & 2: Ranking grids */}
        {(step === 1 || step === 2) && !isComplete && (
          <motion.div
            key={`step-${step}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -30 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            {/* Step Indicator */}
            <motion.div variants={titleVariants} className="text-center mb-6 sm:mb-10">
              {/* Progress hearts */}
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
                        ? 'bg-rose-400 text-white'
                        : i + 1 === step
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110'
                        : 'bg-pink-100 text-pink-300'
                      }
                    `}>
                      {i + 1 < step ? '♥' : i + 1}
                    </div>
                    {i < TOTAL_STEPS - 1 && (
                      <div className={`
                        w-8 sm:w-16 h-0.5
                        transition-colors duration-300
                        ${i + 1 < step ? 'bg-rose-300' : 'bg-pink-100'}
                      `} />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-rose-300 mb-2">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-rose-600 mb-2 sm:mb-3">
                {stepTitle}
              </h1>
              <p className="text-base sm:text-lg text-rose-400">
                {stepSubtitle}
              </p>

              {/* Show ranked count */}
              <p className="text-xs sm:text-sm text-rose-300 mt-2">
                {currentRanked.length} of {currentOptions.length} ranked
              </p>
            </motion.div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentOptions.map((option) => {
                const rank = getRank(option);
                return (
                  <motion.button
                    key={option.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleToggleRank(option)}
                    className={`
                      relative
                      bg-white/80 backdrop-blur-sm
                      rounded-xl sm:rounded-2xl
                      shadow-md shadow-rose-100
                      p-4 sm:p-6
                      border-2
                      transition-all
                      duration-300
                      text-left
                      group
                      active:scale-[0.98]
                      ${rank !== null
                        ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/80'
                        : 'border-pink-100 hover:border-pink-200'
                      }
                    `}
                  >
                    {/* Rank badge */}
                    {rank !== null && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg shadow-rose-200"
                      >
                        {rankLabels[rank - 1]}
                      </motion.div>
                    )}

                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16
                      rounded-lg sm:rounded-xl
                      bg-gradient-to-br ${option.gradient}
                      flex items-center justify-center
                      text-2xl sm:text-3xl
                      shadow-lg shadow-rose-200/50
                      mb-3 sm:mb-4
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    `}>
                      {option.icon}
                    </div>

                    <h3 className="text-lg sm:text-xl font-cinzel text-gray-800 mb-1 sm:mb-2">
                      {option.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 pr-6">
                      {option.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4 mt-8 sm:mt-10"
            >
              {allRanked && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(step + 1)}
                  className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white font-medium shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-shadow text-sm sm:text-base"
                >
                  Next →
                </motion.button>
              )}

              <button
                onClick={step === 1 ? handleBackToTimeline : () => setStep(1)}
                className="text-sm sm:text-base text-rose-300 hover:text-rose-500 transition-colors"
              >
                {step === 1 ? '← Back to Timeline' : '← Back to Restaurants'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Stay at Home Meals */}
        {step === 3 && !isComplete && (
          <motion.div
            key="step-3-meals"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="max-w-sm sm:max-w-lg mx-auto px-2 relative z-10"
          >
            {/* Progress hearts */}
            <div className="text-center mb-6 sm:mb-10">
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
                        ? 'bg-rose-400 text-white'
                        : i + 1 === step
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110'
                        : 'bg-pink-100 text-pink-300'
                      }
                    `}>
                      {i + 1 < step ? '♥' : i + 1}
                    </div>
                    {i < TOTAL_STEPS - 1 && (
                      <div className={`
                        w-8 sm:w-16 h-0.5
                        transition-colors duration-300
                        ${i + 1 < step ? 'bg-rose-300' : 'bg-pink-100'}
                      `} />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-rose-300 mb-2">
                Step {step} of {TOTAL_STEPS}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-rose-600 mb-2 sm:mb-3">
                {stepTitle}
              </h1>
              <p className="text-base sm:text-lg text-rose-400">
                {stepSubtitle}
              </p>
            </div>

            {/* Meal inputs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md shadow-rose-100 p-6 sm:p-8 border border-pink-100 space-y-5 sm:space-y-6">
              {[
                { key: 'breakfast' as const, label: 'Breakfast', icon: '☀️' },
                { key: 'lunch' as const, label: 'Lunch', icon: '🌤️' },
                { key: 'dinner' as const, label: 'Dinner', icon: '🌙' },
              ].map((meal) => (
                <div key={meal.key}>
                  <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 mb-2">
                    <span className="text-xl">{meal.icon}</span>
                    {meal.label}
                  </label>
                  <input
                    type="text"
                    value={meals[meal.key]}
                    onChange={(e) => setMeals((prev) => ({ ...prev, [meal.key]: e.target.value }))}
                    placeholder={`What's for ${meal.label.toLowerCase()}?`}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-pink-100 bg-white/60 text-gray-800 placeholder-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:outline-none transition-all text-sm sm:text-base"
                  />
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-pink-200 text-rose-400 hover:bg-pink-50 transition-colors text-sm sm:text-base order-2 sm:order-1"
                >
                  ← Back
                </button>
                <motion.button
                  whileHover={allMealsFilled ? { scale: 1.05 } : {}}
                  whileTap={allMealsFilled ? { scale: 0.95 } : {}}
                  onClick={() => allMealsFilled && setStep(4)}
                  disabled={!allMealsFilled}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white font-medium shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                >
                  Next →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {step === 4 && !isComplete && (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-sm sm:max-w-lg mx-auto text-center px-2 relative z-10"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md shadow-rose-100 p-6 sm:p-8 border border-pink-100">
              <h2 className="text-2xl sm:text-3xl font-cinzel text-rose-600 mb-6 sm:mb-8">
                Your Valentine&apos;s Plan 💝
              </h2>

              {/* Rankings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Restaurant ranking */}
                <div className="bg-rose-50/60 rounded-xl p-4 sm:p-5 border border-pink-100">
                  <p className="text-[10px] sm:text-xs text-rose-400 uppercase tracking-wider mb-3">Restaurants</p>
                  <ol className="space-y-1.5 text-left">
                    {rankedRestaurants.map((r, i) => (
                      <li key={r.id} className="flex items-center gap-2 text-sm sm:text-base text-gray-800">
                        <span className="text-xs font-bold text-rose-500 w-6 shrink-0">{rankLabels[i]}</span>
                        <span className="text-base">{r.icon}</span>
                        <span>{r.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Activity ranking */}
                <div className="bg-rose-50/60 rounded-xl p-4 sm:p-5 border border-pink-100">
                  <p className="text-[10px] sm:text-xs text-rose-400 uppercase tracking-wider mb-3">Activities</p>
                  <ol className="space-y-1.5 text-left">
                    {rankedActivities.map((a, i) => (
                      <li key={a.id} className="flex items-center gap-2 text-sm sm:text-base text-gray-800">
                        <span className="text-xs font-bold text-rose-500 w-6 shrink-0">{rankLabels[i]}</span>
                        <span className="text-base">{a.icon}</span>
                        <span>{a.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Meals */}
              <div className="bg-rose-50/60 rounded-xl p-4 sm:p-5 border border-pink-100 mb-6 sm:mb-8">
                <p className="text-[10px] sm:text-xs text-rose-400 uppercase tracking-wider mb-3">Stay at Home Meals</p>
                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-gray-800">
                    <span className="text-lg mr-1.5">☀️</span> {meals.breakfast}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">
                    <span className="text-lg mr-1.5">🌤️</span> {meals.lunch}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">
                    <span className="text-lg mr-1.5">🌙</span> {meals.dinner}
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-rose-500 font-medium mb-4 sm:mb-6">
                Does this look perfect? 💕
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-pink-200 text-rose-400 hover:bg-pink-50 transition-colors text-sm sm:text-base order-2 sm:order-1"
                  disabled={isSubmitting}
                >
                  Go Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white font-medium shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-shadow disabled:opacity-50 text-sm sm:text-base order-1 sm:order-2"
                >
                  {isSubmitting ? 'Saving...' : 'This is perfect! 💝'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Complete */}
        {isComplete && rankedRestaurants.length > 0 && rankedActivities.length > 0 && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm sm:max-w-md mx-auto text-center px-2 relative z-10"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md shadow-rose-100 p-6 sm:p-8 border border-pink-100">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-5xl sm:text-6xl mb-4 sm:mb-6"
              >
                💝
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-cinzel text-rose-600 mb-3 sm:mb-4">
                Valentine&apos;s Date Planned!
              </h2>

              <div className="text-sm sm:text-base text-gray-700 space-y-1 mb-4 sm:mb-6">
                {rankedRestaurants.map((r, i) => (
                  <p key={r.id}>
                    <span className="text-xs font-bold text-rose-500">{rankLabels[i]}</span> {r.icon} {r.title}
                  </p>
                ))}
                <p className="text-xs sm:text-sm text-rose-300">♥</p>
                {rankedActivities.map((a, i) => (
                  <p key={a.id}>
                    <span className="text-xs font-bold text-rose-500">{rankLabels[i]}</span> {a.icon} {a.title}
                  </p>
                ))}
                <p className="text-xs sm:text-sm text-rose-300">♥</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  ☀️ {meals.breakfast} · 🌤️ {meals.lunch} · 🌙 {meals.dinner}
                </p>
              </div>

              <p className="text-sm sm:text-base text-rose-400 mb-6 sm:mb-8">
                I can&apos;t wait for our Valentine&apos;s date! 💕
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToTimeline}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white font-medium shadow-lg shadow-rose-200 text-sm sm:text-base"
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
