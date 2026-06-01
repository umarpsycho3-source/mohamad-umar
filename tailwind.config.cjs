/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#aa3bff",
        secondary: "#6b6375",
        accent: "#ff6b6b",
        bg: "#0b0f19",
        "bg-dark": "#020617",
        text: "#f8fafc",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
