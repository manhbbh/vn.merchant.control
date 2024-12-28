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
        '14.5':'57px',
        '82':'330px',
        '13':'52px',
        '43':'172px',
        '45':'200px',
        '15':'60px',
        '16':'65px',
        '100':'250px',
        '50':'200px',
        '97':'386px',
        '16':'64px',
        '5.5':'22px',
        '85':'340px',
        '30':'120px',
        '18':'72px',
        '25':'100px',
        '67':'271px',
        '39':'158px',
        '41':'163px',
        '34':'150px',
        '31':'75px',
        '12.5':'55px',
        '7.5':'30px',
        '11.5':'50px',
        '115.5':'462px',
        '42':'130px',
        '100.5':'252px',
        '22.5':'90px',
        '57.5':'230px',
        '166':'664px',
        '45':'180px',

        


      


        

      },
      fontSize: {
        "xs+": "13px", 
        "xs-": "11.2px",
        "xxl":"30px",
        "ss":"8px"

      },
      colors: {
        customDark: '#09090B', 
        muted:'#71717A',
        error: '#DC2626',
        primary: '#18181B',
      },
    },
  },
  plugins: [],
}
