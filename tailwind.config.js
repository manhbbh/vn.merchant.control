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
        '100':'250px',
        '50':'200px',
        '97':'386px',
        '16':'62px',
        '5.5':'22px',
        '15':'57px',
        '85':'340px',

        

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
