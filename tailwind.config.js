/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        surface: { DEFAULT: 'var(--surface)' },
        card: { DEFAULT: 'var(--card)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          light: 'var(--gold-light)',
          dim: 'var(--gold-dim)',
        },
        foreground: { DEFAULT: 'var(--foreground)' },
        'body-text': { DEFAULT: 'var(--body-text)' },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: { DEFAULT: 'var(--border)' },
        'border-subtle': { DEFAULT: 'var(--border-subtle)' },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) / 2)',
        lg: 'calc(var(--radius) * 2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};