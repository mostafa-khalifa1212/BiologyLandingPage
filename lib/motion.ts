export const springTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// Rubber-stamp lift on hover (buttons/cards)
export const stampHover = {
  rest: {
    x: 0,
    y: 0,
  },
  hover: {
    x: -2,
    y: -2,
    transition: {
      duration: 0.15,
      ease: "easeOut" as const,
    },
  },
  tap: {
    x: 0,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// SVG stroke draw-in animation
export const drawLineVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.8,
        ease: "easeInOut" as const,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};
