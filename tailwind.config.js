const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...colors,
        gray: colors.slate,
        primary: colors.blue,
        danger: colors.red,
        success: colors.green,
        warning: colors.yellow,
        text: {
          primary: "#000",
          secondary: colors.slate[500],
        }
      }
    },
  },
  plugins: [],
}
