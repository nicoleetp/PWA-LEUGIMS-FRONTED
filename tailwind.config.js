/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ff5d8d",
          300: "#242a55",
          900: "#181b38",
        },
      },
    },
  },
  plugins: [],
};
