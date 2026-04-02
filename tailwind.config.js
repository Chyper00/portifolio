/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hack: {
          bg:      '#0a0c0f',
          surface: '#0f1117',
          card:    '#141820',
          border:  '#1e2530',
          green:   '#00ff41',
          lime:    '#39ff14',
          cyan:    '#00e5ff',
          dim:     '#00cc33',
          muted:   '#3a4a3a',
          text:    '#c8ffd4',
          comment: '#4a6650',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        neon:     '0 0 8px #00ff41, 0 0 20px #00ff4133',
        'neon-sm':'0 0 4px #00ff41, 0 0 10px #00ff4144',
        cyan:     '0 0 8px #00e5ff, 0 0 20px #00e5ff33',
      },
      animation: {
        blink:   'blink 1s step-end infinite',
        glitch:  'glitch 3s infinite',
        scanline:'scanline 6s linear infinite',
        float:   'float 4s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        glitch: {
          '0%,92%,100%': { transform: 'translate(0)' },
          '93%':          { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '95%':          { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '97%':          { transform: 'translate(-1px, 2px)' },
        },
        scanline: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        'pulse-green': {
          '0%,100%': { boxShadow: '0 0 4px #00ff41, 0 0 10px #00ff4133' },
          '50%':     { boxShadow: '0 0 12px #00ff41, 0 0 30px #00ff4166' },
        },
      },
    },
  },
  plugins: [],
}
