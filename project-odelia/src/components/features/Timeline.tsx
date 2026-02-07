'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ChapterCard from '@/components/ui/ChapterCard';
import { CHAPTERS, getChapterStatus, ChapterStatus, Chapter } from '@/lib/chapters';

interface ChapterWithStatus {
  chapter: Chapter;
  status: ChapterStatus;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
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

export default function Timeline() {
  const [chapters, setChapters] = useState<ChapterWithStatus[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const chaptersWithStatus = CHAPTERS.map(chapter => ({
      chapter,
      status: getChapterStatus(chapter),
    }));
    setChapters(chaptersWithStatus);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Title */}
        <motion.div variants={titleVariants} className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-rose-600 mb-2 sm:mb-4">
            Our Journey
          </h1>
          <p className="text-base sm:text-lg text-rose-400">
            Choose a chapter to begin your adventure
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300 rounded-full opacity-40" />

          {/* Chapter cards */}
          <div className="space-y-8 sm:space-y-12">
            {chapters.map((item, index) => (
              <div key={item.chapter.id} className="relative">
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                  className={`
                    absolute
                    left-4 sm:left-1/2
                    transform -translate-x-1/2
                    top-6 sm:top-8
                    w-5 h-5 sm:w-6 sm:h-6
                    rounded-full
                    border-3 sm:border-4 border-white
                    shadow-lg
                    z-10
                    ${item.status === 'completed' ? 'bg-rose-400' : ''}
                    ${item.status === 'available' ? 'bg-red-500 animate-pulse' : ''}
                    ${item.status === 'locked' ? 'bg-pink-200' : ''}
                  `}
                />

                {/* Card container */}
                <div className={`
                  pl-10 sm:pl-0
                  sm:flex
                  ${index % 2 === 0 ? 'sm:justify-start sm:pr-[52%]' : 'sm:justify-end sm:pl-[52%]'}
                `}>
                  <ChapterCard
                    chapter={item.chapter}
                    status={item.status}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Future placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="relative mt-8 sm:mt-12"
          >
            <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-3 sm:border-4 border-white bg-pink-100 shadow-lg z-10" />
            <div className="pl-10 sm:pl-0 sm:text-center pt-2 sm:pt-10">
              <p className="text-sm sm:text-base text-rose-300 italic">More chapters coming soon...</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
