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
        background: "#050B18",
        foreground: "#F8FAFC",
        brand: {
          dark: {
            950: "#030712",
            900: "#050B18",
            850: "#0A162E",
            800: "#0F2042",
            700: "#172E5C",
            600: "#1E3A8A",
          },
          emerald: {
            950: "#071126",
            900: "#0C1D42",
            850: "#102757",
            800: "#1E3A8A",
            700: "#1D4ED8",
            600: "#2563EB",
            500: "#3B82F6",
            400: "#60A5FA",
            300: "#93C5FD",
            100: "#DBEAFE",
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
        "luxury-radial": "radial-gradient(ellipse at 50% -20%, rgba(59, 130, 246, 0.24), transparent 70%), radial-gradient(ellipse at 80% 60%, rgba(245, 158, 11, 0.12), transparent 60%)",
        "card-glass": "linear-gradient(145deg, rgba(10, 22, 46, 0.75) 0%, rgba(5, 11, 24, 0.9) 100%)",
        "gold-gradient": "linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)",
        "emerald-gradient": "linear-gradient(135deg, #93C5FD 0%, #3B82F6 50%, #2563EB 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px -5px rgba(245, 158, 11, 0.35)",
        "emerald-glow": "0 0 30px -5px rgba(59, 130, 246, 0.38)",
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
