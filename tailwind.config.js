/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '14':'54px',
        '82':'330px',
        '13':'52px',
        '43':'172px',

      },
    },
  },
  plugins: [],
}
