/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        black: "#0F0F0F",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-elevation"), require("tailwindcss-animate")],
};
