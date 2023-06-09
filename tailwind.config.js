/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'small-tablet': '620px',
      // @media (min-width: 620px) { ... }
      'sm': '640px',	
      // @media (min-width: 640px) { ... }
      'md': '768px',	
      // @media (min-width: 768px) { ... }
      'lg': '1024px',	
      // @media (min-width: 1024px) { ... }
      'xl': '1280px',	
      // @media (min-width: 1280px) { ... }
      'surface': {'raw': '(min-height: 1280px)'},
      // min-height: 1280px
      'tablet': {'min': '1024px', 'max': '1599px'},
      // min-width: 1024px and max-width: 1599px
      'ipadpro': {'min-width': '1024px', 'max-height': '1366px'},
      // min-width: 1024px and max-height: 1366px
      '2xl': '1600px',	
      // @media (min-width: 1600px) { ... }
      '3xl': '1750px',
      // @media (min-width: 1750px) { ... }
      'epic': '3000px',
      // @media (min-width: 4000px) { ... }
      'ridonk': '7000px',
      // @media (min-width: 4000px) { ... }
    },
  },
  future: {
      hoverOnlyWhenSupported: true,
    },
  plugins: [],
}