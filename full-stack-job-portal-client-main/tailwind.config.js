/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#fb923c",
        accent: "#ea580c",
        neutral: "#fff7ed",
        warmGray: "#d6d3d1",
        warmBlack: "#1c1917",
      },
    },
  },
  plugins: [],
};
