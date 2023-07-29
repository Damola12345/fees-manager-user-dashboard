/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      purple: {
        DEFAULT: "#3c073c"
      },
      white: {
        DEFAULT: "#FFFFFF"
      },
      black: {
        DEFAULT: "black"
      },
      midPurple: {
        DEFAULT: "#680E4B"
      }
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
