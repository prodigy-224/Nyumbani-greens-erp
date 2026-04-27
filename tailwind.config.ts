import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // Brand colors
        'nyumbani-green': 'var(--nyumbani-green)',
        'green-link': 'var(--green-link)',
        'green-border': 'var(--green-border)',
        'harvest-gold': 'var(--harvest-gold)',
        'gold-link': 'var(--gold-link)',
        'gold-border': 'var(--gold-border)',
        
        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-dim': 'var(--text-dim)',
        
        // Semantic colors
        'emerald': 'var(--emerald)',
        'amber': 'var(--amber)',
        'crimson': 'var(--crimson)',
        'tomato': 'var(--tomato)',
        'violet': 'var(--violet)',
        'purple': 'var(--purple)',
        'blue': 'var(--blue)',
        
        // Border colors
        'border-subtle': 'var(--border-subtle)',
        'border-prominent': 'var(--border-prominent)',
        'border-light': 'var(--border-light)',
      },
      borderRadius: {
        'pill': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config
