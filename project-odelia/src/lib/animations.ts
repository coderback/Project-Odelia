import { Variants } from "framer-motion";

// Water Button (YES) Animations
export const waterButtonVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
  success: {
    scale: [1, 1.2, 0],
    opacity: [1, 1, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1],
      ease: "easeInOut",
    },
  },
};

// Ripple Effect Animations
export const rippleVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0.8,
  },
  visible: {
    scale: [0, 3, 5],
    opacity: [0.8, 0.4, 0],
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
};

// Message Reveal Animations
export const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: "easeOut",
    },
  },
};

// Card/Container Animations
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Heart Formation Animation
export const heartFormationVariants: Variants = {
  gathering: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  pulsing: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: 2,
      ease: "easeInOut",
    },
  },
};

// Water Droplet Particle Animation
export const dropletVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (custom: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1, 0.5],
    y: [0, -100],
    transition: {
      duration: 2,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

// Question Text Animation
export const questionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

// Confetti-related animations
export const confettiTrigger = {
  angle: 90,
  spread: 360,
  startVelocity: 45,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#38bdf8", "#2dd4bf", "#fda4af", "#fbbf24"],
};

// Page transition animations
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

// Loading wave animation
export const loadingWaveVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Story Intro Animations
export const storyVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

// Scroll unfurl animation for story opening
export const scrollUnfurlVariants: Variants = {
  hidden: {
    scaleY: 0,
    transformOrigin: "top",
  },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Choice button animations
export const choiceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};
