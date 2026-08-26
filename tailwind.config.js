/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#061412",
        foreground: "#F8FAFC",
        brand: {
          dark: {
            950: "#040D0B",
            900: "#061412",
            850: "#091D1A",
            800: "#0D2622",
            700: "#143833",
            600: "#1D4E47",
          },
          emerald: {
            950: "#03150E",
            900: "#062016",
            850: "#082B1E",
            800: "#0B3B24",
            700: "#0E5233",
            600: "#059669",
            500: "#10B981",
            400: "#34D399",
            300: "#6EE7B7",
            100: "#D1FAE5",
          },
          amber: {
            900: "#78350F",
            800: "#92400E",
            700: "#B45309",
            600: "#D97706",
            500: "#F59E0B",
            400: "#FBBF24",
            300: "#FCD34D",
            200: "#FDE68A",
            100: "#FEF3C7",
          },
          gold: {
            900: "#78350F",
            800: "#92400E",
            700: "#B45309",
            600: "#D97706",
            500: "#F59E0B",
            400: "#FBBF24",
            300: "#FCD34D",
            200: "#FDE68A",
            100: "#FEF3C7",
          }
        },
      },
      fontFamily: {
        ibm: ["var(--font-ibm)", "IBM Plex Sans Arabic", "Cairo", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
      },
      backgroundImage: {
        "luxury-radial": "radial-gradient(ellipse at 50% -20%, rgba(16, 185, 129, 0.22), transparent 70%), radial-gradient(ellipse at 80% 60%, rgba(245, 158, 11, 0.12), transparent 60%)",
        "card-glass": "linear-gradient(145deg, rgba(13, 38, 34, 0.7) 0%, rgba(6, 20, 18, 0.85) 100%)",
        "gold-gradient": "linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)",
        "emerald-gradient": "linear-gradient(135deg, #6EE7B7 0%, #10B981 50%, #059669 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px -5px rgba(245, 158, 11, 0.35)",
        "emerald-glow": "0 0 30px -5px rgba(16, 185, 129, 0.35)",
        "card-luxury": "0 10px 35px -5px rgba(0, 0, 0, 0.6)",
      },
      lineHeight: {
        "arabic-normal": "1.65",
        "arabic-relaxed": "1.85",
        "arabic-loose": "2.05",
      },
    },
  },
  plugins: [],
};
