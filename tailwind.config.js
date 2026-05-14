/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: '#0c0c10',
          surface: '#12121a',
          panel: '#16161f',
          border: '#252530',
          'border-bright': '#35354a',
          title: '#1a1a24',
        },
        syntax: {
          keyword: '#c792ea',
          string: '#c3e88d',
          func: '#82aaff',
          comment: '#546e7a',
          type: '#ffcb6b',
          number: '#f78c6c',
          property: '#89ddff',
        },
        accent: {
          DEFAULT: '#7c6aef',
          hover: '#9580ff',
          glow: '#7c6aef40',
          dim: '#7c6aef20',
        },
        text: {
          DEFAULT: '#e2e2ef',
          secondary: '#9898b0',
          muted: '#5c5c72',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px #7c6aef30',
        panel: '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-up': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
