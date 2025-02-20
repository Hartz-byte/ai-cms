/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#10B981",
        warning: "#F59E0B",
        background: "#F3F4F6",
        darkBackground: "#1A1B1E",
        card: "#FFFFFF",
        darkCard: "#2C2D31",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        modern: "0 4px 14px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
