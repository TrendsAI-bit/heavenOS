import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['VT323', 'monospace'],
      },
      colors: {
        'halo-gold': '#f5c84b',
        'pixel-border': '#000000',
      },
      boxShadow: {
        'pixel': '2px 2px 0 #000000',
        'pixel-small': '1px 1px 0 #000000',
      },
      animation: {
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
