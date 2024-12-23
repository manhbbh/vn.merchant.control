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
        '45':'200px',
        '15':'60px',
      },
      fontSize: {
        "xs+": "13px", // Thêm kích thước font 13px
        "xs-": "11.2px",
        "xxl":"30px"
      },
    },
  },
  plugins: [],
}
