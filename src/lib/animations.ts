import { Variants, Transition } from 'framer-motion';

// ── Easing curves (per motion-design reference) ──
// Use exponential curves for natural deceleration
const easeOutQuart = [0.25, 1, 0.5, 1] as const;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.65, 0, 0.35, 1] as const;

// ── Transitions ──
const enterTransition: Transition = {
    duration: 0.6,
    ease: easeOutQuart,
};

const quickTransition: Transition = {
    duration: 0.35,
    ease: easeOutQuart,
};

const exitTransition: Transition = {
    duration: 0.25,
    ease: easeOutQuart,
};

// ── Fade in variants ──
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: enterTransition,
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: exitTransition,
    },
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: enterTransition,
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: exitTransition,
    },
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: easeOutQuart },
    },
};

// ── Stagger container ──
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerSlow: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

// ── Text reveal (for headlines — clip-path approach) ──
export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easeOutExpo,
        },
    },
};

// ── Letter-by-letter stagger ──
export const letterStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.04,
        },
    },
};

export const letterAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOutQuart,
        },
    },
};

// ── Nav link underline ──
export const navUnderline: Variants = {
    initial: { scaleX: 0, originX: 0 },
    hover: {
        scaleX: 1,
        transition: quickTransition,
    },
};

// ── Modal ──
export const modalContent: Variants = {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: enterTransition,
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.97,
        transition: exitTransition,
    },
};

// ── Card hover (subtle lift) ──
export const cardHover = {
    rest: {
        y: 0,
        transition: quickTransition,
    },
    hover: {
        y: -4,
        transition: quickTransition,
    },
};

// ── Image zoom ──
export const imageZoom = {
    rest: {
        scale: 1,
        transition: quickTransition,
    },
    hover: {
        scale: 1.03,
        transition: quickTransition,
    },
};
