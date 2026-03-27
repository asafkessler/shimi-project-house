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
        background: '#0b1410',
        surface: '#111c14',
        'surface-2': '#192519',
        'surface-3': '#223021',
        sage: '#7aaa82',
        'sage-light': '#a8cead',
        'sage-dark': '#4a7a52',
        'sage-muted': '#5a8a62',
        copper: '#c07a4a',
        'copper-light': '#d4956a',
        'copper-dark': '#8a5530',
        text: '#f0e8dc',
        'text-muted': '#a8a090',
        'text-dim': '#5a6050',
        border: '#2d4028',
        'border-light': '#3d5535',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-sage': 'pulseSage 3s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        pulseSage: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(122,170,130,0.3)' },
          '50%': { boxShadow: '0 0 0 14px rgba(122,170,130,0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '25%': { transform: 'translateX(30px) translateY(-20px) scale(1.05)' },
          '50%': { transform: 'translateX(-20px) translateY(-40px) scale(0.95)' },
          '75%': { transform: 'translateX(-30px) translateY(-10px) scale(1.02)' },
        },
      },
      backgroundImage: {
        'sage-gradient': 'linear-gradient(135deg, #7aaa82 0%, #4a7a52 100%)',
        'copper-gradient': 'linear-gradient(135deg, #d4956a 0%, #8a5530 100%)',
        'forest-gradient': 'linear-gradient(180deg, #0b1410 0%, #111c14 100%)',
        'hero-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(11,20,16,0.8) 100%)',
      },
      boxShadow: {
        sage: '0 0 30px rgba(122,170,130,0.12)',
        'sage-lg': '0 0 60px rgba(122,170,130,0.18)',
        'sage-glow': '0 0 20px rgba(122,170,130,0.35)',
        copper: '0 0 30px rgba(192,122,74,0.15)',
        card: '0 4px 40px rgba(0,0,0,0.5)',
        'card-hover': '0 12px 60px rgba(0,0,0,0.7)',
        soft: '0 2px 20px rgba(0,0,0,0.3)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
}
