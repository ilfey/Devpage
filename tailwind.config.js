/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const mColors = {
  ...colors,
  "gray": {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B"
  }
}

module.exports = {
  darkMode: "class",
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: mColors,
    fontFamily: {
      'nunito': 'Nunito',
    },
    extend: {

    },
  },
}

