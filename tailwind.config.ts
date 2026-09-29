import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080c14",
        surface: "#0f172a",
        surfaceHover: "#1e293b",
        primary: {
          DEFAULT: "#007FFF",
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#007FFF",
          600: "#0066cc",
          700: "#004d99",
        },
        accent: {
          cyan: "#00f2fe",
          violet: "#8b5cf6",
          coral: "#ff6f61",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 127, 255, 0.25), transparent)",
        "card-glow": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(0, 127, 255, 0.2)",
        "glow-md": "0 0 35px rgba(0, 127, 255, 0.35)",
        "glow-lg": "0 0 50px rgba(0, 127, 255, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
