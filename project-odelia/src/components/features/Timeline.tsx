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
    // Get chapter statuses from localStorage
    const chaptersWithStatus = CHAPTERS.map(chapter => ({
      chapter,
      status: getChapterStatus(chapter),
    }));
    setChapters(chaptersWithStatus);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-fire-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Title */}
        <motion.div variants={titleVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-fire-600 mb-4">
            Our Journey
          </h1>
          <p className="text-lg text-parchment-600">
            Choose a chapter to begin your adventure
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 avatar-gradient rounded-full opacity-40" />

          {/* Chapter cards */}
          <div className="space-y-12">
            {chapters.map((item, index) => (
              <div key={item.chapter.id} className="relative">
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                  className={`
                    absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8
                    w-6 h-6 rounded-full
                    border-4 border-white
                    shadow-lg
                    z-10
                    ${item.status === 'completed' ? 'bg-earth-500' : ''}
                    ${item.status === 'available' ? 'bg-fire-500 animate-pulse' : ''}
                    ${item.status === 'locked' ? 'bg-parchment-400' : ''}
                  `}
                />

                {/* Card container - alternating sides */}
                <div className={`
                  flex
                  ${index % 2 === 0 ? 'justify-start md:pr-[55%]' : 'justify-end md:pl-[55%]'}
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
            className="relative mt-12"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-parchment-300 shadow-lg z-10" />
            <div className="text-center pt-10">
              <p className="text-parchment-500 italic">More chapters coming soon...</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
