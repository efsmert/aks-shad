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
                'float-particle': 'float-particle ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'float-particle': {
                    '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.35' },
                    '50%': { transform: 'translate(-5px, -20px)', opacity: '0.5' },
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
            },
        },
    },
    plugins: [],
}
