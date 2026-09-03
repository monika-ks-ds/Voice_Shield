/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vs-dark': '#0f1419',
        'vs-darker': '#0a0e13',
        'vs-navy': '#001a4d',
        'vs-navy-light': '#003d99',
        'vs-red': '#dc2626',
        'vs-red-dark': '#991b1b',
        'vs-red-light': '#ef4444',
        'vs-amber': '#f59e0b',
        'vs-green': '#10b981',
        'vs-cyan': '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'gauge-sweep': 'gaugeSweep 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'waveform': 'waveform 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gaugeSweep: {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'rotate(270deg)' },
        },
        waveform: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '20px' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
        'glow-navy': '0 0 20px rgba(0, 26, 77, 0.5)',
        'inset-top': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
