/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Lighter blue for dark mode
        secondary: "#1D4ED8",
        accent: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        background: "#020617", // slate-950
        card: "#0F172A", // slate-900
        "text-primary": "#F8FAFC", // slate-50
        "text-muted": "#94A3B8", // slate-400
        border: "#1E293B", // slate-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
