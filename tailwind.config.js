/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        custom_text: {
          500: "#667485",
        },
        custom: {
          50: "#edf4ff",
          100: "#deebff",
          200: "#c3d8ff",
          300: "#9ebeff",
          400: "#7899ff",
          500: "#4969fc",
          600: "#394bf2",
          700: "#2c3ad6",
          800: "#2734ac",
          900: "#273288",
          950: "#171c4f",
        },
      },
    },
  },
  plugins: [],
};
