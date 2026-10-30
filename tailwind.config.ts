import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#111111",
          800: "#161616",
          750: "#1c1c1c",
          700: "#242424",
          600: "#333333",
          400: "#737373",
        },
        gold: {
          300: "#fef08a",
          400: "#F5D76E",
          500: "#D4AF37",
          600: "#B8973A",
          700: "#927424",
          800: "#6a5418",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        bebas: ["'Bebas Neue'", "Impact", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5D76E 0%, #D4AF37 50%, #AA820A 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
