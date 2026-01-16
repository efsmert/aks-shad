/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'green-dark-bg': '#0a0f0d',
                'green-primary': '#0d4d2b',
                'green-secondary': '#1a7d4e',
                'green-accent': '#2ecc71',
                'green-light': '#a8e6cf',
                'green-card': '#0f1a14',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'particle-drift': 'particle-drift ease-in-out infinite',
                'orb-drift-1': 'orb-drift-1 25s ease-in-out infinite',
                'orb-drift-2': 'orb-drift-2 30s ease-in-out infinite',
                'orb-drift-3': 'orb-drift-3 28s ease-in-out infinite',
                'orb-drift-4': 'orb-drift-4 22s ease-in-out infinite',
                'letter-glow-1': 'letter-glow-1 3s ease-in-out infinite',
                'letter-glow-2': 'letter-glow-2 4s ease-in-out infinite',
                'letter-aura': 'letter-aura 5s ease-in-out infinite',
                // Breathing animations for Greek letters - each slightly different timing
                'breathe-1': 'breathe-1 4s ease-in-out infinite',
                'breathe-2': 'breathe-2 4.5s ease-in-out infinite',
                'breathe-3': 'breathe-3 5s ease-in-out infinite',
                // Vignette shift animation
                'vignette-shift': 'vignette-shift 12s ease-in-out infinite',
                // Particle fly-in animation - 'both' ensures particles start at their off-screen position
                'particle-fly-in': 'particle-fly-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(46, 204, 113, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0' },
                    '50%': { opacity: '0.6' },
                },
                'particle-drift': {
                    '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.5' },
                    '25%': { transform: 'translate(8px, -12px)', opacity: '0.6' },
                    '50%': { transform: 'translate(-5px, 10px)', opacity: '0.5' },
                    '75%': { transform: 'translate(10px, 5px)', opacity: '0.55' },
                },
                'orb-drift-1': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(25px, -18px)' },
                    '50%': { transform: 'translate(-12px, 22px)' },
                    '75%': { transform: 'translate(18px, 8px)' },
                },
                'orb-drift-2': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(-22px, 12px)' },
                    '50%': { transform: 'translate(18px, -25px)' },
                    '75%': { transform: 'translate(-10px, -12px)' },
                },
                'orb-drift-3': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(18px, 22px)' },
                    '50%': { transform: 'translate(-22px, -8px)' },
                    '75%': { transform: 'translate(12px, -18px)' },
                },
                'orb-drift-4': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(-18px, -22px)' },
                    '50%': { transform: 'translate(12px, 18px)' },
                    '75%': { transform: 'translate(-22px, 8px)' },
                },
                'letter-glow-1': {
                    '0%, 100%': { opacity: '0' },
                    '50%': { opacity: '0.8' },
                },
                'letter-glow-2': {
                    '0%, 100%': { opacity: '0' },
                    '40%': { opacity: '0.5' },
                    '60%': { opacity: '0.5' },
                },
                'letter-aura': {
                    '0%, 100%': { opacity: '0.1' },
                    '50%': { opacity: '0.5' },
                },
                // Breathing keyframes - GPU-optimized using only transform + opacity
                // The glow is handled by a static text-shadow/drop-shadow, only scale animates
                'breathe-1': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                    '50%': {
                        transform: 'scale(1.02)',
                        opacity: '0.92',
                    },
                },
                'breathe-2': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                    '50%': {
                        transform: 'scale(1.025)',
                        opacity: '0.9',
                    },
                },
                'breathe-3': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                    '50%': {
                        transform: 'scale(1.018)',
                        opacity: '0.94',
                    },
                },
                // Vignette shift - GPU-accelerated using transform
                'vignette-shift': {
                    '0%, 100%': {
                        transform: 'translate(0, 0)',
                        opacity: '1'
                    },
                    '25%': {
                        transform: 'translate(3%, 3%)',
                        opacity: '0.95'
                    },
                    '50%': {
                        transform: 'translate(-3%, -3%)',
                        opacity: '1'
                    },
                    '75%': {
                        transform: 'translate(1%, -1%)',
                        opacity: '0.97'
                    },
                },
                // Particle fly-in from random directions
                'particle-fly-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(var(--fly-x, 0), var(--fly-y, 100px)) scale(0)'
                    },
                    '60%': {
                        opacity: '0.6',
                        transform: 'translate(0, 0) scale(1.2)'
                    },
                    '100%': {
                        opacity: '0.5',
                        transform: 'translate(0, 0) scale(1)'
                    },
                },
            },
        },
    },
    plugins: [],
}

