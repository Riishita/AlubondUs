import { SpringOptions } from "framer-motion";

/**
 * Premium Transition Defaults
 * Inspired by Apple/Tesla aesthetic - utilizing smooth cubic-beziers and spring physics.
 */

// Premium easing resembling Apple's aesthetic
const appleEase = [0.32, 0.72, 0, 1];
const crispEase = [0.22, 1, 0.36, 1]; // Quick reveal, long tail

export const TRANSITIONS = {
  // Easing arrays for use in `ease` properties
  ease: {
    premium: appleEase,
    crisp: crispEase,
  },
  
  // Fully defined transitions
  premium: {
    duration: 0.8,
    ease: appleEase,
  },
  premiumFast: {
    duration: 0.6,
    ease: appleEase,
  },
  premiumSlow: {
    duration: 1.2,
    ease: appleEase,
  },
  
  // Spring configurations for 'useSpring'
  spring: {
    stiffness: 40,
    damping: 10,
    mass: 1,
  } as SpringOptions,
  
  springSnappy: {
    stiffness: 100,
    damping: 15,
  } as SpringOptions,
};

/**
 * Shared Animation Variants
 * Usage: <motion.div variants={VARIANTS.fadeUp} initial="hidden" whileInView="show" />
 */
export const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: crispEase,
      },
    },
  },
  fadeUpBlur: {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: crispEase,
      },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  scaleReveal: {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: appleEase,
      },
    },
  }
};
