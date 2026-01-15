import { Variants, Transition } from 'framer-motion';

// Liquid transition - smooth, organic feel
export const liquidTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1
};

// Faster liquid transition for quick interactions
export const quickLiquidTransition: Transition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.8
};

// Smooth ease transition
export const smoothTransition: Transition = {
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

// Fade in left animation
export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        x: -10,
        transition: quickLiquidTransition
    }
};

// Fade in right animation
export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        x: 10,
        transition: quickLiquidTransition
    }
};

// Scale fade animation
export const scaleFade: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        scale: 0.98,
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

// Fast stagger container
export const fastStaggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
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

// Button ripple animation
export const buttonRipple = {
    rest: {
        scale: 1,
        transition: quickLiquidTransition
    },
    hover: {
        scale: 1.02,
        transition: quickLiquidTransition
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 }
    }
};

// Page transition
export const pageTransition: Variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Modal animation
export const modalOverlay: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

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

// Counter animation helper
export const counterAnimation = (value: number) => ({
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
});

// Parallax scroll effect values
export const parallaxValues = {
    slow: { offset: 0.2 },
    medium: { offset: 0.5 },
    fast: { offset: 0.8 }
};

// Scroll reveal animation
export const scrollReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
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

// Bounce indicator
export const bounceAnimation: Variants = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Rotate animation (for close buttons, etc.)
export const rotateAnimation = {
    rest: { rotate: 0 },
    hover: {
        rotate: 90,
        transition: quickLiquidTransition
    }
};

// Accordion animation
export const accordionContent: Variants = {
    collapsed: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 }
        }
    },
    expanded: {
        height: "auto",
        opacity: 1,
        transition: {
            height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, delay: 0.1 }
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

// Filter animation
export const filterItem: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: liquidTransition
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 }
    }
};
