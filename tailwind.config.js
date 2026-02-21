/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Heritage greens
                'heritage': {
                    900: 'oklch(22% 0.06 155)',
                    800: 'oklch(28% 0.07 155)',
                    700: 'oklch(34% 0.08 155)',
                    600: 'oklch(40% 0.08 155)',
                    500: 'oklch(46% 0.07 155)',
                    400: 'oklch(55% 0.06 155)',
                    300: 'oklch(65% 0.04 155)',
                    200: 'oklch(80% 0.02 155)',
                    100: 'oklch(90% 0.01 155)',
                    50: 'oklch(96% 0.005 155)',
                },
                // Antique gold accents
                'gold': {
                    700: 'oklch(52% 0.12 80)',
                    600: 'oklch(58% 0.13 80)',
                    500: 'oklch(64% 0.14 78)',
                    400: 'oklch(72% 0.11 78)',
                    300: 'oklch(80% 0.07 78)',
                    200: 'oklch(88% 0.04 78)',
                    100: 'oklch(94% 0.02 78)',
                },
                // Warm stone neutrals
                'stone': {
                    900: 'oklch(18% 0.01 60)',
                    800: 'oklch(25% 0.01 60)',
                    700: 'oklch(35% 0.01 60)',
                    600: 'oklch(45% 0.01 60)',
                    500: 'oklch(55% 0.01 60)',
                    400: 'oklch(65% 0.01 60)',
                    300: 'oklch(78% 0.01 60)',
                    200: 'oklch(88% 0.008 60)',
                    100: 'oklch(94% 0.005 60)',
                    50: 'oklch(97% 0.003 60)',
                },
                // Backward compat aliases used in existing code
                'green-dark-bg': 'oklch(97% 0.003 60)',
                'green-primary': 'oklch(22% 0.06 155)',
                'green-secondary': 'oklch(34% 0.08 155)',
                'green-accent': 'oklch(58% 0.13 80)',
                'green-light': 'oklch(45% 0.01 60)',
                'green-card': 'oklch(94% 0.005 60)',
            },
            fontFamily: {
                sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'Georgia', 'serif'],
                body: ['var(--font-body)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': ['clamp(2.5rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'section': ['clamp(2rem, 3vw + 0.5rem, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
                'subsection': ['clamp(1.25rem, 2vw + 0.25rem, 1.75rem)', { lineHeight: '1.3' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            animation: {
                'reveal': 'reveal-up 0.7s cubic-bezier(0.25, 1, 0.5, 1) both',
            },
            keyframes: {
                'reveal-up': {
                    from: { opacity: '0', transform: 'translateY(1.5rem)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            transitionTimingFunction: {
                'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}
