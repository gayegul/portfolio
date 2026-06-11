/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ground': '#101211',
        'ink': '#E6EAE7',
        'ink-muted': '#99A39D',
        'ink-faint': '#79847D',
        'line': '#232826',
        'line-strong': '#353B38',
        'accent': '#2DD4BF',
      },
      fontFamily: {
        display: ['"Big Shoulders Display Variable"', 'Impact', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      scrollMargin: {
        'nav': '5rem',
      },
    },
  },
  plugins: [],
}
