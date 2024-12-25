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
        '15':'56px',
        '85':'340px',
        '30':'120px',
        '18':'72px',
        '25':'100px',
        '67':'269px',
        '39':'158px',


      },
      fontSize: {
        "xs+": "13px", 
        "xs-": "11.2px",
        "xxl":"30px"
      },
      colors: {
        customDark: '#09090B', 
      },
    },
  },
  plugins: [],
}
