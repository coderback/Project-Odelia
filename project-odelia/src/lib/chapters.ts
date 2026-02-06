// Chapter configuration and progress tracking for Project Odelia Timeline

export type ChapterId = 'valentine' | 'datePlan';

export type ChapterStatus = 'locked' | 'available' | 'completed';

export interface Chapter {
  id: ChapterId;
  title: string;
  description: string;
  route: string;
  element: 'water' | 'fire' | 'earth' | 'air' | 'all';
  icon: string;
}

export interface ChapterProgress {
  valentine: { completed: boolean; completedAt?: string };
  datePlan: { completed: boolean; completedAt?: string; selectedOption?: string };
}

// Chapter definitions
export const CHAPTERS: Chapter[] = [
  {
    id: 'valentine',
    title: "Valentine's Game",
    description: 'Master the four elements and answer the ultimate question',
    route: '/valentine',
    element: 'all',
    icon: '❤️',
  },
  {
    id: 'datePlan',
    title: 'Date Plan',
    description: 'Choose our perfect date together',
    route: '/date-plan',
    element: 'fire',
    icon: '✨',
  },
];

// LocalStorage key for progress
const PROGRESS_KEY = 'odelia-chapter-progress';

// Default progress state
const DEFAULT_PROGRESS: ChapterProgress = {
  valentine: { completed: false },
  datePlan: { completed: false },
};

// Get chapter progress from localStorage
export function getChapterProgress(): ChapterProgress {
  if (typeof window === 'undefined') {
    return DEFAULT_PROGRESS;
  }

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load chapter progress:', error);
  }

  return DEFAULT_PROGRESS;
}

// Save chapter progress to localStorage
export function saveChapterProgress(progress: ChapterProgress): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save chapter progress:', error);
  }
}

// Mark a chapter as completed
export function markChapterComplete(
  chapterId: ChapterId,
  metadata?: { selectedOption?: string }
): ChapterProgress {
  const progress = getChapterProgress();

  progress[chapterId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    ...metadata,
  };

  saveChapterProgress(progress);
  return progress;
}

// Check if a chapter is completed
export function isChapterCompleted(chapterId: ChapterId): boolean {
  const progress = getChapterProgress();
  return progress[chapterId]?.completed ?? false;
}

// Get chapter status based on progress
export function getChapterStatus(chapter: Chapter): ChapterStatus {
  const progress = getChapterProgress();

  // Valentine's game is always available
  if (chapter.id === 'valentine') {
    return progress.valentine.completed ? 'completed' : 'available';
  }

  // Date plan requires valentine to be completed
  if (chapter.id === 'datePlan') {
    if (progress.datePlan.completed) {
      return 'completed';
    }
    return progress.valentine.completed ? 'available' : 'locked';
  }

  return 'available';
}

// Get chapter by ID
export function getChapter(chapterId: ChapterId): Chapter | undefined {
  return CHAPTERS.find(c => c.id === chapterId);
}
