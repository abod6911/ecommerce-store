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
        background: "#040E0B",
        foreground: "#F5F2EB",
        brand: {
          dark: {
            950: "#040E0B",
            900: "#071612",
            850: "#0B201A",
            800: "#102B23",
            700: "#193D32",
            600: "#235244",
          },
          emerald: {
            950: "#061A13",
            900: "#0B291F",
            850: "#0F3528",
            800: "#144434",
            700: "#1B5944",
            600: "#226E55",
            500: "#2E8B6C",
            400: "#4FA88B",
            300: "#84C6B0",
            100: "#E3F2EC",
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
        ibm: ["var(--font-ibm)", "Tajawal", "Cairo", "sans-serif"],
        cairo: ["var(--font-alexandria)", "Cairo", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "Cairo", "sans-serif"],
        amiri: ["var(--font-amiri)", "Amiri", "serif"],
      },
      backgroundImage: {
        "luxury-radial": "radial-gradient(ellipse at 50% 0%, rgba(46, 139, 108, 0.14), transparent 62%), radial-gradient(ellipse at 85% 20%, rgba(200, 162, 90, 0.08), transparent 50%)",
        "card-glass": "linear-gradient(180deg, rgba(11, 32, 26, 0.96) 0%, rgba(7, 22, 18, 0.98) 100%)",
        "gold-gradient": "linear-gradient(135deg, #E5CA94 0%, #C8A25A 55%, #AD8641 100%)",
        "emerald-gradient": "linear-gradient(135deg, #4FA88B 0%, #2E8B6C 55%, #1B5944 100%)",
      },
      boxShadow: {
        "gold-glow": "0 12px 32px -12px rgba(200, 162, 90, 0.25)",
        "emerald-glow": "0 12px 32px -12px rgba(46, 139, 108, 0.22)",
        "card-luxury": "0 20px 50px -15px rgba(0, 0, 0, 0.78)",
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
