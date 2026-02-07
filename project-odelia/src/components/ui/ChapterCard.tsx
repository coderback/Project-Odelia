'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Chapter, ChapterStatus } from '@/lib/chapters';

interface ChapterCardProps {
  chapter: Chapter;
  status: ChapterStatus;
  index: number;
}

const statusColors = {
  completed: {
    border: 'border-rose-300',
    bg: 'bg-rose-50/50',
    text: 'text-rose-600',
    badge: 'bg-rose-400 text-white',
  },
  available: {
    border: 'border-red-400',
    bg: 'bg-red-50/30',
    text: 'text-red-600',
    badge: 'bg-red-500 text-white',
  },
  locked: {
    border: 'border-pink-200',
    bg: 'bg-pink-50/30',
    text: 'text-pink-300',
    badge: 'bg-pink-100 text-pink-400',
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
  hover: {
    scale: 1.02,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
};

export default function ChapterCard({ chapter, status, index }: ChapterCardProps) {
  const router = useRouter();
  const colors = statusColors[status];
  const isClickable = status !== 'locked';

  const handleClick = () => {
    if (isClickable) {
      router.push(chapter.route);
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={isClickable ? 'hover' : undefined}
      onClick={handleClick}
      className={`
        relative
        bg-white/80 backdrop-blur-sm
        ${colors.bg}
        rounded-xl
        shadow-md shadow-rose-100
        p-4 sm:p-6
        w-full
        max-w-md
        border-2
        ${colors.border}
        transition-all
        duration-300
        ${isClickable ? 'cursor-pointer active:scale-[0.98]' : 'cursor-not-allowed opacity-60'}
      `}
    >
      {/* Status Badge */}
      <div className={`absolute -top-2.5 sm:-top-3 right-3 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${colors.badge}`}>
        {status === 'completed' && '♥ Completed'}
        {status === 'available' && '♥ Available'}
        {status === 'locked' && '🔒 Locked'}
      </div>

      {/* Chapter Icon */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`
          w-11 h-11 sm:w-14 sm:h-14
          rounded-full
          flex items-center justify-center
          text-xl sm:text-2xl
          flex-shrink-0
          ${status === 'locked' ? 'bg-pink-50' : 'bg-white'}
          shadow-md
          border-2
          ${colors.border}
        `}>
          {chapter.icon}
        </div>

        {/* Chapter Info */}
        <div className="flex-1 min-w-0 pr-6 sm:pr-8">
          <h3 className={`text-base sm:text-xl font-cinzel ${colors.text} mb-0.5 sm:mb-1 truncate`}>
            {chapter.title}
          </h3>
          <p className={`text-xs sm:text-sm leading-snug ${status === 'locked' ? 'text-pink-300' : 'text-gray-500'}`}>
            {chapter.description}
          </p>
        </div>
      </div>

      {/* Arrow indicator for available chapters */}
      {isClickable && (
        <motion.div
          className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 mt-1 sm:mt-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className={`text-lg sm:text-xl ${colors.text}`}>→</span>
        </motion.div>
      )}
    </motion.div>
  );
}
