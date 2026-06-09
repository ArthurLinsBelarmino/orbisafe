/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orbi': {
          'bg':       '#040d1a',
          'bg2':      '#071428',
          'panel':    '#0a1f3d',
          'border':   '#0e2f5a',
          'cyan':     '#00e5ff',
          'cyan2':    '#00b8d9',
          'orange':   '#ff6b2b',
          'orange2':  '#e55a1f',
          'green':    '#00ff88',
          'red':      '#ff3b5c',
          'yellow':   '#ffd200',
          'text':     '#e2eeff',
          'muted':    '#7a9cc5',
        }
      },
      fontFamily: {
        'display': ['"Syne"', 'sans-serif'],
        'body':    ['"DM Sans"', 'sans-serif'],
        'mono':    ['"Space Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00e5ff44' },
          '100%': { boxShadow: '0 0 20px #00e5ff99, 0 0 40px #00e5ff44' },
        }
      },
      backgroundImage: {
        'grid-orbi': 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}