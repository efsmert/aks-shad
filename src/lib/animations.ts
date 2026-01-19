import { Variants, Transition } from 'framer-motion';

// Liquid transition - smooth, organic feel (used internally)
const liquidTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1
};

// Faster liquid transition for quick interactions (used internally)
const quickLiquidTransition: Transition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.8
};

// Smooth ease transition (used internally)
const smoothTransition: Transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
};

// Fade in up animation
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: quickLiquidTransition
    }
};

// Fade in down animation
export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: quickLiquidTransition
    }
};

// Stagger container
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// Card hover animation
export const cardHover = {
    rest: {
        y: 0,
        boxShadow: "0 4px 20px rgba(46, 204, 113, 0.1)",
        transition: liquidTransition
    },
    hover: {
        y: -8,
        boxShadow: "0 20px 40px rgba(46, 204, 113, 0.2)",
        transition: liquidTransition
    }
};

// Image zoom animation
export const imageZoom = {
    rest: {
        scale: 1,
        transition: smoothTransition
    },
    hover: {
        scale: 1.05,
        transition: smoothTransition
    }
};

// Modal animation
export const modalContent: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        y: 30,
        scale: 0.95,
        transition: quickLiquidTransition
    }
};

// Nav link underline animation
export const navUnderline: Variants = {
    initial: { scaleX: 0, originX: 0 },
    hover: {
        scaleX: 1,
        transition: quickLiquidTransition
    }
};

// Text reveal animation (for headlines)
// Note: clipPath extends to 120% at bottom to prevent clipping of letter descenders (y, g, p, etc.)
export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        clipPath: "polygon(0 -20%, 100% -20%, 100% 0%, 0 0%)"
    },
    visible: {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0 -20%, 100% -20%, 100% 120%, 0 120%)",
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Letter stagger for text
export const letterStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03
        }
    }
};

export const letterAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Timeline node animation
export const timelineNode: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
        scale: 0.8
    },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};
