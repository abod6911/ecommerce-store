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
        background: "#070909",
        foreground: "#F5F2EB",
        brand: {
          dark: {
            950: "#070909",
            900: "#0C0F0E",
            850: "#121615",
            800: "#181D1B",
            700: "#242B28",
            600: "#333C38",
          },
          emerald: {
            950: "#0D1814",
            900: "#13231D",
            850: "#192D25",
            800: "#213B31",
            700: "#2D5244",
            600: "#3D6E5B",
            500: "#528A74",
            400: "#72A691",
            300: "#9CC4B4",
            100: "#E3EFEA",
          },
          amber: {
            900: "#4A3818",
            800: "#695023",
            700: "#8C6B30",
            600: "#AD8641",
            500: "#C8A25A",
            400: "#D6B472",
            300: "#E5CA94",
            200: "#F0DFB9",
            100: "#F9F2E3",
          },
          gold: {
            900: "#4A3818",
            800: "#695023",
            700: "#8C6B30",
            600: "#AD8641",
            500: "#C8A25A",
            400: "#D6B472",
            300: "#E5CA94",
            200: "#F0DFB9",
            100: "#F9F2E3",
          }
        },
      },
      fontFamily: {
        ibm: ["var(--font-ibm)", "IBM Plex Sans Arabic", "Cairo", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
      },
      backgroundImage: {
        "luxury-radial": "radial-gradient(ellipse at 50% 0%, rgba(200, 162, 90, 0.08), transparent 65%)",
        "card-glass": "linear-gradient(180deg, rgba(18, 22, 21, 0.96) 0%, rgba(12, 15, 14, 0.98) 100%)",
        "gold-gradient": "linear-gradient(135deg, #E5CA94 0%, #C8A25A 55%, #AD8641 100%)",
        "emerald-gradient": "linear-gradient(135deg, #72A691 0%, #528A74 55%, #3D6E5B 100%)",
      },
      boxShadow: {
        "gold-glow": "0 12px 32px -12px rgba(200, 162, 90, 0.25)",
        "emerald-glow": "0 12px 32px -12px rgba(82, 138, 116, 0.2)",
        "card-luxury": "0 20px 50px -15px rgba(0, 0, 0, 0.75)",
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
