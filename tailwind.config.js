/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        'surface-3': '#222222',
        gold: '#c9a84c',
        'gold-dark': '#8b6914',
        'gold-light': '#e2c47a',
        'gold-muted': '#a8893e',
        text: '#f5f0e8',
        'text-muted': '#9a8f7a',
        'text-dim': '#5a5248',
        border: '#2a2520',
        'border-gold': '#3a3020',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #8b6914 50%, #c9a84c 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(10,10,10,0.9) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #c9a84c 0%, #e2c47a 25%, #c9a84c 50%, #8b6914 75%, #c9a84c 100%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201,168,76,0.15)',
        'gold-lg': '0 0 60px rgba(201,168,76,0.2)',
        'gold-glow': '0 0 20px rgba(201,168,76,0.4)',
        card: '0 4px 30px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 50px rgba(0,0,0,0.8)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
